export const RAILWAY_API_HOST = "indian-railway-info.p.rapidapi.com";

export async function fetchRailwayData(endpoint: string, params: Record<string, string>) {
  const url = new URL(`https://${RAILWAY_API_HOST}/${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": RAILWAY_API_HOST,
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Railway API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Maps the external API response to our internal Train Tracker format
 */
export function mapApiToInternal(apiTrain: any) {
  return {
    number: apiTrain.train_number || apiTrain.number,
    name: apiTrain.train_name || apiTrain.name,
    type: apiTrain.type || "Express",
    departureTime: apiTrain.departure_time || "00:00",
    platform: apiTrain.platform || "1",
    status: "On Time"
  };
}
