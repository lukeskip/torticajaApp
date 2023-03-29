import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../api/api-connections";
import IncomeList from "../components/IncomeList";
import OutcomeList from "../components/OutcomeList";
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";

export default function DashboardScreen(props) {
  [incomes, setIncomes] = useState([]);
  [outcomes, setOutcomes] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      await loadItems();
    })();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getData(API_HOST + "/dashboard", auth);
      setIncomes(response.data.incomes);
      setOutcomes(response.data.outcomes);
    } catch (error) {
      console.log(error);
    }
  };
  const { navigation } = props;

  return (
    <ScrollView style={globalStyles.content}>
      <Text style={globalStyles.title_1}>Ventas</Text>
      <IncomeList incomes={incomes} />
      <Text style={globalStyles.title_1}>Gastos</Text>
      <OutcomeList outcomes={outcomes} />
    </ScrollView>
  );
}
