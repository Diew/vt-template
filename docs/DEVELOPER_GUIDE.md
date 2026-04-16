# 🛠️ Developer Guide

This guide keeps the implementation rules that matter: naming conventions, testing standards, CSS governance, release hygiene, and environment constraints.

---

## 📑 Table of Contents
1. [📛 Naming Conventions](#-naming-conventions)
2. [🧪 TDD & CSS Governance](#-tdd--css-governance)
3. [⚙️ Pre-Commit Protocol](#-pre-commit-protocol-mandatory)
4. [🔢 Versioning Management](#-versioning-management)
5. [🛠️ Build Troubleshooting](#-build-troubleshooting)
6. [💻 Environment & Shell Constraints](#-environment--shell-constraints)

---

## 📛 Naming Conventions

> All names must be self-documenting — a reader should understand what it does without reading the implementation.

### Functions
Use `camelCase` + verb + noun — clearly describe the action and subject.

| ✅ Do | ❌ Don't |
|---|---|
| `getItemById` | `doStuff` |
| `calculateTotalCount` | `handleData` |
| `formatDateToISO` | `process` |
| `validateFormInput` | `fn1`, `helper` |

### Variables
Name should reveal intent and data type context.

| ✅ Do | ❌ Don't |
|---|---|
| `itemList` | `data` |
| `totalCount` | `val` |
| `retryCount` | `temp`, `x`, `flag` |

### Boolean Variables
Prefix with `is`, `has`, `can`, or `should`.

- ✅ `isAuthenticated`, `hasUnsavedChanges`, `canDelete`, `shouldRefetch`

### Event Handlers
Prefix with `handle` + event target + event.

- ✅ `handleSubmitClick`, `handleInputChange`, `handleModalClose`

### Async Functions
Use action-oriented names that reflect what is fetched or mutated.

- ✅ `fetchItemList`, `saveFormData`, `deleteItemById`

### Self-Documenting Variable Names (SSOT)

**Rule**: names must clearly indicate purpose and context.

| Bad | Good | Reason |
|---|---|---|
| `data` | `[context][Purpose]Data` | Specifies which data |
| `pool` | `[context][Purpose]Pool` | Describes content + purpose |
| `list` | `[context][Purpose]List` | Clear semantic meaning |

**Naming Template**: `[context][Purpose][Type]`

---

## 🧪 TDD & CSS Governance

### 1. Automated Testing
- Write tests before implementation (TDD).
- Use single-run mode for pre-commit checks; watch mode for development.
- Rule 1: no hardcoded color values outside the token/variable layer.
- Rule 2: component styles must not leak into global base styles.
- Rule 3: global layout constraints must stay centralized.

### 2. Modular CSS Architecture
- **Base / token file**: design tokens, resets, and layout utilities.
- **Component files**: scoped styles per feature module.
- No cross-component style leaking.

## ⚖️ Strict Policies
- **Language**: all internal docs, code comments, and agent context must be written in English.
- **CSS standards**:
  - No hardcoded color values outside the design token layer.
  - No redundant layout declarations.
  - Keep output readable; remove decorative comments and excess blank lines.
- **Git operations**: no push or commit without explicit user approval per action.

---

## ⚡ Performance Notes
- SSOT stays in the data model; presentation may cache repeated work, but it must not change logic.
- `fetchGames()` and `fetchRelationships()` load once per page session.
- `fetchCharacters()` reuses cached results when the requested `entityFilter` is already loaded.
- `stats-renderer.ts` caches avatar HTML and section HTML.
- These caches do not change processor logic, filter results, or data pools.
- `docs/FILTER_SYSTEM.md` is the filter reference; do not duplicate stats/filter logic here.

---

## ⚙️ Pre-Commit Protocol (MANDATORY)

Before any git commit:

1. Run the full test suite in single-run mode.
2. Verify whether a version bump is required; run the bump script if needed.
3. Update `CHANGELOG.md` and confirm `agent.md` reflects the current version.
4. Run the production build and confirm the bundle is clean.
5. Remove `console.log` calls, resolve TODOs, and verify no hardcoded color values were introduced.

---

## 🔢 Versioning Management

Uses **Single Source of Truth (SSOT)** versioning — `package.json` is the version source, injected at build time via `vite.config.ts` as `__APP_VERSION__`.

### Implementation Steps
```bash
npm run bump <version_number>
# Example: npm run bump 1.0.1
```
<!-- Replace with the project's bump script if not using npm. -->

Files automatically updated by the script:
- `package.json`
- `agent.md`
- `README.md`
- `docs/DEVELOPER_GUIDE.md` (footer timestamp)
- `CHANGELOG.md` (latest version header)

---

## 🛠️ Build Troubleshooting

### TypeScript: test files included in build compilation
- **Problem**: `npm run build` runs `tsc && vite build`. If `*.test.ts` files are not excluded, `tsc` fails on Node-only APIs in a browser target.
- **Solution**: exclude test files from `tsconfig.json`; Vitest handles them separately.
- **Implementation**: ensure `"exclude": ["src/**/*.test.ts"]` exists in `tsconfig.json`.

### [Add project-specific troubleshooting here]

---

## 💻 Environment & Shell Constraints

- **Shell**: bash / zsh (default). Document restrictions here if the team uses PowerShell or cmd.
- **Required global tools**: Node.js (LTS), npm
- **OS notes**: [add path separator or script execution notes if needed]

---

*Updated for v[x.y.z] - [YYYY-MM-DD]*