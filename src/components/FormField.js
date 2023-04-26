import { View, Text, TextInput } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";

export default function FormField(props) {
  const { formik, name, label } = props;
  return (
    <>
      <Text style={globalStyles.label}>{label}</Text>
      <TextInput
        onChangeText={(text) => formik.setFieldValue({ name }, text.toString())}
        value={formik.values[{ name }]}
        style={globalStyles.textInput}
      />
      {formik.errors[{ name }] && (
        <Text style={globalStyles.error}>{formik.errors[{ name }]}</Text>
      )}
    </>
  );
}
