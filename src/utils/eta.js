export function calculateETA(bus) {
  const { stops, currentStopIndex, currentLocation, speed } = bus;

  if (!stops || !speed) return [];

  let etaMinutes = 0;
  const result = [];

  for (let i = currentStopIndex; i < stops.length; i++) {
    const [lat1, lng1] =
      i === currentStopIndex
        ? currentLocation
        : stops[i - 1].coordinates;

    const [lat2, lng2] = stops[i].coordinates;

    const distanceKm = haversine(lat1, lng1, lat2, lng2);
    const timeMin = (distanceKm / speed) * 60;

    etaMinutes += timeMin;

    result.push({
      name: stops[i].name,
      eta: i === currentStopIndex
        ? "Arriving"
        : `${Math.round(etaMinutes)} min`
    });
  }

  return result;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const toRad = v => (v * Math.PI) / 180;
