export async function getData(endpoint) {
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
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
