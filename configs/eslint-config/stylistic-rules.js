module.exports = {
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
}
