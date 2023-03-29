import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { globalStyles } from "../utils/globalStyles";

export default function ItemCard(props) {
  const { title, description, id } = props;
  const navigation = useNavigation();
  const ItemDetails = () => {
    navigation.navigate("Branch", { id: id });
  };
  return (
    <TouchableWithoutFeedback onPress={() => ItemDetails()}>
      <View style={globalStyles.card}>
        <Text>id {id}</Text>
        <Text>Titulo: {title}</Text>
        <Text>Descripción {description}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
