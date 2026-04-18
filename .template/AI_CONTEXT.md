# AI Bootstrap Context

> This file is read by AI assistants when a user opens a freshly cloned project.
> It tells the AI how to help the user initialize their project.

---

## 🎯 What This Is

This is a **vt-template** starter kit: Vite + TypeScript + Vitest + Vanilla CSS.

The user just cloned this repo. They need to:

1. **Rename the project** — replace all `[Project Name]` placeholders with their actual name.
2. **Set version** — replace `[x.y.z]` with their version number.
3. **Install dependencies** — `npm install`.
4. **Start developing** — `npm run dev`.

---

## 📋 AI Action Checklist

When a user opens a fresh clone, do the following:

1. **Detect template state** — check if `package.json.name` is `"vt-template"` or if files contain `[Project Name]`.
2. **Ask the user** for:
   - Their project name
   - Initial version number (e.g., `1.0.0`)
3. **Run the bootstrap script** (if available):
   ```bash
   node scripts/bootstrap.js <project-name> <version>
   ```
   If no bootstrap script exists, **manually replace** all placeholders:
   - `[Project Name]` → user's project name
   - `[x.y.z]` → user's version
   - `vt-template` → user's project name (in package.json, README, docs)
4. **Run `npm install`**.
5. **Verify** the project builds: `npm run build`.
6. **Confirm** to the user: project is ready to use.

---

## 📍 Files That Need Renaming

| File | What to Replace |
|------|-----------------|
| `package.json` | `"name"`, `"version"` |
| `agent.md` | `[Project Name]`, `[x.y.z]`, milestones |
| `README.md` | `[Project Name]` (if any), project description |
| `docs/GUIDE_developer.md` | `[x.y.z]` in footer |
| `CHANGELOG.md` | version header |

---

## ⚡ Quick Commands After Clone

```bash
# 1. Install
npm install

# 2. Develop
npm run dev

# 3. Test
npm test

# 4. Build
npm run build
```

---

*This file is consumed by AI assistants only. Do not commit to production.*
