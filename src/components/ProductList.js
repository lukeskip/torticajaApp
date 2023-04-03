import { View, Text } from "react-native";
import React from "react";
import ProductItem from "./ProductItem";
import useAuth from "../hooks/useAuth";

export default function ProductList(props) {
  const { products } = props;

  return products.map((product) => (
    <ProductItem product={product} key={product.id} />
  ));
}
