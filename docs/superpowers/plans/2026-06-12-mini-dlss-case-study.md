# Mini-DLSS Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a concise Mini-DLSS homepage card and a complete evidence-first case-study page with final metrics, real media, technical diagrams, caveats, repository link, and downloadable paper.

**Architecture:** Keep homepage project data in `src/content/portfolio.ts`, add detailed case-study content in a focused `src/content/mini-dlss.ts` module, and compose the new static route from small server components under `src/components/projects/mini-dlss/`. Reuse the existing global editorial design system and base-path helper for all internal links and public assets.

**Tech Stack:** Next.js 15 App Router, React 18 server components, TypeScript, CSS, Vitest, native HTML video, ffmpeg.

---

### Task 1: Lock Homepage And Case-Study Content Contracts

**Files:**
- Modify: `src/content/portfolio.test.ts`
- Modify: `src/content/portfolio.ts`
- Create: `src/content/mini-dlss.test.ts`
- Create: `src/content/mini-dlss.ts`

- [ ] **Step 1: Write failing homepage tests**

Add assertions that the Mini-DLSS project exposes:

```ts
expect(miniDlss?.metrics).toEqual([
  { value: "38.33 dB", label: "PSNR-Y" },
  { value: "+1.52 dB", label: "over bicubic" },
  { value: "21.59 ms", label: "ONNX CPU / frame" },
]);
expect(miniDlss?.caseStudyHref).toBe("/projects/mini-dlss");
expect(miniDlss?.caveat).toContain("local Vimeo-derived REDS-style");
```

- [ ] **Step 2: Write failing case-study content tests**

Create `src/content/mini-dlss.test.ts` and assert the approved metrics, results
rows, caveats, repository URL, paper path, video path, poster path, and two
still-image paths.

- [ ] **Step 3: Run tests and verify RED**

Run:

```bash
npm test -- src/content/portfolio.test.ts src/content/mini-dlss.test.ts
```

Expected: failures for missing `caseStudyHref`, old metrics, and missing
`mini-dlss` content module.

- [ ] **Step 4: Implement minimal typed content**

Extend `Project` with:

```ts
caseStudyHref?: string;
```

Update the homepage Mini-DLSS metrics and caveat. Create typed exports in
`src/content/mini-dlss.ts` for:

```ts
export const miniDlssMetrics = [
  { value: "38.3265 dB", shortValue: "38.33 dB", label: "PSNR-Y" },
  { value: "+1.5231 dB", shortValue: "+1.52 dB", label: "over bicubic" },
  { value: "36.6018 dB", shortValue: "36.60 dB", label: "tPSNR" },
  { value: "21.589 ms", shortValue: "21.59 ms", label: "ONNX CPU / frame" },
  { value: "0.716M", shortValue: "0.716M", label: "parameters" },
];
```

Also export the three result rows, architecture stages, pipeline stages,
limitations, future-work items, and asset/link constants.

- [ ] **Step 5: Run tests and verify GREEN**

Run:

```bash
npm test -- src/content/portfolio.test.ts src/content/mini-dlss.test.ts
```

Expected: all selected tests pass.

### Task 2: Add And Validate Public Evidence Assets

**Files:**
- Create: `public/projects/mini-dlss/comparison-10s.mp4`
- Create: `public/projects/mini-dlss/comparison-preview.webp`
- Create: `public/projects/mini-dlss/sample-0004.webp`
- Create: `public/projects/mini-dlss/sample-0007.webp`
- Create: `public/papers/mini-dlss-technical-paper.pdf`
- Modify: `src/content/mini-dlss.test.ts`

- [ ] **Step 1: Add failing asset existence assertions**

For every local asset path exported from `src/content/mini-dlss.ts`, assert:

```ts
expect(existsSync(path.join(process.cwd(), "public", assetPath))).toBe(true);
```

- [ ] **Step 2: Run the asset test and verify RED**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: failures naming the five missing public assets.

- [ ] **Step 3: Create the public asset directories**

Run:

```bash
mkdir -p public/projects/mini-dlss public/papers
```

- [ ] **Step 4: Convert and copy project media**

Run:

