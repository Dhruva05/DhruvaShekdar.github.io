import { proofPoints } from "@/content/portfolio";

export function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Selected engineering outcomes">
      {proofPoints.map((proof) => (
        <article key={proof.label} className="proof-strip__item">
          <p className="proof-strip__value">{proof.value}</p>
          <h2>{proof.label}</h2>
          <p>{proof.context}</p>
        </article>
      ))}
    </section>
  );
}
