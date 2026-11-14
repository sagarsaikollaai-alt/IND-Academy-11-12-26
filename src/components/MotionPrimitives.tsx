import React, { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

/**
 * Apple-inspired critically damped spring & easing constants:
 * Fast initial response, smooth deceleration, zero dramatic bounce.
 */
export const APPLE_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 32,
  mass: 0.9,
};

export const APPLE_SOFT_SPRING = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 28,
  mass: 1,
};

export const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Top Viewport Scroll Progress Indicator in Champagne Gold (#C6A15B)
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[#C6A15B]"
      aria-hidden="true"
    />
  );
};

/**
 * Hairline Divider that Draws In Smoothly on Scroll
 */
export const HairlineDivider: React.FC<{
  dark?: boolean;
  className?: string;
}> = ({ dark = false, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={`w-full overflow-hidden ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.4 }}
        animate={
          isInView || prefersReducedMotion
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0.4 }
        }
        transition={{ duration: 0.85, ease: APPLE_EASE }}
        className={`h-px w-full origin-left ${
          dark ? 'bg-[#333333]' : 'bg-[#E7E2D8]'
        }`}
      />
    </div>
  );
};

/**
 * Controlled Layered Parallax Wrapper
 */
interface ParallaxLayerProps {
  children: React.ReactNode;
  speedY?: number;
  speedX?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speedY = -16,
  speedX = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || isMobile ? [0, 0] : [-speedY, speedY]
  );
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || isMobile ? [0, 0] : [-speedX, speedX]
  );

  const y = useSpring(rawY, { stiffness: 120, damping: 30 });
  const x = useSpring(rawX, { stiffness: 120, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * Subtle Upright Serif Watermark Drift
 */
interface ParallaxBackdropTextProps {
  text: string;
  direction?: 'left' | 'right';
  darkTheme?: boolean;
  className?: string;
}

export const ParallaxBackdropText: React.FC<ParallaxBackdropTextProps> = ({
  text,
  direction = 'left',
  darkTheme = false,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xRange = direction === 'left' ? ['3%', '-4%'] : ['-4%', '3%'];
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || isMobile ? ['0%', '0%'] : xRange
  );

  return (
    <div
      ref={ref}
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ x }}
        className={`whitespace-nowrap font-display-serif font-medium text-[3.5rem] sm:text-[8rem] lg:text-[11rem] tracking-[-0.02em] leading-none ${
          darkTheme ? 'text-[#F8F6F0]/[0.03]' : 'text-[#171717]/[0.035]'
        }`}
      >
        {text}
      </motion.div>
    </div>
  );
};

/**
 * Apple-Style Weighted Card Wrapper:
 * Subtle spring lift + scale-in on hover/tap with soft ambient shadow and zero bounce.
 */
interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      whileHover={{ y: -4, scale: 1.006 }}
      whileTap={{ scale: 0.992 }}
      transition={APPLE_SPRING}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * Continuous Slow Marquee Strip that Pauses on Hover
 */
interface ParallaxTickerBandProps {
  items: string[];
  dark?: boolean;
}

export const ParallaxTickerBand: React.FC<ParallaxTickerBandProps> = ({
  items,
  dark = true,
}) => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y py-3.5 md:py-4 ${
        dark
          ? 'bg-[#171717] border-[#333333] text-[#F8F6F0]'
          : 'bg-[#FFFFFF] border-[#E7E2D8] text-[#171717]'
      }`}
    >
      <div className="animate-marquee-left items-center">
        {repeated.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-6 md:gap-8 pr-6 md:pr-8">
            <span className="text-[11px] md:text-xs font-medium uppercase tracking-[0.18em] md:tracking-[0.2em]">
              {item}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#C6A15B]"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface ScrollRevealBlockProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
}

/**
 * Apple-Style Weighted Slide-Up + Subtle Scale-In Reveal
 */
export const ScrollRevealBlock: React.FC<ScrollRevealBlockProps> = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const dist = isMobile ? 12 : 18;
  const initialOffset =
    direction === 'up'
      ? { opacity: 0, y: dist, scale: 0.985 }
      : direction === 'left'
        ? { opacity: 0, x: -dist, scale: 0.985 }
        : direction === 'right'
          ? { opacity: 0, x: dist, scale: 0.985 }
          : { opacity: 0, scale: 0.99 };

  return (
    <motion.div
      initial={initialOffset}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: isMobile ? 0.08 : 0.14 }}
      transition={{
        ...APPLE_SPRING,
        delay: isMobile ? Math.min(delay, 0.08) : delay,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface EditorialWordSegment {
  text: string;
  italic?: boolean;
  gold?: boolean;
  goldOnLight?: boolean;
  circled?: boolean;
  lineBreakAfter?: boolean;
}

interface EditorialRevealTitleProps {
  segments: EditorialWordSegment[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/**
 * Upright Playfair Display Heading Reveal with Smooth Critically-Damped Spring Physics
 */
export const EditorialRevealTitle: React.FC<EditorialRevealTitleProps> = ({
  segments,
  as: Tag = 'h2',
  className = '',
}) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  let wordCounter = 0;

  return (
    <Tag
      ref={ref}
      className={`font-display-serif font-medium not-italic tracking-[-0.01em] ${className}`}
    >
      {segments.map((seg, sIdx) => {
        const words = seg.text.split(' ');
        return (
          <React.Fragment key={sIdx}>
            {words.map((word, wIdx) => {
              const currentIndex = wordCounter++;
              const goldColorClass = seg.goldOnLight
                ? 'text-[#A98747]'
                : seg.gold
                  ? 'text-[#C6A15B]'
                  : '';

              return (
                <React.Fragment key={`${sIdx}-${wIdx}`}>
                  <span className="inline-block overflow-hidden align-bottom pb-0.5 md:pb-1">
                    <motion.span
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: isMobile ? 12 : 18, scale: 0.98 }
                      }
                      animate={
                        isInView || prefersReducedMotion
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: isMobile ? 12 : 18, scale: 0.98 }
                      }
                      transition={{
                        ...APPLE_SPRING,
                        delay: currentIndex * (isMobile ? 0.025 : 0.04),
                      }}
                      className={`inline-block font-display-serif font-medium not-italic will-change-transform ${goldColorClass}`}
                    >
                      {word}
                    </motion.span>
                  </span>{' '}
                </React.Fragment>
              );
            })}
            {seg.lineBreakAfter && <br />}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

interface ParallaxImageFrameProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  className?: string;
  badgeText?: string;
}

/**
 * Image Frame with Smooth Scale-In + Weighted Spring Glide + Soft Ambient Shadow
 */
export const ParallaxImageFrame: React.FC<ParallaxImageFrameProps> = ({
  src,
  alt,
  caption,
  aspectClass = 'aspect-4/3',
  className = '',
  badgeText,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.12 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <figure ref={containerRef} className={`group relative ${className}`}>
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 16, scale: 0.985 }
        }
        animate={
          isInView || prefersReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 16, scale: 0.985 }
        }
        transition={APPLE_SOFT_SPRING}
        className={`relative overflow-hidden rounded-3xl border border-[#E7E2D8] bg-[#171717] shadow-[0_20px_50px_-20px_rgba(23,23,23,0.16)] ${aspectClass}`}
      >
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent" />

        {badgeText && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full border border-[#C6A15B]/45 bg-[#171717]/80 backdrop-blur-md px-3 py-1 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em] text-[#C6A15B]">
            {badgeText}
          </div>
        )}
      </motion.div>
      {caption && (
        <figcaption className="mt-2.5 md:mt-3 text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] text-[#8B8983] flex items-center justify-between">
          <span>{caption}</span>
          <span className="w-8 h-px bg-[#C6A15B]" aria-hidden="true" />
        </figcaption>
      )}
    </figure>
  );
};

export type DoodleVariant =
  | 'hero-connector'
  | 'lightbulb'
  | 'notebook-pencil'
  | 'graduation-cap'
  | 'cta-arrow'
  | 'section-bridge';

interface HandDrawnDoodleProps {
  variant: DoodleVariant;
  className?: string;
  strokeColor?: string;
}

export const HandDrawnDoodle: React.FC<HandDrawnDoodleProps> = ({
  variant,
  className = '',
  strokeColor = '#C6A15B',
}) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  const drawState =
    isInView || prefersReducedMotion
      ? { pathLength: 1, opacity: 1 }
      : { pathLength: 0, opacity: 0 };

  if (variant === 'hero-connector') {
    return (
      <svg
        ref={ref}
        viewBox="0 0 280 90"
        fill="none"
        className={`overflow-visible ${className}`}
        aria-hidden="true"
      >
        <motion.path
          d="M 8 68 C 58 64, 92 18, 134 38 C 162 52, 132 76, 158 72 C 194 66, 224 28, 256 26"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={drawState}
          transition={{ duration: 1.1, ease: APPLE_EASE }}
        />
      </svg>
    );
  }

  return null;
};

export const AmbientGoldParticles: React.FC<{ count?: number }> = () => {
  return null;
};
