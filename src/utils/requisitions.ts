import api from "../services/api";
import { getItem } from "./storage";
let token: string | null = "";

export async function loadCategories() {
  token = getItem("token");

  try {
    const response = await api.get("/categoria", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const orderedCategories = response.data.sort(
      (a: number, b: number) => a - b
    );

    return orderedCategories;
  } catch (error: any) {
    console.log(error.response);
  }
}

export async function loadTransactions() {
  token = getItem("token");

  try {
    const response = await api.get("/transacoes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response);
  }
}
