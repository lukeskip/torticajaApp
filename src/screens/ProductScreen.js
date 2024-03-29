import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Button,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import ProductList from "../components/ProductList";
import { globalStyles } from "../utils/globalStyles";
import { colors, API_HOST } from "../utils/constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { getData } from "../api/api-connections";
import ProductFormModal from "../components/ProductFormModal";

export default function ProductScreen() {
  const { auth, logout, orderProducts, isOpen, setIsOpen } = useAuth();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const navigation = useNavigation();

  const loadInfo = async () => {
    try {
      const response = await getData("/orders-create", auth);

      if (response.status == 401) {
        logout();
      } else {
        setProducts(response.data);
        setFilteredProducts(response.data);
      }
    } catch (error) {
      console.log("🚀 ~ file: ProductScreen.js:43 ~ loadInfo ~ error:", error);
    }
  };

  const getBack = () => {
    console.log("getting back");
    orderProducts.length === 0
      ? navigation.navigate("Branch")
      : navigation.navigate("Order");
  };

  const filterProducts = (text) => {
    const newProducts = products.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(newProducts);
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await loadInfo();
    });
  }, [auth]);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      setFilteredProducts(products);
    });
  }, [filteredProducts]);

  return (
    <>
      <View style={globalStyles.header}>
        <Pressable onPress={() => navigation.navigate("Branch")}>
          <Text>
            <FontAwesome5 name="arrow-circle-left" size={20} color="white" />
          </Text>
        </Pressable>
        <Pressable style={globalStyles.flex} onPress={getBack}>
          <Text
            style={[
              globalStyles.flexItem,
              globalStyles.title_2,
              { color: "white" },
            ]}
          >
            Listo
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
          onChangeText={(text) => {
            filterProducts(text);
          }}
        />
        <View style={[globalStyles.flexItem]}>
          <Pressable
            style={globalStyles.transparentButton}
            onPress={() => navigation.navigate("scan")}
          >
            <FontAwesome5 name="barcode" color={colors.darkGray} size={20} />
          </Pressable>
        </View>
      </View>
      {filteredProducts ? (
        <ScrollView style={[globalStyles.content, { height: 100 }]}>
          <ProductList products={filteredProducts} edit={true} />
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" style={styles.spinner} color="black" />
      )}

      <ProductFormModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
