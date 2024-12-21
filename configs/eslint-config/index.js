const baseRules = require('./base-rules')

module.exports = {
	'env': {
		'es6': true,
	},

	'parserOptions': {
		'sourceType': 'module',
		'ecmaVersion': 2020,
	},

	'extends': [
		'eslint:recommended',

		// Eslint Plugin Import
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],

	'plugins': [
		'@stylistic',
	],

	'rules': baseRules,

	'overrides': [
		{
			'files': ['*.js'],
			'rules': {
				'no-undef': 'off',
				'no-unused-vars': 'error',
				'@typescript-eslint/no-require-imports': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			'files': [
				'package/**/*.js',
				'package/**/*.jsx',
				'package/**/*.ts',
				'package/**/*.tsx',
			],
			'extends': [
				'@react-native',
			],
			'rules': baseRules,
		},
		{
			'files': [
				'docs/**/*.js',
				'docs/**/*.jsx',
				'docs/**/*.ts',
				'docs/**/*.tsx',
			],
			'extends': [
				'plugin:@docusaurus/recommended',
				// Eslint Plugin Import
				'plugin:import/errors',
				'plugin:import/warnings',
				'plugin:import/typescript',
			],
			'rules': {
				'import/no-unresolved': [
					'error',
					{
						'ignore': ['^@docusaurus', '^@site', '^@theme'],
					},
				],
			},
			'settings': {
				'import/resolver': {
					'node': true,
					'typescript': {
						'alwaysTryTypes': true,
					},
				},
			},
		},
	],

	'settings': {
		'import/ignore': [
			'react-native',
		],
		'import/resolver': {
			// "node": {
			// 	"extensions": [".js", ".jsx", ".ts", ".tsx"]
			// },
			'node': true,
			'typescript': {
				'alwaysTryTypes': true,
			},
		},
	},

	'ignorePatterns': [
		'node_modules/',
		'lib/',
	],
}
