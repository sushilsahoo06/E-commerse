import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 add this line
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173, // or whatever port you're using
  },
});
