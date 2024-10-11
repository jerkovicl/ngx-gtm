const nxEslintPlugin = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');
const jsonPlugin = require('@eslint/json').default;

module.exports = [
  ...baseConfig,
  ...nxEslintPlugin.configs['flat/angular'],
  ...nxEslintPlugin.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    // files: ['libs/ui/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'fiyu',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'fiyu',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['libs/ngx-gtm/package.json'],
    language: 'json/json',
    rules: {
      ...jsonPlugin.configs['recommended'].rules,
      // '@nx/dependency-checks': ['error', { ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'] }],
    },
  },
];
