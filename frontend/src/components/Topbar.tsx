import {
  Search,
  Bell,
  UserCircle,
} from "lucide-react";

export function Topbar() {
  const nomeUsuario =
    localStorage.getItem("usuarioNome") ||
    "Usuário";

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        padding: "20px 28px",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "4px",
            color: "#111827",
            letterSpacing: "-0.5px",
          }}
        >
          Olá, {nomeUsuario}
        </h2>

        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Bem-vindo ao ValenorManager.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "0 14px",
          }}
        >
          <Search
            size={18}
            color="#64748b"
          />

          <input
            type="text"
            placeholder="Buscar..."
            style={{
              height: "44px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "14px",
            }}
          />
        </div>

        <button
          style={iconButtonStyle}
        >
          <Bell size={18} />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            borderRadius: "14px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e5e7eb",
          }}
        >
          <UserCircle
            size={24}
            color="#4f46e5"
          />

          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            {nomeUsuario}
          </span>
        </div>
      </div>
    </header>
  );
}

const iconButtonStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#4f46e5",
  transition: "all 0.2s ease",
};