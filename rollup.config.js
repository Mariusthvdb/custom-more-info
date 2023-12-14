import ts from 'rollup-plugin-ts';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	plugins: [
		nodeResolve(),
		json(),
		ts({
			browserslist: false
		}),
		terser({
			output: {
				comments: false
			}
		})
	],
	input: 'src/custom-attributes.ts',
	output: {
		file: './custom-attributes.js',
		format: 'iife'
	}
};