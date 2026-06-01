export const Relatorios = () => {
  const dadosMensais = [
    {
      mes: "Janeiro",
      receita: "R$ 3.500,00",
    },
    {
      mes: "Fevereiro",
      receita: "R$ 4.200,00",
    },
    {
      mes: "Março",
      receita: "R$ 4.750,00",
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            color: "#111827",
            marginBottom: "6px",
          }}
        >
          Relatórios
        </h1>

        <span
          style={{
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Indicadores e métricas do sistema
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <Card
          titulo="Receita Total"
          valor="R$ 12.450,00"
        />

        <Card
          titulo="Total de Vendas"
          valor="156"
        />

        <Card
          titulo="Produtos em Estoque"
          valor="342"
        />

        <Card
          titulo="Usuários Ativos"
          valor="8"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={actionButtonStyle}
          onClick={() =>
            alert(
              "Exportação PDF em desenvolvimento."
            )
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px)";
          }}
        >
          Exportar PDF
        </button>

        <button
          style={actionButtonStyle}
          onClick={() =>
            alert(
              "Exportação Excel em desenvolvimento."
            )
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px)";
          }}
        >
          Exportar Excel
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Receita Mensal
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>
                Mês
              </th>

              <th style={thStyle}>
                Receita
              </th>
            </tr>
          </thead>

          <tbody>
            {dadosMensais.map(
              (item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      "1px solid #f3f4f6",
                    transition:
                      "all 0.2s ease",
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
                    {item.mes}
                  </td>

                  <td style={tdStyle}>
                    {item.receita}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({
  titulo,
  valor,
}: {
  titulo: string;
  valor: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-4px)";

        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";

        e.currentTarget.style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      <p
        style={{
          color: "#6b7280",
          marginBottom: "8px",
        }}
      >
        {titulo}
      </p>

      <h2
        style={{
          color: "#111827",
        }}
      >
        {valor}
      </h2>
    </div>
  );
};

const thStyle = {
  textAlign: "left" as const,
  padding: "14px",
  color: "#6b7280",
};

const tdStyle = {
  padding: "16px 14px",
  color: "#111827",
};

const actionButtonStyle = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.2s ease",
};

export default Relatorios;