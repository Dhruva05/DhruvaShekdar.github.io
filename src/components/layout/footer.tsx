import Link from "next/link";
import { profile } from "@/content/portfolio";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <div>
          <p className="site-footer__name">{profile.name}</p>
          <p className="site-footer__meta">
            {profile.location} · {new Date().getFullYear()}
          </p>
        </div>
        <div className="site-footer__links">
          {profile.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
