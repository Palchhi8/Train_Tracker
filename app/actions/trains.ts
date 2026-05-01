"use server";

import prisma from "@/lib/prisma";
import { fetchRailwayData, mapApiToInternal } from "@/lib/api";

export async function getNextTrainForRoute(from: string, to: string) {
  try {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Try Live API first if key exists
    if (process.env.RAPIDAPI_KEY) {
      try {
        const today = new Date().toISOString().split('T')[0];
        const data = await fetchRailwayData("/api/v2/trainBetweenStations", { 
          fromStationCode: from.toUpperCase(), 
          toStationCode: to.toUpperCase(),
          dateOfJourney: today
        });
        const rawTrains = data?.data?.trains || data?.trains || data?.data || [];
        if (Array.isArray(rawTrains) && rawTrains.length > 0) {
          const apiTrains = rawTrains
            .map(mapApiToInternal)
            .filter((t: any) => t.departureTime > currentTime)
            .sort((a: any, b: any) => a.departureTime.localeCompare(b.departureTime));
          
          if (apiTrains.length > 0) return apiTrains[0];
        }
      } catch (e) { console.error("API Fetch failed for Smart Glance", e); }
    }

    // Fallback to local search
    const matchingTrains = await prisma.train.findMany({
      where: {
        AND: [
          { schedules: { some: { station: { code: from.toUpperCase() } } } },
          { schedules: { some: { station: { code: to.toUpperCase() } } } },
        ]
      },
      include: {
        schedules: {
          include: { station: true },
          orderBy: { sequence: 'asc' }
        }
      }
    });

    const validTrains = matchingTrains
      .filter(t => {
        const fromStop = t.schedules.find(s => s.station.code === from.toUpperCase());
        const toStop = t.schedules.find(s => s.station.code === to.toUpperCase());
        return fromStop && toStop && fromStop.sequence < toStop.sequence && (fromStop.departureTime || "") > currentTime;
      })
      .map(t => {
        const fromStop = t.schedules.find(s => s.station.code === from.toUpperCase());
        return {
          number: t.number,
          name: t.name,
          type: t.type,
          departureTime: fromStop?.departureTime,
          platform: fromStop?.platformNumber,
        };
      })
      .sort((a, b) => (a.departureTime || "").localeCompare(b.departureTime || ""));

    return validTrains[0] || null;
  } catch (error) {
    console.error("Failed to fetch next train", error);
    return null;
  }
}
