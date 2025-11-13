// client/src/services/api.js
const API_BASE =
    import.meta.env.MODE === "production"
        ? "https://<your-backend-name>.onrender.com" // Render backend URL
        : "/api"; // dev: Vite proxy

export async function fetchWeather(city, units) {
    const params = new URLSearchParams({ city, units });
    const res = await fetch(`${API_BASE}/api/weather/current?${params.toString()}`);

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}
