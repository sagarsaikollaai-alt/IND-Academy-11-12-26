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
 * Top Viewport Scroll Progress Indicator in Champagne Gold (#C6A15B)
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
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
 * Hairline Divider that Draws In From the Left on Scroll
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
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={
          isInView || prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }
        }
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={`h-px w-full origin-left ${
          dark ? 'bg-[#333333]' : 'bg-[#E7E2D8]'
        }`}
      />
    </div>
  );
};

/**
 * Controlled Layered Parallax Wrapper (0.03x - 0.15x equivalent)
 */
interface ParallaxLayerProps {
  children: React.ReactNode;
  speedY?: number; // e.g., -28 to +28 px
  speedX?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speedY = -20,
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

  const y = useSpring(rawY, { stiffness: 100, damping: 28 });
  const x = useSpring(rawX, { stiffness: 100, damping: 28 });

  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * Subtle Upright Serif Watermark Drift (0.03x - 0.05x)
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

  const xRange = direction === 'left' ? ['4%', '-6%'] : ['-6%', '4%'];
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
 * Card Lift Wrapper (Lifts 6px with Gold Border Transition on Hover)
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
  return (
    <div
      className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:-translate-y-1.5 ${className}`}
    >
      {children}
    </div>
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
 * Supporting Text & Card Reveal (Fades up 24px on desktop, lighter 14px on mobile)
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

  const dist = isMobile ? 14 : 24;
  const initialOffset =
    direction === 'up'
      ? { opacity: 0, y: dist }
      : direction === 'left'
        ? { opacity: 0, x: -dist }
        : direction === 'right'
          ? { opacity: 0, x: dist }
          : { opacity: 0 };

  return (
    <motion.div
      initial={initialOffset}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: isMobile ? 0.08 : 0.15 }}
      transition={{
        duration: isMobile ? 0.55 : 0.85,
        delay: isMobile ? Math.min(delay, 0.1) : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
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
 * Upright Playfair Display Heading Reveal
 * - Word by word from behind a mask, rising 100% with 65ms stagger and soft blur-to-sharp fade
 * - NEVER italic. Emphasis comes strictly from Gold color (#A98747 on light, #C6A15B on dark)
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
                          ? { opacity: 1, y: '0%', filter: 'blur(0px)' }
                          : isMobile
                            ? { opacity: 0, y: '65%' }
                            : { opacity: 0, y: '100%', filter: 'blur(4px)' }
                      }
                      animate={
                        isInView || prefersReducedMotion
                          ? { opacity: 1, y: '0%', filter: 'blur(0px)' }
                          : isMobile
                            ? { opacity: 0, y: '65%' }
                            : { opacity: 0, y: '100%', filter: 'blur(4px)' }
                      }
                      transition={{
                        duration: isMobile ? 0.55 : 0.8,
                        delay: currentIndex * (isMobile ? 0.04 : 0.065),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block font-display-serif font-medium not-italic ${goldColorClass}`}
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
 * Image Frame with Clip-Path Wipe Reveal + 0.08x - 0.12x Vertical Glide Parallax + 5% Slow Hover Zoom
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
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || isMobile ? ['0%', '0%'] : ['-8%', '8%']
  );
  const y = useSpring(rawY, { stiffness: 100, damping: 28 });

  return (
    <figure ref={containerRef} className={`group relative ${className}`}>
      <motion.div
        initial={
          prefersReducedMotion
            ? { clipPath: 'inset(0% 0% 0% 0%)' }
            : isMobile
              ? { opacity: 0, x: -10 }
              : { clipPath: 'inset(14% 0% 0% 0%)' }
        }
        animate={
          isInView || prefersReducedMotion
            ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0 }
            : isMobile
              ? { opacity: 0, x: -10 }
              : { clipPath: 'inset(14% 0% 0% 0%)' }
        }
        transition={{ duration: isMobile ? 0.6 : 1.05, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-2xl border border-[#E7E2D8] bg-[#171717] ${aspectClass}`}
      >
        <motion.img
          src={src}
          alt={alt}
          style={isMobile ? undefined : { y, scale: 1.1 }}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-115"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent" />

        {badgeText && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-lg border border-[#C6A15B]/50 bg-[#171717]/85 backdrop-blur-md px-3 py-1 md:px-3.5 md:py-1.5 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em] md:tracking-[0.2em] text-[#C6A15B]">
            {badgeText}
          </div>
        )}
      </motion.div>
      {caption && (
        <figcaption className="mt-2.5 md:mt-3 text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] md:tracking-[0.16em] text-[#8B8983] flex items-center justify-between">
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
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    );
  }

  if (variant === 'lightbulb') {
    return (
      <svg
        ref={ref}
        viewBox="0 0 100 110"
        fill="none"
        className={`overflow-visible ${className}`}
        aria-hidden="true"
      >
        <motion.path
          d="M 36 72 C 26 60, 22 44, 30 30 C 38 18, 62 18, 70 30 C 78 44, 74 60, 64 72 L 60 80 L 40 80 Z"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={drawState}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    );
  }

  if (variant === 'notebook-pencil') {
    return (
      <svg
        ref={ref}
        viewBox="0 0 150 100"
        fill="none"
        className={`overflow-visible ${className}`}
        aria-hidden="true"
      >
        <motion.path
          d="M 18 24 C 36 20, 56 22, 72 28 L 72 82 C 56 76, 36 74, 18 78 Z M 72 28 C 88 22, 108 20, 126 24 L 126 78 C 108 74, 88 76, 72 82 Z"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={drawState}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    );
  }

  if (variant === 'graduation-cap') {
    return (
      <svg
        ref={ref}
        viewBox="0 0 160 90"
        fill="none"
        className={`overflow-visible ${className}`}
        aria-hidden="true"
      >
        <motion.path
          d="M 74 28 L 112 14 L 148 28 L 112 42 Z M 88 34 L 88 50 C 88 56, 136 56, 136 50 L 136 34 M 142 31 L 142 54"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={drawState}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    );
  }

  if (variant === 'cta-arrow') {
    return (
      <svg
        ref={ref}
        viewBox="0 0 120 60"
        fill="none"
        className={`overflow-visible ${className}`}
        aria-hidden="true"
      >
        <motion.path
          d="M 8 16 C 38 6, 66 48, 106 32 M 94 22 L 108 31 L 96 43"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={drawState}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    );
  }

  return null;
};

export const AmbientGoldParticles: React.FC<{ count?: number }> = () => {
  return null;
};
