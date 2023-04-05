import { View, Text, Modal, Pressable, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import { modalStyles } from "../utils/modalStyles";
import { globalStyles } from "../utils/globalStyles";

export default function ProductFormModal(props) {
  const { isOpen, setIsOpen, productModal, addProduct } = useAuth();
  const formik = useFormik({
    initialValues: { amount: "" },
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formValues) => {
      addProduct(productModal, formValues.amount);
      formik.resetForm();
    },
  });
  useEffect(() => {}, [isOpen]);
  return (
    <>
      <Modal visible={isOpen} transparent={true} animationType={"slide"}>
        <View style={modalStyles.container}>
          <View style={modalStyles.modal}>
            <Text style={globalStyles.title_1}>
              Indica la cantidad en kilos
            </Text>
            <TextInput
              style={globalStyles.textInput}
              value={formik.values.amount}
              keyboardType="numeric"
              onChangeText={(text) => formik.setFieldValue("amount", text)}
            />
            <View style={globalStyles.flex}>
              <Pressable
                style={[
                  globalStyles.button,
                  globalStyles.buttonCancel,
                  { width: "48%" },
                ]}
                onPress={() => setIsOpen(!isOpen)}
              >
                <Text style={globalStyles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[globalStyles.button, { width: "48%" }]}
                onPress={formik.handleSubmit}
              >
                <Text style={globalStyles.buttonText}>Continuar</Text>
              </Pressable>
            </View>
            <Text style={globalStyles.error}>{formik.errors.amount}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

function validationSchema() {
  return {
    amount: Yup.number()
      .typeError("La cantidad debe ser un número")
      .required("Escribe la cantidad"),
  };
}
