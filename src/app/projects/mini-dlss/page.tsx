import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";

import { ComparisonMedia } from "@/components/projects/mini-dlss/comparison-media";
import { MetricStrip } from "@/components/projects/mini-dlss/metric-strip";
import { ProcessFlow } from "@/components/projects/mini-dlss/process-flow";
import { ResultsTable } from "@/components/projects/mini-dlss/results-table";
import {
  miniDlssArchitectureStages,
  miniDlssAssets,
  miniDlssFutureWork,
  miniDlssLimitations,
  miniDlssLinks,
  miniDlssMetrics,
  miniDlssPipelineStages,
  miniDlssReportFacts,
  miniDlssResults,
} from "@/content/mini-dlss";
import { assetPath } from "@/lib/paths";

const siteUrl =
  "https://dhruva05.github.io/DhruvaShekdar.github.io";
const pageUrl = `${siteUrl}/projects/mini-dlss`;

export const metadata: Metadata = {
  title: "Mini-DLSS | Temporal Video Super-Resolution",
  description:
    "An evidence-first technical case study of a lightweight five-frame temporal video super-resolution system built with PyTorch, ConvGRU propagation, PixelShuffle reconstruction, and ONNX deployment.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Mini-DLSS | Temporal Video Super-Resolution",
    description:
      "A lightweight five-frame video super-resolution pipeline with measured quality, temporal stability, and ONNX CPU latency.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: `${siteUrl}${miniDlssAssets.poster}`,
        width: 1792,
        height: 292,
        alt: "Mini-DLSS four-panel temporal super-resolution comparison",
      },
    ],
  },
};

