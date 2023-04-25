import { View, TextInput, Text } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import { useFormik } from "formik";
import * as yup from "yup";
import { validationMessages } from "../utils/validationMessages";
import { titles } from "../utils/titles";
import { sendData } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function RegisterBranchScreen() {
  navigation = useNavigation();
  const { logout, auth } = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(validationMessages.required),
      address: yup.string().required(validationMessages.required),
      phone: yup.string().required(validationMessages.required),
    }),
  });
  return (
    <View style={globalStyles.content}>
      <Text>RegisterBranchScreen</Text>
    </View>
  );
}
