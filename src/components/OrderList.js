import { View, Text } from "react-native";
import React from "react";
import OrderItem from "./OrderItem";

export default function OrderList(props) {
  const { orders } = props;
  return orders.map((order) => <OrderItem key={order.id} order={order} />);
}
