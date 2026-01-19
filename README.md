This project is configured with Vite for a lightweight React development experience.

Getting Started
Prerequisites
- Node.js (>= 14)
- npm (comes with Node.js)
- Git

Quick Start
1) Install dependencies
   npm install
2) Run the development server
   npm run dev
   Open http://localhost:5173 in your browser
3) Develop
   Make changes; the app hot-reloads automatically
4) Build for production
   npm run build
   The output is placed in dist
5) Preview the production build locally
   npm run preview

Deployment
- Build the app
  npm run build
- Deploy the contents of the dist directory to your hosting provider (Netlify, Vercel, GitHub Pages, etc.)
- Netlify: add netlify.toml with:
  [build]
  command = "npm run build"
  publish = "dist"
- Vercel or other static hosts: configure to deploy dist as static assets; most platforms detect Vite builds automatically.

Project Structure
- index.html
- vite.config.js
- tsconfig.json
- README.md
- package.json
- public/
- src/
  - app.jsx
  - components/
  - contexts/
  - providers/
  - types/
  - utils/

Tech Stack
- Frontend: React 19.2.3, TypeScript 4.7.3
- Build tooling: Vite 7.x, vite.config.js
- Runtime: modern browser JavaScript (ES2022)
- Testing: to be integrated with your preferred framework (e.g., Vitest/Jest) if you add one

Why this setup
- Lightweight dev server, fast refresh
- Clear separation of concerns with a modular src structure
- Easy deployment with a single build output

Usage notes
- The app runs on http://localhost:5173 by default; you can modify the port in vite.config.js if needed.
- You can customize themes, add more features, and adapt the project structure as your needs evolve.

Learn More
- Vite: https://vitejs.dev
- React: https://reactjs.org

Code quality and maintenance
- TypeScript strict mode is enabled; ensure to add types for new modules
- Consider adding tests and linting if you want to raise code quality further
