export type PortfolioLink = {
  label: "Resume" | "GitHub" | "Email" | "LinkedIn";
  href: string;
};

export type ProofPoint = {
  value: string;
  label: string;
  context: string;
};

export type Experience = {
  organization: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  caveat?: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  details: string;
  metrics: ProjectMetric[];
  technologies: string[];
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  caseStudyHref?: string;
  links: {
    label: string;
    href: string;
  }[];
  caveat?: string;
};

export const profile = {
  name: "Dhruva Shekdar",
  headline: "Building AI systems for robotics and autonomous vehicles.",
  summary:
    "I build AI systems for real-world constraints: offline execution, efficient model adaptation, operator-facing workflows, and robotic perception.",
  location: "Waterloo, Ontario",
  education:
    "Mechatronics Engineering at the University of Waterloo, Artificial Intelligence option",
  email: "dshekdar@uwaterloo.ca",
  links: [
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1BftZPhvnSqCXvA4zlN97Al6nff7yuFhL/view?usp=share_link",
    },
    {
      label: "GitHub",
      href: "https://github.com/Dhruva05",
    },
    {
      label: "Email",
      href: "mailto:dshekdar@uwaterloo.ca",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/dhruva-shekdar-906573280/",
    },
  ] satisfies PortfolioLink[],
};

export const proofPoints: ProofPoint[] = [
  {
    value: "500+",
    label: "production scans per day",
    context:
      "Tesla Android workflow used by operators for cell-material verification at Giga Texas.",
  },
  {
    value: "95%+",
    label: "fewer trainable parameters",
    context:
      "Reported for JoLA fine-tuning of Llama-3.2-1B in Critical ML Lab experiments.",
  },
  {
    value: "89,768",
    label: "high-resolution frames",
    context:
      "Prepared for the Mini-DLSS temporal video super-resolution training pipeline.",
  },
];

export const experiences: Experience[] = [
  {
    organization: "Ford Motor Company",
    role: "AI / Machine Learning Intern, A.I. Team",
    period: "2026",
    summary:
      "Developed resilient in-vehicle AI infrastructure spanning offline inference, audio ingestion, and structured vehicle-tool invocation.",
    highlights: [
      "Architected a six-phase fallback system using Python and ONNX Runtime.",
      "Designed dual-stream audio ingestion for online and embedded models.",
      "Implemented typed MCP function calling with schema validation and permission gating.",
    ],
    technologies: ["Python", "ONNX Runtime", "MCP", "On-device AI"],
    image: "/images/large-ford-logo-0.png",
    imageAlt: "Ford Motor Company wordmark",
  },
  {
    organization: "Critical Machine Learning Lab",
    role: "Undergraduate Machine Learning Researcher",
    period: "2026 - present",
    summary:
      "Researching parameter-efficient model adaptation, model evaluation, and reproducible experimentation for language models.",
    highlights: [
      "Fine-tuned Llama-3.2-1B with JoLA, with reported loss moving from 2.03 to 0.69.",
      "Evaluated experiments across five NLP benchmarks.",
      "Built a sweep runner for more than 100 configurations and contributed ReFT integration work to TamperBench.",
    ],
    technologies: ["PyTorch", "LLM evaluation", "JoLA", "W&B"],
    image: "/images/CriticalML.png",
    imageAlt: "Critical Machine Learning Lab mark",
  },
  {
    organization: "Tesla",
    role: "Software Developer Intern, Cell Material Flow",
    period: "May - Sep 2025",
    summary:
      "Built offline-first Android software for high-volume material verification workflows at Giga Texas.",
    highlights: [
      "Supported more than 500 structured scans per day across 12 operators.",
      "Reduced material verification time by 75%.",
      "Analyzed more than 200 tracking failures; daily mismatches fell from 13 to 2.",
    ],
    technologies: ["Kotlin", "Java", "Android", "gRPC", "MVVM"],
    image: "/images/tesla-giga-texas.webp",
    imageAlt: "Dhruva Shekdar during his Tesla internship at Giga Texas",
  },
  {
    organization: "WATonomous",
    role: "Machine Learning Engineer, Humanoid Robotics",
    period: "2026 - present",
    summary:
      "Developing visual perception for autonomous keyboard interaction in a ROS-based humanoid robotics stack.",
    highlights: [
      "Training and evaluating YOLO-based keyboard detection models.",
      "Using RGB-D input for keyboard detection and 3D pose estimation.",
      "Integrating perception outputs into the robot autonomy stack.",
    ],
    technologies: ["PyTorch", "CUDA", "RGB-D", "ROS", "YOLO"],
    image: "/images/watonomous.webp",
    imageAlt: "WATonomous autonomous systems team graphic",
  },
];

export const projects: Project[] = [
  {
    slug: "mini-dlss",
    title: "Mini-DLSS",
    category: "Temporal video super-resolution",
    summary:
      "A compact BasicVSR-style pipeline for reconstructing high-resolution video from multi-frame context.",
    details:
      "Built the data preparation, temporal model training, quality evaluation, and CPU latency benchmarking pipeline to study quality, temporal stability, and model-size tradeoffs.",
    metrics: [
      { value: "38.33 dB", label: "PSNR-Y" },
      { value: "+1.52 dB", label: "over bicubic" },
      { value: "21.59 ms", label: "ONNX CPU / frame" },
    ],
    technologies: ["PyTorch", "ONNX", "OpenCV", "Vimeo-90K"],
    image: "/images/mini-dlss-comparison.webp",
    imageAlt:
      "Mini-DLSS comparison strip showing low-resolution input, reconstruction, and reference frames",
    secondaryImage: "/images/mini-dlss-latency.webp",
    secondaryImageAlt:
      "Mini-DLSS quality and latency comparison across bicubic, single-frame, and temporal methods",
    caseStudyHref: "/projects/mini-dlss",
    links: [
      {
        label: "View repository",
        href: "https://github.com/Dhruva05/Mini-DLSS",
      },
    ],
    caveat:
      "Results are measured on a local Vimeo-derived REDS-style validation set, not the official REDS benchmark.",
  },
  {
    slug: "hack-the-move",
    title: "Hack the Move",
    category: "Autonomous vehicle perception and control",
    summary:
      "A first-place hackathon system that connected visual perception to an autonomous vehicle control stack.",
    details:
      "Trained stop-sign and traffic-light perception models, then converted detections into desired-speed overrides consumed by an existing Simulink controller.",
    metrics: [
      { value: "1st", label: "overall placement" },
      { value: "91.3%", label: "reported mAP@50" },
      { value: "0 m/s", label: "stop command target" },
    ],
    technologies: ["Python", "YOLO", "MATLAB", "Simulink"],
    image: "/images/hack-the-move.webp",
    imageAlt:
      "Engineering team working on the autonomous vehicle during Hack the Move",
    links: [
      {
        label: "View repository",
        href: "https://github.com/Dhruva05/UWAFT-Hack-The-Move_2",
      },
      {
        label: "Watch demo",
        href: "https://drive.google.com/file/d/1iQBF0_pDW-1ZpGI1z_9bXlIVTdOfZLcS/view?usp=sharing",
      },
    ],
    caveat:
      "Keep precision, recall, mAP, and accuracy distinct in any expanded case study.",
  },
];
