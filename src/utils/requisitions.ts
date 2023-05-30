import api from "src/services/api";
import { getItem } from "src/utils/storage";

export async function loadCategories() {
  let token = "";

  token = getItem("token");

  try {
    const response = await api.get("/categoria", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const orderedCategories = response.data.sort((a, b) => a - b);

    return orderedCategories;
  } catch (error) {
    console.log(error.response);
  }
}

export async function loadTransactions() {
  let token = "";

  token = getItem("token");

  try {
    const response = await api.get("/transacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}
