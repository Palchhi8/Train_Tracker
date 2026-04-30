"use client";

import { useState } from "react";
import { Search, Train, MapPin, ArrowRightLeft } from "lucide-react";

export default function SearchBar() {
  const [mode, setMode] = useState<"route" | "number">("route");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trainNumber, setTrainNumber] = useState("");

  return (
    <div className="glass" style={{ padding: "24px", marginTop: "20px" }}>
      {/* Tabs */}
      <div style={{ 
        display: "flex", 
        gap: "8px", 
        marginBottom: "24px",
        background: "rgba(255,255,255,0.05)",
        padding: "4px",
        borderRadius: "12px"
      }}>
        <button 
          onClick={() => setMode("route")}
          className="btn"
          style={{ 
            flex: 1, 
            background: mode === "route" ? "rgba(255,255,255,0.1)" : "transparent",
            fontSize: "14px",
            padding: "8px"
          }}
        >
          <MapPin size={16} style={{ marginRight: "8px" }} />
          By Route
        </button>
        <button 
          onClick={() => setMode("number")}
          className="btn"
          style={{ 
            flex: 1, 
            background: mode === "number" ? "rgba(255,255,255,0.1)" : "transparent",
            fontSize: "14px",
            padding: "8px"
          }}
        >
          <Train size={16} style={{ marginRight: "8px" }} />
          By Train #
        </button>
      </div>

      {/* Form */}
      {mode === "route" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <input 
              type="text" 
              className="input" 
              placeholder="From Station" 
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "-10px 0" }}>
            <div style={{ 
              background: "var(--background)", 
              padding: "4px", 
              borderRadius: "50%",
              border: "1px solid var(--card-border)",
              zIndex: 1
            }}>
              <ArrowRightLeft size={16} color="var(--accent-blue)" />
            </div>
          </div>
          <input 
            type="text" 
            className="input" 
            placeholder="To Station" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      ) : (
        <input 
          type="text" 
          className="input" 
          placeholder="Enter Train Number (e.g. 12345)" 
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
        />
      )}

      <button className="btn btn-primary" style={{ width: "100%", marginTop: "20px", gap: "8px" }}>
        <Search size={18} />
        Find Trains
      </button>
    </div>
  );
}