```bash
ffmpeg -y \
  -i /Users/dhruvashekdar/Documents/Mini-DLSS/results/final/videos/final_temporal_vsr_5f_small_2x/all_val_comparison_10s_labeled.mp4 \
  -c:v libx264 -crf 20 -pix_fmt yuv420p -movflags +faststart -an \
  public/projects/mini-dlss/comparison-10s.mp4

ffmpeg -y \
  -i /Users/dhruvashekdar/Documents/Mini-DLSS/results/final/videos/final_temporal_vsr_5f_small_2x/all_val_comparison_preview.png \
  -c:v libwebp -quality 84 \
  public/projects/mini-dlss/comparison-preview.webp

ffmpeg -y \
  -i /Users/dhruvashekdar/Documents/Mini-DLSS/results/final/videos/final_temporal_vsr_5f_small_2x/images/sample_0004.png \
  -c:v libwebp -quality 84 \
  public/projects/mini-dlss/sample-0004.webp

ffmpeg -y \
  -i /Users/dhruvashekdar/Documents/Mini-DLSS/results/final/videos/final_temporal_vsr_5f_small_2x/images/sample_0007.png \
  -c:v libwebp -quality 84 \
  public/projects/mini-dlss/sample-0007.webp

cp /Users/dhruvashekdar/Documents/Mini-DLSS/Summary/summary.pdf \
  public/papers/mini-dlss-technical-paper.pdf
```

- [ ] **Step 5: Validate media formats**

Run:

```bash
ffprobe -v error \
  -show_entries stream=codec_name,width,height,pix_fmt \
  -of default=noprint_wrappers=1 \
  public/projects/mini-dlss/comparison-10s.mp4

file public/projects/mini-dlss/*.webp \
  public/papers/mini-dlss-technical-paper.pdf
```

Expected: H.264 video using `yuv420p`, valid WebP images, and a valid PDF.

- [ ] **Step 6: Run the asset test and verify GREEN**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: all asset assertions pass.

### Task 3: Add The Internal Homepage Case-Study Link

**Files:**
- Modify: `src/components/projects/project-list.tsx`
- Modify: `src/content/portfolio.test.ts`

- [ ] **Step 1: Use the failing content assertion from Task 1**

Confirm the project object requires `caseStudyHref`.

- [ ] **Step 2: Render the internal link before external links**

In `ProjectList`, render:

```tsx
{project.caseStudyHref ? (
  <Link href={assetPath(project.caseStudyHref)}>
    Read case study
    <ArrowUpRight aria-hidden="true" />
  </Link>
) : null}
```

Keep repository and demo links unchanged.

- [ ] **Step 3: Run homepage content tests**

Run:

```bash
npm test -- src/content/portfolio.test.ts
```

Expected: all homepage content tests pass.

### Task 4: Build Focused Mini-DLSS Case-Study Components

**Files:**
- Create: `src/components/projects/mini-dlss/metric-strip.tsx`
- Create: `src/components/projects/mini-dlss/process-flow.tsx`
- Create: `src/components/projects/mini-dlss/results-table.tsx`
- Create: `src/components/projects/mini-dlss/comparison-media.tsx`

- [ ] **Step 1: Add component source-presence tests**

Extend `src/content/mini-dlss.test.ts` to read the planned component files and
assert:

```ts
expect(comparisonMediaSource).toContain("autoPlay");
expect(comparisonMediaSource).toContain("muted");
expect(comparisonMediaSource).toContain("playsInline");
expect(comparisonMediaSource).toContain("controls");
expect(resultsTableSource).toContain("<table");
expect(resultsTableSource).toContain("<caption");
```

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: failures because the component files do not exist.

- [ ] **Step 3: Implement the components**

Build:

- `MetricStrip`: semantic `<dl>` over the five metrics.
- `ProcessFlow`: ordered `<ol>` stages with labels and descriptions.
- `ResultsTable`: captioned semantic table, visually marking the temporal row.
- `ComparisonMedia`: native video with `autoPlay`, `muted`, `loop`,
  `playsInline`, `controls`, `preload="metadata"`, poster, source, and caption.

All internal assets must pass through `assetPath`.

