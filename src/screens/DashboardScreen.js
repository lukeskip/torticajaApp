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
import { useFocusEffect } from "@react-navigation/native";

export default function DashboardScreen() {
  const { auth, role, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState(null);

  const onRefresh = React.useCallback(async () => {
    await loadItems().catch((error) => console.log(error));
    setRefreshing(false);
  }, []);

  const loadItems = async () => {
    try {
      response = await getData("/dashboard", auth);
      setSummary(response);
    } catch (error) {
      console.log(error);
    }
  };

  return role === "admin" ? (
    <ScrollView
      style={[globalStyles.content, { marginTop: 40 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={globalStyles.title}>Dashboard</Text>
      <Pressable>
        <Text style={globalStyles.title}>{role}</Text>
      </Pressable>
    </ScrollView>
  ) : (
    <BranchScreen summary={summary} />
  );
}
