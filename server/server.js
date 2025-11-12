import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import weatherRouter from "./routes/weather.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS whitelist
const origins = (process.env.CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({
    origin: (origin, cb) => {
        if (!origin) return cb(null, true);
        if (origins.length === 0 || origins.includes(origin)) return cb(null, true);
        cb(new Error("Not allowed by CORS"));
    }
}));

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", rateLimit({ windowMs: 60_000, max: 60 }));
app.use("/api/weather", weatherRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
