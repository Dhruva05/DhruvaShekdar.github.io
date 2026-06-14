# Mini-DLSS Report Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize the detailed Mini-DLSS case study and hosted paper with the revised technical summary while leaving the homepage card unchanged.

**Architecture:** Add the revised report findings to the existing typed Mini-DLSS content module, consume them in the current case-study route, and replace the public PDF at its stable URL. Tests will lock the source-derived values and the revised PDF SHA-256 without depending on the external Mini-DLSS checkout during CI.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Vitest, static GitHub Pages export, PDF asset hosting.

---

### Task 1: Lock The Revised Report Contract

**Files:**
- Modify: `src/content/mini-dlss.test.ts`
- Modify: `src/content/portfolio.test.ts`

- [ ] **Step 1: Add failing report-fact assertions**

Import `miniDlssReportFacts` from `src/content/mini-dlss.ts` and assert:

```ts
expect(miniDlssReportFacts).toEqual({
  bestCheckpointStep: "80,000",
  trainingRunSteps: "150,000",
  tpsnrGainOverBicubic: "+0.2578 dB",
  temporalErrorEnergy: {
    temporal: "0.0105",
    bicubic: "0.0108",
    singleFrame: "0.0145",
  },
  onnxLatencyReduction: "38.2%",
  evaluationClip: "240 frames at 64x64 LR",
  singleFrameBaseline: "300-step pipeline baseline",
  reportTitle: "Technical Summary and Evaluation Report",
});
```

Read `src/app/projects/mini-dlss/page.tsx` and assert it references
`miniDlssReportFacts`, the target-relative temporal evidence, the ONNX latency
reduction, and the revised report title.

- [ ] **Step 2: Add a portable PDF checksum assertion**

Hash `public/papers/mini-dlss-technical-paper.pdf` with Node's `createHash` and
assert:

```ts
expect(pdfHash).toBe(
  "250bd2cebcefc30f7a049d34870ff7be31b32c756f6cb0ea5606bf8e1fda59cf",
);
```

This locks the exact revised PDF bytes without requiring the external source
repository in GitHub Actions.

- [ ] **Step 3: Assert the homepage card remains unchanged**

In `src/content/portfolio.test.ts`, retain and strengthen the existing
Mini-DLSS homepage assertion:

```ts
expect(miniDlss?.metrics).toEqual([
  { value: "38.33 dB", label: "PSNR-Y" },
  { value: "+1.52 dB", label: "over bicubic" },
  { value: "21.59 ms", label: "ONNX CPU / frame" },
]);
```

- [ ] **Step 4: Run the focused tests and verify RED**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts src/content/portfolio.test.ts
```

Expected: failures for the missing `miniDlssReportFacts`, missing route copy,
and stale PDF checksum. The homepage assertion must continue to pass.

### Task 2: Synchronize Content, Route Copy, And PDF

**Files:**
- Modify: `src/content/mini-dlss.ts`
- Modify: `src/app/projects/mini-dlss/page.tsx`
- Replace: `public/papers/mini-dlss-technical-paper.pdf`

- [ ] **Step 1: Add typed revised-report facts**

Add this export to `src/content/mini-dlss.ts`:

```ts
export const miniDlssReportFacts = {
  bestCheckpointStep: "80,000",
  trainingRunSteps: "150,000",
  tpsnrGainOverBicubic: "+0.2578 dB",
  temporalErrorEnergy: {
    temporal: "0.0105",
    bicubic: "0.0108",
    singleFrame: "0.0145",
  },
  onnxLatencyReduction: "38.2%",
  evaluationClip: "240 frames at 64x64 LR",
  singleFrameBaseline: "300-step pipeline baseline",
  reportTitle: "Technical Summary and Evaluation Report",
} as const;
```

- [ ] **Step 2: Update pipeline and results summaries**

Import `miniDlssReportFacts` in the route and update the existing page:

- Add a pipeline fact that states the best checkpoint occurred at 80,000 steps
  during a 150,000-step run.
- State that tPSNR improves by 0.2578 dB over bicubic.
- Add target-relative temporal error energy values: temporal 0.0105, bicubic
  0.0108, and single-frame 0.0145.
- Describe the single-frame row as a 300-step pipeline baseline.
- State that ONNX Runtime CPU latency is 38.2% lower than the PyTorch CPU demo
  on the same 240-frame, 64x64 LR clip.

Keep the official-REDS caveat and device-specific latency qualification.

- [ ] **Step 3: Update technical-paper framing**

Change the closing paper copy to call the PDF a concise
`Technical Summary and Evaluation Report`. Describe its coverage as scope and
claim boundaries, model design, data/evaluation protocol, final evidence,
deployment, limitations, and next steps.

- [ ] **Step 4: Replace the hosted PDF**

Copy:

```bash
cp /Users/dhruvashekdar/Documents/Mini-DLSS/Summary/summary.pdf \
  public/papers/mini-dlss-technical-paper.pdf
```

- [ ] **Step 5: Run focused tests and verify GREEN**

Run:

```bash
npm test -- src/content/mini-dlss.test.ts src/content/portfolio.test.ts
```

Expected: all focused tests pass.

### Task 3: Verify The Static Portfolio

**Files:**
- Modify only if verification exposes a defect.

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
npm run lint
GITHUB_ACTIONS=true npm run build
```

Expected: tests and lint pass, and the static export completes.

- [ ] **Step 2: Verify export content and assets**

Run:

```bash
test -f out/projects/mini-dlss/index.html
test -f out/papers/mini-dlss-technical-paper.pdf
rg -o "80,000|150,000|0.2578|0.0105|38.2%|Technical Summary and Evaluation Report" \
  out/projects/mini-dlss/index.html
shasum -a 256 out/papers/mini-dlss-technical-paper.pdf
```

Expected: every revised claim is present and the exported PDF hash is:

```text
250bd2cebcefc30f7a049d34870ff7be31b32c756f6cb0ea5606bf8e1fda59cf
```

- [ ] **Step 3: Validate the PDF and inspect the diff**

Run:

```bash
file public/papers/mini-dlss-technical-paper.pdf
gs -q -dNOPAUSE -dBATCH -sDEVICE=nullpage \
  public/papers/mini-dlss-technical-paper.pdf
git diff --check
git status --short
```

Expected: a valid PDF, no Ghostscript errors, no whitespace errors, and only
the planned case-study, test, PDF, spec, and plan files changed.
