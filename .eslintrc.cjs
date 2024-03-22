require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  plugins: [],
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', '@vue/eslint-config-airbnb-with-typescript'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-duplicates': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'no-param-reassign': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'import/extensions': [
      'off',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['src /**/*.vue'],
      rules: {
        'vue/no-v-html': 'off',
      },
    },
  ],
  ignorePatterns: [
    'cypress/',
    'node_modules /**',
    '**/node_modules/',
    ' /**/node_modules/*',
    '.nuxt/',
    'dist/',
  ],
};
