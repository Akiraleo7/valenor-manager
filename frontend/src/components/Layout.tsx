import type { ReactNode } from "react";
import { Topbar } from "./Topbar";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
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
          width: "260px",
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
            <button style={menuButtonStyle}>
              Dashboard
            </button>

            <button style={menuButtonStyle}>
              Estoque
            </button>

            <button style={menuButtonStyle}>
              Financeiro
            </button>

            <button style={menuButtonStyle}>
              Usuários
            </button>

            <button style={menuButtonStyle}>
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
  color: "#fff",
  padding: "14px",
  borderRadius: "8px",
  textAlign: "left" as const,
  cursor: "pointer",
  fontSize: "15px",
};