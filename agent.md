# [Project Name] - Agent Context

Documentation for AI Assistant regarding project standards and current state.

---

## 📌 MODE DETECTION (AUTO)

> Read this section FIRST. It determines how I should behave.

### Template Mode (default)
Triggered when `package.json.name` equals `"vt-template"` OR any file contains `[Project Name]` placeholder.

**Behavior:**
- I am working on the **template itself**.
- All development, testing, refactoring is normal.
- Do NOT ask the user to rename anything.
- Treat `[Project Name]`, `[x.y.z]` as intentional template markers.

### Project Mode
Triggered when `package.json.name` is something OTHER than `"vt-template"` AND no `[Project Name]` placeholders exist.

**Behavior:**
- I am working on a **real project** cloned from this template.
- Proceed with normal development tasks.
- If the user just cloned and hasn't renamed yet, suggest: `node scripts/bootstrap.js "Project Name" 1.0.0`.

**Current Mode:** `TEMPLATE MODE` (detected)

---

## 🛡️ Project Setup
- **Project Name**: [Project Name]
- **Version**: 1.1.1
- **Framework**: Vite + TypeScript
- **Testing**: Vitest + JSDOM
- **Styling**: Vanilla CSS + CSS Variable System
<!-- Replace Framework / Testing / Styling above if the stack differs. -->

## 📑 Documentation Governance (Recommended)
- `docs/` is the source of truth for behavior, architecture, and implementation rules.
- **Architecture & Workflow**: `docs/GUIDE_developer.md` (Process & logic).
- **Data & API Specs**: `docs/ARCH_technical-specs.md` (Constants & schemas).
- **Aesthetics & UI**: `docs/STANDARDS_ui-visual.md` (Visuals & CSS tokens).
- **Rule**: Keep visual implementation details isolated from core developer instructions to prevent accidental regressions.
- **CSS Surgery**: Never refactor CSS without following the **Zero-Loss Refactor Protocol** in `docs/GUIDE_developer.md`.
- **Scope unclear?** Open `docs/ARCH_documentation-governance.md` first — task→load mapping is there.

## 🌐 Language Policy (MANDATORY)
- All docs, code comments, and agent context must be written in **English**.

## 📐 Development Strategy (MANDATORY)
- **Workflow**: `verify → trace → build → confirm`. Never `guess → build → fix → repeat`.
- **TDD**: Write or update tests before or during implementation for any change affecting data, logic, or rendering.
- **Token Efficiency**: Keep context modular. Use English in internal docs and agent context. Prefer minimalist, focused code.

### TDD Decision Rule
- **Use TDD**: Changes affecting data integrity, routing, rendering output, or core business logic.
- **Skip TDD**: Docs, copy, rename, formatting, or purely cosmetic edits.

## 🎯 Goal-Driven Execution
**Principle**: verify → trace → build → confirm. Never guess → build → fix → repeat.

Before multi-step tasks, state a brief plan:
1. [Step] → verify: [check]

Transform vague tasks into verifiable goals before starting.

## ⚠️ AI Technical Governance (CRITICAL)
- **Build safety**: `npm run build` runs `tsc && vite build` — `tsc` must not process `*.test.ts` files.
- **TS config**: keep `"exclude": ["src/**/*.test.ts"]` in `tsconfig.json`.
- **Shell constraints**: use bash/zsh by default. Document any OS-specific restrictions here if the team uses Windows/PowerShell.
- **Test isolation**: Vitest handles test runtime; do not force `tsc` to support Node-only test APIs.

## 🗣️ Response Style (CRITICAL)
- **Short and direct.** No intro, recap, or filler. Substance only.
- **Writing Rules**: Drop articles (a/an/the), pleasantries, and hedging. Fragments OK.
- **Pattern**: `[thing] [action] [reason]. [next step].`
- **Auto-Clarity**: Revert to full sentences for security warnings or irreversible actions.

## ❌ Common Mistakes to Avoid
- **Changelog Vandalism**: Do not merge new work into old version entries. New task = new version header.
- **Scope Creep**: Do not change unrelated files in the same edit.
- **Assumptions**: Confirm before destructive actions (delete, overwrite).
- **Naming**: Names must be self-documenting.

## 🛑 FAILURE CONDITION (CRITICAL)
- If any rule cannot be followed: **STOP immediately**.
- Explain why clearly.
- WAIT for explicit instruction before proceeding.

## ⚙️ Git Operations (MANDATORY)
- No push or commit without explicit user approval per action.
- Check version bump requirements before committing changes.

## 🛡️ Pre-Commit Protocol
1. **TEST**: `npm test -- --run`.
2. **BUMP**: Run `npm run bump -- <x.y.z>` **BEFORE** adding notes to ensure metadata sync.
3. **DOCS**: Write release notes in `CHANGELOG.md` under the **new** header only.
4. **BUILD**: `npm run build`.
5. **CLEAN**: Remove `console.log`, temporary files, and debug artifacts.

## 🏁 Milestones
<!-- Check off items as they are completed. Add or remove items per project. -->
- [ ] Project scaffolding
- [ ] Test runner configured
- [ ] CI/CD pipeline set up
- [ ] CSS / design system baseline
- [ ] Production build verified
- [ ] [Add project-specific milestones here]

## 🛠️ Commands
<!-- Defaults assume Vite + TS. Replace if the stack differs. -->
- `npm run dev`: local development server.
- `npm test`: run tests.
- `npm run build`: production build.
- `npm run bump -- <x.y.z>`: sync version across `package.json`, `agent.md`, `README.md`, `docs/GUIDE_developer.md`, and `CHANGELOG.md`.

## 📚 Documentation Loading Guide

| Task Type | Load |
|---|---|
| General Code Work | `agent.md` only |
| Web / UI Features | `agent.md` + `docs/GUIDE_developer.md` |
| Reference Data | + `docs/REF_developer-reference.md` |
| Feature-specific Logic | + `docs/LOGIC_[feature].md` |
| Debugging / Stability | + `docs/INCIDENT_[case].md` |
| Deep UI / Visuals | + `docs/STANDARDS_ui-visual.md` |
| Debt Review / Planning | `docs/REFACTOR_TODO.md` |
| Documentation Updates | `docs/ARCH_documentation-governance.md` |
