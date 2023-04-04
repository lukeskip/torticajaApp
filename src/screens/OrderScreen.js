import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { API_HOST } from "../utils/constants";
import { getData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import ProductList from "../components/ProductList";
import useAuth from "../hooks/useAuth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function OrderScreen() {
  const { auth, orderProducts } = useAuth();
  const navigation = useNavigation();
  const goToProducts = () => {
    navigation.navigate("Products");
  };

  const loadOrGo = () => {
    if (orderProducts.length === 0) {
      navigation.navigate("Products");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadOrGo();
    }, [orderProducts])
  );

  return (
    <>
      <View
        style={[
          globalStyles.content,
          globalStyles.contentMarginTop,
          globalStyles.contentCenter,
        ]}
      >
        <Pressable style={globalStyles.button} onPress={goToProducts}>
          <Text style={globalStyles.buttonText}>Agregar Producto</Text>
        </Pressable>
      </View>
    </>
  );
}
