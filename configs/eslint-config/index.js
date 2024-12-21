module.exports = {
	'extends': [
		'eslint:recommended',
		'@react-native',

		// Eslint Plugin Import
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],

	'plugins': [
		'@stylistic',
	],

	'rules': {
		// https://eslint.org/docs/rules/consistent-return
		'consistent-return': 'error',

		'eol-last': 'error',

		// Let @stylistic/no-multiline-empty-lines resolve this
		'no-multiple-empty-lines': 'off',

		// Let @typescript-eslint/no-unused-vars resolve this. Otherwise, it tells us a false positive.
		// https://typescript-eslint.io/rules/#extension-rules
		'no-unused-vars': 'off',

		// https://eslint.org/docs/rules/no-shadow-restricted-names
		'no-shadow-restricted-names': 'error',

		// https://eslint.org/docs/rules/no-unreachable
		'no-unreachable': 'error',

		// https://eslint.org/docs/rules/no-trailing-spaces
		// let @stylistic override this rule
		'no-trailing-spaces': 'off',

		'prefer-const': 'error',

		'prettier/prettier': 'off',

		'react/react-in-jsx-scope': 'off',

		'semi': 'off',

		// https://eslint.org/docs/rules/yoda
		'yoda': 'error',

		'jsx-quotes': ['warn', 'prefer-double'],

		/**
		* Eslint Plugin Import
		* https://github.com/import-js/eslint-plugin-import
		*/
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md
		'import/default': 'error',
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md
		'import/export': 'error',
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
		'import/named': 'error',
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
		'import/namespace': 'off',
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
		'import/no-anonymous-default-export': 'off',
		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-no-cycle.md
		'import/no-cycle': 'warn',

		'import/no-unresolved': [
			'error',
			{
				'ignore': [
					'react-native',
				],
			},
		],

		// https://eslint.style/rules/default/block-spacing
		'@stylistic/block-spacing': 'error',

		// https://eslint.style/rules/default/brace-style
		'@stylistic/brace-style': [
			'error',
			'1tbs',
		],

		// https://eslint.style/rules/default/comma-dangle
		'@stylistic/comma-dangle': [
			'warn',
			'always-multiline',
		],

		// https://eslint.org/docs/rules/comma-spacing
		'@stylistic/comma-spacing': ['error', {
			'before': false,
			'after': true,
		}],

		'@stylistic/function-call-spacing': [
			'error',
			'never',
		],

		// https://eslint.style/rules/default/indent
		'@stylistic/indent': ['warn', 'tab'],

		// https://eslint.style/rules/default/key-spacing
		'@stylistic/key-spacing': [
			'error',
			{
				'beforeColon': false,
			},
		],

		// https://eslint.style/rules/default/jsx-curly-spacing
		'@stylistic/jsx-curly-spacing': [
			'warn',
			{
				'when': 'always',
				'spacing': {
					'objectLiterals': 'never',
				},
			},
		],

		// https://eslint.style/rules/default/jsx-equals-spacing
		'@stylistic/jsx-equals-spacing': [
			'error',
			'never',
		],

		// https://eslint.style/rules/default/jsx-max-props-per-line
		'@stylistic/jsx-max-props-per-line': [
			'warn',
			{
				'maximum': 2,
			},
		],

		// https://eslint.style/rules/default/keyword-spacing
		'@stylistic/keyword-spacing': [
			'error',
			{
				'overrides': {
					'if': {
						'after': false,
					},
					'catch': {
						'after': false,
						'before': true,
					},
				},
			},
			// {
			// 	// override default from @react-native
			// 	"overrides": {
			// 		"if": {
			// 			"after": false
			// 		},
			// 		"catch": {
			// 			"after": true
			// 		}
			// 	}
			// }
		],

		// https://eslint.style/rules/default/no-mixed-operators
		'@stylistic/no-mixed-operators': [
			'error',
			{
				'groups': [
					['&', '|', '^', '~', '<<', '>>', '>>>'],
					['==', '!=', '===', '!==', '>', '>=', '<', '<='],
					['&&', '||'],
					['in', 'instanceof'],
				],
				'allowSamePrecedence': false,
			},
		],

		// https://eslint.style/rules/default/no-multiple-empty-lines
		'@stylistic/no-multiple-empty-lines': 'error',

		// https://eslint.style/rules/default/no-trailing-spaces
		'@stylistic/no-trailing-spaces': [
			'warn',
			{
				'ignoreComments': true,
			},
		],

		// https://eslint.style/rules/default/object-curly-spacing
		'@stylistic/object-curly-spacing': [
			'warn',
			'always',
		],

		// https://eslint.style/rules/default/semi
		'@stylistic/semi': 'off',

		// https://eslint.style/rules/default/semi-spacing
		'@stylistic/semi-spacing': [
			'error',
			{
				'before': false,
				'after': true,
			},
		],

		// https://eslint.style/rules/default/space-before-blocks
		'@stylistic/space-before-blocks': 'warn',

		// https://eslint.style/rules/default/space-before-function-paren
		'@stylistic/space-before-function-paren': [
			'error',
			{
				'anonymous': 'never',
				'named': 'never',
				'asyncArrow': 'always', // valid: async () => {} | error: async() => {}
			},
		],

		// https://eslint.style/rules/default/space-infix-ops
		'@stylistic/space-infix-ops': [
			'error',
			{
				'int32Hint': true,
			},
		],

		// https://eslint.style/rules/default/spaced-comment
		'@stylistic/spaced-comment': [
			'warn',
			'always',
		],

		// https://typescript-eslint.io/rules/no-empty-interface
		'@typescript-eslint/no-empty-interface': 'off',

		// https://typescript-eslint.io/rules/no-empty-object-type/
		'@typescript-eslint/no-empty-object-type': 'off',

		// https://typescript-eslint.io/rules/no-explicity-any
		'@typescript-eslint/no-explicit-any': 'off',

		// https://typescript-eslint.io/rules/no-shadow
		'@typescript-eslint/no-shadow': 'error',

		// https://typescript-eslint.io/rules/no-unused-vars
		'@typescript-eslint/no-unused-vars': [
			// Make sure no-unused-vars (Eslint natively) is off
			'error',
			{
				'argsIgnorePattern': '^___',
				'caughtErrorsIgnorePattern': '^___',
			// "destructuredArrayIgnorePattern": "^_"
			},
		],
	},

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
		'lib/',
	],
}
