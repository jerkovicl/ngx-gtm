const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...baseConfig,
  ...compat
    .config({
      extends: ['plugin:@nx/angular', 'plugin:@angular-eslint/template/process-inline-templates'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {
        ...config.rules,
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'lib',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'lib',
            style: 'kebab-case',
          },
        ],
      },
    })),
  ...compat.config({ extends: ['plugin:@nx/angular-template'] }).map((config) => ({
    ...config,
    files: ['**/*.html'],
    rules: {
      ...config.rules,
    },
  })),
  ...compat.config({ parser: 'jsonc-eslint-parser' }).map((config) => ({
    ...config,
    files: ['**/*.json'],
    rules: {
      ...config.rules,
      '@nx/dependency-checks': [
        'error',
        {
          buildTargets: ['build'], // add non standard build target names
          checkMissingDependencies: true, // toggle to disable
          checkObsoleteDependencies: true, // toggle to disable
          checkVersionMismatches: true, // toggle to disable
          ignoredDependencies: ['tslib'], // these libs will be omitted from checks
          ignoredFiles: [], // list of files that should be skipped for check
          includeTransitiveDependencies: false, // collect dependencies transitively from children
          useLocalPathsForWorkspaceDependencies: false, // toggle to disable
        },
      ],
    },
  })),
];
