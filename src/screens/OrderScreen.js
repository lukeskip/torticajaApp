import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../utils/constants";
import { getData } from "../api/api-connections";
import useAuth from "../hooks/useAuth";

export default function OrderScreen() {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
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
    (async () => {
      await loadInfo();
    })();
  }, []);

  return (
    <View>
      <Text>OrderScreen</Text>
    </View>
  );
}
