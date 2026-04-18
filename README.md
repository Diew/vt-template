# Vite + TypeScript Vanilla Template

A professional, high-performance starter template tailored for **Test-Driven Development (TDD)** and **Token-Efficient** AI collaboration.

## 🚀 Key Features

- **Blazing Fast**: Optimized Vite 8.x build system with instant HMR.
- **TDD Native**: Pre-configured Vitest + JSDOM + Testing Library for full DOM testing.
- **Modern Reset**: Global CSS reset based on best practices for cross-browser consistency.
- **Unified Config**: Single `vite.config.ts` for both development and testing.
- **Production Ready**: Optimized asset hashing and build cleanup.
- **AI Optimized**: Minimalist boilerplate designed to save context tokens.

## 🛠️ Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Test Runner**: [Vitest](https://vitest.dev/)
- **DOM Simulation**: [jsdom](https://github.com/jsdom/jsdom)
- **CSS**: Vanilla CSS + Modern Reset

## 📋 Best For...

- **TDD Enthusiasts**: Build and test UI/Logic in a headless environment.
- **High-Performance Web Tools**: Mini-apps, calculators, and converters.
- **Landing Pages**: Cleanly structured and SEO-friendly foundations.
- **Vanilla JS/TS Purists**: No framework overhead, just pure native web technologies.

## 🕹️ Getting Started

### As a Template (Clone & Use)

```bash
# 1. Clone the repo
git clone https://github.com/<your-org>/vt-template.git my-app
cd my-app

# 2. Bootstrap — replace placeholders with your project name
node scripts/bootstrap.js "My App" 1.0.0

# 3. Install dependencies
npm install

# 4. Start developing
npm run dev
```

### Local Development

```bash
npm install
npm run dev
```

### Testing (TDD)

```bash
npm test
```

## 🤖 AI-Assisted Development

This template is designed to work seamlessly with AI assistants (like Roo).

**For template authors**: Work on this repo normally. The `agent.md` auto-detects template mode.

**For users**: After cloning, open the project with your AI assistant. It will read `agent.md` and `.template/AI_CONTEXT.md` to understand the project structure and help you initialize it immediately.

## 🏗️ Project Structure

- `src/main.ts`: App entry point.
- `src/style.css`: Stylesheet with Modern Reset.
- `src/app.test.ts`: Sample Logic & DOM tests.
- `vite.config.ts`: Unified build and test configuration.
- `agent.md`: AI assistant context (auto-detects template vs project mode).
- `.template/AI_CONTEXT.md`: Bootstrap instructions for AI assistants.

---

*Built for speed, testing, and efficiency.*
