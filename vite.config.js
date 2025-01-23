import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias for the 'service' folder
      '@service': path.resolve(__dirname, './src/services'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://redmine.aasait.lk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
