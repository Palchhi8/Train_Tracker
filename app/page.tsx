import SearchBar from "@/components/SearchBar";
import SmartGlance from "@/components/SmartGlance";
import RecentSearches from "@/components/RecentSearches";
import { Star, History } from "lucide-react";

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

      {/* Smart Section (Next Train) */}
      <div style={{ marginTop: "40px" }}>
        <SmartGlance />
      </div>

      {/* Quick Actions / History */}
      <RecentSearches />

      {/* Footer Info */}
      <div style={{ marginTop: "48px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "var(--card-border)" }}>
          Train Tracker v1.0 • Built for Performance
        </p>
      </div>
    </div>
  );
}
