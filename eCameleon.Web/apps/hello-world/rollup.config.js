import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-cpy'

const production = !process.env.ROLLUP_WATCH;
const inputFile = production ? 'src/App.svelte' : 'src/main.js';
const outputFile = production ? 'public/bundle.mjs' : 'public/bundle.js';

export default {
	input: inputFile,
	output: {
		sourcemap: true,
		format: production ? 'esm' : 'iife',
		name: 'app',
		file: outputFile
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		copy({
			files: ['public/*.mjs', 'public/*.mjs.map', 'public/bundle.css', 'public/*.css.map'],
			dest: '../../static-apps/hello-world',
			options: {
			  verbose: true
			}
		  })
	]
};
