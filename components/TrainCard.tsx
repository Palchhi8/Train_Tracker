import Link from "next/link";

interface TrainCardProps {
  train: {
    number: string;
    name: string;
    type: string;
    arrivalTime?: string;
    departureTime?: string;
    platform?: string;
    status?: string;
  };
}

export default function TrainCard({ train }: TrainCardProps) {
  return (
    <Link href={`/train/${train.number}`} style={{ display: "block", textDecoration: "none" }}>
      <div className="glass train-card-hover" style={{ 
        padding: "20px", 
        marginBottom: "16px", 
        display: "flex", 
        alignItems: "center", 
        gap: "20px",
        cursor: "pointer",
        transition: "var(--transition)"
      }}>
      {/* Time Column */}
      <div style={{ textAlign: "center", minWidth: "60px" }}>
        <h4 style={{ fontSize: "20px", fontWeight: 700 }}>{train.departureTime || "--:--"}</h4>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Departs</p>
      </div>

      {/* Main Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{ 
            fontSize: "10px", 
            fontWeight: 700, 
            background: train.type === "FAST" ? "var(--accent-orange)" : "var(--card-border)",
            padding: "2px 6px",
            borderRadius: "4px",
            color: "white"
          }}>
            {train.type}
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>#{train.number}</span>
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 600 }}>{train.name}</h3>
      </div>

      {/* Platform & Action */}
      <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "16px" }}>
        <div>
          <div style={{ 
            fontSize: "12px", 
            fontWeight: 600, 
            color: "var(--accent-blue)",
            marginBottom: "2px"
          }}>
            PLATFORM
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-orange)" }}>
            {train.platform || "?"}
          </div>
        </div>
        <ChevronRight size={20} color="var(--card-border)" />
      </div>
      </div>
    </Link>
  );
}
