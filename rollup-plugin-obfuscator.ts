import { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';
import JavascriptObfuscator from 'javascript-obfuscator';

const obfuscate = JavascriptObfuscator.obfuscate;

const pluginConfig = {
	//* Set to `true` if you want to obfuscate the whole bundle, `false` to obfuscate each file separately.
	global: true,
	//* javascript-obfuscator options. Refer to documentation here https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options
	options: {},
	//* Files to include when applying per-file obfuscation.
	include: ['**/*.js'],
	//* Files to exclude when applying per-file obfuscation. The priority is higher than `include`.
	exclude: ['**/ez*', '**/Ez*']
};

export default function rollupPluginObfuscator (): Plugin {
	const filter = createFilter(pluginConfig.include, pluginConfig.exclude);

	return {
		name: 'rollup-plugin-obfuscator',
		renderChunk: (code, { fileName }) => {
			if (!pluginConfig.global && !filter(fileName)){
				return null;
			}
			
			const obfuscationResult = obfuscate(code, {
				...pluginConfig.options,
				inputFileName: fileName
			});

			return {code: obfuscationResult.getObfuscatedCode()};
		}
	};
}
