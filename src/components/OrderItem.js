import { View, Text } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";

export default function OrderItem(props) {
  const { order } = props;
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
      <FontAwesome5
        name={iconName()}
        size={20}
        color={colors.grayDark}
        light
        style={globalStyles.icon}
      />
      <Text>${order.amount}</Text>
    </View>
  );
}
