export function RecentActivity() {
  const activities = [
    {
      titulo: "Venda registrada",
      descricao: "Pedido #1024 realizado",
      valor: "+ R$ 150,00",
    },
    {
      titulo: "Produto adicionado",
      descricao: "Novo item no estoque",
      valor: "+ 12 unidades",
    },
    {
      titulo: "Usuário criado",
      descricao: "Novo administrador cadastrado",
      valor: "Admin",
    },
  ];

  return (
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
          marginBottom: "24px",
          color: "#111827",
        }}
      >
        Movimentações Recentes
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {activities.map((activity, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "14px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div>
              <strong
                style={{
                  display: "block",
                  color: "#111827",
                }}
              >
                {activity.titulo}
              </strong>

              <span
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                {activity.descricao}
              </span>
            </div>

            <strong
              style={{
                color: "#4f46e5",
              }}
            >
              {activity.valor}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}