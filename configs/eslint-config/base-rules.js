module.exports = {
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
}
