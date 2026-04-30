import prisma from "@/lib/prisma";
import { ArrowLeft, Train, MapPin, Info, ArrowUpCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TrainDetailPageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function TrainDetailPage({ params }: TrainDetailPageProps) {
  const { number } = await params;

  const train = await prisma.train.findUnique({
    where: { number },
    include: {
      schedules: {
        include: { station: true },
        orderBy: { sequence: 'asc' }
      }
    }
  });

  if (!train) {
    notFound();
  }

  return (
    <div style={{ paddingBottom: "60px" }}>
      {/* Header */}
      <div style={{ marginTop: "32px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/results" className="btn btn-secondary" style={{ padding: "10px", borderRadius: "50%" }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
             <h2 style={{ fontSize: "24px", fontWeight: 700 }}>#{train.number}</h2>
             <span className="glass" style={{ padding: "2px 8px", fontSize: "10px", fontWeight: 700, color: "var(--accent-orange)" }}>
               {train.type}
             </span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{train.name}</p>
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div style={{ position: "relative", paddingLeft: "24px" }}>
        {/* The Vertical Line */}
        <div style={{ 
          position: "absolute", 
          left: "31px", 
          top: "10px", 
          bottom: "10px", 
          width: "2px", 
          background: "linear-gradient(to bottom, var(--accent-orange), var(--accent-blue))",
          opacity: 0.3,
          zIndex: 0
        }}></div>

        {/* Stops */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {train.schedules.map((stop, index) => (
            <div key={stop.id} style={{ position: "relative", display: "flex", gap: "24px", alignItems: "flex-start" }}>
              {/* Timeline Dot */}
              <div style={{ 
                width: "16px", 
                height: "16px", 
                borderRadius: "50%", 
                background: index === 0 ? "var(--accent-orange)" : "var(--background)",
                border: `3px solid ${index === 0 ? "var(--accent-orange)" : "var(--card-border)"}`,
                marginTop: "6px",
                zIndex: 1,
                boxShadow: index === 0 ? "0 0 10px var(--accent-orange)" : "none"
              }}></div>

              {/* Stop Content */}
              <div className="glass" style={{ flex: 1, padding: "16px", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: 600 }}>{stop.station.name}</h3>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{stop.station.code}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "16px", fontWeight: 700 }}>{stop.departureTime || stop.arrivalTime}</p>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                      {stop.sequence === 1 ? "Origin" : index === train.schedules.length - 1 ? "Terminal" : "Stop"}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--card-border)", paddingTop: "12px", marginTop: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 600 }}>EXIT GUIDE</div>
                    <div style={{ 
                      fontSize: "11px", 
                      padding: "2px 8px", 
                      background: "rgba(255,255,255,0.05)", 
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      <ArrowUpCircle size={12} color="var(--accent-blue)" />
                      {index % 2 === 0 ? "Front" : "Middle"}
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>PLATFORM</span>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent-orange)" }}>{stop.platformNumber || "?"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
