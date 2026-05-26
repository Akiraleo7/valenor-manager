export function Topbar() {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        padding: "20px 28px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* TEXTO */}
      <div>
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "4px",
            color: "#111827",
          }}
        >
          Olá, Admin 👋
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

      {/* AÇÕES */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar..."
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            outline: "none",
          }}
        />

        <button
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Novo
        </button>
      </div>
    </header>
  );
}