const
	baseRules =
		require('./base-rules'),

	stylisticRules =
		require('./stylistic-rules'),

	typescriptEslintRules =
		require('./typescript-eslint-rules')

module.exports = {
	'env': {
		'es6': true,
		'node': true,
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

	'parser': '@typescript-eslint/parser',

	'plugins': [
		'@typescript-eslint',
		'@stylistic',
	],

	'rules': {
		...baseRules,
		...stylisticRules,
		...typescriptEslintRules,
	},

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
				'package/**/*.jsx',
				'package/**/*.ts',
				'package/**/*.tsx',
			],
			'extends': [
				'@react-native',
			],
			'rules': {
				'no-trailing-spaces': baseRules['no-trailing-spaces'],
				'react/react-in-jsx-scope': 'off',
				'semi': 'off',
			},
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
			],
			'rules': {
				'import/no-unresolved': [
					'error',
					{
						'ignore': ['^@docusaurus', '^@site', '^@theme'],
					},
				],
				'no-trailing-spaces': baseRules['no-trailing-spaces'],
				'react/react-in-jsx-scope': 'off',
			},
		},
		{
			'files': [
				'*.ts',
				'*.tsx',
			],
			'rules': {
				'no-undef': 'off',
			},
		},
	],
}
