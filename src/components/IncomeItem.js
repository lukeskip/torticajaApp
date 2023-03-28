import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";

export default function IncomeItem(props) {
  const { income } = props;
  return (
    <View key={income.id} style={styles.content}>
      <Text style={styles.text}>${income.amount}</Text>
      <Text style={globalStyles.pill}>{income.type}</Text>
      <Text>{income.date}</Text>
    </View>
  );
}

styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    lineHight: 100,
  },
});
