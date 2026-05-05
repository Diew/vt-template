# REF_developer-reference — Reference tables and constants

> **Compact, not incomplete.** Never remove reference rows or constants to save space.

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

## Directory Structure

| Path | Contents |
|------|----------|
| `src/` | Active source code |
| `src/components/` | Reusable UI units |
| `src/css/` | All CSS files (tokens, visuals, layout) |
| `src/utils/` | Stateless helpers |
| `docs/` | Source of truth for behavior and architecture |
| `tests/` | Global test configurations and shared mocks |

---

## CSS Architecture Reference

| Layer | File pattern | Contains |
|-------|-------------|----------|
| Base | `tokens.css` | Design tokens, resets, layout utilities |
| Feature layout | `[feature]-layout.css` | Structural grids and containers |
| Feature visuals | `[feature]-visuals.css` | Thematic highlights, color injections |
| Global effects | `effects.css` | High-fidelity animations — immutable, never optimized |

---

## Shell & Environment

| Item | Notes |
|-------|-------|
| Default Shell | bash / zsh |
| PowerShell | Use `;` not `&` to chain; use `cmd /c` if profile loading blocked |
| Required tools | Node.js LTS, npm |

---

*v[x.y.z] - [YYYY-MM-DD]*
