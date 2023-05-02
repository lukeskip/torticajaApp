import { View, Text, StyleSheet } from "react-native";
import React from "react";
import OutcomeItem from "./OutcomeItem";
import { globalStyles } from "../utils/globalStyles";

export default function OutcomeList(props) {
  const { outcomes, edition = false, loadItems } = props;
  return outcomes ? (
    outcomes.map((outcome) => (
      <OutcomeItem
        loadItems={loadItems}
        edition={edition}
        outcome={outcome}
        key={outcome.id}
      />
    ))
  ) : (
    <View style={globalStyles.container}>
      <Text style={globalStyles.text}>No hay gastos</Text>
    </View>
  );
}
