import { Router } from "express";

const router = Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

router.get("/current", async (req, res) => {
    try {
        const { city, units = "metric" } = req.query;

        if (!city) {
            return res.status(400).json({ error: "city is required" });
        }

        const url = `${BASE_URL}/weather?q=${encodeURIComponent(
            city
        )}&appid=${API_KEY}&units=${units}`;

        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            console.error("OpenWeather Error:", response.status, text);
            return res.status(response.status).json({
                error: "OpenWeather request failed",
                details: text,
            });
        }

        const data = await response.json();

        return res.json({
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server failure" });
    }
});

export default router;
