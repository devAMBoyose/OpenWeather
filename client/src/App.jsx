import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard.jsx";
import { fetchCurrentWeather } from "./services/api.js";

export default function App() {
    const [city, setCity] = useState("Manila");
    const [units, setUnits] = useState("metric");
    const [data, setData] = useState(null);
    const [status, setStatus] = useState({ loading: false, error: "" });

    // ✅ load now accepts a plain string: cityName
    async function load(cityName) {
        if (!cityName) return;

        try {
            setStatus({ loading: true, error: "" });

            // ✅ correct call: pass plain strings (city, units)
            const res = await fetchCurrentWeather(cityName, units);

            setData(res);
            setStatus({ loading: false, error: "" });
        } catch (e) {
            console.error(e);
            setData(null);
            setStatus({
                loading: false,
                error: e.message || "Failed to fetch weather",
            });
        }
    }

    // Fetch initial data
    useEffect(() => {
        load(city);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        load(city); // Fetch weather again
    };

    return (
        <main className="wrap">
            <header className="hero">
                <div>
                    <h1>OpenWeather Dashboard</h1>
                    <p>Real-time weather using a secure Node proxy.</p>
                </div>
                <span className="chip">Client-side</span>
            </header>

            <form className="controls" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search city e.g., Cebu, Tokyo"
                    aria-label="City"
                />

                <select
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                >
                    <option value="metric">Metric (°C)</option>
                    <option value="imperial">Imperial (°F)</option>
                </select>

                <button type="submit">Fetch</button>
            </form>

            <WeatherCard
                data={data}
                loading={status.loading}
                error={status.error}
            />
        </main>
    );
}
