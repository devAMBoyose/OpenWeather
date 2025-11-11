# 🌤️ OpenWeather Dashboard — Full-Stack Weather App

A **real-time weather dashboard** built with **React (Vite)** and **Node.js / Express**, featuring secure API calls, animated icons, and live temperature visualization.  
This project is part of my **Full-Stack Developer Portfolio** under `APIs / Integrations` and demonstrates client–server communication, RESTful architecture, and environment-secured API handling.

---

## ✨ Features

- 🔒 **Secure Backend Proxy** — API key safely stored on the server.
- ⚡ **Live Data** — Fetches real-time weather data via OpenWeather API.
- 🎨 **Modern UI** — Styled with a neon-dark aesthetic (JetBrains Mono font, green/blue gradient accents).
- 🧊 **React Frontend** — Built using Vite for instant HMR and lightweight bundling.
- 🌍 **Express Backend** — Node.js REST API proxy with rate-limiting and in-memory caching.
- 📱 **Responsive Design** — Fully responsive layout for desktop, tablet, and mobile.
- 🪶 **Lightweight Cache** — Minimizes redundant OpenWeather API calls.

---

## 🧠 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React (Vite), HTML5, CSS3 (custom gradient styling), Fetch API |
| **Backend** | Node.js, Express.js, Helmet, CORS, Rate-Limiter, Morgan |
| **API** | [OpenWeather API](https://openweathermap.org/api) |
| **Environment** | `.env` with API key, CORS origin control |
| **Tools** | npm, Vite, Git, VS Code |

---

## 🧩 Architecture Overview
- Frontend never exposes your API key.
- Backend handles errors, caching, and origin validation.
- CORS allows only safe domains (from `.env`).

---

## 🚀 Live Preview

> 🎯 *Coming soon on my portfolio at [amboyose.com](https://amboyose.com)*  
> 
> 📦 For local testing, follow setup below 👇

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone repository
git clone https://github.com/<your-username>/openweather-dashboard.git
cd openweather-dashboard

# 2️⃣ Backend setup
cd server
npm install
cp .env.example .env
# open .env and set:
# OPENWEATHER_API_KEY=your_api_key_here
npm run dev

# 3️⃣ Frontend setup
cd ../client
npm install
npm run dev

# 4️⃣ Visit app
http://localhost:5173