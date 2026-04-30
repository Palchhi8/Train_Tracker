"use server";

import prisma from "@/lib/prisma";

export async function getNextTrainForRoute(from: string, to: string) {
  try {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

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
