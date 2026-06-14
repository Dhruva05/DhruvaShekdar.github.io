export type MiniDlssMetric = {
  value: string;
  shortValue: string;
  label: string;
};

export type MiniDlssStage = {
  label: string;
  title: string;
  description: string;
};

export type MiniDlssResult = {
  method: string;
  psnrY: string;
  ssimY: string;
  tpsnr: string;
  diffEnergy: string;
  note?: string;
  highlight?: boolean;
};

export const miniDlssMetrics: MiniDlssMetric[] = [
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
];

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

export const miniDlssResults: MiniDlssResult[] = [
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
];

export const miniDlssArchitectureStages: MiniDlssStage[] = [
  {
    label: "01",
    title: "Five-frame LR window",
    description:
      "An odd temporal window keeps one center frame as the supervised reconstruction target.",
  },
  {
    label: "02",
    title: "Shared feature extraction",
    description:
      "The same convolutional encoder transforms each low-resolution frame into spatial features.",
  },
  {
    label: "03",
    title: "Forward ConvGRU",
    description:
      "A recurrent state propagates evidence from earlier frames toward the center.",
  },
  {
    label: "04",
    title: "Backward ConvGRU",
    description:
      "A second recurrent state moves backward so the center also receives future context.",
  },
  {
    label: "05",
    title: "Center feature fusion",
    description:
      "The center feature and both recurrent states are concatenated and refined by residual blocks.",
  },
  {
    label: "06",
    title: "PixelShuffle output",
    description:
      "A sub-pixel reconstruction head emits one RGB center frame at a fixed 2x scale.",
  },
];

export const miniDlssPipelineStages: MiniDlssStage[] = [
  {
    label: "01",
    title: "Configs and manifests",
    description:
      "TOML run definitions and sequence manifests lock scale, temporal length, data roots, and training settings.",
  },
  {
    label: "02",
    title: "Temporal dataset windows",
    description:
      "Vimeo-90K sequences become aligned five-frame inputs with a high-resolution center target.",
  },
  {
    label: "03",
    title: "PyTorch training",
    description:
      "Config-driven runs use resumable checkpoints, fixed validation intervals, and logged experiments.",
  },
  {
    label: "04",
    title: "Quality evaluation",
    description:
      "PSNR and SSIM are measured on cropped Y-channel outputs alongside temporal stability diagnostics.",
  },
  {
    label: "05",
    title: "Evidence artifacts",
    description:
      "The evaluation CLI writes tables, JSON, four-panel stills, and labeled comparison video.",
  },
  {
    label: "06",
    title: "ONNX and MP4 inference",
    description:
      "The best checkpoint exports to ONNX and runs on sliding video windows for reproducible deployment tests.",
  },
];

export const miniDlssLimitations = [
  "No explicit optical-flow or deformable alignment.",
  "Overlapping inference windows repeat feature extraction and recurrent work.",
  "Local validation rather than official REDS evaluation.",
  "The single-frame result is a fast-cycle baseline, not a budget-matched ablation.",
  "Global frame-difference energy can penalize legitimate scene motion.",
  "Each window predicts one high-resolution center frame.",
];

export const miniDlssFutureWork = [
  "Evaluate the checkpoint on the official REDS validation set.",
  "Train a budget-matched single-frame baseline.",
  "Compare three-, five-, and seven-frame temporal windows.",
  "Test flow-assisted or deformable alignment.",
  "Cache recurrent state across sequential inference windows.",
  "Measure quantized and mixed-precision deployment paths.",
];

export const miniDlssAssets = {
  video: "/projects/mini-dlss/comparison-10s.mp4",
  poster: "/projects/mini-dlss/comparison-preview.webp",
  stills: [
    "/projects/mini-dlss/sample-0004.webp",
    "/projects/mini-dlss/sample-0007.webp",
  ],
  paper: "/papers/mini-dlss-technical-paper.pdf",
};

export const miniDlssLinks = {
  repository: "https://github.com/Dhruva05/Mini-DLSS",
};
