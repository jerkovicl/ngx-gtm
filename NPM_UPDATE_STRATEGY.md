# 📋 NPM Package Update Strategy

## Overview
After upgrading to Angular 22, Nx 23, and TypeScript 6, this document outlines the strategy for updating remaining packages to their latest versions.

## Current Status
- ✅ Angular: 20.3.2 → 22.0.0
- ✅ Nx: 21.6.2 → 23.0.0
- ✅ TypeScript: 5.9.2 → 6.0.0

## Packages Analysis (to be run with `npm outdated`)

### Critical Priority - Security Updates
These packages should be updated immediately if vulnerabilities are detected:
- Any package flagged by `npm audit`
- Check regularly for CVEs

### High Priority - Non-Breaking Updates
**Minor/Patch updates (safe to update):**
```
@types/node: ^24.6.0
@types/jest: 30.0.0
@types/express: 5.0.3
autoprefixer: ^10.4.21
prettier: ^3.6.2
cypress: 15.3.0
eslint: ^9.36.0
postcss: ^8.5.6
```

**Update strategy:** Create a single PR to update all patch/minor versions

### Medium Priority - Major Version Updates
**Require migration review:**
```
jest: 30.2.0 (check if 31+ available)
cypress: 15.3.0 (check latest major)
postcss: ^8.5.6 (check v9+)
```

**Update strategy:** Create separate PRs with:
1. Detailed changelog review
2. Breaking changes documentation
3. Migration steps if needed
4. Full test suite validation

### Low Priority - Nice-to-Have
- Semantic release packages
- Build tool optimizations
- Development utilities

## Execution Plan

### Step 1: Generate npm outdated Report
```bash
npm outdated
```

### Step 2: Create Update Groups
- **Group A:** All patch/minor updates
- **Group B:** Each major version separately

### Step 3: PR Creation Strategy

**PR #1 - Non-Breaking Updates:**
- Title: `chore: update dependencies to latest patch/minor versions`
- Includes all safe updates
- Testing: `npm run test`, `npm run build`

**PR #2+ - Major Version Updates:**
- One PR per package with breaking changes
- Title: `chore: upgrade {package} to v{version}`
- Includes:
  - Changelog summary
  - Migration steps
  - API compatibility review

### Step 4: Testing Checklist for Each PR
- [ ] `npm install` completes without errors
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes (100% pass rate)
- [ ] `npm run lint` passes
- [ ] `npm run nx:build ngx-gtm` succeeds
- [ ] Demo app builds and runs
- [ ] No TypeScript compilation errors
- [ ] No runtime warnings

### Step 5: Merge & Deploy
- Squash or rebase merge (keep history clean)
- Tag version if releasing
- Monitor for any post-merge issues

## Timeline Estimate

| Phase | Time | Status |
|-------|------|--------|
| PR #0 (Main upgrade - Angular 22, Nx 23, TS 6) | 1-2 days | 🟢 Ready |
| Generate `npm outdated` report | 1 hour | ⏳ After merge |
| PR #1 (Patch/Minor updates) | 1-2 days | ⏳ After merge |
| PR #2+ (Major updates) | 2-5 days | ⏳ After merge |
| **Total** | **~1-2 weeks** | |

## Risk Assessment

| Update Type | Risk Level | Mitigation |
|------------|-----------|-----------|
| Patch updates | 🟢 Low | Comprehensive testing |
| Minor updates | 🟡 Medium | Feature testing, API compatibility |
| Major updates | 🔴 High | Changelog review, migration guide, extended testing |

## Notes
- Keep `package-lock.json` or `yarn.lock` in sync
- Run `npm audit` after each update batch
- Document any breaking changes
- Update documentation if APIs change
- Consider compatibility with Angular 17-22 range in peer deps

---

**Next Action:** Merge the main PR, then run `npm outdated` and create follow-up PRs based on this plan.
