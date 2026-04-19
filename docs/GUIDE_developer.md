# GUIDE_developer — Implementation rules for developers

> **Compact, not incomplete.** Remove sections with no content. Never remove rules, edge cases, or reference rows to save space.

---

## Rules

| Rule | Detail |
|------|--------|
| Language | All docs, code comments, agent context in English |
| No hardcoded colors | All color values must live in `:root` token layer only |
| No redundant layout | No duplicate layout declarations across files |
| Zero-Overwriting | Use precision edits instead of full-file overwrites to maintain context integrity and optimize token usage |
| 44px standard | All interactive controls (buttons, toggles, inputs, search) must be `44px` / `2.75rem` height — desktop and mobile |
| Git operations | No push or commit without explicit user approval |
| SSOT | Data logic lives in the model only; caches are presentation-layer only and must not alter logic or filter results |
| No cross-component leak | Component styles must not leak into global base styles |
| Centralized layout | Max-width and layout constraints defined once in base token file |
| TDD | Write or update tests before implementation for anything affecting data, routing, rendering, or business logic |
| Build safety | `tsconfig.json` must exclude `src/**/*.test.ts` — tsc must never process test files |

---

## Refactoring Standards

| Rule | Detail |
|------|--------|
| No unsolicited refactor | Never refactor working code unless explicitly asked — even if it violates standards above |

### When to Extract a Function

| Trigger | Action |
|---------|--------|
| Logic or template appears **2+ times** | Extract immediately — no exceptions |
| Function body exceeds **20 lines** | Extract inner logic into named helpers |
| Inline expression requires a comment to understand | Extract into a named function instead |
| Template string contains repeated HTML structure | Extract into a builder function |

### When to Split a File

| Trigger | Action |
|---------|--------|
| File exceeds **200 lines** | Review — split if multiple responsibilities exist |
| File exceeds **400 lines** | Split mandatory — one responsibility per file |
| File contains 2+ unrelated concept groups | Split regardless of line count |
| A function is reused across 2+ files | Move to a shared helper file |

### Module Structure Rules

| Rule | Detail |
|------|--------|
| One responsibility per file | A file does one thing: builds one section, processes one data type, or holds one group of helpers |
| Orchestrators stay thin | Entry-point files (e.g. `stats-renderer.ts`) contain only: data processing calls, cache logic, DOM injection, event binding — nothing else |
| Helpers are stateless | Helper/builder functions must be pure — no side effects, no DOM access, no global reads |
| Shared helpers live in one place | If 2+ files need the same helper, it goes in a dedicated `*-helpers.ts` file — never duplicated |
| Import direction is one-way | Helpers never import from orchestrators. Data processors never import from renderers |

### Order of Operations — Splitting a File

1. **Audit** — map all exports and identify concern groups before touching anything
2. **Create targets** — create destination files, copy content (do not delete source yet)
3. **Bridge** — replace source file with re-exports from destination files
4. **Verify** — `npx tsc --noEmit` + `npm test -- --run` must both pass
5. **Cut** — delete source file, update any imports that need explicit paths
6. **Verify again** — repeat step 4

### Code Structure — Starting a New File

Follow this order before writing implementation:

1. **Define the output** — what does this file return or render?
2. **Define the inputs** — what types/interfaces does it need?
3. **Write the interface/type first** — exported at the top
4. **Write helpers bottom-up** — smallest units first, composer last
5. **Export only what is needed** — keep internals unexported

### Anti-Patterns (Banned)

| Pattern | Why | Fix |
|---------|-----|-----|
| Inline SVG repeated across templates | Bloats every callsite, impossible to update | Extract to `anchorBtn()` or equivalent helper |
| Template literals with 3+ repeated HTML blocks | Copy-paste debt | Extract to builder function |
| Logic computed inside a template string | Untestable, unreadable | Extract to named variable or function before the template |
| One file doing data processing + rendering + event binding | Violates SRP, hard to cache | Split into processor / renderer / controller |
| Importing a full module just to use one constant | Creates unnecessary coupling | Move the constant to a shared constants file |

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