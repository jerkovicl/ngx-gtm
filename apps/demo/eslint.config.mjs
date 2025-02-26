import nxEslintPlugin from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
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
          prefix: 'ngx-gtm',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ngx-gtm',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // files: ['libs/ui/**/*.html'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
];
