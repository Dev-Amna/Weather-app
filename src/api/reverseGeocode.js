// src/api/reverseGeocode.js
export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`
    );
    if (!res.ok) throw new Error("Failed to fetch location");
    const data = await res.json();
    return data.results && data.results.length > 0
      ? { name: data.results[0].name, country: data.results[0].country }
      : null;
  } catch (err) {
    console.error("Reverse geocode error:", err);
    return null;
  }
}
