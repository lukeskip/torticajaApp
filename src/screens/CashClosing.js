import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { sendData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import { validationMessages } from "../utils/validationMessages";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function CashClosing() {
  const { auth } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValues) => {
      const data = {
        dough: parseFloat(formValues.dough),
        coldDough: parseFloat(formValues.coldDough),
        flour: parseFloat(formValues.flour),
        gas: parseFloat(formValues.gas),
        doughLeft: parseFloat(formValues.doughLeft),
        tortillaLeft: parseFloat(formValues.tortillaLeft),
        cash: parseFloat(formValues.cash),
      };
      const response = await sendData("/cash-closings", data);
      console.log(response);
      console.log("se envio");
    },
  });
  useEffect(() => {}, []);
  return (
    <ScrollView style={[globalStyles.content, { marginTop: 40 }]}>
      <Text style={globalStyles.title_1}>Calcular Cajón</Text>

      <TextInput
        style={globalStyles.textInput}
        placeholder="Masa (kg)"
        onChangeText={(text) => {
          formik.setFieldValue("dough", text.toString());
        }}
        value={formik.values.dough}
      />
      <Text style={globalStyles.error}> {formik.errors.dough} </Text>

      <TextInput
        style={globalStyles.textInput}
        placeholder="Masa Fría (kg)"
        onChangeText={(text) =>
          formik.setFieldValue("coldDough", text.toString())
        }
        value={formik.values.coldDough}
      />
      <Text style={globalStyles.error}> {formik.errors.coldDough} </Text>

      <TextInput
        style={globalStyles.textInput}
        placeholder="Harina utilizada (bultos)"
        onChangeText={(text) => formik.setFieldValue("flour", text.toString())}
        value={formik.values.flour}
      />
      <Text style={globalStyles.error}> {formik.errors.flour} </Text>

      <TextInput
        style={globalStyles.textInput}
        placeholder="Marcador de gas"
        onChangeText={(text) => formik.setFieldValue("gas", text.toString())}
        value={formik.values.gas}
      />
      <Text style={globalStyles.error}> {formik.errors.gas} </Text>

      <TextInput
        style={globalStyles.textInput}
        placeholder="Masa Sobrante (kg)"
        onChangeText={(text) =>
          formik.setFieldValue("doughLeft", text.toString())
        }
        value={formik.values.doughLeft}
      />
      <Text style={globalStyles.error}> {formik.errors.doughLeft} </Text>

      <TextInput
        style={globalStyles.textInput}
        placeholder="Tortilla Sobrante (kg)"
        onChangeText={(text) =>
          formik.setFieldValue("tortillaLeft", text.toString())
        }
        value={formik.values.tortillaLeft}
      />
      <Text style={globalStyles.error}> {formik.errors.tortillaLeft} </Text>

      <TextInput
        style={globalStyles.textInput}
        placeholder="Efectivo en caja"
        onChangeText={(text) => formik.setFieldValue("cash", text.toString())}
        value={formik.values.cash}
      />
      <Text style={globalStyles.error}> {formik.errors.cash} </Text>

      <Pressable style={globalStyles.button} onPress={formik.handleSubmit}>
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
