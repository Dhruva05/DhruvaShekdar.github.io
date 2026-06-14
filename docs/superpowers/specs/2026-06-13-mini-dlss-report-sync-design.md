# Mini-DLSS Report Synchronization Design

## Objective

Synchronize the detailed Mini-DLSS portfolio case study with the revised
`Summary/summary.tex` and `Summary/summary.pdf` from the Mini-DLSS repository.
Keep the concise homepage project card unchanged because its headline metrics
remain accurate.

## Source Of Truth

The update is based on the current files in:

- `/Users/dhruvashekdar/Documents/Mini-DLSS/Summary/summary.tex`
- `/Users/dhruvashekdar/Documents/Mini-DLSS/Summary/summary.pdf`
- `/Users/dhruvashekdar/Documents/Mini-DLSS/Summary/README.md`

The revised report is dated June 14, 2026 and reframes the previous long-form
whitepaper as a concise technical summary and evaluation report.

## Content Changes

The detailed case study will add the revised report's supported findings:

- The best checkpoint occurred at 80,000 steps during a 150,000-step run.
- The temporal model improves tPSNR by 0.2578 dB over bicubic.
- Target-relative temporal error energy is 0.0105 for the temporal model,
  compared with 0.0108 for bicubic and 0.0145 for the undertrained
  single-frame checkpoint.
- ONNX Runtime CPU latency is 38.2% lower than the PyTorch CPU demo latency on
  the same 240-frame, 64-by-64 low-resolution clip.
- The single-frame comparison is explicitly a 300-step pipeline baseline and
  must not be interpreted as a fair temporal ablation.

The page will continue to state that the validation set is locally generated
from Vimeo-derived sequences in a REDS-style layout and is not an official
REDS benchmark result.

## Presentation

The existing evidence-first layout remains unchanged. Revised findings will be
integrated into the current sections:

- Training checkpoint context in the pipeline facts.
- tPSNR and target-relative temporal evidence in measured results.
- The 38.2% latency reduction in the deployment comparison.
- Updated technical-paper copy describing a concise technical summary and
  evaluation report.

No new homepage metric, component, route, diagram, or visual treatment is
required.

## PDF Synchronization

Replace `public/papers/mini-dlss-technical-paper.pdf` with the revised
`Summary/summary.pdf`. The public path remains stable, so existing paper links
continue to work without routing changes.

## Testing

Extend the Mini-DLSS content tests to require:

- The 80,000-step checkpoint and 150,000-step run context.
- The 0.2578 dB tPSNR improvement.
- The target-relative temporal error values.
- The 38.2% ONNX Runtime latency reduction.
- The 300-step single-frame qualification.
- Updated technical-summary wording.
- Exact byte equality between the hosted PDF and the revised source PDF.

Run the focused test first to verify the new assertions fail, then update the
content, route, and PDF. Finish with the full test suite, lint, static export,
and PDF/media link verification.

## Exclusions

- Do not modify the homepage Mini-DLSS card or its three headline metrics.
- Do not edit the Mini-DLSS source repository.
- Do not claim official REDS performance, DLSS equivalence, real-time
  performance across devices, or a fair single-frame comparison.
- Do not add unrelated portfolio changes.
