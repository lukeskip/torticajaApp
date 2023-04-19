import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { sendData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import { validationMessages } from "../utils/validationMessages";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";

export default function OutcomeCreateScreen() {
  const { auth, logout } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValues) => {
      const data = {
        label: formValues.label,
        amount: parseFloat(formValues.amount),
        category: "inhouse",
      };

      sendData("/outcomes", data, auth)
        .then((response) => {
          console.log(data);
          console.log(response);
          if (response.status === 401) {
            logout();
          } else if (response.status === 200) {
            navigation.navigate("outcomeScreen");
          }
        })
        .catch((error) => console.log("error", error));
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

      <Pressable style={globalStyles.button} onPress={formik.handleSubmit}>
        <Text style={globalStyles.buttonText}>Crear Gasto</Text>
      </Pressable>
    </View>
  );
}

const initialValues = () => {
  return {
    label: "",
    amount: "",
  };
};

const validationSchema = () => {
  return {
    label: Yup.string().required(validationMessages.required),
    amount: Yup.number().required(validationMessages.required),
  };
};
