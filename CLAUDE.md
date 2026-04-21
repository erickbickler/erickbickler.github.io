# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website built with **Angular 11** showcasing projects and skills. Deployed to GitHub Pages.

## Common Commands

### Development
- **Start dev server**: `npm start` (serves on http://localhost:4200/)
- **Build for production**: `npm run build` (output: `dist/PortfolioWebsite/`)
- **Run unit tests**: `npm test` (Karma + Jasmine; headless: `ng test --watch=false`)
- **Run e2e tests**: `npm run e2e` (Protractor)
- **Lint code**: `npm run lint` (TSLint)
- **Deploy to GitHub Pages**: `ng deploy` (automatic deployment to gh-pages branch)

### Scaffolding
- **Generate component**: `ng generate component components/component-name`
- **Generate service**: `ng generate service service-name`
- **Generate other**: `ng generate [directive|pipe|service|class|guard|interface|enum|module]`

## Architecture

### Directory Structure
- **src/app/components/** - Reusable UI components (navbar, project-card, tool, etc.)
- **src/app/pages/** - Full-page components (about-page, projects-page, project-details-page)
- **src/app/Models/** - TypeScript interfaces and classes (project, tool, projects)
- **src/app/services/** - Angular services (ProjectService, HttpService)
- **src/assets/** - Static assets (images, data files)
- **src/environments/** - Environment-specific configuration

### Key Services
- **ProjectService** - Manages project data, likely fetched via HttpService
- **HttpService** - Wraps HttpClient for API calls

### Material Components
Uses Angular Material v11 with the **indigo-pink** prebuilt theme:
- MatCardModule (project cards)
- MatButtonModule (buttons)
- MatDividerModule (dividers)

### Data Flow
Pages route to different views via Angular Router. Components receive data from services (ProjectService), which fetch from the backend or static JSON via HttpService.

## Build Configuration

- **Build output**: `dist/PortfolioWebsite/`
- **AOT compilation**: Enabled by default
- **Production optimizations**: Enabled (optimization, vendorChunk: false, buildOptimizer: true)
- **Styles**: Global styles in `src/styles.css` + Material theme

## Testing

- **Unit tests**: Karma test runner with Jasmine framework. Test files colocated with components (*.spec.ts)
- **E2E tests**: Protractor. Tests in `e2e/` directory
- **Coverage**: Available via Karma coverage plugin

## Deployment

The project is deployed to GitHub Pages via `ng deploy` command. The `angular-cli-ghpages` package handles deployment to the gh-pages branch.
