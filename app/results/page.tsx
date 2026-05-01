import prisma from "@/lib/prisma";
import TrainCard from "@/components/TrainCard";
import { ArrowLeft, MapPin, Globe } from "lucide-react";
import Link from "next/link";
import { fetchRailwayData, mapApiToInternal } from "@/lib/api";

interface ResultsPageProps {
  searchParams: Promise<{
    from?: string;
    to?: string;
    trainNumber?: string;
  }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { from, to, trainNumber } = await searchParams;
  const hasApiKey = !!process.env.RAPIDAPI_KEY;

  let trains: any[] = [];
  let isLiveData = false;

  if (trainNumber) {
    if (hasApiKey) {
      try {
        const data = await fetchRailwayData("/api/v1/getTrainSchedule", { trainNo: trainNumber });
        const trainData = data?.data || data;
        if (trainData) {
          trains = [mapApiToInternal(trainData)];
          isLiveData = true;
        }
      } catch (e) { console.error(e); }
    }

    if (trains.length === 0) {
      const train = await prisma.train.findUnique({
        where: { number: trainNumber },
        include: { schedules: { include: { station: true }, orderBy: { sequence: 'asc' } } }
      });
      if (train) {
        trains = [{
          number: train.number,
          name: train.name,
          type: train.type,
          departureTime: train.schedules[0]?.departureTime,
          platform: train.schedules[0]?.platformNumber,
        }];
      }
    }
  } else if (from && to) {
    if (hasApiKey) {
      try {
        const today = new Date().toISOString().split('T')[0];
        const data = await fetchRailwayData("/api/v2/trainBetweenStations", { 
          fromStationCode: from.toUpperCase(), 
          toStationCode: to.toUpperCase(),
          dateOfJourney: today 
        });
        const rawTrains = data?.data?.trains || data?.trains || data?.data || [];
        if (Array.isArray(rawTrains) && rawTrains.length > 0) {
          trains = rawTrains.map(mapApiToInternal);
          isLiveData = true;
        }
      } catch (e) { console.error("Live fetch failed", e); }
    }

    if (trains.length === 0) {
      const matchingTrains = await prisma.train.findMany({
        where: {
          AND: [
            { schedules: { some: { station: { code: from.toUpperCase() } } } },
            { schedules: { some: { station: { code: to.toUpperCase() } } } },
          ]
        },
        include: {
          schedules: { include: { station: true } }
        }
      });

      trains = matchingTrains
        .filter(t => {
          const fromStop = t.schedules.find(s => s.station.code === from.toUpperCase());
          const toStop = t.schedules.find(s => s.station.code === to.toUpperCase());
          return fromStop && toStop && fromStop.sequence < toStop.sequence;
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
        });
    }
  }

  return (
    <div style={{ paddingBottom: "40px" }}>
      <div style={{ marginTop: "32px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/" className="btn btn-secondary" style={{ padding: "10px", borderRadius: "50%" }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 style={{ fontSize: "20px" }}>
            {from && to ? `${from.toUpperCase()} to ${to.toUpperCase()}` : "Train Search"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {trains.length} trains found
            </p>
            {isLiveData && (
              <div style={{ 
                display: "flex", alignItems: "center", gap: "4px", color: "var(--success)", fontSize: "10px", fontWeight: 700,
                background: "rgba(0, 200, 0, 0.1)", padding: "2px 6px", borderRadius: "4px"
              }}>
                <Globe size={10} /> LIVE
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        {trains.length > 0 ? (
          trains.map((train, i) => (
            <TrainCard key={i} train={train} />
          ))
        ) : (
          <div className="glass" style={{ padding: "40px", textAlign: "center", marginTop: "40px" }}>
            <MapPin size={48} color="var(--card-border)" style={{ marginBottom: "16px" }} />
            <h3 style={{ marginBottom: "8px" }}>No Trains Found</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              Try searching with station codes (e.g., JP to SWM) or check the train number.
            </p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: "24px" }}>
              Back to Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
