import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://13.124.75.92:8080",
        changeOrigin: true,
        secure: false,
      },
      // 필요 시 직접 /email 호출하는 경우 대비용 (현재 코드는 /api/email 사용 중)
      "/email": {
        target: "http://13.124.75.92:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
