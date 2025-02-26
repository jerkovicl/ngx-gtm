import baseConfig from '../../eslint.config.mjs';
import cypressPlugin from 'eslint-plugin-cypress/flat';

export default [
  ...baseConfig,
  {
    files: ['**/*.cy.ts'],
    ...cypressPlugin.configs.recommended,
    rules: { 'cypress/require-data-selectors': 'warn' },
  },
];
