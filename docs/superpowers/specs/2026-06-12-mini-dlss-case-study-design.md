# Mini-DLSS Portfolio Case Study Design

## Objective

Add Mini-DLSS to the portfolio as:

1. A concise, recruiter-scannable homepage project card.
2. A dedicated technical case-study page at `/projects/mini-dlss`.
3. A locally hosted technical paper PDF linked from both the case study and
   the project evidence area.

The page must balance recruiter accessibility with research and engineering
depth. It will lead with measured evidence, then progressively explain the
problem, model, pipeline, evaluation, limitations, and technical paper.

## Source Material

The implementation will derive public claims and media from:

- `/Users/dhruvashekdar/Documents/Mini-DLSS/README.md`
- `/Users/dhruvashekdar/Documents/Mini-DLSS/Summary/summary.tex`
- `/Users/dhruvashekdar/Documents/Mini-DLSS/Summary/summary.pdf`
- `/Users/dhruvashekdar/Documents/Mini-DLSS/Summary/figures/*.tex`
- `/Users/dhruvashekdar/Documents/Mini-DLSS/results/final/`

The source repository is:

- `https://github.com/Dhruva05/Mini-DLSS`

## Content Contract

### Approved Measurements

The homepage and case study will use the final documented measurements:

- `38.3265 dB` PSNR-Y
- `+1.5231 dB` PSNR-Y over bicubic
- `36.6018 dB` tPSNR
- `21.589 ms/frame` ONNX Runtime CPU latency
- `0.716M` parameters
- Five low-resolution input frames
- Fixed `2x` output scale

The visible presentation may round these values to:

- `38.33 dB`
- `+1.52 dB`
- `36.60 dB`
- `21.59 ms`
- `0.716M`

Detailed labels, captions, or tables will retain enough precision to match the
source README.

### Required Qualifications

The page must clearly state:

- Mini-DLSS is DLSS-inspired and is not NVIDIA DLSS.
- The reported evaluation uses a local Vimeo-derived REDS-style validation and
  demo set, not the official REDS benchmark.
- The single-frame SR checkpoint is a fast-cycle pipeline baseline, not a
  budget-matched ablation against the temporal model.
- BasicVSRMini uses bidirectional ConvGRU propagation without explicit optical
  flow or deformable alignment.
- The webpage summarizes the project; the linked PDF contains the full
  mathematical, codebase, and research breakdown.

No claim may imply official REDS performance, NVIDIA implementation parity, or
a conclusive temporal-versus-single-frame ablation.

## Information Architecture

### Homepage

The existing Mini-DLSS project remains the first selected-work entry.

The card will:

- Keep its concise summary and project framing.
- Replace older measurements with final documented measurements.
- Show `38.33 dB PSNR-Y`, `+1.52 dB over bicubic`, and
  `21.59 ms/frame ONNX CPU`.
- Retain the existing comparison imagery.
- Add an internal `Read case study` link.
- Retain the external `View repository` link.

The homepage must remain easy to scan and must not absorb the detailed paper
content.

### Dedicated Route

Create a statically exportable Next.js route:

```text
/projects/mini-dlss
```

The route will use the existing site navigation and footer and will have
project-specific metadata.

### Page Order

1. Project introduction
2. Key measurements
3. Labeled comparison video
4. Problem and scope
5. BasicVSRMini architecture
6. Data, training, evaluation, and deployment pipeline
7. Quantitative results
8. Qualitative comparison stills
9. Limitations and future work
10. Technical paper and repository links

## Page Sections

### 1. Introduction

The opening section will contain:

- `Mini-DLSS`
- `Temporal video super-resolution`
- A short explanation of five-frame temporal reconstruction at `2x`
- A concise DLSS-inspired, not NVIDIA DLSS clarification
- `View repository`
- `Read technical paper`
- A link back to selected work

The first viewport must remain evidence-oriented and avoid a dense abstract.

### 2. Measurements

Use an editorial metric strip matching the homepage's visual language:

- PSNR-Y
- Improvement over bicubic
- tPSNR
- ONNX Runtime CPU latency
- Parameter count

