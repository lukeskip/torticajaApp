import { View, Text, Pressable, ScrollView, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { sendData } from "../api/api-connections";
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import ProductList from "../components/ProductList";
import useAuth from "../hooks/useAuth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function OrderScreen() {
  const { auth, logout, orderProducts, calculateTotal, emptyCart, cartTotal } =
    useAuth();
  const navigation = useNavigation();
  const goToProducts = () => {
    navigation.navigate("Products");
  };

  const saveOrder = () => {
    console.log(orderProducts);
    const data = {
      products: orderProducts,
      method: "cash",
    };
    sendData("/orders", data, auth)
      .then((response) => {
        if (response.status === 401) {
          logout();
        } else {
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    calculateTotal();
  }, [cartTotal, orderProducts]);

  return (
    <>
      <View
        style={[globalStyles.content, globalStyles.flex, { marginTop: 40 }]}
      >
        <Pressable
          style={[
            globalStyles.button,
            globalStyles.buttonCancel,
            { width: 50, marginRight: 10 },
          ]}
          onPress={emptyCart}
        >
          <FontAwesome5
            name="trash-alt"
            size={20}
            color="white"
            style={{ textAlign: "center" }}
          />
        </Pressable>
        <Pressable
          style={[globalStyles.button, globalStyles.buttonSuccess, { flex: 1 }]}
          onPress={saveOrder}
        >
          <Text style={globalStyles.buttonText}>
            Terminar Orden (${cartTotal})
          </Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={[
          globalStyles.content,
          globalStyles.contentMarginTop,
          // globalStyles.contentCenter,
        ]}
      >
        <View>
          <ProductList products={orderProducts} edit={false} />
        </View>
      </ScrollView>
    </>
  );
}
