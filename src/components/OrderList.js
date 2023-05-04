import { View, Text } from "react-native";
import React from "react";
import OrderItem from "./OrderItem";

export default function OrderList(props) {
  const { orders, edition, loadItems } = props;
  return orders.map((order) => (
    <OrderItem
      edition={edition}
      key={order.id}
      order={order}
      loadItems={loadItems}
    />
  ));
}
