import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import { globalStyles } from "../utils/globalStyles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../utils/constants";

export default function ProductItem(props) {
  const { addProduct, isOpen, setIsOpen, editQuantity, deleteItem } = useAuth();
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
        <TouchableOpacity
          style={globalStyles.pill}
          onPress={() => {
            addProduct(product);
          }}
        >
          <Text style={{ color: "white" }}>+1</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View>
            <Text>{product.price}</Text>
          </View>
          <View>
            <Text>x{product.quantity}</Text>
          </View>
          {inOrder && (
            <Pressable
              style={[globalStyles.button, globalStyles.buttonSmall]}
              onPress={() => {
                deleteItem(product.id);
              }}
            >
              <FontAwesome5 name="trash" color="white" size={12} />
            </Pressable>
          )}
        </>
      )}
    </View>
  );
}
