/**
 * Relative from libs/bob.config.js
 */
const targetPath = '../../packages/carbon-react-native'

module.exports = {
	source: `${targetPath}/src`,
	output: `${targetPath}/lib`,
	targets: [
		[
			'commonjs',
			{
				'esm': true,
			},
		],
		[
			'module',
			{
				'esm': true,
			},
		],
		[
			'typescript',
			{
				project: `${targetPath}/tsconfig.json`,
			},
		],
	],
}
