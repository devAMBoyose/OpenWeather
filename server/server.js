// server/server.js
import "dotenv/config";            // ✅ loads .env
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import weatherRouter from "./routes/weather.js";

const app = express();
const PORT = process.env.PORT || 4001;   // ✅ 4001 to match your .env

// --- CORS whitelist ---
const origins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, cb) => {
            if (!origin) return cb(null, true);                  // Postman, curl, etc.
            if (origins.length === 0 || origins.includes(origin)) {
                return cb(null, true);                             // allowed
            }
            cb(new Error("Not allowed by CORS"));
        },
    })
);

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// basic rate limit for all /api routes
app.use("/api", rateLimit({ windowMs: 60_000, max: 60 }));

// weather routes
app.use("/api/weather", weatherRouter);

// simple health check
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
