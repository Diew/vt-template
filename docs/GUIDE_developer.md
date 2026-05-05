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

### Zero-Loss Refactor Protocol

Use this workflow as the default for any file split, large refactor, or structural change:

1. **Audit** — Map all exports and identify concern groups before touching anything.
2. **Create targets** — Create destination files and copy content (do not delete source yet).
3. **Bridge** — Replace source logic with re-exports or adapters from destination files.
4. **Verify** — `npx tsc --noEmit` + `npm test -- --run` must both pass.
5. **Cut** — Delete source file/code and update imports to explicit paths only after behavior is stable.
6. **Verify again** — Repeat step 4 to confirm zero data/behavior loss.

> [!IMPORTANT]
> Do not skip the **Bridge** phase. It is the primary guardrail against broken imports and partial refactors in large codebases.

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

### Data Orchestration — Progress Tracking

For long-running initialization or data hydration:
- Use a centralized progress handler (e.g., `Tracker.setProgress(percent)`).
- Standard checkpoints: `10%` (Start), `40%` (Data loaded), `90%` (Pre-render), `100%` (Complete).
- Always ensure the progress bar is top-aligned and clearly visible during hydration.

---

## Reference

Detailed naming conventions, directory structure, and environment setup tables are moved to [REF_developer-reference.md](./REF_developer-reference.md).

---

## Edge Cases

- **Sticky Firefox**: verify mobile sticky behavior in Firefox before shipping — required target, confirm no jitter or double-collapse
- **Sticky regression**: if a sticky change breaks one view, roll back before adding another layer of sticky logic — never stack fixes
- **Cache invalidation**: cached data is display-only; if a cache affects filter results or logic output it must be removed

---

*v[x.y.z] - [YYYY-MM-DD]*