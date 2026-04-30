"use client";

import { useState, useEffect } from "react";

export type SearchEntry = {
  type: "route" | "number";
  from?: string;
  to?: string;
  trainNumber?: string;
  timestamp: number;
};

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("train_search_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const addSearch = (entry: Omit<SearchEntry, "timestamp">) => {
    const newEntry: SearchEntry = { ...entry, timestamp: Date.now() };
    
    setHistory((prev) => {
      // Remove existing duplicate if any
      const filtered = prev.filter((item) => {
        if (item.type !== entry.type) return true;
        if (entry.type === "route") {
          return item.from !== entry.from || item.to !== entry.to;
        }
        return item.trainNumber !== entry.trainNumber;
      });

      const updated = [newEntry, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem("train_search_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("train_search_history");
    setHistory([]);
  };

  return { history, addSearch, clearHistory };
}
