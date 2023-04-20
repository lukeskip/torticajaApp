import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { sendDataImage } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import { validationMessages } from "../utils/validationMessages";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function OutcomeCreateScreen() {
  const { auth, logout } = useAuth();
  const [photo, setPhoto] = React.useState(null);
  const navigation = useNavigation();

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Negaste el permiso para usar la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      formik.setFieldValue("photo", result.assets[0].uri);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValues) => {
      const data = new FormData();
      data.append("label", formValues.label);
      data.append("amount", parseFloat(formValues.amount));
      data.append("category", "inhouse");
      data.append("photo", {
        type: "image/jpeg",
        uri: photo,
        name: "upload.jpg",
      });

      sendDataImage("/outcomes", data, auth)
        .then((response) => {
          console.log("data sent", data);
          console.log("response>>>>", response);
          if (response.status === 401) {
            logout();
          } else if (response.status === 200) {
            navigation.navigate("outcomeScreen");
          }
        })
        .catch((error) => console.log("errora", error));
    },
  });
  return (
    <View style={globalStyles.content}>
      <Text style={[globalStyles.label, { marginTop: 40 }]}>
        Título del gasto
      </Text>
      <TextInput
        style={globalStyles.textInput}
        onChangeText={(text) => {
          formik.setFieldValue("label", text.toString());
        }}
        value={formik.values.label}
      />
      {formik.errors.label && (
        <Text style={globalStyles.error}> {formik.errors.label} </Text>
      )}

      <Text style={[globalStyles.label, { marginTop: 20 }]}>
        Monto del gasto
      </Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => {
          formik.setFieldValue("amount", text.toString());
        }}
        value={formik.values.amount}
      />
      {formik.errors.amount && (
        <Text style={globalStyles.error}> {formik.errors.amount} </Text>
      )}

      {photo ? (
        <View style={globalStyles.flex}>
          <ImageBackground
            source={{ uri: photo }}
            resizeMode="cover"
            style={[globalStyles.flexItem, globalStyles.thumbnail]}
          >
            <Pressable style={globalStyles.button} onPress={openCamera}>
              <Text style={globalStyles.buttonText}>Cambiar Foto</Text>
            </Pressable>
          </ImageBackground>

          {formik.errors.photo && (
            <Text style={globalStyles.error}> {formik.errors.photo} </Text>
          )}
        </View>
      ) : (
        <View style={globalStyles.flex}>
          <Pressable onPress={openCamera}>
            <ImageBackground
              resizeMode="cover"
              style={globalStyles.thumbnail}
              width={100}
              height={100}
              source={require("../assets/img/targetCamera.png")}
            ></ImageBackground>
          </Pressable>

          {formik.errors.photo && (
            <Text style={globalStyles.error}> {formik.errors.photo} </Text>
          )}
        </View>
      )}

      <Pressable
        style={[globalStyles.button, { marginTop: 40 }]}
        onPress={formik.handleSubmit}
      >
        <Text style={globalStyles.buttonText}>Crear Gasto</Text>
      </Pressable>
    </View>
  );
}

const initialValues = () => {
  return {
    label: "",
    amount: "",
    photo: "",
  };
};

const validationSchema = () => {
  return {
    label: Yup.string().required(validationMessages.required),
    amount: Yup.number().required(validationMessages.required),
    photo: Yup.string().required(validationMessages.required),
  };
};
