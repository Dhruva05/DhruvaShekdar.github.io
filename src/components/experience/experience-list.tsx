import Image from "next/image";

import { experiences } from "@/content/portfolio";
import { assetPath } from "@/lib/paths";

export function ExperienceList() {
  return (
    <div className="experience-list">
      {experiences.map((experience, index) => (
        <article key={experience.organization} className="experience-row">
          <div className="experience-row__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="experience-row__identity">
            <p className="experience-row__period">{experience.period}</p>
            <h3>{experience.organization}</h3>
            <p>{experience.role}</p>
          </div>
          <div className="experience-row__content">
            <p className="experience-row__summary">{experience.summary}</p>
            <ul>
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <p className="technology-line">
              {experience.technologies.join(" · ")}
            </p>
            {experience.caveat ? (
              <p className="caveat">{experience.caveat}</p>
            ) : null}
          </div>
          <div className="experience-row__media">
            <Image
              src={assetPath(experience.image)}
              alt={experience.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 180px"
              className={
                experience.organization === "Tesla"
                  ? "experience-row__photo"
                  : "experience-row__logo"
              }
            />
          </div>
        </article>
      ))}
    </div>
  );
}
