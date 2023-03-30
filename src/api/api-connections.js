import { API_HOST } from "../utils/constants";
export async function getData(endpoint, token) {
  console.log(token);
  try {
    console.log("Loading...");
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credencials": "false",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers":
          "Origin,OPTIONS,X-Requested-With,Content-type,Accept",
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function loginApi(authData) {
  try {
    const response = await fetch(API_HOST + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credencials": "false",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers":
          "Origin,OPTIONS,X-Requested-With,Content-type,Accept",
      },
      body: authData,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
