import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Laptop,
  MapPin,
  Play,
  X,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  COURSE_OVERVIEW_VIDEO_CONFIG,
  COURSES_DATA,
  HERO_VIDEO_CONFIG,
  HOW_IND_WORKS_STICKY_STEPS,
  JOURNAL_ARTICLES_DATA,
  JournalArticle,
  MENTORS_MARQUEE_ROW_1,
  MENTORS_MARQUEE_ROW_2,
  PageId,
  PRACTICE_LABS_DATA,
} from '../data/siteData';
import {
  APPLE_SPRING,
  EditorialRevealTitle,
  HairlineDivider,
  InteractiveTiltCard,
  ScrollRevealBlock,
} from '../components/MotionPrimitives';
import { LiquidGlassHeroVideo } from '../components/LiquidGlassHeroVideo';
import { IndAcademyVideoPlayer } from '../components/IndAcademyVideoPlayer';
import { ResilientImage } from '../components/ResilientImage';
import { CourseCard } from '../components/CourseCard';

interface HomePageProps {
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const heroVideoUrl = HERO_VIDEO_CONFIG.mp4Url;

  // Modals
  const [showDayFilmModal, setShowDayFilmModal] = useState(false);
  const [brochureModalCourse, setBrochureModalCourse] = useState<string | null>(
    null
  );
  const [brochureName, setBrochureName] = useState('');
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochurePhone, setBrochurePhone] = useState('');
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  // Programs Mode & Track Filters (Strictly Online & Offline Hyderabad)
  const [modeFilter, setModeFilter] = useState<
    'Online' | 'Offline Hyderabad'
  >('Online');
  const [mobileCategoryFilter, setMobileCategoryFilter] =
    useState<string>('all');

  // Interactive 5-Step Selector in Bento
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  // Journal Reader Modal
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(
    null
  );

  const isMobileViewport =
    typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (showDayFilmModal || brochureModalCourse || activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDayFilmModal, brochureModalCourse, activeArticle]);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });

  const videoParallaxY = useSpring(
    useTransform(
      heroScroll,
      [0, 1],
      prefersReducedMotion || isMobileViewport ? ['0%', '0%'] : ['0%', '16%']
    ),
    { stiffness: 140, damping: 32, mass: 0.9 }
  );

  const heroContentY = useSpring(
    useTransform(
      heroScroll,
      [0, 1],
      prefersReducedMotion || isMobileViewport ? [0, 0] : [0, -70]
    ),
    { stiffness: 140, damping: 32, mass: 0.9 }
  );

  const heroContentOpacity = useTransform(
    heroScroll,
    [0, 0.78],
    prefersReducedMotion || isMobileViewport ? [1, 1] : [1, 0]
  );

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureName.trim() || !brochurePhone.trim()) return;
    setBrochureDownloaded(true);
  };

  const filteredMobileCourses =
    mobileCategoryFilter === 'all'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.id === mobileCategoryFilter);

  return (
    <div className="bg-[#F8F6F0] text-[#171717]">
      {/* =====================================================================
          1. HERO SECTION — Instant 3-Second Clarity
         ===================================================================== */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[250px] sm:min-h-[320px] md:min-h-[82vh] lg:min-h-[88vh] w-full overflow-hidden bg-[#0B0B0B] text-[#F8F6F0] flex flex-col justify-center lg:flex-row lg:items-center select-none"
      >
        {/* Mobile & Tablet (<1024px) Right-Side Portrait at 100% Visibility */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden pointer-events-none absolute inset-y-0 right-0 w-[68%] sm:w-[62%] z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={HERO_VIDEO_CONFIG.posterUrl}
            alt="IND Academy Learner"
            className="w-full h-full object-cover object-[50%_15%] opacity-100"
          />
        </motion.div>

        {/* Mobile & Tablet Left-Side Gradient Only Behind Text (Leaves Right-Side Portrait 100% Clear) */}
        <div
          className="lg:hidden pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,#0B0B0B_0%,#0B0B0B_36%,rgba(11,11,11,0.72)_54%,rgba(11,11,11,0)_76%)]"
          aria-hidden="true"
        />

        {/* Desktop Right-Side Portrait / Video Canvas */}
        <motion.div
          style={{ y: videoParallaxY }}
          className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-[64%] xl:w-[62%] h-full z-0"
        >
          <LiquidGlassHeroVideo
            mp4Url={heroVideoUrl}
            webmUrl={heroVideoUrl}
            posterUrl={HERO_VIDEO_CONFIG.posterUrl}
            containerRef={heroSectionRef}
          />
        </motion.div>

        <div
          className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-[56%] z-[1] bg-[linear-gradient(90deg,#0B0B0B_0%,#0B0B0B_62%,rgba(11,11,11,0.82)_82%,rgba(11,11,11,0)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 xl:px-20 py-7 sm:py-10 md:py-14 lg:py-24 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <motion.div
              style={
                isMobileViewport
                  ? undefined
                  : { y: heroContentY, opacity: heroContentOpacity }
              }
              className="lg:col-span-6 w-full max-w-[58%] sm:max-w-[54%] lg:max-w-[580px] lg:pr-4 flex flex-col justify-center"
            >
              <ScrollRevealBlock direction="up" className="hidden lg:block">
                <span className="small-gold-label text-[#C6A15B] block mb-5">
                  IND ACADEMY · BY BRIGHTLUME DIGITAL MEDIA
                </span>
              </ScrollRevealBlock>

              <EditorialRevealTitle
                as="h1"
                className="font-display-serif !text-[23px] sm:!text-[32px] md:!text-[3.4rem] lg:!text-[3.9rem] xl:!text-[4.5rem] leading-[1.08] tracking-[-0.02em] text-[#F8F6F0] mb-4 sm:mb-5 md:mb-7"
                segments={[
                  { text: 'Learn Today.', lineBreakAfter: true },
                  { text: "Build Tomorrow's", gold: true, lineBreakAfter: true },
                  { text: 'Career.', gold: true },
                ]}
              />

              <ScrollRevealBlock direction="up" delay={0.12}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 pointer-events-auto">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    transition={APPLE_SPRING}
                    onClick={() => onNavigate('catalogue')}
                    className="group min-h-[36px] sm:min-h-[42px] md:min-h-[46px] px-3 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-4 rounded-lg md:rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[11.5px] sm:text-[13px] md:text-sm font-medium shadow-[0_12px_28px_-10px_rgba(198,161,91,0.45)] inline-flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Explore courses</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    transition={APPLE_SPRING}
                    onClick={() => onNavigate('enrollment')}
                    className="group min-h-[36px] sm:min-h-[42px] md:min-h-[46px] px-3 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-4 rounded-lg md:rounded-xl bg-[#171717]/80 hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] border border-[#F8F6F0]/25 hover:border-[#C6A15B] backdrop-blur-xl text-[11.5px] sm:text-[13px] md:text-sm font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Request a callback</span>
                  </motion.button>
                </div>
              </ScrollRevealBlock>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SEE HOW IND ACADEMY WORKS — Second Section Directly Under Hero
         ===================================================================== */}
      <section className="bg-[#FFFFFF] py-10 md:py-16 border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <ScrollRevealBlock direction="up">
            <motion.div
              whileHover={{ y: -3, scale: 1.004 }}
              whileTap={{ scale: 0.995 }}
              transition={APPLE_SPRING}
              onClick={() => setShowDayFilmModal(true)}
              className="group relative min-h-[250px] sm:min-h-[340px] md:min-h-[400px] rounded-3xl overflow-hidden border border-[#E7E2D8] hover:border-[#C6A15B] bg-[#171717] shadow-[0_24px_60px_-24px_rgba(23,23,23,0.18)] flex flex-col justify-end p-6 md:p-10 cursor-pointer"
            >
              <img
                src="https://i.ytimg.com/vi/Uf9xAlFJ5bM/maxresdefault.jpg"
                alt="IND Academy Course Overview"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (img.naturalWidth <= 120) {
                    img.src =
                      'https://i.ytimg.com/vi/Uf9xAlFJ5bM/hqdefault.jpg';
                  }
                }}
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.src.includes('hqdefault.jpg')) {
                    img.src =
                      'https://i.ytimg.com/vi/Uf9xAlFJ5bM/hqdefault.jpg';
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/92 via-[#0B0B0B]/35 to-transparent" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="small-gold-label text-[#C6A15B] block mb-1.5">
                    90-Second Film
                  </span>
                  <h2 className="font-display-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-[#F8F6F0]">
                    See how IND Academy works.
                  </h2>
                  <p className="text-sm text-[#F8F6F0]/80 mt-1">
                    Inside our courses, tools, and career tracks.
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={APPLE_SPRING}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDayFilmModal(true);
                  }}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-xs font-semibold uppercase tracking-[0.12em] shadow-[0_12px_30px_-8px_rgba(198,161,91,0.5)] shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>Watch Film</span>
                </motion.button>
              </div>
            </motion.div>
          </ScrollRevealBlock>
        </div>
      </section>

      {/* =====================================================================
          3. THE 4 CAREER TRACKS — Visual First, One-Sentence Clarity
         ===================================================================== */}
      <section
        id="programs-section"
        className="bg-[#F8F6F0] py-14 md:py-24 border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <ScrollRevealBlock direction="up">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7 md:mb-12">
              <div>
                <span className="small-gold-label text-[#A98747] block mb-2">
                  4 Specialized Tracks
                </span>
                <h2 className="section-h2-clamp text-[#171717]">
                  Four tracks.{' '}
                  <span className="text-[#A98747]">Built for the real world.</span>
                </h2>
              </div>

              {/* Apple-Style Segmented Mode Switcher (Only Online & Offline Hyderabad) */}
              <div className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-2xl bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#E7E2D8] shadow-[0_8px_24px_-12px_rgba(23,23,23,0.08)] self-start lg:self-auto">
                {(['Online', 'Offline Hyderabad'] as const).map((pill) => {
                  const active = modeFilter === pill;
                  return (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setModeFilter(pill)}
                      className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        active
                          ? 'text-[#F8F6F0]'
                          : 'text-[#171717]/75 hover:text-[#171717]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeModeFilterPill"
                          transition={APPLE_SPRING}
                          className="absolute inset-0 rounded-xl bg-[#171717] shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{pill}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollRevealBlock>

          {/* Mobile Track Filter Pills with Smooth Spring Layout Indicator */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-5">
            {[
              { id: 'all', label: 'All 4' },
              ...COURSES_DATA.map((c) => ({
                id: c.id,
                label: `${c.code} · ${c.shortTitle}`,
              })),
            ].map((tab) => {
              const active = mobileCategoryFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMobileCategoryFilter(tab.id)}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                    active
                      ? 'text-[#F8F6F0] border-[#171717]'
                      : 'bg-[#FFFFFF]/90 text-[#171717] border-[#E7E2D8]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="mobileTrackFilterPill"
                      transition={APPLE_SPRING}
                      className="absolute inset-0 rounded-full bg-[#171717]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Cards with Smooth Morph */}
          <div className="md:hidden grid grid-cols-1 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredMobileCourses.map((course) => (
                <motion.div
                  key={`${course.id}-${modeFilter}`}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={APPLE_SPRING}
                >
                  <CourseCard
                    course={{ ...course, mode: modeFilter }}
                    onNavigate={onNavigate}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Desktop 2x2 Bento Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-7">
            {COURSES_DATA.map((course, idx) => (
              <ScrollRevealBlock
                key={course.id}
                direction="up"
                delay={idx * 0.06}
              >
                <CourseCard
                  course={{ ...course, mode: modeFilter }}
                  onNavigate={onNavigate}
                />
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. APPLE-STYLE VISUAL BENTO GRID — Why IND Academy & How It Works
         ===================================================================== */}
      <section
        id="why-ind-section"
        className="bg-[#F8F6F0] py-14 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <ScrollRevealBlock direction="up">
            <div className="max-w-2xl mb-8 md:mb-12">
              <span className="small-gold-label text-[#A98747] block mb-2">
                The IND Standard
              </span>
              <h2 className="section-h2-clamp text-[#171717]">
                Designed for doing.{' '}
                <span className="text-[#A98747]">Not just watching.</span>
              </h2>
            </div>
          </ScrollRevealBlock>

          {/* 4-Tile Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
            {/* BENTO 1 (7 Cols, Dark Charcoal): Studio Practice Labs */}
            <InteractiveTiltCard className="lg:col-span-7 rounded-3xl bg-[#171717] text-[#F8F6F0] border border-[#333333] shadow-[0_24px_54px_-22px_rgba(23,23,23,0.22)] p-6 md:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="small-gold-label text-[#C6A15B]">
                    Hands-On Labs
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#C6A15B]/15 text-[#C6A15B] text-[11px] font-semibold">
                    Zero Passive Theory
                  </span>
                </div>
                <div className="font-display-serif text-4xl sm:text-5xl md:text-6xl text-[#C6A15B] mb-2">
                  80% Practice.
                </div>
                <p className="text-sm sm:text-base text-[#F8F6F0]/75 max-w-md mb-6">
                  Every module happens inside a dedicated studio lab—shipping
                  live campaigns, code, AI agents, and video edits.
                </p>
              </div>

              {/* Visual 4-Lab Mini Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-[#333333]">
                {PRACTICE_LABS_DATA.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-3 rounded-2xl bg-[#0B0B0B]/90 border border-[#2C2C2C] transition-colors hover:border-[#C6A15B]/50"
                  >
                    <span className="block text-[10px] font-semibold text-[#C6A15B] mb-1">
                      {lab.number}
                    </span>
                    <span className="block text-xs font-medium text-[#F8F6F0] leading-snug">
                      {lab.programTag} Lab
                    </span>
                  </div>
                ))}
              </div>
            </InteractiveTiltCard>

            {/* BENTO 2 (5 Cols, Pure White): Interactive 5-Step Journey */}
            <InteractiveTiltCard className="lg:col-span-5 rounded-3xl bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#E7E2D8] shadow-[0_20px_50px_-22px_rgba(23,23,23,0.08)] p-6 md:p-9 flex flex-col justify-between">
              <div>
                <span className="small-gold-label text-[#A98747] block mb-2">
                  How It Works
                </span>
                <h3 className="font-display-serif text-2xl sm:text-3xl text-[#171717] mb-4">
                  Five steps to your portfolio.
                </h3>

                {/* Interactive Step Pills with Smooth Spring Indicator */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {HOW_IND_WORKS_STICKY_STEPS.map((item, idx) => {
                    const active = activeStepIdx === idx;
                    return (
                      <button
                        key={item.step}
                        type="button"
                        onClick={() => setActiveStepIdx(idx)}
                        className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                          active
                            ? 'text-[#C6A15B]'
                            : 'bg-[#F8F6F0] text-[#171717]/70 hover:bg-[#E7E2D8]/60'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="bentoStepIndicator"
                            transition={APPLE_SPRING}
                            className="absolute inset-0 rounded-full bg-[#171717]"
                          />
                        )}
                        <span className="relative z-10">{item.step}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Visual Display with Smooth Morph */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStepIdx}
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.99 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8]"
                  >
                    <div className="flex items-center justify-between text-xs text-[#A98747] font-semibold mb-1">
                      <span>
                        Step {HOW_IND_WORKS_STICKY_STEPS[activeStepIdx]?.step}
                      </span>
                      <span>
                        {
                          HOW_IND_WORKS_STICKY_STEPS[activeStepIdx]
                            ?.deliverableNote
                        }
                      </span>
                    </div>
                    <h4 className="font-display-serif text-xl text-[#171717] mb-1">
                      {HOW_IND_WORKS_STICKY_STEPS[activeStepIdx]?.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#57554F] leading-relaxed line-clamp-2">
                      {HOW_IND_WORKS_STICKY_STEPS[activeStepIdx]?.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E7E2D8] flex items-center justify-between text-xs text-[#8B8983]">
                <span>Tap any step (01–05)</span>
                <button
                  type="button"
                  onClick={() => onNavigate('learning-experience')}
                  className="font-semibold text-[#171717] hover:text-[#A98747] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>See Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </InteractiveTiltCard>

            {/* BENTO 3 (5 Cols, Pure White): Dual Learning Mode */}
            <InteractiveTiltCard className="lg:col-span-5 rounded-3xl bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#E7E2D8] shadow-[0_20px_50px_-22px_rgba(23,23,23,0.08)] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="small-gold-label text-[#A98747] block mb-2">
                  Flexible Format
                </span>
                <h3 className="font-display-serif text-2xl sm:text-3xl text-[#171717] mb-2">
                  Online or Hyderabad Studio.
                </h3>
                <p className="text-sm text-[#57554F] mb-5">
                  Same live mentors, same practice labs—wherever you learn.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8]">
                  <Laptop className="w-4 h-4 text-[#A98747] mb-2" />
                  <span className="block font-display-serif text-lg font-semibold text-[#171717]">
                    Live Online
                  </span>
                  <span className="block text-xs text-[#57554F]">
                    Interactive remote labs
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8]">
                  <MapPin className="w-4 h-4 text-[#A98747] mb-2" />
                  <span className="block font-display-serif text-lg font-semibold text-[#171717]">
                    Hyderabad
                  </span>
                  <span className="block text-xs text-[#57554F]">
                    Ameerpet studio campus
                  </span>
                </div>
              </div>
            </InteractiveTiltCard>

            {/* BENTO 4 (7 Cols, Dark Charcoal): Proof of Work Over Certificates */}
            <InteractiveTiltCard className="lg:col-span-7 rounded-3xl bg-[#171717] text-[#F8F6F0] border border-[#333333] shadow-[0_24px_54px_-22px_rgba(23,23,23,0.22)] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="small-gold-label text-[#C6A15B] block mb-2">
                  Career Outcome
                </span>
                <h3 className="font-display-serif text-2xl sm:text-3xl text-[#F8F6F0] mb-2">
                  Proof of work. Not just a certificate.
                </h3>
                <p className="text-sm text-[#F8F6F0]/75">
                  Graduate with audited ad campaigns, deployed GitHub repos, AI
                  pipelines, and commercial video reels.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={APPLE_SPRING}
                  onClick={() => onNavigate('enrollment')}
                  className="min-h-[44px] px-5 py-3 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-xs font-semibold uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Free Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={APPLE_SPRING}
                  onClick={() => onNavigate('catalogue')}
                  className="min-h-[44px] px-5 py-3 rounded-xl border border-[#333333] hover:border-[#C6A15B] text-[#F8F6F0] text-xs font-semibold uppercase tracking-[0.12em] inline-flex items-center justify-center cursor-pointer"
                >
                  <span>Compare Tracks</span>
                </motion.button>
              </div>
            </InteractiveTiltCard>
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* =====================================================================
          5. PRACTITIONER MENTORS MARQUEE — Minimalist Visual Strip
         ===================================================================== */}
      <section
        id="mentors-section"
        className="bg-[#FFFFFF] py-12 md:py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 mb-7 md:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="small-gold-label text-[#A98747] block mb-1.5">
              Industry Mentors
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Taught by people{' '}
              <span className="text-[#A98747]">who ship daily.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8B8983]">
            Practitioners across Marketing, Code, AI &amp; Post-Production.
          </p>
        </div>

        {/* Row 1 */}
        <div className="mb-3.5 overflow-hidden">
          <div className="animate-marquee-left gap-4 px-3">
            {[...MENTORS_MARQUEE_ROW_1, ...MENTORS_MARQUEE_ROW_1].map(
              (mentor, idx) => (
                <div
                  key={`${mentor.id}-${idx}`}
                  className="w-[250px] md:w-[290px] shrink-0 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] p-3 flex items-center gap-3 mr-4 shadow-[0_8px_24px_-16px_rgba(23,23,23,0.08)]"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E7E2D8]"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A98747] block truncate">
                      {mentor.discipline}
                    </span>
                    <h3 className="font-display-serif text-base font-semibold text-[#171717] truncate">
                      {mentor.name}
                    </h3>
                    <p className="text-[11px] text-[#8B8983] truncate">
                      {mentor.role}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right gap-4 px-3">
            {[...MENTORS_MARQUEE_ROW_2, ...MENTORS_MARQUEE_ROW_2].map(
              (mentor, idx) => (
                <div
                  key={`${mentor.id}-${idx}`}
                  className="w-[250px] md:w-[290px] shrink-0 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] p-3 flex items-center gap-3 mr-4 shadow-[0_8px_24px_-16px_rgba(23,23,23,0.08)]"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E7E2D8]"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A98747] block truncate">
                      {mentor.discipline}
                    </span>
                    <h3 className="font-display-serif text-base font-semibold text-[#171717] truncate">
                      {mentor.name}
                    </h3>
                    <p className="text-[11px] text-[#8B8983] truncate">
                      {mentor.role}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* =====================================================================
          6. COMPACT VISUAL JOURNAL STRIP
         ===================================================================== */}
      <section id="journal-section" className="bg-[#F8F6F0] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <ScrollRevealBlock direction="up">
            <div className="flex items-end justify-between mb-7 md:mb-10">
              <div>
                <span className="small-gold-label text-[#A98747] block mb-1.5">
                  Journal
                </span>
                <h2 className="section-h2-clamp text-[#171717]">
                  Field Notes.
                </h2>
              </div>
            </div>
          </ScrollRevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {JOURNAL_ARTICLES_DATA.map((article, idx) => (
              <ScrollRevealBlock
                key={article.id}
                direction="up"
                delay={idx * 0.06}
              >
                <motion.article
                  whileHover={{ y: -4, scale: 1.006 }}
                  whileTap={{ scale: 0.992 }}
                  transition={APPLE_SPRING}
                  onClick={() => setActiveArticle(article)}
                  className="group h-full rounded-3xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] shadow-[0_18px_42px_-20px_rgba(23,23,23,0.09)] overflow-hidden flex flex-col justify-between transition-colors cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-[#171717]">
                      <ResilientImage
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between text-[11px] text-[#8B8983] mb-2">
                        <span className="font-semibold uppercase tracking-wider text-[#A98747]">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-display-serif text-xl leading-snug text-[#171717] group-hover:text-[#A98747] transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-3 border-t border-[#E7E2D8] flex items-center justify-between text-xs font-medium text-[#171717]">
                    <span>Read Note</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#A98747] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.article>
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. APPLE-STYLE CLOSING CONVERSION BANNER
         ===================================================================== */}
      <section className="bg-[#171717] text-[#F8F6F0] py-14 md:py-20 border-t border-[#333333]">
        <ScrollRevealBlock direction="up">
          <div className="max-w-4xl mx-auto px-5 md:px-6 text-center">
            <span className="small-gold-label text-[#C6A15B] block mb-2">
              Next Cohort Open
            </span>
            <h2 className="section-h2-clamp text-[#F8F6F0] mb-3">
              Start your track.
            </h2>
            <p className="text-sm sm:text-base text-[#F8F6F0]/70 max-w-md mx-auto mb-7">
              Speak with an academic advisor to choose the right program and
              schedule.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={APPLE_SPRING}
                onClick={() => onNavigate('enrollment')}
                className="min-h-[46px] px-7 py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-xs font-semibold uppercase tracking-[0.14em] shadow-[0_14px_32px_-10px_rgba(198,161,91,0.45)] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Callback</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={APPLE_SPRING}
                onClick={() => {
                  setBrochureDownloaded(false);
                  setBrochureModalCourse('Complete IND Academy Brochure');
                }}
                className="min-h-[46px] px-6 py-3.5 rounded-xl border border-[#333333] hover:border-[#C6A15B] text-[#F8F6F0] text-xs font-semibold uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C6A15B]" />
                <span>Download Brochure</span>
              </motion.button>
            </div>
          </div>
        </ScrollRevealBlock>
      </section>

      {/* =====================================================================
          MODALS (Video Player, Brochure Download, Journal Reader)
         ===================================================================== */}
      <AnimatePresence>
        {showDayFilmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setShowDayFilmModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/85 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="IND Academy Course Information Video Player"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={APPLE_SPRING}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full rounded-3xl bg-[#171717] text-[#F8F6F0] border border-[#333333] overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)] my-auto"
            >
              <div className="px-4 py-3 md:px-6 md:py-4 border-b border-[#333333] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="small-gold-label text-[#C6A15B] block truncate">
                    Course Overview
                  </span>
                  <h3 className="font-display-serif text-base md:text-xl text-[#F8F6F0] truncate">
                    Explore Our Courses &amp; Career Tracks — IND Academy
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDayFilmModal(false)}
                  aria-label="Close video player"
                  className="w-9 h-9 rounded-xl border border-[#333333] bg-[#0B0B0B] flex items-center justify-center text-[#F8F6F0] hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2.5 sm:p-4 md:p-6 bg-[#0B0B0B]">
                <IndAcademyVideoPlayer
                  youtubeVideoId={COURSE_OVERVIEW_VIDEO_CONFIG.youtubeVideoId}
                  posterUrl={COURSE_OVERVIEW_VIDEO_CONFIG.posterUrl}
                  directVideoUrl={COURSE_OVERVIEW_VIDEO_CONFIG.directVideoUrl}
                  bunnyStream={COURSE_OVERVIEW_VIDEO_CONFIG.bunnyStream}
                  autoPlay={false}
                  onExploreCourses={() => {
                    setShowDayFilmModal(false);
                    onNavigate('catalogue');
                  }}
                />
              </div>

              <div className="px-4 py-3 md:px-6 md:py-4 border-t border-[#333333] flex items-center justify-between gap-3">
                <span className="text-xs text-[#8B8983]">
                  Online &amp; Offline Hyderabad
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowDayFilmModal(false);
                    onNavigate('enrollment');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#C6A15B] text-[#171717] text-xs font-semibold cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Brochure Modal */}
      <AnimatePresence>
        {brochureModalCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setBrochureModalCourse(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/75 backdrop-blur-xl p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Download Course Brochure"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={APPLE_SPRING}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-3xl bg-[#F8F6F0] text-[#171717] border border-[#E7E2D8] p-6 md:p-8 shadow-[0_32px_80px_-20px_rgba(23,23,23,0.45)] my-auto"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span className="small-gold-label text-[#A98747] block mb-1">
                    Syllabus PDF
                  </span>
                  <h3 className="font-display-serif text-2xl text-[#171717]">
                    Download Brochure
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBrochureModalCourse(null)}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-full border border-[#E7E2D8] flex items-center justify-center text-[#171717] hover:border-[#C6A15B] cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {brochureDownloaded ? (
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#C6A15B] text-center space-y-3">
                  <CheckCircle2 className="w-9 h-9 text-[#A98747] mx-auto" />
                  <h4 className="font-display-serif text-xl text-[#171717]">
                    Brochure Ready
                  </h4>
                  <p className="text-xs text-[#57554F]">
                    Thank you, {brochureName}. Our advisor will also share batch
                    timings on {brochurePhone}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBrochureModalCourse(null)}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-[#171717] text-[#F8F6F0] text-xs font-medium cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBrochureSubmit} className="space-y-3.5">
                  <input
                    type="text"
                    required
                    value={brochureName}
                    onChange={(e) => setBrochureName(e.target.value)}
                    placeholder="Full name"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] focus:border-[#C6A15B] focus:outline-none text-sm"
                  />
                  <input
                    type="tel"
                    required
                    value={brochurePhone}
                    onChange={(e) => setBrochurePhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] focus:border-[#C6A15B] focus:outline-none text-sm"
                  />
                  <input
                    type="email"
                    value={brochureEmail}
                    onChange={(e) => setBrochureEmail(e.target.value)}
                    placeholder="Email (optional)"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] focus:border-[#C6A15B] focus:outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full min-h-[46px] py-3 px-6 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Get PDF Brochure</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/75 backdrop-blur-xl p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={activeArticle.title}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={APPLE_SPRING}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full rounded-3xl bg-[#F8F6F0] text-[#171717] border border-[#E7E2D8] p-6 md:p-8 shadow-[0_32px_80px_-20px_rgba(23,23,23,0.45)] max-h-[85vh] overflow-y-auto overscroll-contain my-auto"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <span className="small-gold-label text-[#A98747] block mb-1">
                    {activeArticle.category} · {activeArticle.readTime}
                  </span>
                  <h3 className="font-display-serif text-2xl text-[#171717]">
                    {activeArticle.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  aria-label="Close article"
                  className="w-9 h-9 rounded-full border border-[#E7E2D8] flex items-center justify-center text-[#171717] hover:border-[#C6A15B] cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-sm text-[#171717]/85 leading-relaxed">
                {activeArticle.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

