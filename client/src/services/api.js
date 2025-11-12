const API_BASE = import.meta.env.VITE_API_BASE || "";
export async function fetchCurrentWeather(query) {
    const params = new URLSearchParams(query);
    const res = await fetch(`${API_BASE}/api/weather/current?${params.toString()}`);
    const raw = await res.text();
    let data = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { throw new Error(`Server returned non-JSON (${res.status})`); }
    if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
    return data;
}
