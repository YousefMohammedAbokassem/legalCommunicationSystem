import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/broadcasting/auth": {
        target: "http://osamanaser806-32078.portmap.io:32078",
        changeOrigin: true,
        secure: false, // التأكد من أن الاتصال غير مشفر
        rewrite: (path) => path.replace(/^\/broadcasting/, ""),
      },
    },
  },
});
