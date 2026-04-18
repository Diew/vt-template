# 📚 Documentation Governance

Rules for what goes where, when to load it, and how to name it.

---

## Registry & Loading Guide

> One table. AI reads this to know what each file is, what it contains, and when to load it.
> **If a file is not here, register it before using it.**

| File | Contains | Must NOT contain | Load when |
|------|----------|-----------------|-----------|
| `agent.md` | Mode detection, response style, failure condition, commands, milestones | Naming details, TDD depth, CSS architecture | **Always** |
| `GUIDE_developer.md` | Naming conventions, TDD, versioning, build troubleshooting, shell constraints, basic UI (44px, tokens, layout) | Animation, banner patterns, engineering laws | Code / web features |
| `STANDARDS_ui-visual.md` | CSS tokens, animation, layout strategy, engineering laws, banner patterns, loading UX | Coding standards, naming, TDD | Deep UI / visual work |
| `ARCH_documentation-governance.md` | This file — registry, naming rules, maintenance protocol | Any implementation content | Updating / adding docs |

### Task → Load mapping

| Task | Load |
|------|------|
| General code | `agent.md` |
| Web / UI features | `agent.md` + `GUIDE_developer.md` |
| Deep UI (animation, banners) | + `STANDARDS_ui-visual.md` |
| Docs changes | `ARCH_documentation-governance.md` |

---

## Docs Naming Convention

Prefix tells AI the scope before reading content. Use this as fallback when a file is not in the registry.

| Prefix | Scope | Example |
|--------|-------|---------|
| `GUIDE_` | Implementation rules | `GUIDE_css-architecture.md` |
| `STANDARDS_` | Visual / design specs | `STANDARDS_motion.md` |
| `LOGIC_` | Business logic, algorithms | `LOGIC_scan-engine.md` |
| `ARCH_` | System architecture, data flow | `ARCH_state-management.md` |
| `REF_` | Reference tables, token lists | `REF_design-tokens.md` |

**Fixed names (no prefix, must not rename):** `agent.md`

**Fallback rule:** If a file is not in the registry → read prefix → load only if task matches → flag to user that registry needs updating.

---

## Maintenance Rules

**One rule above all: content exists in ONE file only. No duplication.**
**Compact, not incomplete: remove empty sections, never remove rules, edge cases, or reference rows to save space.**

### Adding a new doc
1. Pick prefix from naming convention table.
2. Register in the Registry table above (mandatory).
3. Add Table of Contents entry inside the new file.

### Moving content
1. Copy to destination → verify complete → delete from source → update any references.

### Editing existing files
- `agent.md`: AI behavior only. No implementation detail.
- `GUIDE_*`: Coding standards + basic UI. No deep visual rules.
- `STANDARDS_*`: Visual/interaction only. No coding standards.
- Registry table: update immediately when any file is added, renamed, or removed.

---

*Updated for v[x.y.z] - [YYYY-MM-DD]*