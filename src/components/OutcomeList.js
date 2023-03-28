import { View, Text, StyleSheet } from "react-native";
import React from "react";
import OutcomeItem from "./OutcomeItem";
import { globalStyles } from "../utils/globalStyles";

export default function OutcomeList(props) {
  const { outcomes } = props;

  return outcomes.map((outcome) => (
    <OutcomeItem outcome={outcome} key={outcome.id} />
  ));
}
