type Props = {
  title: string;
  value: string;
  onClick?: () => void;
};

export function DashboardCard({
  title,
  value,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";

        e.currentTarget.style.boxShadow =
          "0 18px 35px rgba(79,70,229,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";

        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(79,70,229,0.25)";
      }}
      style={{
        background:
          "linear-gradient(135deg, #4f46e5, #6366f1)",

        borderRadius: "18px",

        padding: "24px",

        color: "#ffffff",

        boxShadow:
          "0 10px 25px rgba(79,70,229,0.25)",

        transition: "all 0.25s ease",

        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          opacity: 0.9,
          fontWeight: 500,
        }}
      >
        {title}
      </span>

      <div
        style={{
          marginTop: "18px",

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <strong
          style={{
            fontSize: "30px",
            fontWeight: 700,
          }}
        >
          {value}
        </strong>

        <div
          style={{
            width: "52px",

            height: "52px",

            borderRadius: "14px",

            backgroundColor:
              "rgba(255,255,255,0.15)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            fontSize: "22px",
          }}
        >
          📊
        </div>
      </div>
    </div>
  );
}