# Vite + TypeScript Template (TDD Focused)

## Project Setup
- **Version**: 1.0.0
- **Template**: Vanilla TypeScript
- **Build Tool**: Vite (Optimized OutDir)
- **Testing**: Vitest + JSDOM + Testing Library (Unified Config)
- **Styling**: Vanilla CSS + Modern CSS Reset

## Development Strategy
- **TDD (Test-Driven Development)**: 
  - Write tests in `src/*.test.ts` before implementation.
  - Commands: `npm test` for watch mode, `npm test -- --run` for single execution.
- **Token Efficiency**: 
  - Unified configuration in `vite.config.ts`.
  - Minimalist style and logic to reduce token weight.
  - Descriptive naming to assist AI context.

## Technical Milestones
- [x] Initial Scaffolding (Vite + TS)
- [x] Template Cleanup (Minimal State)
- [x] Vitest & Vite Unified Configuration
- [x] JSDOM & Testing Library Integration
- [x] Modern CSS Reset (Josh Comeau base)
- [x] Optimized Production Build Config
- [x] Sample TDD Test Suite (Logic & DOM)
- [x] Dev Server Ready

## Commands
- `npm install`: Install project dependencies.
- `npm run dev`: Start local development server.
- `npm test`: Run Vitest in watch mode.
- `npm run build`: Build for production (outputs to `/dist`).
- `npm run preview`: Preview the production build locally.
