import { View, Text } from "react-native";
import React from "react";
import ProductItem from "./ProductItem";
import useAuth from "../hooks/useAuth";

export default function ProductList(props) {
  const { products, edit } = props;

  return products.map((product) => (
    <ProductItem
      key={product.id}
      product={product}
      key={product.id}
      edit={edit}
    />
  ));
}
