import { useEffect, useState } from "react";
import { DashboardCard } from "../components/DashboardCard";
import { getRelatorioGeral } from "../services/dashboardService";

type Relatorio = {
  totalProdutos: number;
  totalUsuarios: number;
  totalVendas: number;
  receitaTotal: number;
};

export function Home() {
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const data = await getRelatorioGeral();

        setRelatorio(data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    }

    carregarDados();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <DashboardCard
          title="Receita Total"
          value={`R$ ${relatorio?.receitaTotal ?? 0}`}
        />

        <DashboardCard
          title="Produtos"
          value={`${relatorio?.totalProdutos ?? 0}`}
        />

        <DashboardCard
          title="Usuários"
          value={`${relatorio?.totalUsuarios ?? 0}`}
        />

        <DashboardCard
          title="Vendas"
          value={`${relatorio?.totalVendas ?? 0}`}
        />
      </div>
    </div>
  );
}