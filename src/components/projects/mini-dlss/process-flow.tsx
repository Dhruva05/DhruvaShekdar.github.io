import type { MiniDlssStage } from "@/content/mini-dlss";

type ProcessFlowProps = {
  label: string;
  stages: MiniDlssStage[];
};

export function ProcessFlow({ label, stages }: ProcessFlowProps) {
  return (
    <ol className="process-flow" aria-label={label}>
      {stages.map((stage) => (
        <li key={stage.title} className="process-flow__stage">
          <p className="process-flow__index">{stage.label}</p>
          <h3>{stage.title}</h3>
          <p>{stage.description}</p>
        </li>
      ))}
    </ol>
  );
}
