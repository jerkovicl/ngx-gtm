// @ts-check
// eslint-disable-next-line n/no-extraneous-require
const globals = require('globals');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const { fixupPluginRules } = require('@eslint/compat');
const nxEslintPlugin = require('@nx/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const angularEslintEslintPlugin = require('@angular-eslint/eslint-plugin');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const angularEslintEslintPluginTemplate = require('@angular-eslint/eslint-plugin-template');
const nodeEslintPlugin = require('eslint-plugin-n');
const storybookPlugin = require('eslint-plugin-storybook');
const rxjsPlugin = require('eslint-plugin-rxjs');
const rxjsAngularPlugin = require('eslint-plugin-rxjs-angular');
const jsonPlugin = require('@eslint/json').default;

// @ts-ignore
const cypressEslintPlugin = require('eslint-plugin-cypress/flat');

module.exports = tseslint.config(
  // @ts-ignore
  ...nxEslintPlugin.configs['flat/base'],
  // @ts-ignore
  ...nxEslintPlugin.configs['flat/typescript'],
  // @ts-ignore
  ...nxEslintPlugin.configs['flat/javascript'],
  // @ts-ignore
  ...nxEslintPlugin.configs['flat/angular'],
  // @ts-ignore
  ...nxEslintPlugin.configs['flat/angular-template'],
  {
    name: 'nx-base',
    plugins: {
      import: importPlugin,
      // @ts-ignore
      rxjs: fixupPluginRules(rxjsPlugin),
      // @ts-ignore
      'rxjs-angular': fixupPluginRules(rxjsAngularPlugin),
      // @ts-ignore
      json: jsonPlugin,
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        ecmaVersion: 2022,
      },
      globals: { ...globals.es2022, ...globals.node, ...globals.jest, ...globals.cypress },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allowCircularSelfDependency: false,
          enforceBuildableLibDependency: true,
          ignoredCircularDependencies: [],
          checkDynamicDependenciesExceptions: ['@fiyu/documents', '@fiyu/notifications'],
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:admin',
              onlyDependOnLibsWithTags: ['scope:admin', 'scope:shared'],
            },
            {
              sourceTag: 'scope:client',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:admin', 'scope:client'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:feature', 'type:shared', 'type:ui'],
            },
            {
              sourceTag: 'type:e2e',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:shared', 'type:ui'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:shared', 'type:ui'],
            },
            {
              sourceTag: 'type:shared',
              onlyDependOnLibsWithTags: ['type:shared'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util'],
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
      'prefer-promise-reject-errors': 'error',
      'for-direction': 'error',
      'no-useless-computed-key': 'warn',
      'no-useless-assignment': 'error',
      'no-unused-vars': 'off',
      'consistent-return': 'off',
      'prefer-destructuring': 'off',
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
      'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
      'import/no-duplicates': ['error', { 'prefer-inline': true, considerQueryString: true }],
      'rxjs/no-async-subscribe': 'error',
      'rxjs/no-ignored-observable': 'warn',
      'rxjs/no-ignored-subscription': 'warn',
      'rxjs/no-unbound-methods': 'warn',
      'rxjs/throw-error': 'warn',
      'rxjs-angular/prefer-async-pipe': 'warn',
      'rxjs-angular/prefer-composition': ['warn', { checkDecorators: ['Component', 'Directive', 'Pipe', 'Service'] }],
      'rxjs-angular/prefer-takeuntil': [
        'error',
        {
          alias: ['takeUntilDestroyed'],
          checkComplete: false, // Until https://github.com/cartant/eslint-plugin-rxjs-angular/issues/16 is implemented
          checkDecorators: ['Component', 'Directive', 'Pipe', 'Service'],
          checkDestroy: false,
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // extends: [...nxEslintPlugin.configs],
    languageOptions: { parser: tseslint.parser },
    rules: {
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
          allowForKnownSafePromises: [
            { from: 'file', name: 'SafePromise' },
            { from: 'lib', name: 'PromiseLike' },
            { from: 'package', name: 'Bar', package: 'bar-lib' },
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
        { allowDefaultCaseForExhaustiveSwitch: false, requireDefaultForNonUnion: true },
      ],
      '@typescript-eslint/consistent-return': 'error',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-deprecated': 'warn',
    },
  },
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    extends: [storybookPlugin.configs['flat/recommended']],
    rules: {
      'storybook/hierarchy-separator': 'error',
      'storybook/prefer-pascal-case': 'error',
    },
  },
  {
    files: ['**/*.html'],
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
      '@angular-eslint/consistent-component-styles': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // @ts-ignore
    extends: [nodeEslintPlugin.configs['flat/recommended-script']],
    rules: {
      'n/handle-callback-err': ['error', '^(e|err|error)$'],
      'n/no-callback-literal': 'error',
      'n/no-sync': 'error',
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    // @ts-ignore
    language: 'json/json',
    extends: [jsonPlugin.configs['recommended']],
    // ...jsonPlugin.configs['recommended'],
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },
  {
    files: ['**/*.jsonc'],
    language: 'json/jsonc',
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },
  {
    files: ['**/*.json5'],
    language: 'json/json5',
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },
  {
    name: 'json-markdown-except-rules',
    files: ['**/*.json', '**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...js.configs.recommended.rules,
    },
    // env: { jest: true },
  },
  {
    files: ['**/*.cy.ts'],
    extends: [cypressEslintPlugin.configs.recommended],
    rules: {
      //...js.configs.recommended.rules,
    },
    // env: { 'cypress/globals': true },
  },
  {
    ignores: [
      '/libs/**/.storybook/**',
      '/apps/**/.storybook/**',
      '!.storybook',
      'node_modules',
      'dist',
      '/apps/**/assets/**',
      '**/eslint.config.js',
      '**/mockServiceWorker.js',
    ],
  },
);
