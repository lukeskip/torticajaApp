import { View, Text, Pressable } from "react-native";
import React, { useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { globalStyles } from "../utils/globalStyles";

export default function ProductItem(props) {
  const { addProduct, isOpen, setIsOpen } = useAuth();
  const { product, edit } = props;

  handleViewRef = (ref) => (view = ref);

  return (
    <View style={[globalStyles.item, { justifyContent: "space-between" }]}>
      <Text style={{ width: "70%" }}>{product.label}</Text>
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
            <Text>x{product.amount}</Text>
          </View>
        </>
      )}
    </View>
  );
}
