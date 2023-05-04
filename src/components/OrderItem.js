import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../utils/constants";
import { removeItem } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function OrderItem(props) {
  const { auth, editOrder } = useAuth();
  const navigation = useNavigation();
  const { order, edition = false, loadItems } = props;
  remove = async (id) => {
    try {
      const response = await removeItem(`/orders/${id}`, auth);

      if (response.success) {
        loadItems();
      }
    } catch (error) {}
  };
  const iconName = () => {
    switch (order.method) {
      case "cash":
        return "money-bill-wave-alt";
      case "card":
        return "credit-card";
    }
  };

  const editItem = (id, products) => {
    editOrder(id, products);
    navigation.navigate("Order");
  };

  return (
    <View style={globalStyles.item}>
      <View style={globalStyles.flex}>
        <FontAwesome5
          name={iconName()}
          size={20}
          color={colors.grayDark}
          light
          style={globalStyles.icon}
        />
        <View>
          <Text style={globalStyles.title_2}>${order.amount}</Text>
          <Text style={globalStyles.fontSmall}>{order.date}</Text>
        </View>
      </View>
      <View>
        {order.products && order.products.length > 0 ? (
          order.products.map((product, index) => (
            <Text style={globalStyles.fontSmall} key={index}>
              {product.quantity} x {product.label}
            </Text>
          ))
        ) : (
          <Text>Orden sin productos</Text>
        )}
      </View>
      {edition && (
        <View style={globalStyles.flex}>
          <Pressable style={globalStyles.flex} onPress={() => editItem(order)}>
            <FontAwesome5 name="edit" size={20} color={colors.mainColor} />
          </Pressable>
          <Pressable
            style={globalStyles.flex}
            onPress={() => {
              remove(order.id);
            }}
          >
            <FontAwesome5 name="trash-alt" size={20} color={colors.mainColor} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
