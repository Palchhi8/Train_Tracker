"use client";

import { useSearchHistory } from "@/hooks/useSearchHistory";
import { History, MapPin, Train as TrainIcon, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RecentSearches() {
  const { history } = useSearchHistory();

  if (history.length === 0) return null;

  return (
    <div style={{ marginTop: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px" }}>Recent Searches</h3>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {history.map((entry, i) => (
          <Link 
            key={i} 
            href={entry.type === "route" 
              ? `/results?from=${entry.from}&to=${entry.to}` 
              : `/results?trainNumber=${entry.trainNumber}`}
          >
            <div className="glass train-card-hover" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
              {entry.type === "route" ? (
                <MapPin size={16} color="var(--accent-blue)" />
              ) : (
                <TrainIcon size={16} color="var(--accent-orange)" />
              )}
              
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>
                  {entry.type === "route" ? `${entry.from} → ${entry.to}` : `Train #${entry.trainNumber}`}
                </p>
                <p style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                  {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              <ChevronRight size={14} color="var(--card-border)" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
