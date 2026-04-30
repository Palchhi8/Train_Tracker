"use client";

import SearchBar from "@/components/SearchBar";
import SmartGlance from "@/components/SmartGlance";
import RecentSearches from "@/components/RecentSearches";
import { LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginTop: "24px" 
      }}>
        <div style={{ 
          background: "var(--card-border)", 
          width: "40px", 
          height: "40px", 
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <User size={20} color="var(--text-muted)" />
        </div>
        <button 
          onClick={handleSignOut}
          style={{ 
            background: "transparent", 
            border: "none", 
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      {/* Hero Section */}
      <header style={{ marginTop: "24px", marginBottom: "32px" }}>
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
