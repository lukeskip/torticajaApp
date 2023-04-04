import { View, Text, Pressable } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { globalStyles } from "../utils/globalStyles";

export default function ProductItem(props) {
  const { addProduct } = useAuth();
  const { product, edit } = props;

  return (
    <View style={[globalStyles.item, { justifyContent: "space-between" }]}>
      <Text style={{ width: "70%" }}>{product.label}</Text>
      {edit ? (
        <Pressable
          style={globalStyles.pill}
          onPress={() => {
            addProduct(product);
          }}
        >
          <Text style={{ color: "white" }}>+1</Text>
        </Pressable>
      ) : (
        <>
          <View>
            <Text>{product.price}</Text>
          </View>
          <View>
            <Text>x{product.amount}</Text>
          </View>
        </>
      )}
    </View>
  );
}
