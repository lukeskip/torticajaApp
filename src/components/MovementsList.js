import { View, Text, SectionList } from "react-native";
import React from "react";

export default function MovementsList() {
  const { sections } = props;
  return (
    <SectionList
      sections={sections}
      renderSectionHeader={({ section }) => {
        return <Text style={styles.header}>{section.title}</Text>;
      }}
      renderItem={(section) => {
        <Text>{section.amount}</Text>;
      }}
      keyExtractor={(item) => item.id}
    />
  );
}
