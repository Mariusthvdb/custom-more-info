import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	plugins: [
		nodeResolve(),
		terser({
			output: {
				comments: false
			}
		})
	],
	input: 'src/custom-ui-filter-attributes.js',
	output: {
		file: './custom-ui-filter-attributes.js',
		format: 'iife'
	}
};