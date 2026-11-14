import React from 'react';
import { HERO_VIDEO_CONFIG } from '../data/siteData';

interface LiquidGlassHeroVideoProps {
  mp4Url?: string;
  webmUrl?: string;
  posterUrl?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Clean, crisp Apple-style Hero Portrait & Media stage.
 * Renders the studio photograph with 100% optical clarity and zero water/ripple distortion on mouse movement.
 */
export const LiquidGlassHeroVideo: React.FC<LiquidGlassHeroVideoProps> = ({
  posterUrl = HERO_VIDEO_CONFIG.posterUrl,
}) => {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#0B0B0B] select-none"
      aria-hidden="true"
    >
      <img
        src={posterUrl}
        alt="IND Academy Studio Learner"
        className="h-full w-full object-cover object-[50%_18%] opacity-100"
      />

      {/* Left-edge feather gradient so the right-side photograph blends seamlessly into the dark left text column */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(90deg,#0B0B0B_0%,rgba(11,11,11,0.88)_14%,rgba(11,11,11,0.38)_28%,rgba(11,11,11,0.0)_44%)]
        "
      />
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(180deg,rgba(11,11,11,0.18)_0%,rgba(11,11,11,0.0)_22%,rgba(11,11,11,0.0)_80%,rgba(11,11,11,0.45)_100%)]
        "
      />
    </div>
  );
};
