# Todo List

A clean, fast, offline-friendly to‑do app built with React and TypeScript. Designed to be easy to use for everyday task management and easy to review for recruiters.

## Demo
- Live demo: [https://p1on.github.io/todolist/](https://p1on.github.io/todolist/)

## Features
- Create tasks and delete them when done.
- Toggle a task as done with a single click.
- Filter tasks by status (All, Active, Done).
- Search tasks with debounced input for responsive filtering.
- Settings panel with theme toggle, layout toggles, and fullscreen mode.
- Persistent state via `localStorage` (tasks, filters, and UI settings).

## Tech Stack
- React 19.2.4 + React DOM 19.2.4
- TypeScript 5.9.3
- Vite 7.3.1
- Vitest + Testing Library
- ESLint 9

## Project Structure
- `index.html`
- `vite.config.js`
- `tsconfig.json`
- `src/app.jsx`
- `src/components/`
- `src/contexts/`
- `src/providers/`
- `src/types/`
- `src/utils/`

## Getting Started
1. Install dependencies.
   `npm install`
2. Run the dev server.
   `npm run dev`
3. Open the app at `http://localhost:5173`.

## Scripts
- `npm run dev`: start local development server.
- `npm run build`: build production assets to `dist`.
- `npm run preview`: preview the production build locally.
- `npm run test`: run tests in watch mode.
- `npm run test:run`: run tests once (CI-friendly).
- `npm run lint`: lint the codebase.

## Usage Guide
1. Add a task in the input at the bottom of the page.
2. Click a task to toggle its done state.
3. Use the trash icon to delete a task.
4. Use the search field and status filters to find tasks fast.
5. Open Settings to toggle layout, theme, and fullscreen.

## Deployment
- GitHub Pages: set Vite base to `/todolist/` and deploy via `.github/workflows/deploy.yml`.
- Netlify: build command `npm run build`, publish `dist`.
- Other static hosts: deploy the `dist` directory as static assets.

## Notes for Recruiters
- Modular component architecture with reusable UI primitives.
- Global state management using React Context + reducer patterns.
- Persistent state stored in `localStorage` with validation and fallbacks.
- Accessible inputs and controls (labels, aria attributes, keyboard-friendly buttons).
- Test scaffolding with Vitest + Testing Library.

## Learn More
- Vite: [https://vitejs.dev](https://vitejs.dev)
- React: [https://react.dev](https://react.dev)
