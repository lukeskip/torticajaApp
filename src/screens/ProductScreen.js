import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ProductList from "../components/ProductList";
import { globalStyles } from "../utils/globalStyles";
import { colors, API_HOST } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getData } from "../api/api-connections";

export default function ProductScreen() {
  const { auth, orderProducts } = useAuth();
  const [products, setProducts] = useState(null);
  const navigation = useNavigation();

  const loadInfo = async () => {
    try {
      reponse = await getData(API_HOST + "/orders", auth);
      setProducts(reponse.data);
    } catch (error) {
      console.log("orders", error);
    }
  };

  const getBack = () => {
    console.log("getting back");
    !orderProducts ? navigation.navigate("home") : navigation.navigate("sale");
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await loadInfo();
    });
  }, [auth]);

  return (
    <>
      <View style={globalStyles.header}>
        <Pressable style={globalStyles.flex} onPress={getBack}>
          <FontAwesome5 name="arrow-circle-left" size={20} color="white" />
          <Text
            style={[
              globalStyles.flexItem,
              globalStyles.title_2,
              { color: "white" },
            ]}
          >
            Regresar
          </Text>
        </Pressable>
      </View>
      <View
        style={[
          globalStyles.flex,
          globalStyles.content,
          { justifyContent: "space-between", marginTop: 30 },
        ]}
      >
        <TextInput
          placeholder="Buscar"
          style={[globalStyles.textInput, { width: "70%" }]}
        />
        <View style={[globalStyles.flexItem]}>
          <Pressable style={globalStyles.transparentButton}>
            <FontAwesome5 name="barcode" color={colors.darkGray} size={20} />
          </Pressable>
        </View>
      </View>
      {products ? (
        <ScrollView style={[globalStyles.content, { height: 100 }]}>
          <ProductList products={products} />
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" style={styles.spinner} color="black" />
      )}
    </>
  );
}
