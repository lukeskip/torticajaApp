import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";

export default function ProductItem(props) {
  const { product } = props;
  return (
    <View style={[globalStyles.item, { justifyContent: "space-between" }]}>
      <Text>{product.label}</Text>
      <Pressable style={globalStyles.pill}>
        <Text style={{ color: "white" }}>+1</Text>
      </Pressable>
    </View>
  );
}
