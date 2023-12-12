import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	plugins: [
		nodeResolve(),
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