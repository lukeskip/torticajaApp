import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import IncomeItem from "./IncomeItem";

export default function IncomeList(props) {
  const { incomes } = props;

  return incomes ? (
    incomes.map((income) => <IncomeItem income={income} key={income.id} />)
  ) : (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>No hay ventas</Text>
    </View>
  );
}
