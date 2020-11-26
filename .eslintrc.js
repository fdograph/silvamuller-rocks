module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['public/build/'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['**/*.ts', '**/*.svelte'],
      env: {
        node: false,
        es6: true,
      },
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
  ],
  rules: {
    // semi: ['error', 'never'] // uncomment if you want to remove ;
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  settings: {
    // ...
  },
};
