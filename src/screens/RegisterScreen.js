import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import RegisterStoreForm from "../components/RegisterStoreForm";
import useAuth from "../hooks/useAuth";

export default function RegisterScreen() {
  const { login, auth } = useAuth();
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <>
      {!auth ? (
        <RegisterForm formValues={formValues} />
      ) : (
        <RegisterStoreForm formValues={formValues} />
      )}
    </>
  );
}
