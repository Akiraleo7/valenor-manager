import { api } from "./api";

export async function getRelatorioGeral() {
  const response = await api.get("/dashboard/relatorio-geral");

  return response.data;
}