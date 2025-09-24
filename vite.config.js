import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/Finance-Tracker/",  <-- This line should be removed or commented out
  plugins: [react()],
})