- [ ] **Step 4: Run tests and verify GREEN**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: all component-contract tests pass.

### Task 5: Compose The Static Case-Study Route

**Files:**
- Create: `src/app/projects/mini-dlss/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/content/mini-dlss.test.ts`

- [ ] **Step 1: Add failing route-content assertions**

Read the route source and assert it contains the approved section headings:

```ts
[
  "The result",
  "The reconstruction problem",
  "BasicVSRMini",
  "From dataset to deployment",
  "Measured results",
  "Qualitative evidence",
  "Limits and next steps",
  "Read the technical paper",
]
```

Also assert sitemap source contains `/projects/mini-dlss`.

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: failures because the route is missing.

- [ ] **Step 3: Implement route metadata and composition**

Create `page.tsx` with:

- Route metadata and canonical URL
- Back-to-selected-work link
- Evidence-first introduction and actions
- `MetricStrip`
- `ComparisonMedia`
- Problem/scope split
- Architecture `ProcessFlow`
- Engineering pipeline `ProcessFlow`
- `ResultsTable`
- Two `next/image` qualitative stills
- Limitations and future work
- Closing PDF and repository callout

Use one `h1`, ordered `h2` headings, and existing button/text-link styles.

- [ ] **Step 4: Add the route to sitemap**

Add:

```ts
{
  url: `${siteUrl}/projects/mini-dlss`,
  lastModified: new Date("2026-06-12"),
  changeFrequency: "yearly",
  priority: 0.8,
}
```

- [ ] **Step 5: Run tests and verify GREEN**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: all route and sitemap assertions pass.

### Task 6: Add Responsive Editorial Styling

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add failing style contract assertions**

Assert `globals.css` includes:

```ts
expect(styles).toContain(".case-study");
expect(styles).toContain(".case-study__metrics");
expect(styles).toContain(".case-study__video");
expect(styles).toContain(".process-flow");
expect(styles).toContain(".results-table");
expect(styles).toContain("@media (max-width: 760px)");
```

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: failures for missing case-study selectors.

- [ ] **Step 3: Implement desktop and mobile styles**

Add contained styles for:

- Evidence-first header
- Five-column metric strip
- Full-width video and captions
- Editorial two-column text sections
- Reflowing process stages with CSS arrows
- Scroll-safe results table
- Two-image evidence gallery
- Limitations/future-work split
- Closing paper callout

At `max-width: 760px`, stack metrics, diagrams, splits, and gallery; preserve
video aspect ratio and prevent page-level overflow.

- [ ] **Step 4: Run tests and verify GREEN**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts
```

Expected: all style-contract tests pass.

### Task 7: Verify The Complete Portfolio

**Files:**
- Modify only if verification exposes defects.

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
npm run lint
GITHUB_ACTIONS=true npm run build
```

Expected: all tests pass, lint exits cleanly, and static export succeeds.

- [ ] **Step 2: Inspect the production export**

Verify:

```bash
test -f out/projects/mini-dlss/index.html
test -f out/projects/mini-dlss/comparison-10s.mp4
test -f out/papers/mini-dlss-technical-paper.pdf
rg -n "38.3265|Read the technical paper|local Vimeo-derived REDS-style" \
  out/projects/mini-dlss/index.html
```

Expected: all files and required copy exist.

- [ ] **Step 3: Run browser verification**

Start the production-like site, then verify:

- Homepage at desktop and mobile widths
- `/projects/mini-dlss/` at desktop, tablet, and mobile widths
- No horizontal overflow
- Video poster and source load
- Video is muted, autoplaying when permitted, inline, and controllable
- PDF and repository links resolve
- Back-to-work and site navigation links resolve
- All images load

- [ ] **Step 4: Capture and inspect screenshots**

Capture the homepage Mini-DLSS section and the case-study first viewport plus
downstream sections. Inspect layout, typography, palette, asset framing,
spacing, responsive behavior, and copy against the approved evidence-first
design.

- [ ] **Step 5: Review the final diff**

Run:

```bash
git diff --check
git status --short
git diff -- src public docs/superpowers/plans
```

Confirm no unrelated user changes were reverted or staged.
