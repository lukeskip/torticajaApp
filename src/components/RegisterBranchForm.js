import { ScrollView, TextInput, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import BranchFormItem from "./BranchFormItem";
import { globalStyles } from "../utils/globalStyles";
import { titles } from "../utils/titles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validationMessages } from "../utils/validationMessages";
import FormField from "./FormField";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function RegisterBranchForm(props) {
  const { branches, setBranches } = props;

  const deleteBranch = (id) => {
    const newBranches = branches.filter((item, i) => i !== id);
    setBranches(newBranches);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(validationMessages.required),
      address: Yup.string().required(validationMessages.required),
      phone: Yup.string().required(validationMessages.required),
    }),
    onSubmit: (formData, actions) => {
      setBranches([...branches, { ...formData, id: branches.length }]);
      actions.resetForm();
    },
  });
  return (
    <ScrollView>
      <Text style={globalStyles.title_1}> {titles.registerBranch} </Text>

      <View style={globalStyles.pillList}>
        {branches.map((item, index) => (
          <View style={[globalStyles.pill, globalStyles.pillBig]} key={index}>
            <Text style={globalStyles.pillBigText}>{item.name}</Text>
            <Pressable
              style={globalStyles.pillBigButton}
              onPress={() => deleteBranch(item.id)}
            >
              <FontAwesome5
                style={{ textAlign: "center" }}
                name="times"
                color="white"
              />
            </Pressable>
          </View>
        ))}
      </View>

      <Text style={globalStyles.label}>Nombre (requerido:)</Text>
      <TextInput
        onChangeText={(text) => formik.setFieldValue("name", text.toString())}
        value={formik.values.name}
        style={globalStyles.textInput}
      />
      {formik.errors.name && (
        <Text style={globalStyles.error}>{formik.errors.name}</Text>
      )}

      <Text style={globalStyles.label}>Dirección (requerido):</Text>
      <TextInput
        onChangeText={(text) =>
          formik.setFieldValue("address", text.toString())
        }
        value={formik.values.address}
        style={globalStyles.textInput}
      />
      {formik.errors.address && (
        <Text style={globalStyles.error}>{formik.errors.address}</Text>
      )}

      <Text style={globalStyles.label}>Teléfono (requerido):</Text>
      <TextInput
        onChangeText={(text) => formik.setFieldValue("phone", text.toString())}
        value={formik.values.phone}
        style={globalStyles.textInput}
      />
      {formik.errors.phone && (
        <Text style={globalStyles.error}>{formik.errors.phone}</Text>
      )}
      <View style={globalStyles.flex}>
        <Pressable
          style={[globalStyles.button, { marginTop: 20 }]}
          onPress={formik.handleSubmit}
        >
          <Text style={globalStyles.buttonText}>Agregar Sucursal</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
