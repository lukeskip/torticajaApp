import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { globalStyles } from "../utils/globalStyles";
import { getData } from "../api/api-connections";
import useAuth from "../hooks/useAuth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function BarCodeScanScreen() {
  const { auth, branch } = useAuth();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const getBack = () => {
    console.log("getting back");
    orderProducts.length === 0
      ? navigation.navigate("Branch")
      : navigation.navigate("Order");
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, codeData }) => {
    setScanned(true);
    getData(`/product-search/${branch}/${codeData}`, auth)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    alert(`Scanned`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={globalStyles.barCodeContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Image
        style={globalStyles.targetImage}
        source={require("../assets/img/target.png")}
      />
      <View
        style={[
          {
            position: "absolute",
            bottom: 100,
            left: 0,
            width: "100%",
            paddingHorizontal: 20,
          },
        ]}
      >
        <Pressable
          style={[globalStyles.button]}
          onPress={() => navigation.navigate("sale")}
        >
          <Text style={globalStyles.buttonText}>
            <FontAwesome5 name="arrow-circle-left" size={20} color="white" />{" "}
            Regresar
          </Text>
        </Pressable>
      </View>
      {scanned && (
        <Pressable
          style={globalStyles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={globalStyles.buttonText}>Tap to Scan Again</Text>
        </Pressable>
      )}
    </View>
  );
}
