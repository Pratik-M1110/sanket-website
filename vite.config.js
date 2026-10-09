import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderPages } from './prerender.js';

export default defineConfig({
  base: './',
  plugins: [react(), prerenderPages()],
});