The strip will include a nearby validation-context note rather than hiding the
benchmark qualification in a distant footer.

### 3. Comparison Video

Use the final labeled 10-second comparison:

```text
LR input | Bicubic | Temporal SR prediction | HR target
```

Behavior:

- Autoplay
- Muted
- Loop
- Inline playback
- Native controls
- Poster image
- Metadata preload

Autoplay will be disabled for users who prefer reduced motion. The video must
remain usable through native controls when autoplay is unavailable or blocked.

The source MP4 must be converted to H.264 with `yuv420p` and fast-start metadata
for reliable browser playback.

### 4. Problem And Scope

Explain:

- Why geometric resizing is insufficient
- Why framewise SR can flicker
- Why temporal context can recover repeated detail
- Why the project predicts the high-resolution center frame
- What is in scope: public VSR data, reproducible evaluation, MP4 demo, ONNX
- What is out of scope: engine motion vectors, depth buffers, proprietary DLSS
  reconstruction, and production game integration

### 5. Model Architecture

Create an accessible HTML/CSS diagram derived from the paper's
`model_flow.tex`:

```text
5-frame LR window
→ shared feature extraction
→ forward ConvGRU
→ backward ConvGRU
→ center-frame feature fusion
→ residual reconstruction
→ PixelShuffle 2x output
```

The diagram must:

- Use semantic text, not a rasterized screenshot of the paper.
- Reflow vertically on small screens.
- Avoid horizontal page overflow.
- Include a concise explanation of the center-frame prediction contract.

The page will not reproduce the paper's full equations.

### 6. Engineering Pipeline

Create a second HTML/CSS flow derived from the architecture, training, and
inference TikZ figures:

```text
Configs and manifests
→ temporal dataset windows
→ PyTorch training and validation
→ PSNR / SSIM / temporal evaluation
→ checkpoints, tables, and comparison media
→ ONNX export and MP4 inference
```

Supporting copy will cover:

- Vimeo-90K septuplet training data
- Non-overlapping split manifests
- Local Vimeo-derived REDS-style validation data
- Config-driven runs and checkpointing
- Y-channel metrics with a two-pixel border crop
- ONNX export with fixed temporal length and dynamic spatial axes

### 7. Quantitative Results

Include a compact comparison table:

| Method | PSNR-Y | SSIM-Y | tPSNR | diff energy |
| --- | ---: | ---: | ---: | ---: |
| Bicubic | 36.8033 | 0.9601 | 36.3441 | 0.0217 |
| Single-frame fast cycle | 32.3755 | 0.8807 | 33.8817 | 0.0183 |
| Temporal SR 5f small | 38.3265 | 0.9604 | 36.6018 | 0.0201 |

The table must visually identify the temporal model without implying that the
single-frame result is a budget-matched comparison.

Add the measured runtime evidence:

- PyTorch CPU demo: `34.941 ms/frame`
- ONNX Runtime CPU: `21.589 ms/frame`

Avoid converting these numbers into device-independent real-time claims because
the measurement is machine-specific.

### 8. Qualitative Evidence

Use real final comparison stills from the Mini-DLSS repository. Select two
representative frames that:

- Show the four-panel comparison clearly.
- Complement rather than duplicate the video.
- Remain readable on desktop and mobile.

Each image will have an accurate caption and useful alternative text.

### 9. Limitations And Future Work

Present limitations as engineering judgment rather than disclaimers:

- No explicit optical-flow or deformable alignment
- Redundant work across overlapping inference windows
- Local validation rather than official REDS evaluation
- Single-frame baseline is not budget-matched
- Global frame-difference energy can penalize legitimate motion
- Model predicts one center frame per window

Future work:

- Official REDS evaluation
- Budget-matched single-frame training
- Three-, five-, and seven-frame ablations
- Flow- or deformable-alignment experiments
- Cached recurrent inference
- Quantization or mixed precision

### 10. Paper And Repository

Copy the compiled PDF into the portfolio's public assets with a stable,
human-readable filename:

```text
public/papers/mini-dlss-technical-paper.pdf
```

The closing section will link to:

