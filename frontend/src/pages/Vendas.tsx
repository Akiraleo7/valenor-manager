import { useState } from "react";

const vendasIniciais = [
  {
    id: "#001",
    cliente: "João Silva",
    valor: 350,
    data: "26/05/2026",
    status: "Concluída",
  },
  {
    id: "#002",
    cliente: "Maria Souza",
    valor: 120,
    data: "26/05/2026",
    status: "Pendente",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Concluída":
      return "#22c55e";
    case "Pendente":
      return "#f59e0b";
    case "Cancelada":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

export const Vendas = () => {
  const [vendas, setVendas] = useState(vendasIniciais);
  const [modalOpen, setModalOpen] = useState(false);
  const [cliente, setCliente] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [pesquisa, setPesquisa] = useState("");

  const salvarVenda = () => {
    if (!cliente || !valor) {
      alert("Preencha todos os campos.");
      return;
    }

    if (Number(valor) <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    const novaVenda = {
      id: `#${String(vendas.length + 1).padStart(3, "0")}`,
      cliente,
      valor: Number(valor),
      data: new Date().toLocaleDateString("pt-BR"),
      status,
    };

    setVendas([...vendas, novaVenda]);
    setCliente("");
    setValor("");
    setStatus("Pendente");
    setModalOpen(false);
  };

  const vendasFiltradas = vendas.filter(
    (venda) =>
      venda.cliente.toLowerCase().includes(pesquisa.toLowerCase()) ||
      venda.id.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Vendas</h1>
          <span style={subtitleStyle}>Gerencie as vendas do sistema</span>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
          }}
          style={primaryButtonStyle}
        >
          + Nova Venda
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Pesquisar venda..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#6366f1";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(99,102,241,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#d1d5db";
            e.currentTarget.style.boxShadow = "none";
          }}
          style={searchInputStyle}
        />
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={thStyle}>Venda</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Valor</th>
              <th style={thStyle}>Data</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {vendasFiltradas.map((venda, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #f3f4f6",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                  e.currentTarget.style.transform = "scale(1.005)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <td style={tdStyle}>{venda.id}</td>
                <td style={tdStyle}>{venda.cliente}</td>
                <td style={tdStyle}>
                  {venda.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td style={tdStyle}>{venda.data}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      backgroundColor: getStatusColor(venda.status),
                      color: "#ffffff",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {venda.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ marginBottom: "24px", color: "#111827" }}>
              Nova Venda
            </h2>

            <div style={formStyle}>
              <input
                placeholder="Cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "#6366f1";

                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99,102,241,0.15)";
                }}

                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "#d1d5db";

                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              />

              <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "#6366f1";

                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99,102,241,0.15)";
                }}

                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "#d1d5db";

                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={inputStyle}
              >
                <option>Pendente</option>
                <option>Concluída</option>
                <option>Cancelada</option>
              </select>
            </div>

            <div style={modalActionsStyle}>
              <button
                onClick={() => setModalOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
                style={cancelButtonStyle}
              >
                Cancelar
              </button>

              <button
                onClick={salvarVenda}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
                style={saveButtonStyle}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  gap: "16px",
  flexWrap: "wrap" as const,
};

const titleStyle = {
  color: "#111827",
  marginBottom: "6px",
};

const subtitleStyle = {
  color: "#6b7280",
  fontSize: "14px",
};

const primaryButtonStyle = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.2s ease",
};

const searchInputStyle = {
  width: "100%",
  maxWidth: "320px",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
};

const tableContainerStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  overflowX: "auto" as const,
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thStyle = {
  textAlign: "left" as const,
  padding: "14px",
  color: "#6b7280",
  fontSize: "14px",
};

const tdStyle = {
  padding: "16px 14px",
  color: "#111827",
};

const inputStyle = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const modalOverlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(15,23,42,0.45)",
  backdropFilter: "blur(4px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "32px",
  width: "100%",
  maxWidth: "500px",

  border: "1px solid #e5e7eb",

  boxShadow:
    "0 25px 60px rgba(0,0,0,0.15)",
};

const modalActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "28px",
};

const cancelButtonStyle = {
  backgroundColor: "#e5e7eb",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.2s ease",
};

const saveButtonStyle = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.2s ease",
};

export default Vendas;