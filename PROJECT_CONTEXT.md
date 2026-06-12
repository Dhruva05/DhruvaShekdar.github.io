# Portfolio Rewrite Project Context

Last updated: June 12, 2026
Repository: `DhruvaShekdar.github.io`
Branch: `main`
Status: implementation and local validation complete; deployment remains

## Overall Goal

Build a premium, recruiter-focused portfolio for AI/ML, robotics, computer
vision, autonomy, and systems roles. A recruiter should understand Dhruva's
specialty, strongest evidence, and interview value within 20-30 seconds, then
have immediate access to Resume, GitHub, LinkedIn, and Email.

The site is intentionally optimized for credibility and conversion rather than
visual spectacle. The legacy HTML template was treated as disposable.

## Current Architecture

- Next.js 15.5.18 App Router and React 18.3.1.
- TypeScript with strict checking.
- Static export through `output: "export"`.
- GitHub Pages deployment through GitHub Actions.
- Tailwind CSS plus a custom global design system.
- Server Components throughout the current UI.
- No Framer Motion or client-side animation runtime.
- Lucide icons for the small number of interface icons.
- Typed content source in `src/content/portfolio.ts`.
- Self-hosted Instrument Sans and IBM Plex Mono.
- Vitest 4 content and asset-integrity tests.

### Source Structure

```text
src/
  app/
    fonts/
    globals.css
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    experience/experience-list.tsx
    hero/hero.tsx
    layout/footer.tsx
    layout/navigation.tsx
    projects/project-list.tsx
    proof/proof-strip.tsx
    ui/section.tsx
  content/
    portfolio.test.ts
    portfolio.ts
  lib/
    paths.ts
    utils.ts
```

## Work Completed

### Product and Content

- Reframed the site around: "Building AI systems for robotics and autonomous
  vehicles."
- Prioritized Ford, Critical Machine Learning Lab, Tesla, and WATonomous.
- Reduced selected work to Mini-DLSS and Hack the Move.
- Added three evidence-backed proof points above the fold.
- Rewrote all copy to use concrete systems, constraints, and outcomes.
- Made Resume, GitHub, LinkedIn, and Email directly accessible.
- Added explicit caveats where targets or benchmark context could be
  misrepresented.

### Design and UX

- Replaced the black neon/template aesthetic with a restrained editorial system.
- Removed the mandatory draggable intro, glow effects, card spam, and decorative
  animation.
- Established a neutral canvas, dark ink, one blue accent, thin rules, large
  whitespace, and a consistent responsive grid.
- Added a skip link, visible keyboard focus states, semantic landmarks, and
  reduced-motion handling.
- Verified desktop and mobile layouts without horizontal overflow.

### Engineering

- Removed the client-only application shell and local-storage intro state.
- Split the page into focused, reusable server-rendered components.
- Added typed portfolio data and content tests.
- Added base-path-aware assets for GitHub project-page deployment.
- Added ESLint and non-interactive lint configuration.
- Added self-hosted fonts to eliminate build-time network dependencies.
- Added canonical metadata, Open Graph, Twitter metadata, favicon metadata,
  JSON-LD, `robots.txt`, and `sitemap.xml`.
- Upgraded Next.js from 14.2.4 to 15.5.18 and applied a patched PostCSS
  override to clear dependency advisories.
- Reduced first-load JavaScript from roughly 139 KB to roughly 111 KB after the
  security and framework upgrade.
- Reduced public media from roughly 102 MB to roughly 596 KB.
- Converted large photographs and project graphics to optimized WebP files.

## Files Added or Rewritten

- `.eslintrc.json`
- `.github/workflows/deploy.yml`
- `.gitignore`
- `README.md`
- `PROJECT_CONTEXT.md`
- `next.config.mjs`
- `package.json`
- `package-lock.json`
- `postcss.config.js`
- `tailwind.config.ts`
- `tsconfig.json`
- `src/app/**`
- `src/components/**`
- `src/content/**`
- `src/lib/**`
- `public/images/**`

The legacy `index.html`, jQuery/Sass assets, Font Awesome webfonts, and root
`images/` library are deleted in the current worktree. These changes are still
uncommitted. The modified root `.DS_Store` predates this pass and must not be
reverted automatically.

## Key Decisions

1. Use a single-page recruiter journey rather than project modals or many routes.
2. Lead with specialty and evidence, not biography or a generic introduction.
3. Keep only work that reinforces physical-world AI and systems credibility.
4. Prefer native CSS transitions and static rendering over animation libraries.
5. Treat numerical claims conservatively and show benchmark caveats.
6. Use a project-page base path because the repository is owned by `Dhruva05`
   and is not the account's root GitHub Pages repository.
7. Keep images unoptimized at runtime because the site is statically exported;
   optimize source files before shipping instead.

## Current Public Assets

```text
public/images/CriticalML.png
public/images/favicon.svg
public/images/hack-the-move.webp
public/images/large-ford-logo-0.png
public/images/mini-dlss-comparison.webp
public/images/mini-dlss-latency.webp
public/images/tesla-giga-texas.webp
public/images/watonomous.webp
```

## Known Bugs and Risks

- No known functional UI bugs after local desktop, tablet, and mobile browser
  checks at 1280, 768, and 390 CSS pixels.
- The in-app browser integration was unavailable during the Mini-DLSS review.
  Local production checks succeeded with Playwright Chromium as a fallback.
- `npm audit` reports zero vulnerabilities.
- The production GitHub Pages deployment has not yet been run from this branch.
- The repository currently has a deleted `LICENSE.txt`; decide whether to restore
  or replace it before merging.

## Content Verification TODOs

- Confirm the exact validation split and comparison baseline for the Critical ML
  loss reduction from 2.03 to 0.69.
- Confirm whether WATonomous public copy may name keyboard pose estimation and
  its implementation details.
- Keep Ford's 300-600 ms execution and sub-3-second startup figures described as
  targets unless measured results are available.
- Keep Mini-DLSS results labeled as local REDS-style validation rather than the
  official REDS benchmark.
- Reconfirm that the Google Drive resume link remains public.

## Outstanding TODOs

- Run Lighthouse against a deployed or local production build when Chrome is
  available.
- Decide on repository licensing.
- Commit and deploy only after the user approves the final diff.

## Next Steps

1. Confirm the remaining content-verification items above.
2. Review the final diff for unsupported claims and decide on licensing.
3. Commit, push, and verify the GitHub Pages deployment when requested.

## Final Local Verification

Updated June 12, 2026:

- `npm test`: 18 tests passed.
- `npm run lint`: passed with no errors.
- `GITHUB_ACTIONS=true npm run build`: passed on Next.js 15.5.18.
- `npm audit`: zero vulnerabilities.
- Static export contains canonical metadata, JSON-LD, `robots.txt`, and
  `sitemap.xml`.
- Static export contains the Mini-DLSS case study, comparison media, qualitative
  stills, and linked technical paper PDF.
- Production asset URLs include `/DhruvaShekdar.github.io`.
- Browser checks found no horizontal overflow, broken images, console errors,
  or failed HTTP requests at desktop and mobile widths.
