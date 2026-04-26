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

## 📚 Documentation Priority
- `docs/` is the source of truth for behavior, architecture, and implementation rules.
- Keep `agent.md` aligned with `docs/` and treat it as supporting context.
- See `docs/GUIDE_developer.md` for naming conventions and coding standards.
- **Scope unclear?** Open `docs/ARCH_documentation-governance.md` first — task→load mapping is there.

## 🌐 Language Policy (MANDATORY)
- All docs, code comments, and agent context must be written in **English**.

## 📐 Development Strategy (MANDATORY)
- **TDD**: write or update tests before or during implementation.
- **Major changes**: run automated validation for structural changes.
- **Token Efficiency**: keep context modular; use English in internal docs and agent context. Prefer minimalist, focused code to reduce token weight.

### TDD Decision Rule
- Use TDD for any change that can affect data, routing, rendering output, or business logic.
- Skip heavy TDD for docs, copy, rename, formatting, or purely cosmetic edits.
- If behavior might change, add or update tests first.

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
- **Short and direct by default.** No intro, no recap, no outro unless asked.
- **Substance only.** No filler, no explanation of things not asked about.
- Answer the question. Stop. Do not pad.
- Use Markdown only when it genuinely helps (tables, code blocks).
- When unsure, ask **one** clarifying question — no assumptions.

## ❌ Common Mistakes to Avoid
- Do not refactor working code unless explicitly asked.
- Do not change unrelated files in the same edit.
- Do not assume; confirm before destructive actions (delete, overwrite).
- **Naming**: All names must be self-documenting — a reader should understand what it does without reading the implementation.

## 🛑 FAILURE CONDITION (CRITICAL)
- If any rule cannot be followed: **STOP immediately**.
- Explain why clearly.
- WAIT for explicit instruction before proceeding.

## ⚙️ Git Operations (MANDATORY)
- No push or commit without explicit user approval per action.
- Check version bump requirements before committing changes.

## 🛡️ Pre-Commit Protocol
1. **TEST**: `npm test -- --run`.
2. **VERSION**: verify if version bump is required; run `npm run bump <x.y.z>` if needed.
3. **DOCS**: write release notes in `CHANGELOG.md`. Update `agent.md` if policies or milestones change. On version change, run `npm run bump -- <x.y.z>`.
4. **BUILD**: `npm run build`.
5. **CLEAN**: remove debug logs and temporary scratch files.

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
| Web / UI Features | `agent.md` + `docs/GUIDE_developer.md` (+ `docs/STANDARDS_ui-visual.md` for deep UI) |
| Documentation Updates | `docs/ARCH_documentation-governance.md` |
