import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";

import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import { sendData } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { validationMessages } from "../utils/validationMessages";
import RegisterBranchForm from "./RegisterBranchForm";

export default function RegisterStoreForm() {
  const { auth, login, logout, branch } = useAuth();
  const [checkBox, setCheckBox] = useState(false);
  const [page, setPage] = useState(1);
  const [branches, setBranches] = useState([]);
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      branchCheck: false,
      branches: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required(validationMessages.required),
      address: Yup.string().required(validationMessages.required),
      phone: Yup.string().required(validationMessages.required),
    }),
    onSubmit: async (formData) => {
      if (formData.branchCheck === true && page === 1) {
        setPage(2);
      } else {
        try {
          const response = await sendData("/stores", formData, auth);
          console.log("response", response);
          if (response.success === true) {
            login(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  });
  return (
    <ScrollView style={[globalStyles.content, { marginTop: 40 }]}>
      {page === 1 ? (
        <>
          <Text style={globalStyles.title_1}>Registra tu tortillería:</Text>

          <Text style={globalStyles.label}>Nombre(requerido):</Text>
          <TextInput
            style={globalStyles.textInput}
            onChangeText={(text) =>
              formik.setFieldValue("name", text.toString())
            }
            value={formik.values.name}
          />
          {formik.errors.name && (
            <Text style={globalStyles.error}> {formik.errors.name} </Text>
          )}

          <Text style={globalStyles.label}>Dirección (requerido):</Text>
          <TextInput
            style={globalStyles.textInput}
            onChangeText={(text) =>
              formik.setFieldValue("address", text.toString())
            }
            value={formik.values.address}
          />
          {formik.errors.address && (
            <Text style={globalStyles.error}> {formik.errors.address} </Text>
          )}

          <Text style={globalStyles.label}>Teléfono (requerido):</Text>
          <TextInput
            style={globalStyles.textInput}
            autoCapitalize="none"
            onChangeText={(text) =>
              formik.setFieldValue("phone", text.toString())
            }
            value={formik.values.phone}
          />
          {formik.errors.phone && (
            <Text style={globalStyles.error}> {formik.errors.phone} </Text>
          )}

          <View style={globalStyles.flex}>
            <BouncyCheckbox
              fillColor={colors.mainColor}
              isChecked={formik.values.branchCheck}
              unfillColor="#FFFFFF"
              disableBuiltInState
              onPress={() =>
                formik.setFieldValue("branchCheck", !formik.values.branchCheck)
              }
              style={{ marginVertical: 20 }}
            />
            <Pressable
              onPress={() => {
                formik.setFieldValue("branchCheck", !formik.values.branchCheck);
              }}
            >
              <Text>Tengo más de una sucursal</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <RegisterBranchForm branches={branches} setBranches={setBranches} />
      )}
      <Pressable
        style={[globalStyles.button, { marginTop: 20 }]}
        onPress={formik.handleSubmit}
      >
        <Text style={globalStyles.buttonText}>Siguiente</Text>
      </Pressable>
    </ScrollView>
  );
}
