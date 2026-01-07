# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 Design System monorepo using npm workspaces. The main package is `@me/ui-vue3`, a component library with design tokens and reusable components.

## Common Commands

```bash
# Development
npm run dev:ui          # Start UI library dev server (port 5173)
npm run dev:docs        # Start VitePress documentation site

# Building
npm run build:ui        # Build UI library to dist/
npm run build           # Build all workspaces

# Testing (run from packages/ui-vue3)
npm run test            # Run Vitest in watch mode
npm run test:ui         # Run tests with Vitest UI
npm run test:coverage   # Generate coverage report
```

To run a single test file:
```bash
cd packages/ui-vue3
npx vitest run src/components/MeButton/MeButton.spec.ts
```

## Architecture

### Monorepo Structure
- `packages/ui-vue3/` - Vue 3 component library (main development focus)
- `apps/docs/` - VitePress documentation site

### Component Pattern

**New components** should use Single File Components (SFC) with Composition API:
```
{nome-kebab-case}/
├── {NomeComponente}.vue      # SFC com <script setup>
├── {NomeComponente}.spec.ts  # Vitest tests
└── {NomeComponente}.scss     # SCSS (opcional, para estilos complexos)
```

Key points:
- Use `<script setup lang="ts">` (Composition API)
- Props with `defineProps<Interface>()` and `withDefaults()`
- Emits with `defineEmits<>()` typed
- Styles use SCSS with design tokens and Tailwind CSS
- Follow BEM naming: `.me-{componente}__{elemento}--{modificador}`

### Slash Commands

- `/component {NomePascalCase}` - Criar novo componente seguindo os padrões
- `/migrate {NomePascalCase}` - Migrar componente Vue 2.7 para Vue 3

### Design Tokens

Design tokens are in `packages/ui-vue3/src/assets/scss/`:
- `_variables.scss` - Colors, sizes
- `_mixins.scss` - Effects, alignment, fonts

Enums for component variants are in `packages/ui-vue3/src/utils/enums/Enums.ts` (ButtonVariant, ComponentSize, TextSize, etc.)

### Exports

Main entry: `packages/ui-vue3/src/index.ts`
- Components are named exports
- CSS must be imported separately: `@me/ui-vue3/dist/style.css`

## Tech Stack

- Vue 3.5 with TypeScript
- Vite 7.3 (build tool)
- Vitest 4.0 with jsdom (testing)
- Tailwind CSS 4.1 + SCSS
- VitePress 1.0 (documentation)

## Requirements

- Node.js 18+
- npm 8+
