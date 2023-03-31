import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_HOST } from "../utils/constants";
import { getData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import ProductList from "../components/ProductList";
import useAuth from "../hooks/useAuth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function OrderScreen() {
  const { auth } = useAuth();
  const orderProducts = [];
  const navigation = useNavigation();
  const goToProducts = () => {
    navigation.navigate("Products");
  };
  return orderProducts.length !== 0 ? (
    <View style={globalStyles.content}>
      <Pressable style={globalStyles.button} onPress={goToProducts}>
        <Text style={globalStyles.buttonText}>
          Agregar Producto desde lista
        </Text>
      </Pressable>
    </View>
  ) : (
    <>
      <View style={globalStyles.content}>
        <Pressable style={globalStyles.button} onPress={goToProducts}>
          <Text style={globalStyles.buttonText}>
            Agregar Producto desde lista
          </Text>
        </Pressable>
      </View>
      {navigation.navigate("Products")}
    </>
  );
}
