import { View, Text, Modal, Button, TextInput } from "react-native";
import React from "react";
import { modalStyles } from "../utils/modalStyles";
import { globalStyles } from "../utils/globalStyles";

export default function ProductFormModal(props) {
  const { isOpen, setIsOpen } = props;
  return (
    <>
      <Modal visible={isOpen} transparent={true} animationType={"slide"}>
        <View style={modalStyles.container}>
          <View style={modalStyles.modal}>
            <Text>Modal</Text>
            <TextInput style={globalStyles.textInput} />
            <Button title="cerrar" onPress={() => setIsOpen(!isOpen)} />
          </View>
        </View>
      </Modal>
    </>
  );
}
