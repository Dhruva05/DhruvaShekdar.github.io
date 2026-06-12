import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ExperienceList } from "@/components/experience/experience-list";
import { Hero } from "@/components/hero/hero";
import { ProjectList } from "@/components/projects/project-list";
import { ProofStrip } from "@/components/proof/proof-strip";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/portfolio";

export default function Home() {
  const email = profile.links.find((link) => link.label === "Email");
  const resume = profile.links.find((link) => link.label === "Resume");

  return (
    <main id="main-content" className="page-shell">
      <Hero />
      <ProofStrip />

      <Section
        id="experience"
        label="01 / Experience"
        title="Built under real constraints."
        description="Production AI, language-model research, factory-floor software, and robotic perception."
      >
        <ExperienceList />
      </Section>

      <Section
        id="work"
        label="02 / Selected work"
        title="Systems that perceive, adapt, and operate."
        description="A focused set of projects selected for technical depth, measurable evaluation, and real-world integration."
      >
        <ProjectList />
      </Section>

      <Section
        id="about"
        label="03 / About"
        title="Software that meets the physical world."
        className="about-section"
      >
        <div className="about-grid">
          <div className="about-grid__copy">
            <p>
              I study Mechatronics Engineering at the University of Waterloo
              with an Artificial Intelligence option. My work sits where model
              behavior meets system constraints: latency, offline operation,
              noisy sensor input, hardware integration, and measurable user
              outcomes.
            </p>
            <p>
              I am most useful on teams building AI products that must work
              outside a notebook, especially robotics, autonomy, on-device
              inference, computer vision, and ML infrastructure.
            </p>
          </div>
          <dl className="about-grid__details">
            <div>
              <dt>Languages</dt>
              <dd>Python · C++ · Java · Kotlin · Bash</dd>
            </div>
            <div>
              <dt>ML and vision</dt>
              <dd>PyTorch · ONNX Runtime · OpenCV · CUDA</dd>
            </div>
            <div>
              <dt>Systems</dt>
              <dd>ROS · gRPC · Android · Linux · Docker</dd>
            </div>
          </dl>
        </div>
      </Section>

      <section id="contact" className="contact-section">
        <p className="section-label">04 / Contact</p>
        <div>
          <h2>Building an AI system that has to work in the real world?</h2>
          <p>
            I am interested in ambitious engineering teams working across AI,
            robotics, autonomy, and high-performance software.
          </p>
        </div>
        <div className="contact-section__actions">
          {email ? (
            <Link href={email.href} className="button">
              Start a conversation
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : null}
          {resume ? (
            <Link
              href={resume.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Review resume
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