- The local PDF
- The GitHub repository

The PDF link will open in a new tab and identify the destination as a PDF.

## Visual System

The case study must extend the current portfolio design rather than introduce a
new theme.

Reuse:

- `--canvas`, `--surface`, `--ink`, `--muted`, `--line`, and `--blue`
- Instrument Sans
- IBM Plex Mono
- Thin editorial rules
- Existing page width and gutter variables
- Existing button and text-link styles

Add project-specific styles only for:

- Case-study header
- Measurement strip
- Video frame
- Architecture and pipeline flows
- Results table
- Qualitative media layout
- Limitations and paper callout

Avoid:

- Generic card grids
- Decorative gradients or glows
- New font families
- Dense paper-like body typography
- Rasterized diagrams when semantic HTML can represent the same information

## Components And Data

### Data Model

Extend `Project` only as needed for internal case-study links. Prefer a small,
explicit field such as:

```ts
caseStudyHref?: string;
```

Do not encode the full case-study document in the homepage content object.

### Components

The new route may use focused local components for:

- Project metric strip
- Comparison video
- Process flow
- Results table
- Evidence gallery

Keep components server-rendered unless client behavior is required. Reduced
motion video behavior may use CSS media queries and standard video attributes
without introducing an animation library.

## Asset Plan

Copy and optimize:

- Technical paper PDF
- Labeled 10-second comparison video converted to H.264
- Existing preview image as the video poster
- Two final full comparison stills

Use base-path-aware URLs through `assetPath` because the site deploys to a
GitHub Pages project path.

Do not expose checkpoints, ONNX weights, training data, or local filesystem
paths.

## Metadata And Navigation

The dedicated route will define:

- Page title
- Description
- Canonical URL
- Open Graph title and description

Use the comparison preview as the social image if the current static metadata
configuration supports a base-path-aware local image cleanly.

The page must preserve:

- Site-wide navigation
- Skip link behavior
- Footer
- Keyboard focus styling

## Accessibility

- Use a single page-level `h1`.
- Maintain ordered heading levels.
- Give the video an adjacent text description.
- Provide accurate image alternative text.
- Use semantic table markup and a visible caption.
- Ensure process diagrams remain understandable as text without color.
- Maintain visible focus states.
- Respect `prefers-reduced-motion`.
- Keep touch targets at least as large as existing site controls.

## Responsive Behavior

Desktop:

- Wide editorial introduction
- Horizontal metric strip
- Full-width media
- Multi-column architecture and pipeline flows

Mobile:

- Single-column content
- Wrapped or stacked metrics
- Vertically reflowed diagrams
- Scroll-safe results table within its own labeled region if necessary
- Full-width video and images
- No page-level horizontal overflow

## Testing And Verification

### Content Tests

Update tests to verify:

- Mini-DLSS homepage metrics use the final documented values.
- The internal case-study link exists.
- The paper, poster, video, and still-image assets exist.
- The benchmark qualification remains present.
- The repository link remains present.

### Build Checks

Run:

```bash
npm test
npm run lint
GITHUB_ACTIONS=true npm run build
```

### Browser Verification

Verify:

- Homepage Mini-DLSS card at desktop and mobile widths
- Dedicated page at desktop, tablet, and mobile widths
- No horizontal overflow
- Video poster and playback source load
- Autoplay is muted and inline
- Native controls work
- PDF link opens the local paper
- Repository link opens the correct GitHub repository
- Navigation and back-to-work link work
- All images load with the production base path

### Visual Acceptance

The result is accepted when:

- The homepage remains concise.
- Measurements and validation context are immediately understandable.
- The video is the primary evidence.
- Technical diagrams are legible without reading the PDF.
- The case study feels like part of the existing portfolio.
- The page gives recruiters a fast scan and researchers a credible technical
  path into the project and paper.

## Out Of Scope

- Running live model inference in the browser
- Hosting checkpoint or ONNX weight files
- A Gradio or Python backend
- Recompiling or rewriting the technical paper
- Official REDS evaluation
- Training new models or baselines
- Adding unrelated portfolio projects or redesigning the site
