module.exports = {
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
}
