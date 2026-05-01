export const RAILWAY_API_HOST = "irctc1.p.rapidapi.com";

export async function fetchRailwayData(endpoint: string, params: Record<string, string>) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`https://${RAILWAY_API_HOST}${cleanEndpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": RAILWAY_API_HOST,
    },
    next: { revalidate: 60 } // Reduced cache for more real-time feel
  });

  if (!response.ok) {
    console.warn(`Railway API info: ${response.status} ${response.statusText}`);
    return null;
  }

  return response.json();
}

export function mapApiToInternal(apiTrain: any) {
  // Handles different IRCTC API response formats
  return {
    number: apiTrain.train_number || apiTrain.trainNumber || apiTrain.number,
    name: apiTrain.train_name || apiTrain.trainName || apiTrain.name,
    type: apiTrain.train_type || apiTrain.type || "Express",
    departureTime: apiTrain.from_sta || apiTrain.departureTime || "00:00",
    platform: apiTrain.platform_number || apiTrain.platform || "1",
    status: "On Time"
  };
}
