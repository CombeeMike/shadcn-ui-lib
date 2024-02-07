import * as packageJson from './package.json';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react({
      // Not really required but seems to make the bundle a bit smaller
      jsxRuntime: 'classic',
    }),
    dts({
      include: ['src/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Do not include the deps and peerDeps in the build.
      // `preserveModules` makes the lib tree shakable (in combeination with `sideEffects: false` in `package.json`).
      external: [...Object.keys(packageJson.peerDependencies || {}), ...Object.keys(packageJson.dependencies)],
      output: { preserveModules: true, exports: 'named' },
    },

    target: 'esnext',
    sourcemap: true,
  },
});
