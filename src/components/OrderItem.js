import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";

export default function OrderItem(props) {
  const { order, edition = false } = props;
  const iconName = () => {
    switch (order.method) {
      case "cash":
        return "money-bill-wave-alt";
      case "card":
        return "credit-card";
    }
  };

  return (
    <View style={globalStyles.item}>
      <View style={globalStyles.flex}>
        <FontAwesome5
          name={iconName()}
          size={20}
          color={colors.grayDark}
          light
          style={globalStyles.icon}
        />
        <Text style={globalStyles.title_2}>${order.amount}</Text>
      </View>
      <View>
        {order.products && order.products.length > 0 ? (
          order.products.map((product, index) => (
            <Text style={globalStyles.fontSmall} key={index}>
              {product.quantity} x {product.label}
            </Text>
          ))
        ) : (
          <Text>Orden sin productos</Text>
        )}
      </View>
      {edition && (
        <Pressable style={globalStyles.flex}>
          <FontAwesome5 name="edit" size={20} color={colors.mainColor} />
        </Pressable>
      )}
    </View>
  );
}
