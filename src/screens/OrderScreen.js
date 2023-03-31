import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API_HOST } from "../utils/constants";
import { getData } from "../api/api-connections";
import { globalStyles } from "../utils/globalStyles";
import ProductList from "../components/ProductList";
import useAuth from "../hooks/useAuth";

export default function OrderScreen() {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const loadInfo = async () => {
    try {
      reponse = await getData(API_HOST + "/orders", auth);
      console.log(reponse);
      setProducts(reponse.data);
    } catch (error) {
      console.log("orders", error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await loadInfo();
    });
  }, [auth]);

  return (
    <ScrollView style={globalStyles.content}>
      <Pressable style={globalStyles.top_right}>
        <Text>B</Text>
      </Pressable>
      <ProductList products={products} />
    </ScrollView>
  );
}
