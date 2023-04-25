import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
globalStyles;
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendData } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El correo es obligatorio"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
      password_confirmation: Yup.string()
        .required("La confirmación de la contraseña es obligatoria")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
    }),
    onSubmit: async (formData) => {
      try {
        console.log(formData);
        const response = await sendData("/auth/register", formData);
        console.log("response", response);
        if (response.success === true) {
          login(response);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <ScrollView style={[globalStyles.content, { marginTop: 40 }]}>
      <Text style={globalStyles.title_1}>Registro:</Text>
      <Text style={globalStyles.paragraph}>
        El registro es solo para personas que quieren dar de alta su
        tortillería, si lo que quieres es agregarte como un empleado de una
        tortillería registrada, pide al administrador de esa tortillería que te
        mande una invitación.
      </Text>

      <Text style={globalStyles.label}>Nombre:</Text>
      <TextInput
        style={globalStyles.textInput}
        onChangeText={(text) => formik.setFieldValue("name", text.toString())}
        value={formik.values.name}
      />

      <Text style={globalStyles.label}>Correo:</Text>
      <TextInput
        style={globalStyles.textInput}
        onChangeText={(text) => formik.setFieldValue("email", text.toString())}
        value={formik.values.email}
      />

      <Text style={globalStyles.label}>Password:</Text>
      <TextInput
        style={globalStyles.textInput}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(text) =>
          formik.setFieldValue("password", text.toString())
        }
        value={formik.values.password}
      />

      <Text style={globalStyles.label}>Confirma tu contraseña:</Text>
      <TextInput
        style={globalStyles.textInput}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(text) =>
          formik.setFieldValue("password_confirmation", text.toString())
        }
        value={formik.values.password_confirmation}
      />
      <Pressable style={globalStyles.button} onPress={formik.handleSubmit}>
        <Text style={globalStyles.buttonText}>Enviar</Text>
      </Pressable>
      <View style={[globalStyles.flex, { marginTop: 20 }]}>
        <Pressable
          style={globalStyles.flexItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={globalStyles.link}>¿Ya tienes una cuenta?</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
