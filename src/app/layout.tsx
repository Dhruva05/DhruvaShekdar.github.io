import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";
import { themeInitializationScript } from "@/lib/theme";

const instrumentSans = localFont({
  src: [
    { path: "./fonts/instrument-sans-400.ttf", weight: "400" },
    { path: "./fonts/instrument-sans-500.ttf", weight: "500" },
    { path: "./fonts/instrument-sans-600.ttf", weight: "600" },
    { path: "./fonts/instrument-sans-700.ttf", weight: "700" },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-400.ttf", weight: "400" },
    { path: "./fonts/ibm-plex-mono-500.ttf", weight: "500" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl =
  "https://dhruva05.github.io/DhruvaShekdar.github.io";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Dhruva Shekdar",
    url: siteUrl,
    email: "mailto:dshekdar@uwaterloo.ca",
    jobTitle: "Machine Learning Engineer",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of Waterloo",
    },
    knowsAbout: [
      "Machine learning",
      "Robotics",
      "Computer vision",
      "Large language models",
      "Autonomous systems",
    ],
    sameAs: [
      "https://github.com/Dhruva05",
      "https://www.linkedin.com/in/dhruva-shekdar-906573280/",
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dhruva Shekdar | AI Systems, Robotics, and Computer Vision",
  description:
    "Dhruva Shekdar builds AI systems for robotics and autonomous vehicles, with experience in offline inference, language-model research, production Android software, and robotic perception.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Dhruva Shekdar",
    "machine learning engineer",
    "robotics engineer",
    "computer vision",
    "LLM systems",
    "autonomous systems",
    "software engineer",
  ],
  openGraph: {
    title: "Dhruva Shekdar | AI Systems and Robotics Engineer",
    description:
      "Building AI systems for robotics and autonomous vehicles.",
    url: siteUrl,
    siteName: "Dhruva Shekdar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dhruva Shekdar | AI Systems and Robotics Engineer",
    description:
      "Building AI systems for robotics and autonomous vehicles.",
  },
  icons: {
    icon: `${siteUrl}/images/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}
      >
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
