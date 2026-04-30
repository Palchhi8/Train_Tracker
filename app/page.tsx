import SearchBar from "@/components/SearchBar";
import { Clock, Star, History } from "lucide-react";

export default function Home() {
  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* Hero Section */}
      <header style={{ marginTop: "40px", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "8px" }}>
          Where to <span style={{ color: "var(--accent-orange)" }}>today?</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>
          Real-time intelligence for your daily commute.
        </p>
      </header>

      {/* Main Search Component */}
      <SearchBar />

      {/* Smart Sections */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "18px" }}>Smart Glance</h3>
          <span style={{ fontSize: "12px", color: "var(--accent-blue)" }}>Live Update</span>
        </div>

        {/* "Next Train" Smart Card */}
        <div className="glass" style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ 
            background: "rgba(0, 163, 255, 0.1)", 
            padding: "12px", 
            borderRadius: "12px" 
          }}>
            <Clock size={24} color="var(--accent-blue)" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "2px" }}>Next to Work</p>
            <h4 style={{ fontSize: "18px" }}>12:45 <span style={{ fontSize: "14px", fontWeight: 400 }}>Fast Local</span></h4>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ 
              background: "var(--accent-orange)", 
              padding: "4px 8px", 
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "4px"
            }}>
              PF 4
            </div>
            <p style={{ fontSize: "12px", color: "var(--success)" }}>On Time</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        marginTop: "32px", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "16px" 
      }}>
        <div className="glass" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <Star size={18} color="var(--accent-orange)" />
          <span style={{ fontSize: "14px" }}>Favorites</span>
        </div>
        <div className="glass" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <History size={18} color="var(--text-muted)" />
          <span style={{ fontSize: "14px" }}>Recents</span>
        </div>
      </div>
    </div>
  );
}
