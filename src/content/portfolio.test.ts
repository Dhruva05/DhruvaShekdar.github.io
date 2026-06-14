import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  experiences,
  profile,
  projects,
  proofPoints,
} from "./portfolio";

describe("portfolio content", () => {
  it("keeps the recruiter conversion links immediately available", () => {
    expect(profile.links.map((link) => link.label)).toEqual([
      "Resume",
      "GitHub",
      "Email",
      "LinkedIn",
    ]);

    for (const link of profile.links) {
      expect(link.href).toMatch(/^(https?:\/\/|mailto:)/);
    }
  });

  it("uses the approved physical-world AI positioning", () => {
    expect(profile.headline).toBe(
      "Building AI systems for robotics and autonomous vehicles.",
    );
    expect(profile.summary).toContain("offline");
    expect(profile.summary).toContain("robotic perception");
  });

  it("prioritizes the four highest-signal experiences", () => {
    expect(experiences.map((experience) => experience.organization)).toEqual([
      "Ford Motor Company",
      "Critical Machine Learning Lab",
      "Tesla",
      "WATonomous",
    ]);
  });

  it("limits the homepage to evidence-backed proof points", () => {
    expect(proofPoints).toHaveLength(3);

    for (const proof of proofPoints) {
      expect(proof.value.length).toBeGreaterThan(0);
      expect(proof.context.length).toBeGreaterThan(20);
    }
  });

  it("features only the strongest technical projects", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "mini-dlss",
      "hack-the-move",
    ]);

    for (const project of projects) {
      expect(project.metrics.length).toBeGreaterThanOrEqual(2);
      expect(project.links.length).toBeGreaterThan(0);
    }
  });

  it("omits performance targets and qualifies local benchmark results", () => {
    const ford = experiences.find(
      (experience) => experience.organization === "Ford Motor Company",
    );
    const miniDlss = projects.find((project) => project.slug === "mini-dlss");

    expect(JSON.stringify(ford)).not.toMatch(/300-600|sub-3-second/);
    expect(miniDlss?.caveat).toContain(
      "local Vimeo-derived REDS-style",
    );
  });

  it("keeps the Mini-DLSS homepage metrics unchanged", () => {
    const miniDlss = projects.find(
      (project) => project.slug === "mini-dlss",
    );

    expect(miniDlss).toBeDefined();
    expect(miniDlss?.metrics).toEqual([
      { value: "38.33 dB", label: "PSNR-Y" },
      { value: "+1.52 dB", label: "over bicubic" },
      { value: "21.59 ms", label: "ONNX CPU / frame" },
    ]);
  });

  it("links Mini-DLSS to its case study", () => {
    const miniDlss = projects.find(
      (project) => project.slug === "mini-dlss",
    );

    expect(miniDlss?.caseStudyHref).toBe("/projects/mini-dlss");
  });

  it("renders the Mini-DLSS internal case-study action", () => {
    const projectListSource = readFileSync(
      path.join(
        process.cwd(),
        "src/components/projects/project-list.tsx",
      ),
      "utf8",
    );

    expect(projectListSource).toContain("project.caseStudyHref");
    expect(projectListSource).toContain("Read case study");
    expect(projectListSource).toContain(
      "href={project.caseStudyHref}",
    );
    expect(projectListSource).not.toContain(
      "assetPath(project.caseStudyHref)",
    );
  });

  it("keeps primary navigation valid from nested routes", () => {
    const navigationSource = readFileSync(
      path.join(
        process.cwd(),
        "src/components/layout/navigation.tsx",
      ),
      "utf8",
    );

    expect(navigationSource).toContain(
      '{ name: "Experience", href: assetPath("/#experience") }',
    );
    expect(navigationSource).toContain(
      '{ name: "Work", href: assetPath("/#work") }',
    );
    expect(navigationSource).toContain(
      '{ name: "About", href: assetPath("/#about") }',
    );
    expect(navigationSource).toContain("<a key={link.name}");
    expect(navigationSource).not.toContain("<Link key={link.name}");
  });

  it("references local image assets that exist in public", () => {
    const imagePaths = [
      ...experiences.map((experience) => experience.image),
      ...projects.flatMap((project) =>
        [project.image, project.secondaryImage].filter(
          (image): image is string => Boolean(image),
        ),
      ),
    ];

    for (const imagePath of imagePaths) {
      expect(
        existsSync(path.join(process.cwd(), "public", imagePath)),
        `${imagePath} should exist in public`,
      ).toBe(true);
    }
  });
});
