import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React from "react";

export default function ItemCard(props) {
  const { title, description, id } = props;
  const ItemDetails = () => {
    console.log("Item Detaial: " + title);
  };
  return (
    <TouchableWithoutFeedback onPress={() => ItemDetails()}>
      <View style={styles.card}>
        <Text>id {id}</Text>
        <Text>Titulo: {title}</Text>
        <Text>Descripción {description}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    height: 200,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
