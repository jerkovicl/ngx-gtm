const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const angularEslintEslintPlugin = require('@angular-eslint/eslint-plugin');
const globals = require('globals');
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@angular-eslint': angularEslintEslintPlugin,
    },
  },
  {
    linterOptions: {
      // reportUnusedDisableDirectives: 'warn',
    },
    languageOptions: {
      parserOptions: { ecmaVersion: 2022 },
      globals: { ...globals.es2022, ...globals.node, ...globals.jest },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'no-constant-binary-expression': 'error',
      'no-implicit-globals': 'error',
      'no-object-constructor': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'moment',
              message: 'Use date-fns instead!',
            },
            {
              name: 'lodash',
              message: 'Use native array methods or lodash-es instead!',
            },
          ],
        },
      ],
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-promise-executor-return': 'error',
      'require-atomic-updates': 'error',
      'max-nested-callbacks': ['error', 3],
      'no-return-await': 'off',
      'prefer-promise-reject-errors': 'error',
      'for-direction': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/prefer-standalone-component': 'error',
      '@angular-eslint/relative-url-prefix': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/sort-ngmodule-metadata-arrays': 'error',
      '@angular-eslint/use-component-selector': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-input-rename': 'warn',
      '@angular-eslint/sort-lifecycle-methods': 'error',
      '@angular-eslint/no-async-lifecycle-method': 'error',
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-inferrable-types': [0, 'ignore-params', 'ignore-properties', 'no-unused-vars'],
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            String: false,
            Boolean: false,
            Number: false,
            Symbol: false,
            '{}': false,
            Object: false,
            object: false,
            Function: false,
          },
          extendDefaults: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/prefer-destructuring': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/return-await': 2,
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-useless-template-literals': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { allowDefaultCaseForExhaustiveSwitch: false, requireDefaultForNonUnion: true },
      ],
    },
  })),
  ...compat
    .config({
      parserOptions: {
        project: ['tsconfig.?*.json'],
        ecmaVersion: 2022,
      },
      extends: ['plugin:rxjs/recommended'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {},
    })),
  ...compat.config({ extends: ['plugin:storybook/recommended'] }).map((config) => ({
    ...config,
    files: ['**/*.stories.*', '**/*.story.*'],
    rules: {},
  })),
  ...compat.config({ extends: ['plugin:@angular-eslint/template/all'] }).map((config) => ({
    ...config,
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/no-positive-tabindex': 'warn',
      '@angular-eslint/template/no-autofocus': 'warn',
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/valid-aria': 'warn',
      '@angular-eslint/template/role-has-required-aria': 'warn',
      '@angular-eslint/template/alt-text': 'warn',
      '@angular-eslint/template/elements-content': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'warn',
      '@angular-eslint/template/i18n': 'off',
      '@angular-eslint/template/no-call-expression': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/no-inline-styles': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/no-duplicate-attributes': [
        'error',
        {
          allowTwoWayDataBinding: true,
          allowStylePrecedenceDuplicates: false,
          ignore: [],
        },
      ],
      '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 5 }],
      '@angular-eslint/template/conditional-complexity': 'warn',
      '@angular-eslint/template/prefer-ngsrc': 'warn',
      '@angular-eslint/template/prefer-control-flow': 'error',
    },
  })),
  ...compat.config({ extends: ['plugin:node/recommended', 'plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'node/handle-callback-err': ['error', '^(e|err|error)$'],
      'node/no-callback-literal': 'error',
      'node/no-sync': 'error',
    },
  })),
  ...compat.config({ parser: 'jsonc-eslint-parser' }).map((config) => ({
    ...config,
    files: ['**/*.json'],
    rules: {},
  })),
  { ignores: ['/libs/**/.storybook/**', '/apps/**/.storybook/**', '!.storybook'] },
];
