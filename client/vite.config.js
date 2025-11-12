import { defineConfig } from "vite";          // standard Vite config import
import react from "@vitejs/plugin-react";     // enables React JSX support

export default defineConfig({
    plugins: [react()],                         // activates React plugin
    server: {
        port: 5173,
        proxy: { "/api": "http://localhost:4000" }
    }

});
