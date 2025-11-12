export async function fetchCurrentWeather(query) {
    const params = new URLSearchParams(query); // { city } or { lat, lon }
    const res = await fetch(`/api/weather/current?${params.toString()}`);
    if (!res.ok) throw new Error((await res.json()).error || "Request failed");
    return res.json();
}
