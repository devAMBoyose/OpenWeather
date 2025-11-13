// client/src/services/api.js

const API_BASE =
    import.meta.env.MODE === "production"
        ? "https://openweather-backend.onrender.com"
        : "/api";

export async function fetchWeather(city, units) {
    const params = new URLSearchParams({ city, units });
    const res = await fetch(`${API_BASE}/api/weather/current?${params.toString()}`);

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}

// 👇 alias so App.jsx import still works
export async function fetchCurrentWeather(city, units) {
    return fetchWeather(city, units);
}
