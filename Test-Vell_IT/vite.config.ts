import { defineConfig } from 'vite'
import { ghPages } from 'vite-plugin-gh-pages';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(), ghPages()],
  base: 'TEST-Vell_IT',
})
