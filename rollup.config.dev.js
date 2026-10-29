import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

export default {
  plugins: [
    nodeResolve(),
    json(),
    typescript(),
    terser({
      output: {
        comments: false,
      },
    }),
    serve({
      contentBase: ['dist'],
      port: 8235,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
  input: 'src/custom-more-info.ts',
  output: {
    file: 'dist/custom-more-info.js',
    format: 'iife',
    sourcemap: true,
  },
  onwarn(warning, warn) {
    if (warning.code === 'PLUGIN_WARNING' && warning.plugin === 'typescript') {
      // Ignore TypeScript plugin warnings
      return;
    }

    warn(warning);
  },
};
