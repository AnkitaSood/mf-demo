import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

// https://module-federation.io/guide/basic/vite.html
export default defineConfig({
  base: 'http://localhost:3000/',
  plugins: [
    react(),
    federation({
      name: 'react_app',
      filename: 'remoteEntry.js',
      // Generates mf-manifest.json at the server root — consumed by ng-shell
      manifest: true,
      dts: false,
      exposes: {
        // Angular wrapper calls loadRemote('react_app/App')
        './App': './src/mfe-entry.ts',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      },
    }),
  ],
  server: {
    port: 3000,
    origin: 'http://localhost:3000',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
  },
});
