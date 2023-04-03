import { View, Text, Pressable } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { globalStyles } from "../utils/globalStyles";

export default function ProductItem(props) {
  const { addProduct } = useAuth();
  const { product } = props;

  return (
    <View style={[globalStyles.item, { justifyContent: "space-between" }]}>
      <Text>{product.label}</Text>

      <Pressable
        style={globalStyles.pill}
        onPress={() => {
          addProduct(product);
        }}
      >
        <Text style={{ color: "white" }}>+1</Text>
      </Pressable>
    </View>
  );
}
