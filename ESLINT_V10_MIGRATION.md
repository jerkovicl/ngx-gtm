# 🔧 ESLint v10 Migration Guide

## Overview
This document outlines the migration from ESLint v9 to v10, including breaking changes and required configuration updates.

## Breaking Changes in ESLint v10

### 1. Flat Config Format (Recommended)
ESLint v10 introduces a new flat config format using `eslint.config.js` instead of `.eslintrc.json`.

**Current config (v9):**
```json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-console": "warn"
  }
}
```

**New format (v10):**
```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'warn'
    }
  }
];
```

### 2. Plugin Loading
- Plugins are now loaded explicitly in the config
- Plugin names use full package names
- Auto-loading from `.eslintrc.json` is deprecated

### 3. Deprecated APIs
- `CLIEngine` is removed (use ESLint class)
- `RuleTester` API changes
- Processor format changes

## Migration Steps

### Step 1: Update ESLint Package
```bash
npm install --save-dev eslint@10.0.0
```

### Step 2: Update ESLint Plugins
Update all ESLint plugins to v10-compatible versions:
```bash
npm install --save-dev \
  eslint@10.0.0 \
  typescript-eslint@8.x \
  eslint-plugin-cypress@5.x \
  eslint-plugin-import@2.x \
  eslint-plugin-n@17.x \
  eslint-plugin-storybook@9.x
```

### Step 3: Create New Config File
Create `eslint.config.js` in the root directory.

### Step 4: Remove Old Config Files
```bash
rm .eslintrc.json .eslintignore
```

### Step 5: Test ESLint
```bash
npm run lint
```

## Configuration Priority
1. `eslint.config.js`
2. `eslint.config.mjs`
3. `eslint.config.cjs`
4. `.eslintrc.js` (deprecated)
5. `.eslintrc.cjs` (deprecated)
6. `.eslintrc.yaml/.yml` (deprecated)
7. `.eslintrc.json` (deprecated)

## Testing After Migration

```bash
npm run lint
npm run lint -- --fix
npm run test
npm run build
```

## Resources
- [ESLint v10 Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [ESLint v10 Release Notes](https://github.com/eslint/eslint/releases/tag/v10.0.0)

---

**Status:** Migration Guide  
**Last Updated:** September 2026
