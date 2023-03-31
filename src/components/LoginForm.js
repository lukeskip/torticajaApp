import React from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  Keyboard,
  Pressable,
} from "react-native";
import { globalStyles } from "../utils/globalStyles";
import { useFormik } from "formik";
import { loginApi } from "../api/api-connections";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const { login, logout } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValues) => {
      const data = {
        email: formValues.email,
        password: formValues.password,
      };
      await sendAuth(JSON.stringify(data));
    },
  });

  const sendAuth = async (values) => {
    try {
      const response = await loginApi(values);
      if (response.token) {
        login(response);
        console.log(response);
      } else {
        console.log("No autorizado");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={[globalStyles.content, globalStyles.contentCenter]}>
      <TextInput
        placeholder="Email"
        style={globalStyles.textInput}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={globalStyles.textInput}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Pressable style={globalStyles.button} onPress={formik.handleSubmit}>
        <Text style={globalStyles.buttonText}>Enviar</Text>
      </Pressable>
      <Text style={globalStyles.error}>{formik.errors.email}</Text>
      <Text style={globalStyles.error}>{formik.errors.password}</Text>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().required("Escribe tu usuario"),
    password: Yup.string().required("Escribe tu contraseña"),
  };
}
