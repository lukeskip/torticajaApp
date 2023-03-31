import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../api/api-connections";
import OrderList from "../components/OrderList";
import OutcomeList from "../components/OutcomeList";
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";

export default function BranchScreen(props) {
  const { auth, branch } = useAuth();
  [incomes, setIncomes] = useState([]);
  [outcomes, setOutcomes] = useState([]);
  [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      await loadItems();
    })();
  }, [branch]);

  const loadItems = async () => {
    if (branch) {
      try {
        const response = await getData(API_HOST + "/branches/" + branch, auth);
        console.log(response.data.status);
        setOutcomes(response.data.outcomes);
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { navigation } = props;

  return (
    <ScrollView style={globalStyles.content}>
      {status && branch ? (
        <>
          <Text style={globalStyles.title_1}>Ventas hoy</Text>
          <OrderList />
          <Text style={globalStyles.title_1}>Gastos hoy</Text>
          <OutcomeList outcomes={outcomes} />
          <Pressable
            style={globalStyles.button}
            onPress={() => {
              console.log("ir a todos los datos");
            }}
          >
            <Text style={globalStyles.buttonText}>Ver todos los gastos</Text>
          </Pressable>
        </>
      ) : (
        <Text style={globalStyles.title_1}>No hay datos que mostrar</Text>
      )}
    </ScrollView>
  );
}
