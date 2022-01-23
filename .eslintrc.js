const TS_OVERRIDES = {
  files: ['*.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/recommended',
  ],
  
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'on',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off'
  },
}

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['prettier'],
  rules: {
		'no-shadow': 'off',
		'no-console': 'warn',
		'no-param-reassign': 'error',
		'no-nested-ternary': 'warn',
		'no-unneeded-ternary': 'error',
		'no-warning-comments': ['warn', { terms: ['todo'] }],
		'import/order': [
			'error',
			{
				groups: [
					['builtin', 'external', 'object'],
					['index', 'sibling', 'parent', 'internal'],
				],
				'newlines-between': 'always',
			},
		],
  },
  overrides: [TS_OVERRIDES]
}