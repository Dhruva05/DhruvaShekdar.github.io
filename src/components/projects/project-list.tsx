import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/content/portfolio";
import { assetPath } from "@/lib/paths";

export function ProjectList() {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <article key={project.slug} className="project">
          <header className="project__header">
            <p className="project__number">
              Case study {String(index + 1).padStart(2, "0")}
            </p>
            <p className="project__category">{project.category}</p>
            <h3>{project.title}</h3>
            <p className="project__summary">{project.summary}</p>
          </header>

          <div className="project__body">
            <p className="project__details">{project.details}</p>
            <dl className="project__metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
            <p className="technology-line">
              {project.technologies.join(" · ")}
            </p>
            <div className="project__links">
              {project.caseStudyHref ? (
                <Link href={project.caseStudyHref}>
                  Read case study
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ) : null}
              {project.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <figure className="project__visual">
            <div className="project__primary-image">
              <Image
                src={assetPath(project.image)}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 900px"
                className="object-cover"
              />
            </div>
            {project.secondaryImage && project.secondaryImageAlt ? (
              <div className="project__secondary-image">
                <Image
                  src={assetPath(project.secondaryImage)}
                  alt={project.secondaryImageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 360px"
                  className="object-contain"
                />
              </div>
            ) : null}
            {project.caveat ? (
              <figcaption>{project.caveat}</figcaption>
            ) : null}
          </figure>
        </article>
      ))}
    </div>
  );
}