export default function MiniDlssPage() {
  return (
    <main id="main-content" className="page-shell case-study">
      <header className="case-study__hero">
        <a
          href={assetPath("/#work")}
          className="case-study__back-link"
        >
          <ArrowLeft aria-hidden="true" />
          Back to selected work
        </a>
        <div className="case-study__hero-grid">
          <div>
            <p className="case-study__category">
              Temporal video super-resolution
            </p>
            <h1>Mini-DLSS</h1>
          </div>
          <div className="case-study__introduction">
            <p className="case-study__lede">
              A lightweight BasicVSR-style system that reconstructs a
              high-resolution center frame from five low-resolution frames,
              then exports the trained model for reproducible CPU deployment.
            </p>
            <p>
              Mini-DLSS is inspired by temporal reconstruction systems. It is
              not NVIDIA DLSS and does not use renderer motion vectors, depth
              buffers, or proprietary reconstruction logic.
            </p>
            <div className="case-study__actions">
              <a
                href={assetPath(miniDlssAssets.paper)}
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                Read technical paper
                <FileText aria-hidden="true" />
              </a>
              <Link
                href={miniDlssLinks.repository}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                View repository
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <MetricStrip metrics={miniDlssMetrics} />
        <p className="case-study__benchmark-note">
          Measured on a local Vimeo-derived REDS-style validation and demo set,
          not the official REDS benchmark.
        </p>
      </header>

      <section className="case-study__section">
        <div className="case-study__section-heading">
          <p className="section-label">01 / Evidence</p>
          <div>
            <h2>The result</h2>
            <p>
              The trained temporal model improves PSNR-Y over bicubic while
              preserving stable frame-to-frame reconstruction on the fixed
              validation clip.
            </p>
          </div>
        </div>
        <ComparisonMedia />
      </section>

      <section className="case-study__section">
        <div className="case-study__section-heading">
          <p className="section-label">02 / Objective</p>
          <div>
            <h2>The reconstruction problem</h2>
            <p>
              Geometric resizing can enlarge a frame, but it cannot recover
              missing detail. Framewise neural super-resolution can sharpen
              individual images while producing flicker because each frame is
              reconstructed without neighboring evidence.
            </p>
          </div>
        </div>
        <div className="case-study__split">
          <article>
            <h3>Use temporal redundancy</h3>
            <p>
              Adjacent frames contain repeated observations of edges, textures,
              and sub-pixel motion. Mini-DLSS aggregates that context in both
              temporal directions and predicts the high-resolution center
              frame at a fixed 2x scale.
            </p>
          </article>
          <article>
            <h3>Build the complete system</h3>
            <p>
              The work covers dataset manifests, aligned temporal sampling,
              model training, image and temporal metrics, comparison media,
              ONNX export, and measured MP4 inference rather than treating the
              neural network as an isolated artifact.
            </p>
          </article>
        </div>
      </section>

      <section className="case-study__section">
        <div className="case-study__section-heading">
          <p className="section-label">03 / Model</p>
          <div>
            <h2>BasicVSRMini</h2>
            <p>
              A deliberately compact architecture uses shared convolutional
              features, bidirectional ConvGRU propagation, center-frame fusion,
              residual reconstruction, and PixelShuffle upsampling.
            </p>
          </div>
        </div>
        <ProcessFlow
          label="BasicVSRMini model stages"
          stages={miniDlssArchitectureStages}
        />
        <p className="case-study__technical-note">
          Unlike full BasicVSR and EDVR-style systems, this model does not
          estimate optical flow or use deformable alignment. Motion handling is
          learned implicitly through convolutional recurrent state.
        </p>
      </section>

      <section className="case-study__section">
        <div className="case-study__section-heading">
          <p className="section-label">04 / Pipeline</p>
          <div>
            <h2>From dataset to deployment</h2>
            <p>
              Config-driven entry points keep training, evaluation, artifacts,
              and deployment reproducible across local and Colab workflows.
              The best validation checkpoint occurred at{" "}
              {miniDlssReportFacts.bestCheckpointStep} steps during the{" "}
              {miniDlssReportFacts.trainingRunSteps}-step training run.
            </p>
          </div>
        </div>
        <ProcessFlow
          label="Mini-DLSS engineering pipeline"
          stages={miniDlssPipelineStages}
        />
        <div className="case-study__facts">
          <div>
            <p>Best checkpoint</p>
            <strong>
              {miniDlssReportFacts.bestCheckpointStep} of{" "}
              {miniDlssReportFacts.trainingRunSteps} steps
            </strong>
          </div>
          <div>
            <p>Evaluation domain</p>
            <strong>Y channel, two-pixel border crop</strong>
          </div>
          <div>
            <p>Export contract</p>
            <strong>Fixed five-frame input, dynamic spatial axes</strong>
          </div>
        </div>
      </section>

      <section className="case-study__section">
        <div className="case-study__section-heading">
          <p className="section-label">05 / Evaluation</p>
          <div>
            <h2>Measured results</h2>
            <p>
              Image fidelity and temporal behavior are reported separately.
              The temporal model improves tPSNR by{" "}
              {miniDlssReportFacts.tpsnrGainOverBicubic} over bicubic. The
              single-frame comparison is a{" "}
              {miniDlssReportFacts.singleFrameBaseline}, not a fair or
              budget-matched temporal ablation.
            </p>
          </div>
        </div>
        <ResultsTable results={miniDlssResults} />
        <p className="case-study__technical-note">
          Target-relative temporal error energy is{" "}
          {miniDlssReportFacts.temporalErrorEnergy.temporal} for the temporal
          model, {miniDlssReportFacts.temporalErrorEnergy.bicubic} for bicubic,
          and {miniDlssReportFacts.temporalErrorEnergy.singleFrame} for the
          single-frame baseline. This diagnostic compares predicted motion with
          target motion rather than measuring raw output smoothness alone.
        </p>
        <div className="case-study__runtime">
          <div>
            <p>PyTorch CPU demo</p>
            <strong>34.941 ms/frame</strong>
          </div>
          <div>
            <p>ONNX Runtime CPU</p>
            <strong>21.589 ms/frame</strong>
          </div>
          <p>
            ONNX Runtime CPU latency is{" "}
            {miniDlssReportFacts.onnxLatencyReduction} lower than the PyTorch CPU demo
            on the same evaluation clip: {miniDlssReportFacts.evaluationClip}.
            These local-machine deployment measurements are device-specific, not
            device-independent real-time claims.
          </p>
        </div>
      </section>

      <section className="case-study__section">
        <div className="case-study__section-heading">
          <p className="section-label">06 / Frames</p>
          <div>
            <h2>Qualitative evidence</h2>
            <p>
              Four-panel stills make local edge and texture differences
              inspectable without relying on a single aggregate metric.
            </p>
          </div>
        </div>
        <div className="case-study__gallery">
          {miniDlssAssets.stills.map((still, index) => (
            <figure key={still}>
              <Image
                src={assetPath(still)}
                alt={`Mini-DLSS validation comparison ${index + 1}: LR input, bicubic, temporal SR prediction, and HR target`}
                width={1792}
                height={256}
                sizes="(max-width: 760px) 100vw, 1200px"
                loading="eager"
              />
              <figcaption>
                Validation frame {index + 1}: LR input, bicubic, temporal SR,
                and HR target.
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-study__section">
        <div className="case-study__section-heading">
          <p className="section-label">07 / Judgment</p>
          <div>
            <h2>Limits and next steps</h2>
            <p>
              The current system is a reproducible research scaffold, not a
              state-of-the-art benchmark submission or production renderer
              integration.
            </p>
          </div>
        </div>
        <div className="case-study__lists">
          <div>
            <h3>Current limitations</h3>
            <ul>
              {miniDlssLimitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Next experiments</h3>
            <ul>
              {miniDlssFutureWork.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-study__paper">
        <p className="section-label">08 / Full breakdown</p>
        <div>
          <h2>Read the technical paper</h2>
          <p>
            The concise{" "}
            <strong>{miniDlssReportFacts.reportTitle}</strong> covers scope and
            claim boundaries, model design, the data and evaluation protocol,
            final evidence, deployment, limitations, and next steps.
          </p>
        </div>
        <div className="case-study__paper-actions">
          <a
            href={assetPath(miniDlssAssets.paper)}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            Open PDF
            <FileText aria-hidden="true" />
          </a>
          <Link
            href={miniDlssLinks.repository}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Inspect the code
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
