# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-16

### Changed
- Enhanced `agent.md` with critical rules: FAILURE CONDITION, Git Operations, updated Pre-Commit Protocol
- Added self-documenting naming convention rule to agent context

### Added
- Documentation templates in `docs/`: TEMPLATE.md (base structure)
- Template documentation for future project docs (API_GUIDE.md, COMPONENT_LIBRARY.md)
- Version bump script (`scripts/bump-version.js`)

## [1.0.0] - 2026-04-09

### Added
- Initial release of the Vite + TypeScript Vanilla Template.
- Support for **TDD** via Vitest.
- **JSDOM** and **Testing Library** pre-configured for DOM testing.
- **Unified config** (`vite.config.ts`) for build and test runners.
- Modern CSS Reset (based on Josh Comeau's best practices).
- Optimized production build configuration with asset organization.
- **README.md** and **agent.md** documentation.
- Sample TDD test suite verifying logic and DOM interactions.
