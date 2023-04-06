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
import * as Animatable from "react-native-animatable";
import { getData } from "../api/api-connections";
import ProductFormModal from "../components/ProductFormModal";

export default function ProductScreen() {
  const { auth, orderProducts, isOpen, setIsOpen } = useAuth();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const navigation = useNavigation();
  handleViewRef = (ref) => (view = ref);

  bounce = () =>
    view
      .bounce(800)
      .then((endState) =>
        console.log(endState.finished ? "bounce finished" : "bounce cancelled")
      );
  const loadInfo = async () => {
    try {
      reponse = await getData(API_HOST + "/orders", auth);
      setProducts(reponse.data);
      setFilteredProducts(reponse.data);
    } catch (error) {
      console.log("orders", error);
    }
  };

  const getBack = () => {
    console.log("getting back");
    orderProducts.length === 0
      ? navigation.navigate("Home")
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
        <Pressable
          onPress={() =>
            // navigation.navigate("Home")
            bounce()
          }
        >
          <Text>
            <FontAwesome5 name="arrow-circle-left" size={20} color="white" />
          </Text>
        </Pressable>
        <Pressable style={globalStyles.flex} onPress={getBack}>
          <Animatable.Text
            ref={handleViewRef}
            style={[
              globalStyles.flexItem,
              globalStyles.title_2,
              { color: "white" },
            ]}
          >
            Listo
          </Animatable.Text>
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
          <Pressable style={globalStyles.transparentButton}>
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
