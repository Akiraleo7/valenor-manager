import type { ReactNode } from "react";
import { Topbar } from "./Topbar";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonStyle = (
    path: string
  ) => ({
    ...menuButtonStyle,

    backgroundColor:
      location.pathname === path
        ? "#4f46e5"
        : "transparent",

    color:
      location.pathname === path
        ? "#ffffff"
        : "#d1d5db",

    fontWeight:
      location.pathname === path
        ? "bold"
        : "normal",
  });

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          minWidth: "260px",
          backgroundColor: "#111827",
          color: "#fff",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* LOGO */}
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "40px",
            }}
          >
            ValenorManager
          </h1>

          {/* MENU */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <button
              style={getButtonStyle("/")}
              onClick={() => navigate("/")}
            >
              Dashboard
            </button>

            <button
              style={getButtonStyle("/estoque")}
              onClick={() => navigate("/estoque")}
            >
              Estoque
            </button>

            <button
              style={getButtonStyle("/vendas")}
              onClick={() => navigate("/vendas")}
            >
              Vendas
            </button>

            <button
              style={getButtonStyle("/usuarios")}
              onClick={() => navigate("/usuarios")}
            >
              Usuários
            </button>

            <button
              style={getButtonStyle("/relatorios")}
              onClick={() => 
                navigate("/relatorios")
              }
            >
              Relatórios
            </button>
          </nav>
        </div>

        {/* RODAPÉ */}
        <div
          style={{
            borderTop: "1px solid #374151",
            paddingTop: "16px",
            fontSize: "14px",
            color: "#9ca3af",
          }}
        >
          Admin Demo
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main
        style={{
          flex: 1,
          padding: "32px",
          overflowY: "auto",
        }}
      >
        <Topbar />

        {children}
      </main>
    </div>
  );
}

const menuButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#d1d5db",
  padding: "14px 16px",
  borderRadius: "12px",
  textAlign: "left" as const,
  cursor: "pointer",
  fontSize: "15px",
  transition: "0.2s",
};
