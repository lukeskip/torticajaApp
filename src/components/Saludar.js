import React from "react";
import { Text } from "react-native";

export default function App(props) {
  const { name, lastname } = props;
  return (
    <Text>
      Hola {name} {lastname}
    </Text>
  );
}
