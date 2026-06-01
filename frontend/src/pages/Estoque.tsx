import { useState } from "react";

const produtosIniciais = [
  {
    nome: "Notebook Dell",
    categoria: "Eletrônicos",
    estoque: 12,
    status: "Normal",
  },
  {
    nome: "Mouse Gamer",
    categoria: "Periféricos",
    estoque: 3,
    status: "Baixo",
  },
  {
    nome: "Teclado Mecânico",
    categoria: "Periféricos",
    estoque: 0,
    status: "Esgotado",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Normal":
      return "#22c55e";

    case "Baixo":
      return "#f59e0b";

    case "Esgotado":
      return "#ef4444";

    default:
      return "#6b7280";
  }
};

export const Estoque = () => {
  const [modalOpen, setModalOpen] =
    useState(false);

  const [produtos, setProdutos] =
    useState(produtosIniciais);

  const [nomeProduto,
    setNomeProduto] =
    useState("");

  const [quantidade,
    setQuantidade] =
    useState("");

  const [categoriaSelecionada,
    setCategoriaSelecionada] =
    useState("");

  const [novaCategoria,
    setNovaCategoria] =
    useState("");

  const categorias = [
    ...new Set(
      produtos.map(
        (produto) => produto.categoria
      )
    ),
  ];

  const salvarProduto = () => {
    const categoriaFinal =
      categoriaSelecionada === "nova"
        ? novaCategoria.trim()
        : categoriaSelecionada;

    const categoriaExiste =
      categorias.some(
        (categoria) =>
          categoria.trim().toLowerCase() ===
          categoriaFinal.toLowerCase()
      );

    if (
      !nomeProduto ||
      !categoriaFinal ||
      !quantidade
    ) {
      alert(
        "Preencha todos os campos."
      );

      return;
    }

    if (
      categoriaSelecionada === "nova" &&
      categoriaExiste
    ) {
      alert(
        "Essa categoria já existe."
      );

      return;
    }

    const novoProduto = {
      nome: nomeProduto,
      categoria: categoriaFinal,
      estoque: Number(
        quantidade
      ),
      status:
        Number(quantidade) > 5
          ? "Normal"
          : Number(quantidade) > 0
            ? "Baixo"
            : "Esgotado",
    };

    setProdutos([
      ...produtos,
      novoProduto,
    ]);

    setNomeProduto("");
    setQuantidade("");
    setNovaCategoria("");
    setCategoriaSelecionada("");

    setModalOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
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
            Controle de Estoque
          </h1>

          <span
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Gerencie os produtos do sistema
          </span>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px)";
          }}
          style={{
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",

            transition: "all 0.2s ease",
          }}
        >
          + Novo Produto
        </button>
      </div>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar produto..."
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "14px",
          }}
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
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <th style={thStyle}>Produto</th>
              <th style={thStyle}>Categoria</th>
              <th style={thStyle}>Estoque</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #f3f4f6",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#f8fafc";

                  e.currentTarget.style.transform =
                    "scale(1.005)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "transparent";

                  e.currentTarget.style.transform =
                    "scale(1)";
                }}
              >
                <td style={tdStyle}>
                  {produto.nome}
                </td>

                <td style={tdStyle}>
                  {produto.categoria}
                </td>

                <td style={tdStyle}>
                  {produto.estoque}
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      backgroundColor:
                        getStatusColor(produto.status),

                      color: "#ffffff",

                      padding: "6px 12px",

                      borderRadius: "999px",

                      fontSize: "13px",

                      fontWeight: "bold",
                    }}
                  >
                    {produto.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "32px",
            width: "100%",
            maxWidth: "500px",

            border: "1px solid #e5e7eb",

            boxShadow:
              "0 25px 60px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              width: "100%",
              maxWidth: "500px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                marginBottom: "24px",
                color: "#111827",
              }}
            >
              Novo Produto
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <input
                placeholder="Nome do produto"
                value={nomeProduto}
                onChange={(e) =>
                  setNomeProduto(
                    e.target.value
                  )
                }
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
                style={inputStyle}
                value={categoriaSelecionada}
                onChange={(e) =>
                  setCategoriaSelecionada(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Selecione uma categoria
                </option>

                {categorias.map(
                  (categoria, index) => (
                    <option
                      key={index}
                      value={categoria}
                    >
                      {categoria}
                    </option>
                  )
                )}

                <option value="nova">
                  + Nova Categoria
                </option>
              </select>

              {categoriaSelecionada === "nova" && (
                <input
                  placeholder="Digite a nova categoria"
                  value={novaCategoria}
                  onChange={(e) =>
                    setNovaCategoria(
                      e.target.value
                    )
                  }
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
              )}

              <input
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(
                    e.target.value
                  )
                }
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
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                marginTop: "28px",
              }}
            >
              <button
                onClick={() =>
                  setModalOpen(false)
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
                style={cancelButtonStyle}
              >
                Cancelar
              </button>

              <button
                onClick={salvarProduto}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
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

export default Estoque;

