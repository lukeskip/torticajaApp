import React from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  Keyboard,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { globalStyles } from "../utils/globalStyles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
  const navigation = useNavigation();
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
      console.log("LOGIN", response);
      if (response.success) {
        login(response);
      } else {
        Alert.alert(response.message, "Inténtalo de nuevo");
      }
    } catch (error) {}
  };

  return (
    <View style={[globalStyles.content, globalStyles.contentCenter]}>
      <View style={globalStyles.flex}>
        <Image
          source={require("../assets/img/logo.png")}
          style={globalStyles.logo}
        />
      </View>
      <TextInput
        placeholder="Email"
        style={[globalStyles.textInput, { marginBottom: 20 }]}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={[globalStyles.textInput, { marginBottom: 20 }]}
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
      <View style={globalStyles.flex}>
        <Pressable
          style={globalStyles.flexItem}
          onPress={() => navigation.navigate("register")}
        >
          <Text style={globalStyles.link}>¿No tienes una cuenta?</Text>
        </Pressable>

        <Pressable style={globalStyles.flexItem}>
          <Text style={globalStyles.link}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      </View>
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
