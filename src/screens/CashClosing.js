import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { sendData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import { validationMessages } from "../utils/validationMessages";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function CashClosing() {
  const { auth, branch, logout } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValues) => {
      const data = {
        dough: parseFloat(formValues.dough),
        dough_cold: parseFloat(formValues.coldDough),
        flour: parseFloat(formValues.flour),
        gas: parseFloat(formValues.gas),
        dough_leftover: parseFloat(formValues.doughLeft),
        tortilla_leftover: parseFloat(formValues.tortillaLeft),
        cash: parseFloat(formValues.cash),
        branch: branch,
      };

      sendData("/cash-closings", data, auth)
        .then((response) => {
          console.log(data);
          console.log(response);
          if (response.status === 401) {
            logout();
          } else {
            console.log("se envio");
          }
        })
        .catch((error) => console.log(error));
    },
  });
  useEffect(() => {}, []);
  return (
    <ScrollView style={[globalStyles.content, { marginTop: 40 }]}>
      <Text style={globalStyles.title_1}>Calcular Cajón</Text>
      <Text style={[globalStyles.label, { marginTop: 20 }]}>Masa (kg)</Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => {
          formik.setFieldValue("dough", text.toString());
        }}
        value={formik.values.dough}
      />
      {formik.errors.dough && (
        <Text style={globalStyles.error}> {formik.errors.dough} </Text>
      )}

      <Text style={globalStyles.label}>Masa Fría (kg)</Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) =>
          formik.setFieldValue("coldDough", text.toString())
        }
        value={formik.values.coldDough}
      />
      {formik.errors.coldDough && (
        <Text style={globalStyles.error}> {formik.errors.coldDough} </Text>
      )}

      <Text style={globalStyles.label}>Harina utilizada (bultos)</Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => formik.setFieldValue("flour", text.toString())}
        value={formik.values.flour}
      />
      {formik.errors.flour && (
        <Text style={globalStyles.error}> {formik.errors.flour} </Text>
      )}

      <Text style={globalStyles.label}>Marcador de gas</Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => formik.setFieldValue("gas", text.toString())}
        value={formik.values.gas}
      />
      {formik.errors.gas && (
        <Text style={globalStyles.error}> {formik.errors.gas} </Text>
      )}

      <Text style={globalStyles.label}>Masa Sobrante (kg)</Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) =>
          formik.setFieldValue("doughLeft", text.toString())
        }
        value={formik.values.doughLeft}
      />
      {formik.errors.doughLeft && (
        <Text style={globalStyles.error}> {formik.errors.doughLeft} </Text>
      )}

      <Text style={globalStyles.label}>Tortilla Sobrante (kg)</Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) =>
          formik.setFieldValue("tortillaLeft", text.toString())
        }
        value={formik.values.tortillaLeft}
      />
      {formik.errors.tortillaLeft && (
        <Text style={globalStyles.error}> {formik.errors.tortillaLeft} </Text>
      )}

      <Text style={globalStyles.label}>Efectivo en caja</Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType="numeric"
        onChangeText={(text) => formik.setFieldValue("cash", text.toString())}
        value={formik.values.cash}
      />
      <Text style={globalStyles.error}> {formik.errors.cash} </Text>

      <Pressable
        style={[globalStyles.button, { marginBottom: 40 }]}
        onPress={formik.handleSubmit}
      >
        <Text style={globalStyles.buttonText}>Enviar</Text>
      </Pressable>
    </ScrollView>
  );
}

const initialValues = () => {
  return {
    dough: "",
    coldDough: "",
    flour: "",
    gas: "",
    doughLeft: "",
    tortillaLeft: "",
    cash: "",
  };
};

const validationSchema = () => {
  return {
    dough: Yup.string().required(validationMessages.required),
    coldDough: Yup.string().required(validationMessages.required),
    flour: Yup.string().required(validationMessages.required),
    gas: Yup.string().required(validationMessages.required),
    doughLeft: Yup.string().required(validationMessages.required),
    tortillaLeft: Yup.string().required(validationMessages.required),
    cash: Yup.string().required(validationMessages.required),
  };
};
