import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";

export default function IncomeItem(props) {
  const { income } = props;

  return (
    <View key={income.id} style={globalStyles.item}>
      <Text style={styles.text}>${income.amount}</Text>
      <Text style={globalStyles.pill}>{income.type}</Text>
      <Text>{income.date}</Text>
    </View>
  );
}
