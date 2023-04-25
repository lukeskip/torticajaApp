import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
globalStyles;
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendData } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import { titles } from "../utils/titles";
import { useNavigation } from "@react-navigation/native";
import { validationMessages } from "../utils/validationMessages";

export default function RegisterShopScreen() {
  const navigation = useNavigation();
  const { logout, auth, branch } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      employees: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(validationMessages.required),
      address: Yup.string().required(validationMessages.required),
      phone: Yup.string().required(validationMessages.required),
      employees: Yup.string().required(validationMessages.required),
    }),
    onSubmit: async (formData) => {
      try {
        const response = await sendData("/shops", formData, auth);
        console.log("response", response);
        console.log("formData", formData);
        if (response.success === true) {
          navigation.navigate("RegisterBranch");
        } else if (response.status === 401) {
          logout();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView style={[globalStyles.content, { marginTop: 40 }]}>
      <Text style={globalStyles.title_1}>{titles.registerShop}</Text>

      <Text style={globalStyles.label}>Nombre del negocio:</Text>
      <TextInput
        style={globalStyles.textInput}
        onChangeText={(text) => formik.setFieldValue("name", text.toString())}
        value={formik.values.name}
      />
      <Text style={globalStyles.error}>{formik.errors.name}</Text>

      <Text style={globalStyles.label}>Dirección:</Text>
      <TextInput
        style={globalStyles.textInput}
        onChangeText={(text) =>
          formik.setFieldValue("address", text.toString())
        }
        value={formik.values.address}
      />
      <Text style={globalStyles.error}>{formik.errors.address}</Text>

      <Text style={globalStyles.label}>Teléfono:</Text>
      <TextInput
        style={globalStyles.textInput}
        onChangeText={(text) => formik.setFieldValue("phone", text.toString())}
        value={formik.values.phone}
      />
      <Text style={globalStyles.error}>{formik.errors.phone}</Text>

      <Text style={globalStyles.label}>Número de empleados:</Text>
      <View style={globalStyles.picker}>
        <Picker
          selectedValue="small"
          style={{ marginTop: -8 }}
          onValueChange={(itemValue, itemIndex) =>
            formik.setFieldValue("employees", itemValue.toString())
          }
        >
          <Picker.Item label="De 1 a 5" value="small" />
          <Picker.Item label="de 6 a 15" value="medium" />
          <Picker.Item label="más de 15" value="big" />
        </Picker>
      </View>
      <Text style={globalStyles.error}>{formik.errors.employees}</Text>

      <Pressable
        style={[globalStyles.button, { marginTop: 40 }]}
        onPress={formik.handleSubmit}
      >
        <Text style={globalStyles.buttonText}>Enviar</Text>
      </Pressable>

      <Pressable
        style={[globalStyles.button, { marginTop: 40 }]}
        onPress={logout}
      >
        <Text style={globalStyles.buttonText}>Salir</Text>
      </Pressable>
    </ScrollView>
  );
}
