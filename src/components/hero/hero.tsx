import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { profile } from "@/content/portfolio";

export function Hero() {
  const [resume, github, email] = profile.links;

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__primary">
        <p className="hero__name">{profile.name}</p>
        <h1 id="hero-heading">{profile.headline}</h1>
        <p className="hero__summary">{profile.summary}</p>
        <div className="hero__actions">
          <Link
            href={resume.href}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            View resume
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link href="#work" className="text-link">
            Selected work
            <ArrowDownRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <aside className="hero__aside" aria-label="Profile details">
        <dl>
          <div>
            <dt>Focus</dt>
            <dd>AI systems · Robotics · Computer vision</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>Ford · Tesla · Critical ML · WATonomous</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>{profile.education}</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
        <div className="hero__utilities">
          <Link href={github.href} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" />
          </Link>
          <Link href={email.href}>
            Email <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </section>
  );
}
