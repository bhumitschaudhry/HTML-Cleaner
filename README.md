# HTML Cleaner (Strip Head/Script/Style)

Small React + Vite + Tailwind app that strips common non-body elements from pasted HTML source and returns a cleaned output you can copy.

**What it removes**
- `<!DOCTYPE>`
- `<head>...</head>`
- `<script>...</script>`
- `<style>...</style>`
- `<noscript>...</noscript>`
- `<link ...>`
- `<meta ...>`

**Tech stack**
- React 19
- Vite 7
- Tailwind CSS 4

**Getting started**
```bash
npm install
npm run dev
```

Open the local Vite URL, paste your HTML, click **Clean HTML**, and optionally **Copy Output**.

**Scripts**
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run deploy` — build and publish `dist` to GitHub Pages

**Notes**
- The cleaner uses regex-based stripping (see `src/App.tsx`), not a full HTML parser.
- Clipboard copy uses the browser Clipboard API and may require permissions in some environments.
