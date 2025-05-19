import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	plugins: [
		nodeResolve(),
		json(),
		typescript(),
		terser({
			output: {
				comments: false
			}
		})
	],
	input: 'src/custom-more-info.ts',
	output: {
		file: './custom-more-info.js',
		format: 'iife'
	}
};