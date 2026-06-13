import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("GitHub Pages deployment workflow", () => {
  it("sets up Pages without rewriting the Next.js configuration", () => {
    const workflow = readFileSync(
      path.join(process.cwd(), ".github/workflows/deploy.yml"),
      "utf8",
    );

    expect(workflow).toContain("uses: actions/configure-pages@v5");
    expect(workflow).not.toContain("static_site_generator: next");
  });

  it("keeps ESLint isolated from enclosing worktree configurations", () => {
    const eslintConfig = JSON.parse(
      readFileSync(
        path.join(process.cwd(), ".eslintrc.json"),
        "utf8",
      ),
    ) as { root?: boolean };

    expect(eslintConfig.root).toBe(true);
  });
});
