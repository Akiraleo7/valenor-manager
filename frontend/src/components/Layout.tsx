import type { ReactNode } from "react";
import { Topbar } from "./Topbar";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
} from "lucide-react";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonStyle = (
    path: string
  ) => {
    const isActive =
      location.pathname === path;

    return {
      ...menuButtonStyle,

      background: isActive
        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
        : "transparent",

      color: isActive
        ? "#ffffff"
        : "#cbd5e1",

      fontWeight: isActive
        ? "700"
        : "500",

      boxShadow: isActive
        ? "0 10px 24px rgba(99,102,241,0.28)"
        : "none",
    };
  };

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
          minWidth: "270px",
          background:
            "linear-gradient(180deg, #0f172a 0%, #111827 55%, #020617 100%)",
          color: "#fff",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "8px 0 30px rgba(15,23,42,0.16)",
        }}
      >
        <div>
          {/* LOGO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "18px",
                color: "#ffffff",
                boxShadow:
                  "0 12px 28px rgba(99,102,241,0.35)",
              }}
            >
              V
            </div>

            <div>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  letterSpacing: "-0.6px",
                  margin: 0,
                  color: "#ffffff",
                }}
              >
                Valenor
              </h1>

              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                Manager
              </span>
            </div>
          </div>

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
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateX(4px)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateX(0)";
              }}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              style={getButtonStyle("/estoque")}
              onClick={() => navigate("/estoque")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateX(4px)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateX(0)";
              }}
            >
              <Package size={18} />
              Estoque
            </button>

            <button
              style={getButtonStyle("/vendas")}
              onClick={() => navigate("/vendas")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateX(4px)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateX(0)";
              }}
            >
              <ShoppingCart size={18} />
              Vendas
            </button>

            <button
              style={getButtonStyle("/usuarios")}
              onClick={() => navigate("/usuarios")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateX(4px)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateX(0)";
              }}
            >
              <Users size={18} />
              Usuários
            </button>

            <button
              style={getButtonStyle("/relatorios")}
              onClick={() =>
                navigate("/relatorios")
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateX(4px)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateX(0)";
              }}
            >
              <FileText size={18} />
              Relatórios
            </button>
          </nav>
        </div>

        {/* RODAPÉ */}
        {/* RODAPÉ */}
        <div
          style={{
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            paddingTop: "18px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#e2e8f0",
              marginBottom: "4px",
            }}
          >
            Leonardo Akira
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            Administrador
          </div>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main
        style={{
          flex: 1,
          padding: "32px",
          overflowY: "auto",

          background:
            "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
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

  color: "#cbd5e1",

  padding: "14px 16px",

  borderRadius: "14px",

  textAlign: "left" as const,

  cursor: "pointer",

  fontSize: "15px",

  display: "flex",

  alignItems: "center",

  gap: "12px",

  width: "100%",

  transition: "all 0.25s ease",
};
