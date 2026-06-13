import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { profile } from "@/content/portfolio";
import { assetPath } from "@/lib/paths";

const links = [
  { name: "Experience", href: assetPath("/#experience") },
  { name: "Work", href: assetPath("/#work") },
  { name: "About", href: assetPath("/#about") },
];

export function Navigation() {
  const resume = profile.links.find((link) => link.label === "Resume");

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href={assetPath("/")} className="site-wordmark">
          Dhruva Shekdar
        </a>
        <div className="site-nav__links">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="site-nav__link">
              {link.name}
            </a>
          ))}
        </div>
        <div className="site-nav__actions">
          <Link
            href="https://github.com/Dhruva05"
            target="_blank"
            rel="noreferrer"
            className="site-nav__utility"
          >
            GitHub
          </Link>
          <ThemeToggle />
          {resume ? (
            <Link
              href={resume.href}
              target="_blank"
              rel="noreferrer"
              className="button button--compact"
            >
              Resume
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
