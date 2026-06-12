"use client";

import { useEffect, useRef } from "react";

import { miniDlssAssets } from "@/content/mini-dlss";
import { assetPath } from "@/lib/paths";

export function ComparisonMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const video = videoRef.current;

    const syncPlayback = () => {
      if (!video) {
        return;
      }

      if (reducedMotion.matches) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        // Native controls remain available when browser policy blocks autoplay.
      });
    };

    syncPlayback();
    reducedMotion.addEventListener("change", syncPlayback);

    return () => {
      reducedMotion.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <figure className="case-study__media">
      <video
        ref={videoRef}
        className="case-study__video"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        poster={assetPath(miniDlssAssets.poster)}
        aria-describedby="mini-dlss-video-caption"
      >
        <source
          src={assetPath(miniDlssAssets.video)}
          type="video/mp4"
        />
        Your browser does not support HTML video.
      </video>
      <figcaption id="mini-dlss-video-caption">
        LR input, bicubic interpolation, the trained temporal SR prediction,
        and the HR target across the fixed local validation clip.
      </figcaption>
    </figure>
  );
}
