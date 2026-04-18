# GUIDE_developer — Implementation rules for developers

> **Compact, not incomplete.** Remove sections with no content. Never remove rules, edge cases, or reference rows to save space.

---

## Rules

| Rule | Detail |
|------|--------|
| Language | All docs, code comments, agent context in English |
| No hardcoded colors | All color values must live in `:root` token layer only |
| No redundant layout | No duplicate layout declarations across files |
| 44px standard | All interactive controls (buttons, toggles, inputs, search) must be `44px` / `2.75rem` height — desktop and mobile |
| Git operations | No push or commit without explicit user approval |
| SSOT | Data logic lives in the model only; caches are presentation-layer only and must not alter logic or filter results |
| No cross-component leak | Component styles must not leak into global base styles |
| Centralized layout | Max-width and layout constraints defined once in base token file |
| TDD | Write or update tests before implementation for anything affecting data, routing, rendering, or business logic |
| Build safety | `tsconfig.json` must exclude `src/**/*.test.ts` — tsc must never process test files |

---

## Naming Conventions

All names must be self-documenting. Pattern: `[context][Purpose][Type]`

| Type | Pattern | ✅ Do | ❌ Don't |
|------|---------|-------|---------|
| Functions | `camelCase` verb + noun | `getItemById`, `formatDateToISO` | `doStuff`, `process`, `fn1` |
| Variables | reveal intent + type context | `itemList`, `retryCount` | `data`, `val`, `temp`, `x` |
| Booleans | prefix `is` / `has` / `can` / `should` | `isAuthenticated`, `canDelete` | `flag`, `check` |
| Event handlers | prefix `handle` + target + event | `handleSubmitClick`, `handleModalClose` | `onClick`, `doClick` |
| Async functions | action-oriented, reflect what is fetched | `fetchItemList`, `deleteItemById` | `getData`, `run` |

---

## Reference

### CSS Architecture

| Layer | File pattern | Contains |
|-------|-------------|----------|
| Base | `tokens.css` | Design tokens, resets, layout utilities |
| Feature layout | `[feature]-layout.css` | Structural grids and containers |
| Feature visuals | `[feature]-visuals.css` | Thematic highlights, color injections |
| Global effects | `effects.css` | High-fidelity animations — immutable, never optimized |

### Layout

| Item | Value |
|------|-------|
| Max width | `[1400px]` — centralized in base token file |
| Mobile sticky stack | Topbar → Navbar → Controlbar (top to bottom) |
| Scroll target fix | Always update `scroll-margin-top` when adding sticky components |

### Versioning

| Item | Detail |
|------|--------|
| Source of truth | `package.json` — injected at build as `__APP_VERSION__` |
| Bump command | `npm run bump <version>` |
| Files auto-updated | `package.json`, `agent.md`, `README.md`, `GUIDE_developer.md`, `CHANGELOG.md` |

### Pre-Commit Checklist

1. `npm test -- --run`
2. Version bump if needed → `npm run bump <x.y.z>`
3. Update `CHANGELOG.md`, confirm `agent.md` version matches
4. `npm run build` — confirm bundle clean
5. Remove `console.log`, resolve TODOs, verify no hardcoded colors

### Shell Constraints

| Shell | Notes |
|-------|-------|
| Default | bash / zsh |
| PowerShell | Use `;` not `&` to chain; use `cmd /c` if profile loading blocked |
| Required tools | Node.js LTS, npm |

---

## Edge Cases

- **Sticky Firefox**: verify mobile sticky behavior in Firefox before shipping — required target, confirm no jitter or double-collapse
- **Sticky regression**: if a sticky change breaks one view, roll back before adding another layer of sticky logic — never stack fixes
- **Cache invalidation**: cached data is display-only; if a cache affects filter results or logic output it must be removed

---

*v[x.y.z] - [YYYY-MM-DD]*