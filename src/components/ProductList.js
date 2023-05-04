import { View, Text } from "react-native";
import React from "react";
import ProductItem from "./ProductItem";
import useAuth from "../hooks/useAuth";

export default function ProductList(props) {
  const { products, edit, inOrder = false } = props;

  return products.map((product) => (
    <ProductItem
      inOrder={inOrder}
      key={product.id}
      product={product}
      key={product.id}
      edit={edit}
    />
  ));
}
