import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function IncomeItem(props) {
  const { income, edition = false } = props;

  const iconName = () => {
    switch (income.type) {
      case "Efectivo":
        return "money-bill";
      case "Tarjeta":
        return "credit-card";
      case "Transferencia":
        return "exchange-alt";
      default:
        return "money-bill";
    }
  };

  return (
    <View style={globalStyles.item}>
      <FontAwesome5
        style={globalStyles.icon}
        name={iconName()}
        color={colors.grayDark}
        size={20}
      />

      <Text style={[globalStyles.flexItem, globalStyles.title_2]}>
        ${income.amount}
      </Text>
      <Text style={globalStyles.flexItem}>{income.label}</Text>
      <Text style={globalStyles.flexItem}>{income.time}</Text>
      {edition && (
        <>
          <Text>borrar</Text>
          <Text>Editar</Text>
        </>
      )}
    </View>
  );
}
