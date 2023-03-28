import { View, Text, StyleSheet } from "react-native";
import React from "react";
import IncomeItem from "./IncomeItem";

export default function IncomeList(props) {
  const { incomes } = props;

  return incomes.map((income) => (
    <IncomeItem key={income.id} income={income} />
  ));
}
