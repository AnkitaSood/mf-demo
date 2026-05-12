import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';

// https://module-federation.io/guide/basic/vite.html
export default defineConfig({
  base: 'http://localhost:3001/',
  plugins: [
    vue(),
    federation({
      name: 'vue_app',
      filename: 'remoteEntry.js',
      // Generates mf-manifest.json at the server root — consumed by ng-shell
      manifest: true,
      dts: false,
      exposes: {
        // Angular wrapper calls loadRemote('vue_app/App')
        './App': './src/mfe-entry.ts',
      },
      shared: {
        vue: { singleton: true, requiredVersion: '^3.0.0' },
      },
    }),
  ],
  server: {
    port: 3001,
    strictPort: true,
    origin: 'http://localhost:3001',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'esnext',
  },
});
