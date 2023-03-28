import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { API_HOST } from "../utils/constants";
import { getData } from "../api/api-connections";

export default function Branch(props) {
  useEffect(() => {
    (async () => {
      await loadInfo();
    })();
  }, []);

  const [branch, setBranch] = useState([]);

  const loadInfo = async () => {
    try {
      const response = await getData(API_HOST + "/branches/" + params.id);
      setBranch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    navigation,
    route: { params },
  } = props;

  return (
    <View>
      <Text>{branch.name}</Text>
    </View>
  );
}
