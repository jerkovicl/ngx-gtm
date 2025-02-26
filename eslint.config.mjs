import nx from '@nx/eslint-plugin';
import json from '@eslint/json';
import cypressPlugin from 'eslint-plugin-cypress/flat';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    plugins: { importPlugin: importPlugin, cypress: cypressPlugin },
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/fixtures/**',
      '**/coverage/**',
      '**/.docusaurus/**',
      '**/build/**',
      '.nx/*',
      '.yarn/*',
      '!.storybook',
      '**/assets/**',
      '**/eslint.config.mjs',
      '**/jest.config.js',
      '**/jest.config.ts',
      '**/mockServiceWorker.js',
    ],

    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error',
    },
    /* languageOptions: {
      globals: { ...globals.es2022, ...globals.node, ...globals.jest, ...globals.cypress },
    }, */
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {},
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      // parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2022,
        isolatedDeclarations: true,
      },
      globals: { ...globals.es2022, ...globals.node, ...globals.jest, ...globals.cypress },
    },
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
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/relative-url-prefix': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-component-selector': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-input-rename': 'warn',
      '@angular-eslint/sort-lifecycle-methods': 'error',
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
      '@angular-eslint/runtime-localize': 'error',
      '@angular-eslint/prefer-signals': [
        'warn',
        {
          preferReadonlySignalProperties: false,
          useTypeChecking: true,
        },
      ],
      '@angular-eslint/consistent-component-styles': 'warn',
      'no-constant-binary-expression': 'error',
      'no-implicit-globals': 'error',
      'no-object-constructor': 'error',
      'no-restricted-imports': [
        'warn',
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
      'prefer-promise-reject-errors': 'error',
      'for-direction': 'error',
      'no-useless-computed-key': 'warn',
      'no-useless-assignment': 'error',
      'no-unused-vars': 'off',
      'consistent-return': 'off',
      'prefer-destructuring': 'off',
      // 'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      // 'import/no-duplicates': ['error', { 'prefer-inline': true, considerQueryString: true }],
      '@typescript-eslint/no-inferrable-types': [0, 'ignore-params', 'ignore-properties'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            '{}': {
              // add a custom message to help explain why not to use it
              message: "Don't use {} or Object because it is unsafe",
              // add a custom message, and tell the plugin how to fix it
              fixWith: 'Record<string, unknown>',
              // add a custom message, and tell the plugin how to suggest a fix
              suggest: ['Record<string, unknown>'],
            },
          },
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // ignore unused parameters that start with an underscore
          varsIgnorePattern: '^_', // ignore unused variables that start with an underscore
          // ignoreClassWithStaticInitBlock: false,
        },
      ],
      '@typescript-eslint/prefer-destructuring': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 3,
        },
      ],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          allowForKnownSafeCalls: [{ from: 'package', name: 'navigateByUrl', package: '@angular/router' }],
          allowForKnownSafePromises: [
            { from: 'file', name: 'SafePromise' },
            { from: 'lib', name: '@angular/router' },
            { from: 'package', name: 'Router', package: '@angular/router' },
          ],
          ignoreVoid: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/return-await': 2,
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        {
          allowDefaultCaseForExhaustiveSwitch: false,
          requireDefaultForNonUnion: true,
          defaultCaseCommentPattern: '^skip\\sdefault',
        },
      ],
      '@typescript-eslint/consistent-return': 'error',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-misused-spread': 'error',
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {
      '@angular-eslint/template/no-positive-tabindex': 'warn',
      '@angular-eslint/template/no-autofocus': 'warn',
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': [
        'warn',
        {
          allowList: ['form'],
        },
      ],
      '@angular-eslint/template/valid-aria': 'warn',
      '@angular-eslint/template/role-has-required-aria': 'warn',
      '@angular-eslint/template/alt-text': 'warn',
      '@angular-eslint/template/table-scope': 'warn',
      '@angular-eslint/template/no-distracting-elements': 'warn',
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
      '@angular-eslint/template/prefer-static-string-properties': 'warn',
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    language: 'json/json',
    ...json.configs.recommended,
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },
  {
    files: ['**/*.jsonc'],
    language: 'json/jsonc',
    languageOptions: {
      allowTrailinigCommas: true,
    },
    ...json.configs.recommended,
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },
  {
    files: ['**/*.json5'],
    language: 'json/json5',
    ...json.configs.recommended,
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },
  {
    files: ['**/*.cy.ts'],
    ...cypressPlugin.configs.recommended,
    rules: { 'cypress/require-data-selectors': 'warn' },
  },
];
