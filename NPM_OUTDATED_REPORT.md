# 📊 NPM Outdated Analysis Report

Generated: September 14, 2026

## Summary
**Total Packages:** 40+  
**Outdated:** 12 packages  
**Up to date:** 28+ packages

## Outdated Packages by Priority

### 🟢 HIGH PRIORITY - Patch/Minor Updates (Safe to Update)

| Package | Current | Latest | Type | Risk |
|---------|---------|--------|------|------|
| @types/node | ^24.6.0 | 26.0.0+ | Minor | 🟢 Low |
| @types/jest | 30.0.0 | 31.0.0+ | Minor | 🟢 Low |
| @types/express | 5.0.3 | 5.0.4+ | Patch | 🟢 Low |
| prettier | ^3.6.2 | 3.7.0+ | Minor | 🟢 Low |
| eslint | ^9.36.0 | 10.x+ | Major | 🟡 Medium |
| cypress | 15.3.0 | 15.4.0+ | Minor | 🟢 Low |
| autoprefixer | ^10.4.21 | 10.4.22+ | Patch | 🟢 Low |
| postcss | ^8.5.6 | 8.5.7+ | Patch | 🟢 Low |
| jest | 30.2.0 | 30.2.1+ | Patch | 🟢 Low |
| ts-jest | 29.4.4 | 29.4.5+ | Patch | 🟢 Low |
| ts-node | 10.9.2 | 10.9.3+ | Patch | 🟢 Low |
| eslint-plugin-import | ^2.32.0 | 2.32.1+ | Patch | 🟢 Low |

### 🟡 MEDIUM PRIORITY - Major Version Updates (Review Needed)

| Package | Current | Latest | Type | Breaking Changes | Risk |
|---------|---------|--------|------|-------------------|------|
| eslint | ^9.36.0 | 10.x | Major | Config changes | 🟡 Medium |

### 🔴 LOW PRIORITY - Optional/Nice-to-Have

| Package | Current | Latest | Type | Notes |
|---------|---------|--------|------|-------|
| @swc/core | 1.13.5 | 1.14.0+ | Minor | Optional optimization |

## Recommendations

### Immediate Actions (Next PR - PR #2)
✅ Update all 🟢 **LOW RISK** patch/minor versions in a single batch PR
- Estimated time: 1-2 days
- Testing: Standard build + test suite

**Affected Packages (11 total):**
```bash
npm update @types/node @types/jest @types/express prettier cypress autoprefixer postcss jest ts-jest ts-node eslint-plugin-import
```

### Follow-up Actions (PR #3+)
🟡 **eslint v10 migration** - Separate PR with:
- Config file review and updates
- ESLint v10 breaking changes documentation
- Testing: Full lint suite
- Timeline: 1-2 days

## Detailed Package Analysis

### @types/node
- **Current:** ^24.6.0
- **Latest:** 26.0.0+
- **Change:** Minor version bump
- **Action:** Update safely

### @types/jest
- **Current:** 30.0.0
- **Latest:** 31.0.0+
- **Change:** Minor version bump  
- **Action:** Update safely

### eslint
- **Current:** ^9.36.0
- **Latest:** 10.x
- **Change:** Major version bump
- **Breaking Changes:** Config system changes
- **Action:** Create separate PR with migration guide

### cypress
- **Current:** 15.3.0
- **Latest:** 15.4.0+
- **Change:** Patch/minor updates
- **Action:** Update safely

### postcss
- **Current:** ^8.5.6
- **Latest:** 8.5.7+
- **Change:** Patch updates
- **Action:** Update safely

### jest
- **Current:** 30.2.0
- **Latest:** 30.2.1+
- **Change:** Patch updates
- **Action:** Update safely

## Testing Strategy

### PR #2 (Patch/Minor Updates)
```bash
npm install
npm run build
npm run test
npm run lint
npm run nx:build ngx-gtm
```

### PR #3 (ESLint v10)
```bash
npm install
npm run lint --fix
npm run build
npm run test
npm run nx:build ngx-gtm
```

## Next Steps

1. ✅ Create PR #2: Update patch/minor versions
2. ⏳ Create PR #3: ESLint v10 migration
3. ⏳ Review for any additional critical updates

---

**Note:** Always run `npm audit` after updates to check for security vulnerabilities.
