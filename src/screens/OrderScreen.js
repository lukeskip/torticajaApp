import { View, Text, Pressable, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

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
  const {
    auth,
    logout,
    orderProducts,
    calculateTotal,
    emptyCart,
    cartTotal,
    setMethod,
    method,
    branch,
    orderEditing,
  } = useAuth();
  const navigation = useNavigation();
  const goToProducts = () => {
    navigation.navigate("sale");
  };

  const cancelOrder = () => {
    emptyCart();
    navigation.navigate("Branch");
  };

  const saveOrder = () => {
    console.log(orderProducts);
    const data = {
      products: orderProducts,
      method: method,
      branch: branch,
    };
    sendData("/orders", data, auth)
      .then((response) => {
        if (response.status === 401) {
          logout();
        } else if (response.status === 201) {
          emptyCart();
          navigation.navigate("Branch");
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    calculateTotal();
  }, [cartTotal, orderProducts]);

  return (
    <>
      <View style={globalStyles.content}>
        {orderEditing && (
          <Text style={globalStyles.title_1}>
            Orden en edición {orderEditing.id}
          </Text>
        )}
      </View>
      <View
        style={[globalStyles.content, globalStyles.flex, { marginTop: 40 }]}
      >
        <Text></Text>
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
      <View style={globalStyles.content}>
        <Picker
          selectedValue={method}
          style={globalStyles.picker}
          onValueChange={(itemValue, itemIndex) => setMethod(itemValue)}
        >
          <Picker.Item label="Efectivo" value="cash" />
          <Picker.Item label="Tarjeta" value="card" />
        </Picker>
      </View>
      <ScrollView
        contentContainerStyle={[
          globalStyles.content,
          globalStyles.contentMarginTop,
        ]}
      >
        <View>
          <ProductList inOrder={true} products={orderProducts} edit={false} />
        </View>
        <View style={globalStyles.flex}>
          <Pressable
            style={[globalStyles.button, globalStyles.buttonSuccess]}
            onPress={goToProducts}
          >
            <Text style={globalStyles.buttonText}>Agregar Producto</Text>
          </Pressable>
          <Pressable
            style={[globalStyles.button, globalStyles.buttonError]}
            onPress={cancelOrder}
          >
            <Text style={globalStyles.buttonText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
