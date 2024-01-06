import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: '/',
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3001,
      // (Development only)
      proxy: {
        // '/api': {
        //   target: process.env.VITE_SERVER_DOMAIN,
        //   changeOrigin: true,
        // },
      },
    },
  });
};
