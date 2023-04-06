import { View, Text, Pressable } from "react-native";
import React, { useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import * as Animatable from "react-native-animatable";
import { globalStyles } from "../utils/globalStyles";

export default function ProductItem(props) {
  const { addProduct, isOpen, setIsOpen } = useAuth();
  const { product, edit } = props;

  handleViewRef = (ref) => (view = ref);

  bounce = () => {
    console.log(view);
    return view
      .bounce(800)
      .then((endState) =>
        console.log(endState.finished ? "bounce finished" : "bounce cancelled")
      );
  };

  return (
    <View style={[globalStyles.item, { justifyContent: "space-between" }]}>
      <Text style={{ width: "70%" }}>{product.label}</Text>
      {edit ? (
        <Animatable.View ref={handleViewRef} style={globalStyles.pill}>
          <Pressable
            onPress={() => {
              bounce();
              addProduct(product);
            }}
          >
            <Text style={{ color: "white" }}>+1</Text>
          </Pressable>
        </Animatable.View>
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
