# Pull Request: Upgrade Angular 22, Nx 23, and TypeScript 6

## PR Details

**Branch:** `chore/update-nx-and-angular`  
**Base:** `main`  
**Status:** Ready for PR Creation

## 🚀 Summary

This PR upgrades all major dependencies to their latest stable versions:
- **Angular:** 20.3.2 → 22.0.0
- **Nx:** 21.6.2 → 23.0.0
- **TypeScript:** 5.9.2 → 6.0.0

## 📦 Changes

### Dependencies Updated
```
✅ @angular/* packages (20.3.2 → 22.0.0)
✅ @angular-devkit/* (20.3.3 → 22.0.0)
✅ @angular-eslint/* (20.3.0 → 22.0.0)
✅ @schematics/angular (20.3.3 → 22.0.0)
✅ ng-packagr (20.3.0 → 22.0.0)
✅ @nx/* packages (21.6.2 → 23.0.0)
✅ typescript (5.9.2 → 6.0.0)
```

### Files Modified
1. **package.json** - Updated 23 dependencies
2. **libs/ngx-gtm/package.json** - Updated peer dependencies
3. **README.md** - Updated compatibility table
4. **libs/ngx-gtm/README.md** - Updated compatibility table

### Documentation Updates
- Updated Angular compatibility: `>=17 <=22` (was `>=17 <=20`)
- Added migration instructions
- Documented breaking changes (if any)

## 🔄 Migration Guide

After merge, run:
```bash
npm install
npx nx migrate latest
npx nx migrate --run-migrations
npm run build
npm run test
npm run lint
```

## ✅ Testing Checklist
- [ ] `npm install` succeeds
- [ ] `npm run build` passes
- [ ] `npm run test` passes (all tests)
- [ ] `npm run lint` passes
- [ ] Demo application builds and runs
- [ ] Library exports correctly
- [ ] No breaking changes in public API

## 📊 Next Steps

After this PR is merged:
1. Run `npm outdated` to identify remaining package updates
2. Create PR #2 for patch/minor version updates
3. Create separate PRs for major version upgrades
4. See `NPM_UPDATE_STRATEGY.md` for detailed plan

## Related Documentation
- `NPM_UPDATE_STRATEGY.md` - Complete update strategy
- Angular 22 Changelog: https://github.com/angular/angular/releases/tag/22.0.0
- Nx 23 Changelog: https://github.com/nrwl/nx/releases/tag/23.0.0
- TypeScript 6 Release Notes: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html

## 👤 Created by
Luka Jerković (@jerkovicl)

---

**To create this PR on GitHub:**
1. Go to: https://github.com/jerkovicl/ngx-gtm/compare/main...chore/update-nx-and-angular
2. Click "Create Pull Request"
3. Copy the description above
4. Submit the PR

