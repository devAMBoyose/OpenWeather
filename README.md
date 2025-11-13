# 🌤️ OpenWeather Dashboard (Full-Stack)

Real-time weather app built with **React (Vite)** and **Node.js/Express**.  
The server hides the OpenWeather API key and adds basic rate-limit + cache.

> Purpose: personal study project and portfolio demo.
> Live: https://openweather-frontend.onrender.com/

---

## Features
- Secure server proxy (no API key in browser)
- Live weather by city
- Minimal, responsive UI
- Tiny in-memory cache

## Tech
- Frontend: React (Vite), CSS
- Backend: Node.js, Express, Helmet, CORS, Morgan
- API: OpenWeather

## Quick Start

```bash
# clone
git clone https://github.com/<your-username>/openweather-dashboard.git
cd openweather-dashboard

# backend
cd server
npm install
cp .env.example .env
# edit .env and set OPENWEATHER_API_KEY=your_key_here
npm run dev

# frontend
cd ../client
npm install
npm run dev
# open http://localhost:5173
