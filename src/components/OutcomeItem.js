import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";
import { colors } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function OutcomeItem(props) {
  const { outcome } = props;
  iconName = () => {
    switch (outcome.category) {
      case "inhouse":
        return "cash-register";
      case "outhouse":
        return "money-bill-wave";
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
      <Text style={[globalStyles.flexItem, globalStyles.title_2]}>
        ${outcome.amount}
      </Text>
      <View>
        <Text style={globalStyles.flexItem}>{outcome.label}</Text>
        <Text style={globalStyles.flexItem}>{outcome.date}</Text>
      </View>
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
