import { View, Text, Modal, Pressable, TextInput } from "react-native";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { modalStyles } from "../utils/modalStyles";
import { globalStyles } from "../utils/globalStyles";

export default function ProductFormModal(props) {
  const { isOpen, setIsOpen } = useAuth();
  useEffect(() => {}, [isOpen]);
  return (
    <>
      <Modal visible={isOpen} transparent={true} animationType={"slide"}>
        <View style={modalStyles.container}>
          <View style={modalStyles.modal}>
            <Text style={globalStyles.title_1}>
              Indica la cantidad en kilos
            </Text>
            <TextInput style={globalStyles.textInput} />
            <Pressable
              style={globalStyles.button}
              onPress={() => setIsOpen(!isOpen)}
            >
              <Text style={globalStyles.buttonText}>Continuar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
