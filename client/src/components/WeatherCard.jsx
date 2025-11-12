import React from "react";

const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default function WeatherCard({ data, loading, error }) {
    if (loading) return <div className="card">Loading…</div>;
    if (error) return <div className="card error">⚠ {error}</div>;
    if (!data) return <div className="card">Search a city to begin.</div>;

    const { city, temp, feels_like, humidity, wind, weather, units } = data;
    const unit = units === "metric" ? "°C" : "°F";

    return (
        <div className="card">
            <div className="card__header">
                <h3 className="card__title">{city}</h3>
                {weather?.icon && <img className="card__icon" src={iconUrl(weather.icon)} alt={weather?.description || "weather"} />}
            </div>

            <p className="card__desc">{weather?.main} — {weather?.description}</p>

            <div className="stats">
                <div><span className="stat__label">Temp</span><span className="stat__val">{Math.round(temp)}{unit}</span></div>
                <div><span className="stat__label">Feels</span><span className="stat__val">{Math.round(feels_like)}{unit}</span></div>
                <div><span className="stat__label">Humidity</span><span className="stat__val">{humidity}%</span></div>
                <div><span className="stat__label">Wind</span><span className="stat__val">{Math.round(wind?.speed)} {units === "metric" ? "m/s" : "mph"}</span></div>
            </div>

            <a className="btn" href="#" onClick={(e) => e.preventDefault()}>View Demo</a>
        </div>
    );
}
