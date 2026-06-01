import { useEffect, useState } from "react";
import { DashboardCard } from "../components/DashboardCard";
import { RecentActivity } from "../components/RecentActivity";
import { getRelatorioGeral } from "../services/dashboardService";
import { SalesChart } from "../components/SalesChart";
import { useNavigate } from "react-router-dom";

type Relatorio = {
    totalProdutos: number;
    totalUsuarios: number;
    totalVendas: number;
    receitaTotal: number;
};

export function Home() {
    const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
    const navigate = useNavigate();

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
            {/* CARDS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "32px",
                }}
            >
                <DashboardCard
                    title="Receita Total"
                    value={
                        (relatorio?.receitaTotal ?? 0).toLocaleString(
                            "pt-BR",
                            {
                                style: "currency",
                                currency: "BRL",
                            }
                        )
                    }
                />

                <DashboardCard
                    title="Produtos"
                    value={`${relatorio?.totalProdutos ?? 0}`}
                    onClick={() => navigate("/estoque")}
                />

                <DashboardCard
                    title="Usuários"
                    value={`${relatorio?.totalUsuarios ?? 0}`}
                    onClick={() => navigate("/usuarios")}
                />

                <DashboardCard
                    title="Vendas"
                    value={`${relatorio?.totalVendas ?? 0}`}
                    onClick={() => navigate("/vendas")}
                />
            </div>

            {/* GRID INFERIOR */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                }}
            >
                {/* MOVIMENTAÇÕES */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <SalesChart />

                    <RecentActivity />
                </div>

                {/* ALERTAS */}
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        padding: "24px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    <h3
                        style={{
                            marginBottom: "20px",
                            color: "#111827",
                        }}
                    >
                        Alertas do Sistema
                    </h3>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <div
                            style={{
                                padding: "14px",
                                backgroundColor: "#fef3c7",
                                borderRadius: "10px",
                                color: "#92400e",
                            }}
                        >
                            Estoque baixo detectado
                        </div>

                        <div
                            style={{
                                padding: "14px",
                                backgroundColor: "#dbeafe",
                                borderRadius: "10px",
                                color: "#1e40af",
                            }}
                        >
                            Nova venda registrada
                        </div>

                        <div
                            style={{
                                padding: "14px",
                                backgroundColor: "#dcfce7",
                                borderRadius: "10px",
                                color: "#166534",
                            }}
                        >
                            Sistema operacional
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}