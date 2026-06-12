import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  label?: string;
  title?: string;
  description?: string;
}

export function Section({
  children,
  id,
  className,
  label,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={cn("section", className)}>
      {label || title || description ? (
        <header className="section-heading">
          {label ? <p className="section-label">{label}</p> : null}
          <div className="section-heading__copy">
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
        </header>
      ) : null}
      {children}
    </section>
  );
}
