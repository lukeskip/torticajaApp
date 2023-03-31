import { View, Text } from "react-native";
import React from "react";

export default function ProductItem(props) {
  const { product } = props;
  return (
    <View>
      <Text>{product.label}</Text>
    </View>
  );
}
