import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// tiny in-memory cache { key: { data, expiresAt } }
const cache = new Map();
const TTL_MS = 1000 * 60 * 2; // 2 minutes

function makeKey(q) {
    return JSON.stringify(q);
}

router.get("/current", async (req, res) => {
    try {
        const { city, lat, lon, units = "metric" } = req.query;
        if (!city && !(lat && lon)) {
            return res.status(400).json({ error: "Provide ?city= or ?lat=&lon=" });
        }

        const key = makeKey({ city, lat, lon, units });
        const hit = cache.get(key);
        if (hit && hit.expiresAt > Date.now()) {
            return res.json({ source: "cache", ...hit.data });
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) return res.status(500).json({ error: "Missing API key" });

        // Resolve to coords if city provided
        let qlat = lat, qlon = lon, qname = city;
        if (city) {
            const gUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
                city
            )}&limit=1&appid=${apiKey}`;
            const gRes = await fetch(gUrl);
            const g = await gRes.json();
            if (!Array.isArray(g) || g.length === 0) {
                return res.status(404).json({ error: "City not found" });
            }
            qlat = g[0].lat;
            qlon = g[0].lon;
            qname = `${g[0].name}${g[0].state ? ", " + g[0].state : ""}, ${g[0].country}`;
        }

        const wUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${qlat}&lon=${qlon}&units=${units}&appid=${apiKey}`;
        const wRes = await fetch(wUrl);
        const w = await wRes.json();
        if (w.cod && Number(w.cod) !== 200) {
            return res.status(w.cod).json({ error: w.message || "OpenWeather error" });
        }

        const payload = {
            city: qname || `${w.name}, ${w.sys?.country || ""}`,
            coord: w.coord,
            temp: w.main?.temp,
            feels_like: w.main?.feels_like,
            humidity: w.main?.humidity,
            wind: w.wind,
            weather: w.weather?.[0], // { id, main, description, icon }
            dt: w.dt,
            units
        };

        cache.set(key, { data: payload, expiresAt: Date.now() + TTL_MS });
        res.json({ source: "live", ...payload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
