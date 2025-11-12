import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard.jsx";
import { fetchCurrentWeather } from "./services/api.js";

export default function App() {
    const [city, setCity] = useState("Manila");
    const [units, setUnits] = useState("metric");
    const [data, setData] = useState(null);
    const [status, setStatus] = useState({ loading: false, error: "" });

    async function load(q) {
        try {
            setStatus({ loading: true, error: "" });
            const res = await fetchCurrentWeather({ ...q, units });
            setData(res);
        } catch (e) {
            setData(null);
            setStatus({ loading: false, error: e.message });
            return;
        }
        setStatus({ loading: false, error: "" });
    }

    useEffect(() => { load({ city }); }, []); // initial

    return (
        <main className="wrap">
            <header className="hero">
                <div>
                    <h1>OpenWeather Dashboard</h1>
                    <p>Real-time weather using a secure Node proxy.</p>
                </div>
                <span className="chip">Client-side</span>
            </header>

            <form className="controls" onSubmit={(e) => { e.preventDefault(); load({ city }); }}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search city e.g., Cebu, Tokyo"
                    aria-label="City"
                />
                <select value={units} onChange={(e) => setUnits(e.target.value)}>
                    <option value="metric">Metric (°C)</option>
                    <option value="imperial">Imperial (°F)</option>
                </select>
                <button type="submit">Fetch</button>
            </form>

            <WeatherCard data={data} loading={status.loading} error={status.error} />
        </main>
    );
}
