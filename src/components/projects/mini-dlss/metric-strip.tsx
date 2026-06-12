import type { MiniDlssMetric } from "@/content/mini-dlss";

type MetricStripProps = {
  metrics: MiniDlssMetric[];
};

export function MetricStrip({ metrics }: MetricStripProps) {
  return (
    <dl className="case-study__metrics">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.shortValue}</dd>
        </div>
      ))}
    </dl>
  );
}
