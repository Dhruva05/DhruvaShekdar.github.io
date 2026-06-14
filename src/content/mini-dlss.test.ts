import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import * as miniDlssContent from "./mini-dlss";

const {
  miniDlssArchitectureStages,
  miniDlssAssets,
  miniDlssFutureWork,
  miniDlssLimitations,
  miniDlssLinks,
  miniDlssMetrics,
  miniDlssPipelineStages,
  miniDlssResults,
} = miniDlssContent;

const expectedReportFacts = {
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
};

describe("Mini-DLSS case-study content", () => {
  it("has a dedicated typed content module", () => {
    const contentPath = path.join(
      process.cwd(),
      "src/content/mini-dlss.ts",
    );

    expect(existsSync(contentPath)).toBe(true);
    expect(readFileSync(contentPath, "utf8")).toContain(
      "miniDlssMetrics",
    );
  });

  it("uses the final audited measurements and comparison table", () => {
    expect(miniDlssMetrics).toEqual([
      {
        value: "38.3265 dB",
        shortValue: "38.33 dB",
        label: "PSNR-Y",
      },
      {
        value: "+1.5231 dB",
        shortValue: "+1.52 dB",
        label: "over bicubic",
      },
      {
        value: "36.6018 dB",
        shortValue: "36.60 dB",
        label: "tPSNR",
      },
      {
        value: "21.589 ms",
        shortValue: "21.59 ms",
        label: "ONNX CPU / frame",
      },
      {
        value: "0.716M",
        shortValue: "0.716M",
        label: "parameters",
      },
    ]);

    expect(miniDlssResults).toEqual([
      {
        method: "Bicubic",
        psnrY: "36.8033",
        ssimY: "0.9601",
        tpsnr: "36.3441",
        diffEnergy: "0.0217",
      },
      {
        method: "Single-frame SR fast cycle",
        psnrY: "32.3755",
        ssimY: "0.8807",
        tpsnr: "33.8817",
        diffEnergy: "0.0183",
        note: "Pipeline sanity baseline; not budget-matched.",
      },
      {
        method: "Temporal SR 5f small",
        psnrY: "38.3265",
        ssimY: "0.9604",
        tpsnr: "36.6018",
        diffEnergy: "0.0201",
        highlight: true,
      },
    ]);
  });

  it("locks the revised technical report facts", () => {
    const reportFacts = (
      miniDlssContent as typeof miniDlssContent & {
        miniDlssReportFacts?: unknown;
      }
    ).miniDlssReportFacts;

    expect(reportFacts).toEqual(expectedReportFacts);
  });

  it("defines the architecture, pipeline, limitations, and future work", () => {
    expect(miniDlssArchitectureStages).toHaveLength(6);
    expect(miniDlssArchitectureStages[0]?.title).toBe(
      "Five-frame LR window",
    );
    expect(miniDlssArchitectureStages.at(-1)?.title).toBe(
      "PixelShuffle output",
    );

    expect(miniDlssPipelineStages).toHaveLength(6);
    expect(miniDlssPipelineStages[0]?.title).toBe(
      "Configs and manifests",
    );
    expect(miniDlssPipelineStages.at(-1)?.title).toBe(
      "ONNX and MP4 inference",
    );

    expect(miniDlssLimitations).toContain(
      "Local validation rather than official REDS evaluation.",
    );
    expect(miniDlssFutureWork).toContain(
      "Train a budget-matched single-frame baseline.",
    );
  });

  it("uses stable public asset and external link paths", () => {
    expect(miniDlssAssets).toEqual({
      video: "/projects/mini-dlss/comparison-10s.mp4",
      poster: "/projects/mini-dlss/comparison-preview.webp",
      stills: [
        "/projects/mini-dlss/sample-0004.webp",
        "/projects/mini-dlss/sample-0007.webp",
      ],
      paper: "/papers/mini-dlss-technical-paper.pdf",
    });
    expect(miniDlssLinks.repository).toBe(
      "https://github.com/Dhruva05/Mini-DLSS",
    );
  });

  it("references case-study assets that exist in public", () => {
    const assetPaths = [
      miniDlssAssets.video,
      miniDlssAssets.poster,
      ...miniDlssAssets.stills,
      miniDlssAssets.paper,
    ];

    for (const assetPath of assetPaths) {
      expect(
        existsSync(path.join(process.cwd(), "public", assetPath)),
        `${assetPath} should exist in public`,
      ).toBe(true);
    }
  });

  it("defines semantic case-study presentation components", () => {
    const componentRoot = path.join(
      process.cwd(),
      "src/components/projects/mini-dlss",
    );
    const readComponent = (filename: string) => {
      const componentPath = path.join(componentRoot, filename);
      return existsSync(componentPath)
        ? readFileSync(componentPath, "utf8")
        : "";
    };

    const metricStripSource = readComponent("metric-strip.tsx");
    const processFlowSource = readComponent("process-flow.tsx");
    const resultsTableSource = readComponent("results-table.tsx");
    const comparisonMediaSource = readComponent("comparison-media.tsx");

    expect(metricStripSource).toContain("<dl");
    expect(processFlowSource).toContain("<ol");
    expect(resultsTableSource).toContain("<table");
    expect(resultsTableSource).toContain("<caption");
    expect(comparisonMediaSource).toContain("autoPlay");
    expect(comparisonMediaSource).toContain("muted");
    expect(comparisonMediaSource).toContain("playsInline");
    expect(comparisonMediaSource).toContain("controls");
    expect(comparisonMediaSource).toContain('preload="metadata"');
    expect(comparisonMediaSource).toContain("assetPath");
    expect(comparisonMediaSource).toContain(".play()");
  });

  it("defines the evidence-first route and sitemap entry", () => {
    const routePath = path.join(
      process.cwd(),
      "src/app/projects/mini-dlss/page.tsx",
    );
    const routeSource = existsSync(routePath)
      ? readFileSync(routePath, "utf8")
      : "";
    const sitemapSource = readFileSync(
      path.join(process.cwd(), "src/app/sitemap.ts"),
      "utf8",
    );

    for (const heading of [
      "The result",
      "The reconstruction problem",
      "BasicVSRMini",
      "From dataset to deployment",
      "Measured results",
      "Qualitative evidence",
      "Limits and next steps",
      "Read the technical paper",
    ]) {
      expect(routeSource).toContain(heading);
    }

    expect(routeSource).toContain("miniDlssAssets.paper");
    expect(routeSource).toContain("miniDlssLinks.repository");
    for (const reportFactReference of [
      "miniDlssReportFacts.bestCheckpointStep",
      "miniDlssReportFacts.trainingRunSteps",
      "miniDlssReportFacts.tpsnrGainOverBicubic",
      "miniDlssReportFacts.temporalErrorEnergy.temporal",
      "miniDlssReportFacts.temporalErrorEnergy.bicubic",
      "miniDlssReportFacts.temporalErrorEnergy.singleFrame",
      "miniDlssReportFacts.onnxLatencyReduction",
      "miniDlssReportFacts.evaluationClip",
      "miniDlssReportFacts.singleFrameBaseline",
      "miniDlssReportFacts.reportTitle",
    ]) {
      expect(routeSource).toContain(reportFactReference);
    }
    expect(routeSource).toContain(
      "Target-relative temporal error energy",
    );
    expect(routeSource).toContain(
      "lower than the PyTorch CPU demo",
    );
    expect(routeSource).toContain('href={assetPath("/#work")}');
    expect(routeSource).not.toContain('<Link href="/#work"');
    expect(routeSource).toContain('loading="eager"');
    expect(sitemapSource).toContain("/projects/mini-dlss");
  });

  it("hosts the exact revised technical report PDF", () => {
    const pdfPath = path.join(
      process.cwd(),
      "public/papers/mini-dlss-technical-paper.pdf",
    );
    const pdfHash = createHash("sha256")
      .update(readFileSync(pdfPath))
      .digest("hex");

    expect(pdfHash).toBe(
      "250bd2cebcefc30f7a049d34870ff7be31b32c756f6cb0ea5606bf8e1fda59cf",
    );
  });

  it("defines responsive case-study styles", () => {
    const styles = readFileSync(
      path.join(process.cwd(), "src/app/globals.css"),
      "utf8",
    );

    expect(styles).toContain(".case-study");
    expect(styles).toContain(".case-study__metrics");
    expect(styles).toContain(".case-study__video");
    expect(styles).toContain(".process-flow");
    expect(styles).toContain(".results-table");
    expect(styles).toContain(".case-study__gallery");
    expect(styles).toContain(".case-study__paper");
    expect(styles).toContain("@media (max-width: 760px)");
  });
});
