import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../api/api-connections";
import IncomeList from "../components/IncomeList";
import OutcomeList from "../components/OutcomeList";
import { API_HOST } from "../utils/constants";
import { globalStyles } from "../utils/globalStyles";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function BranchScreen(props) {
  const { auth, branch, logout } = useAuth();
  [incomes, setIncomes] = useState([]);
  [outcomes, setOutcomes] = useState([]);
  [orders, setOrders] = useState([]);
  [status, setStatus] = useState(false);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await loadItems().catch((error) => console.log(error));
      })();
    }, [branch])
  );

  const loadItems = async () => {
    if (branch) {
      try {
        const response = await getData("/branches/" + branch, auth);

        console.log("load data", response);
        setOutcomes(response.outcomes);
        setIncomes(response.incomes);
        setOrders(response.orders);
        setStatus(response.status);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { navigation } = props;

  return (
    <ScrollView style={[globalStyles.content, { marginTop: 40 }]}>
      {branch ? (
        <>
          <Text style={globalStyles.title_1}>Ventas hoy</Text>
          <IncomeList incomes={incomes} />
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
      <Pressable style={globalStyles.button} onPress={logout}>
        <Text style={globalStyles.buttonText}>Salir</Text>
      </Pressable>
    </ScrollView>
  );
}
