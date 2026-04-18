# STANDARDS_ui-visual — Visual and interaction specifications

> **Compact, not incomplete.** Remove sections with no content. Never remove rules, edge cases, or reference rows to save space.

---

## Rules

| Rule | Detail |
|------|--------|
| No magic numbers | All geometric and color properties must reference tokens in `tokens.css`. Never hardcode in components |
| SVG protocol | All icons must use inline SVGs with `stroke-width: 2.5`. No font icons, text symbols, or emojis |
| 44px standard | All primary interactive controls must be `44px` (`2.75rem`) height — absolute, desktop and mobile |
| Tactile feedback | Every interaction must have `:hover` background shift + `:active { transform: scale(0.96) }` |
| Refactor immunity | Animation blocks and complex visual filters must be copied exactly — never optimized or simplified |
| Rollback first | If logic verification suggests breakage, revert before adding another change |
| No raw loading text | Every fetch must use a unified loader component. Raw `"Loading..."` is not permitted |
| Anti-jitter | Unloaded images must be `opacity: 0` until `onLoad` completes |
| Overlay protocol | Toggling overlays requires both visual transition (`translateY`, `opacity`) AND `pointer-events: none` |
| State-driven display | Global state changes intercepted at wrapper level only — not in internal component styles |
| Flex resilience | Buttons/logos: `flex-shrink: 0`. Flex-child inputs: `min-width: 0` |

---

## Reference

### Design Tokens

| Token | Default | Usage |
|-------|---------|-------|
| `--uiControlHeightData` | `44px` | All primary interactive elements |
| `--uiControlRadiusData` | `[value]` | Cards and primary containers |
| `--uiGlassBlurAmountData` | `[value]` | backdrop-filter blur |
| `--header-control-height` | `44px` | UI containers and controls |
| `--card-btn-square-size` | `44px` | Square icon buttons |
| `--card-btn-pill-height` | `44px` | Text-based action pills |
| `--border-radius` | `8px` | Global corner rounding |
| `--colorBgDeep` | `[value]` | Base app background |
| `--colorAccentPrimary` | `[value]` | Primary actions |
| `--colorAccentStatus` | `[value]` | System status, progress highlights |

### Layout

| Viewport | Rule |
|----------|------|
| Mobile | Edge-to-edge (100% width), `0.5rem` internal padding |
| Desktop | Boxed at `[max-width]` for Header and Navbar layers |

### Animation

| Element | Effect |
|---------|--------|
| Cards hover | `transform: translateY(-4px)`, `0.3s cubic-bezier` |
| Link anchor icons | `scale(1.1)` + `filter: drop-shadow` on hover |

### Safety Banners

| Type | When | Style |
|------|------|-------|
| Warning | Destructive actions, critical alerts | Subtle red bg + red border |
| Info | Contextual tips, process explanation | Subtle accent bg + accent border |

- Every banner must open with a descriptive inline SVG (Warning Triangle / Info Circle)
- Destructive copy must state scope explicitly e.g. `DATABASE ONLY — physical files are unaffected`

### CSS Refactoring Protocol

| Step | Action |
|------|--------|
| 1 | Audit source code logic and existing CSS before touching anything |
| 2 | Map all selectors to components — move in small increments |
| 3 | Animation blocks: copy exactly, no optimization |
| 4 | Browser checks: optional, reserve for major architectural changes only |
| 5 | Breakage detected: revert immediately, do not layer fixes |

---

## Edge Cases

- **Project-specific animation tiers**: document custom character states or thematic effects here with their technical constraints
- **Sticky stack**: document per-view sticky behavior here when it deviates from default

---

*v1.1.1 - 2026-04-18*