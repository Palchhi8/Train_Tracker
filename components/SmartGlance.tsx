"use client";

import { useEffect, useState } from "react";
import { Clock, Star, MapPin } from "lucide-react";
import { getNextTrainForRoute } from "@/app/actions/trains";

export default function SmartGlance() {
  const [pinned, setPinned] = useState<{ from: string; to: string } | null>(null);
  const [nextTrain, setNextTrain] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("pinned_route");
    if (saved) {
      const route = JSON.parse(saved);
      setPinned(route);
      fetchNextTrain(route.from, route.to);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchNextTrain = async (from: string, to: string) => {
    const train = await getNextTrainForRoute(from, to);
    setNextTrain(train);
    setLoading(false);
  };

  if (loading) return <div className="glass" style={{ height: "100px", animate: "pulse" }}></div>;

  if (!pinned) {
    return (
      <div className="glass" style={{ padding: "20px", textAlign: "center" }}>
        <Star size={24} color="var(--card-border)" style={{ marginBottom: "12px" }} />
        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          Pin a route from search results to see the next train here instantly.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px" }}>Smart Glance</h3>
        <span style={{ fontSize: "12px", color: "var(--accent-blue)" }}>Live Update</span>
      </div>

      <div className="glass" style={{ padding: "20px", display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ 
          background: "rgba(0, 163, 255, 0.1)", 
          padding: "12px", 
          borderRadius: "12px" 
        }}>
          <Clock size={24} color="var(--accent-blue)" />
        </div>
        
        {nextTrain ? (
          <>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "2px" }}>
                Next to {pinned.to}
              </p>
              <h4 style={{ fontSize: "18px" }}>
                {nextTrain.departureTime} <span style={{ fontSize: "14px", fontWeight: 400 }}>{nextTrain.type}</span>
              </h4>
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
                PF {nextTrain.platform || "?"}
              </div>
              <p style={{ fontSize: "12px", color: "var(--success)" }}>On Time</p>
            </div>
          </>
        ) : (
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>No more trains today for</p>
            <h4 style={{ fontSize: "16px" }}>{pinned.from} → {pinned.to}</h4>
          </div>
        )}
      </div>
    </div>
  );
}
