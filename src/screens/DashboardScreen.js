import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../api/api-connections";
import BranchScreen from "./BranchScreen";
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function DashboardScreen() {
  const { auth, role, logout, setBranch } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [branches, setBranches] = useState([]);
  const navigation = useNavigation();

  const onRefresh = React.useCallback(async () => {
    await loadItems().catch((error) => console.log(error));
    setRefreshing(false);
  }, []);

  const loadItems = async () => {
    try {
      response = await getData("/dashboard", auth);
      console.log("response", response);
      setBranches(response.data.branches);
    } catch (error) {
      console.log(error);
    }
  };

  const goTo = (branchItem) => {
    setBranch(branchItem);
    navigation.navigate("Branch");
  };

  useEffect(() => {
    loadItems().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(branches);
  }, [branches]);

  return (
    <ScrollView
      style={[globalStyles.content, { marginTop: 40 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={globalStyles.title}>Dashboard</Text>

      {branches.map((branchItem) => (
        <Pressable
          style={globalStyles.button}
          onPress={() => {
            goTo(branchItem);
          }}
          key={branchItem.id}
        >
          <Text style={globalStyles.buttonText}>{branchItem.name}</Text>
        </Pressable>
      ))}
      <Pressable style={globalStyles.button} onPress={logout}>
        <Text style={globalStyles.buttonText}>Salir</Text>
      </Pressable>
    </ScrollView>
  );
}
