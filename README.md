# Dhruva Shekdar Portfolio

Recruiter-focused portfolio for Dhruva Shekdar's work across AI systems,
robotics, computer vision, and autonomous systems.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm test
npm run lint
npm run build
```

## Architecture

- Next.js 15 App Router with TypeScript.
- Static export for GitHub Pages.
- Tailwind CSS plus a small global editorial design system.
- Server-rendered page structure with a small client media controller for
  reduced-motion-aware video playback.
- Typed portfolio content in `src/content/portfolio.ts`.
- Detailed Mini-DLSS case-study content in `src/content/mini-dlss.ts`.
- Self-hosted Instrument Sans and IBM Plex Mono fonts.
- Base-path-aware assets for local development and GitHub Pages.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`, build the static export,
and deploy `out/` through GitHub Pages.

The production base path is `/DhruvaShekdar.github.io`; local development uses
the domain root.

## Content Updates

Experience, proof points, profile links, and selected projects are maintained in
`src/content/portfolio.ts`. Keep claims evidence-backed and preserve caveats
where benchmark context or performance targets could otherwise be ambiguous.

The Mini-DLSS case study is available at `/projects/mini-dlss`. Its technical
content is maintained in `src/content/mini-dlss.ts`, with supporting media under
`public/projects/mini-dlss` and the linked paper under `public/papers`.
