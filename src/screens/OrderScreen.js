import { View, Text, Pressable, ScrollView, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { API_HOST } from "../utils/constants";
import { getData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import ProductList from "../components/ProductList";
import useAuth from "../hooks/useAuth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function OrderScreen() {
  const { auth, orderProducts, emptyCart, cartTotal } = useAuth();
  const navigation = useNavigation();
  const goToProducts = () => {
    navigation.navigate("Products");
  };

  useEffect(() => {}, [cartTotal, orderProducts]);

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
          onPress={goToProducts}
        >
          <Text style={globalStyles.buttonText} animation="zoomInUp">
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
