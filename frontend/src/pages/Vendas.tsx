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
  const [vendas, setVendas] =
    useState(vendasIniciais);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [cliente, setCliente] =
    useState("");

  const [valor, setValor] =
    useState("");

  const [status, setStatus] =
    useState("Pendente");

  const [pesquisa, setPesquisa] =
    useState("");

  const salvarVenda = () => {
    if (!cliente || !valor) {
      alert(
        "Preencha todos os campos."
      );

      return;
    }

    if (Number(valor) <= 0) {
      alert(
        "Informe um valor válido."
      );

      return;
    }

    const novaVenda = {
      id: `#${String(
        vendas.length + 1
      ).padStart(3, "0")}`,

      cliente,

      valor: Number(valor),

      data: new Date()
        .toLocaleDateString("pt-BR"),

      status,
    };

    setVendas([
      ...vendas,
      novaVenda,
    ]);

    setCliente("");
    setValor("");
    setStatus("Pendente");

    setModalOpen(false);
  };

  const vendasFiltradas =
    vendas.filter(
      (venda) =>
        venda.cliente
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          ) ||
        venda.id
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              color: "#111827",
              marginBottom: "6px",
            }}
          >
            Vendas
          </h1>

          <span
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Gerencie as vendas do sistema
          </span>
        </div>

        <button
          onClick={() =>
            setModalOpen(true)
          }
          style={{
            backgroundColor:
              "#4f46e5",
            color: "#ffffff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Nova Venda
        </button>
      </div>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar venda..."
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(
              e.target.value
            )
          }
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "12px 16px",
            borderRadius: "12px",
            border:
              "1px solid #d1d5db",
            outline: "none",
            fontSize: "14px",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor:
            "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  "1px solid #e5e7eb",
              }}
            >
              <th style={thStyle}>
                Venda
              </th>

              <th style={thStyle}>
                Cliente
              </th>

              <th style={thStyle}>
                Valor
              </th>

              <th style={thStyle}>
                Data
              </th>

              <th style={thStyle}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {vendasFiltradas.map(
              (venda, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      "1px solid #f3f4f6",
                  }}
                >
                  <td style={tdStyle}>
                    {venda.id}
                  </td>

                  <td style={tdStyle}>
                    {venda.cliente}
                  </td>

                  <td style={tdStyle}>
                    {venda.valor.toLocaleString(
                      "pt-BR",
                      {
                        style:
                          "currency",
                        currency:
                          "BRL",
                      }
                    )}
                  </td>

                  <td style={tdStyle}>
                    {venda.data}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        backgroundColor:
                          getStatusColor(
                            venda.status
                          ),

                        color:
                          "#ffffff",

                        padding:
                          "6px 12px",

                        borderRadius:
                          "999px",

                        fontSize:
                          "13px",

                        fontWeight:
                          "bold",
                      }}
                    >
                      {venda.status}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          style={modalOverlayStyle}
        >
          <div
            style={modalStyle}
          >
            <h2
              style={{
                marginBottom:
                  "24px",
                color: "#111827",
              }}
            >
              Nova Venda
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "16px",
              }}
            >
              <input
                placeholder="Cliente"
                value={cliente}
                onChange={(e) =>
                  setCliente(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) =>
                  setValor(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                style={inputStyle}
              >
                <option>
                  Pendente
                </option>

                <option>
                  Concluída
                </option>

                <option>
                  Cancelada
                </option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
                marginTop: "28px",
              }}
            >
              <button
                onClick={() =>
                  setModalOpen(
                    false
                  )
                }
                style={
                  cancelButtonStyle
                }
              >
                Cancelar
              </button>

              <button
                onClick={
                  salvarVenda
                }
                style={
                  saveButtonStyle
                }
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
};

const modalOverlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor:
    "rgba(0,0,0,0.5)",
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
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.2)",
};

const cancelButtonStyle = {
  backgroundColor: "#e5e7eb",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
};

const saveButtonStyle = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Vendas;