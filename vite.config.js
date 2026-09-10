import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// IMPORTANT: set `base` to "/<your-repo-name>/" before deploying to GitHub Pages,
// e.g. base: "/activity-points-management-system/"
export default defineConfig({
  plugins: [react()],
  base: "/activity-points-management-system/",
})
