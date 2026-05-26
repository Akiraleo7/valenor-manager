type Props = {
  title: string;
  value: string;
};

export function DashboardCard({ title, value }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <span
        style={{
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {title}
      </span>

      <strong
        style={{
          fontSize: "28px",
          color: "#111827",
        }}
      >
        {value}
      </strong>
    </div>
  );
}