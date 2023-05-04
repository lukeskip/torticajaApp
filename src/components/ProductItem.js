import { View, Text, Pressable } from "react-native";
import React, { useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { globalStyles } from "../utils/globalStyles";

export default function ProductItem(props) {
  const { addProduct, isOpen, setIsOpen, editQuantity } = useAuth();
  const { product, edit, inOrder } = props;

  handleViewRef = (ref) => (view = ref);

  return (
    <View style={[globalStyles.item, { justifyContent: "space-between" }]}>
      <Text style={{ width: "60%" }}>{product.label}</Text>
      {inOrder && (
        <View style={globalStyles.flex}>
          <Pressable
            style={[globalStyles.button, globalStyles.buttonSmall]}
            onPress={() => {
              editQuantity(product.id, +1);
            }}
          >
            <Text style={{ color: "white" }}>+</Text>
          </Pressable>

          <Pressable
            style={[globalStyles.button, globalStyles.buttonSmall]}
            onPress={() => {
              editQuantity(product.id, -1);
            }}
          >
            <Text style={{ color: "white" }}>-</Text>
          </Pressable>
        </View>
      )}
      {edit ? (
        <View ref={handleViewRef} style={globalStyles.pill}>
          <Pressable
            onPress={() => {
              addProduct(product);
            }}
          >
            <Text style={{ color: "white" }}>+1</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View>
            <Text>{product.price}</Text>
          </View>
          <View>
            <Text>x{product.quantity}</Text>
          </View>
        </>
      )}
    </View>
  );
}
