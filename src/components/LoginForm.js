import React from "react";
import { Text, TextInput, Button, View, Keyboard } from "react-native";
import { globalStyles } from "../utils/globalStyles";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formValues) => {
      console.log(formValues.email);
    },
  });
  return (
    <View style={globalStyles.content}>
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
      <Button title="Enviar" onPress={formik.handleSubmit} />
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
