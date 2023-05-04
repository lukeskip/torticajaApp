import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import OrderList from "../components/OrderList";

export default function OrderListScreen() {
  const { auth } = useAuth();
  const [orders, setOrders] = React.useState([]);
  const loadItems = async () => {
    try {
      const response = await getData("/orders", auth);
      console.log(
        "🚀 ~ file: OrderListScreen.js:15 ~ loadItems ~ response:",
        response
      );
      if (response.success) {
        setOrders(response.orders);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await loadItems().catch((error) => console.log(error));
      })();
    }, [])
  );
  return (
    <ScrollView style={[globalStyles.content, globalStyles.marginTop]}>
      <OrderList loadItems={loadItems} edition={true} orders={orders} />
    </ScrollView>
  );
}
