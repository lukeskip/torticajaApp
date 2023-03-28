import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";

export default function OutcomeItem(props) {
  const { outcome } = props;
  console.log(props);
  return (
    <View style={styles.content}>
      <Text>{outcome.label}</Text>
      <Text> ${outcome.amount}</Text>
      <Text style={globalStyles.pill}>{outcome.category}</Text>
      <Text>{outcome.date}</Text>
    </View>
  );
}

styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
});
