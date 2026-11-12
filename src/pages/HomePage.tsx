import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Play,
  X,
} from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  BRAND_ASSETS,
  COURSE_OVERVIEW_VIDEO_CONFIG,
  COURSES_DATA,
  HERO_VIDEO_CONFIG,
  HOW_IND_WORKS_STICKY_STEPS,
  INITIAL_RESULTS_PLACEHOLDERS,
  JOURNAL_ARTICLES_DATA,
  JournalArticle,
  MASTERCLASSES_PLACEHOLDERS,
  MENTORS_MARQUEE_ROW_1,
  MENTORS_MARQUEE_ROW_2,
  PageId,
  PRACTICE_LABS_DATA,
  WHY_IND_COLUMNS,
} from '../data/siteData';
import {
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

  // Course Overview Video Modal & Brochure Download Modal
  const [showDayFilmModal, setShowDayFilmModal] = useState(false);
  const [brochureModalCourse, setBrochureModalCourse] = useState<string | null>(
    null
  );
  const [brochureName, setBrochureName] = useState('');
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochurePhone, setBrochurePhone] = useState('');
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  // Section 8 — Programs Mode Filter & Mobile Category Discovery Filter
  const [modeFilter, setModeFilter] = useState<
    'Online + Offline' | 'Online' | 'Offline Hyderabad'
  >('Online + Offline');
  const [mobileCategoryFilter, setMobileCategoryFilter] = useState<string>('all');

  // Section 13 — Sticky "How IND Academy Works" Active Step Tracking
  const [activeStickyStep, setActiveStickyStep] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Section 15 — Journal Reader Modal
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(
    null
  );

  const isMobileViewport =
    typeof window !== 'undefined' && window.innerWidth < 768;

  // Lock background page scroll whenever a modal is open
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

  // Hero Parallax: Video moves at ~0.2x scroll speed, headline/buttons move up faster and fade out (Disabled on mobile for clean reading)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });

  const videoParallaxY = useSpring(
    useTransform(
      heroScroll,
      [0, 1],
      prefersReducedMotion || isMobileViewport ? ['0%', '0%'] : ['0%', '20%']
    ),
    { stiffness: 100, damping: 30 }
  );

  const heroContentY = useSpring(
    useTransform(
      heroScroll,
      [0, 1],
      prefersReducedMotion || isMobileViewport ? [0, 0] : [0, -90]
    ),
    { stiffness: 100, damping: 30 }
  );

  const heroContentOpacity = useTransform(
    heroScroll,
    [0, 0.75],
    prefersReducedMotion || isMobileViewport ? [1, 1] : [1, 0]
  );

  // Observe the 5 Sticky Steps in Section 13
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStickyStep(index);
            }
          });
        },
        { rootMargin: '-32% 0px -38% 0px', threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

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
          HERO SECTION
          Desktop (lg+): Two-Column Editorial Composition (Left Typography, Right Subject)
          Mobile (<768px): Scaler-Inspired Compact EdTech Hero communicating:
          1. Brand label
          2. Main headline (38–46px)
          3. Supporting description (15–16px)
          4. Primary CTA & Secondary CTA
          5. Which courses are available (Interactive 4-Program Quick Discovery Strip)
          6. Controlled 16:10 Hero Photograph
         ===================================================================== */}
      <section
        ref={heroSectionRef}
        className="relative min-h-0 md:min-h-[88vh] lg:min-h-[92vh] w-full overflow-hidden bg-[#0B0B0B] text-[#F8F6F0] flex flex-col justify-center lg:flex-row lg:items-center select-none"
      >
        {/* DESKTOP RIGHT-SIDE VISUAL AREA: Positioned on the right so the woman's face is in the upper-right and never overlapped by text */}
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

        {/* Subtle Left-Side Gradient for Text Readability on Desktop (Never darkens the right-side subject's face) */}
        <div
          className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-[56%] z-[1] bg-[linear-gradient(90deg,#0B0B0B_0%,#0B0B0B_62%,rgba(11,11,11,0.82)_82%,rgba(11,11,11,0)_100%)]"
          aria-hidden="true"
        />

        {/* MAIN CONTAINER */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-20 pt-8 pb-10 md:pt-14 md:pb-10 lg:py-24 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-8 lg:gap-10 items-center">
            {/* LEFT COLUMN — TEXT */}
            <motion.div
              style={
                isMobileViewport
                  ? undefined
                  : { y: heroContentY, opacity: heroContentOpacity }
              }
              className="lg:col-span-6 w-full max-w-[620px] lg:pr-4 flex flex-col justify-center"
            >
              {/* 1. Brand Label (Preserved on both mobile and desktop) */}
              <ScrollRevealBlock direction="up">
                <span className="small-gold-label text-[#C6A15B] block mb-3.5 md:mb-6">
                  IND ACADEMY — AN EDTECH INITIATIVE BY BRIGHTLUME DIGITAL MEDIA PRIVATE LIMITED
                </span>
              </ScrollRevealBlock>

              {/* 2. Main Headline (38–46px on mobile via hero-h1-clamp; original size on desktop) */}
              <EditorialRevealTitle
                as="h1"
                className="font-display-serif hero-h1-clamp md:!text-[3.5rem] lg:!text-[3.85rem] xl:!text-[4.5rem] leading-[1.08] md:leading-[1.06] tracking-[-0.02em] text-[#F8F6F0] mb-4 md:mb-7"
                segments={[
                  { text: 'Learn Today.', lineBreakAfter: true },
                  { text: "Build Tomorrow's", gold: true, lineBreakAfter: true },
                  { text: 'Career.', gold: true },
                ]}
              />

              {/* 3. Supporting Description (Preserved on both mobile and desktop) */}
              <ScrollRevealBlock direction="up" delay={0.12}>
                <p className="text-[15.5px] sm:text-lg xl:text-[19px] text-[#F8F6F0]/88 font-normal leading-[1.6] md:leading-[1.65] max-w-[540px] mb-6 md:mb-10">
                  Master Digital Marketing, Coding, Artificial Intelligence, and
                  Video Editing through practical training, real-world projects,
                  and dedicated mentor guidance.
                </p>
              </ScrollRevealBlock>

              {/* 4. Primary & Secondary CTAs (14–15px buttons on mobile, full touch targets) */}
              <ScrollRevealBlock direction="up" delay={0.18}>
                <div className="grid grid-cols-2 sm:inline-flex sm:flex-row sm:flex-wrap items-center gap-3 md:gap-4 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => onNavigate('catalogue')}
                    className="group min-h-[46px] px-4 py-3 md:px-8 md:py-4 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[14px] md:text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 cursor-pointer whitespace-nowrap"
                  >
                    <span>Explore courses</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('enrollment')}
                    className="group min-h-[46px] px-4 py-3 md:px-8 md:py-4 rounded-xl bg-[#171717]/85 hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] border border-[#F8F6F0]/30 hover:border-[#C6A15B] backdrop-blur-md text-[14px] md:text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 cursor-pointer whitespace-nowrap"
                  >
                    <span>Request a callback</span>
                    <ArrowRight className="hidden sm:inline w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />
                  </button>
                </div>
              </ScrollRevealBlock>

              {/* Mobile-Only (<768px) First-Screen Course Quick-Discovery Strip (Scaler-style immediate clarity on available courses) */}
              <div className="md:hidden mt-6 pt-5 border-t border-[#333333] pointer-events-auto">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="small-gold-label text-[#C6A15B]">
                    Available Career Programs (4 Tracks)
                  </span>
                  <span className="text-[11px] text-[#8B8983]">
                    Online &amp; Offline
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {COURSES_DATA.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => onNavigate(course.slug)}
                      className="text-left p-2.5 rounded-xl bg-[#171717] border border-[#333333] active:border-[#C6A15B] flex items-center justify-between gap-1.5 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <span className="block text-[10px] font-medium text-[#C6A15B] tabular-nums">
                          Program {course.code}
                        </span>
                        <span className="block text-[13px] font-medium text-[#F8F6F0] truncate">
                          {course.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 5. HERO PHOTOGRAPH FOR MOBILE & TABLET (<1024px) — Controlled 16:10 Image Ratio with Full Face Visibility */}
            <div className="lg:hidden lg:col-span-6 w-full pointer-events-auto">
              <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-[#333333] bg-[#171717] shadow-2xl">
                <img
                  src={HERO_VIDEO_CONFIG.posterUrl}
                  alt="IND Academy Learner"
                  className="w-full h-full object-cover object-[50%_18%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.0)_55%,rgba(11,11,11,0.78)_100%)]" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F8F6F0]">
                  <span className="small-gold-label text-[#C6A15B]">
                    Practical Learning · Real-World Skills
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BELOW THE HERO: WIDE VIDEO/FILM CARD BESIDE DARK COURSE BROCHURE CARD
         ===================================================================== */}
      <section className="bg-[#F8F6F0] py-12 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            {/* Wide Video Card: Course Information & Program Overview (YouTube Uf9xAlFJ5bM) */}
            <ScrollRevealBlock direction="up" className="lg:col-span-8">
              <div
                onClick={() => setShowDayFilmModal(true)}
                className="group relative h-full min-h-[260px] sm:min-h-[300px] md:min-h-[380px] rounded-2xl overflow-hidden border border-[#E7E2D8] hover:border-[#C6A15B] bg-[#171717] flex flex-col justify-end p-5 sm:p-6 md:p-10 cursor-pointer transition-colors"
              >
                <img
                  src="https://i.ytimg.com/vi/Uf9xAlFJ5bM/maxresdefault.jpg"
                  alt="IND Academy Course Information & Curriculum Overview"
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
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-90 md:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/35 to-transparent" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6">
                  <div>
                    <span className="small-gold-label text-[#C6A15B] block mb-1.5 md:mb-2">
                      Course Information &amp; Program Overview
                    </span>
                    <h2 className="font-display-serif text-[24px] sm:text-3xl md:text-4xl leading-tight text-[#F8F6F0]">
                      Explore Our Courses &amp; Career Tracks
                    </h2>
                    <p className="text-[14.5px] md:text-base text-[#F8F6F0]/85 mt-2 max-w-xl leading-relaxed">
                      Watch a complete overview of our practical courses,
                      curriculum structure, industry tools, and how IND Academy
                      prepares you for real-world career opportunities.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDayFilmModal(true);
                    }}
                    className="group/play min-h-[44px] inline-flex items-center justify-center gap-2.5 px-5 py-3 md:px-6 md:py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[14px] md:text-sm font-medium transition-all shrink-0 cursor-pointer self-start sm:self-auto"
                  >
                    <Play className="w-4 h-4 fill-current shrink-0" />
                    <span>Watch Video</span>
                  </button>
                </div>
              </div>
            </ScrollRevealBlock>

            {/* Dark "Course Brochure" Card with Download Button (100% Content Preserved) */}
            <ScrollRevealBlock
              direction="up"
              delay={0.1}
              className="lg:col-span-4"
            >
              <div className="h-full rounded-2xl bg-[#171717] text-[#F8F6F0] border border-[#333333] p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="small-gold-label text-[#C6A15B] block mb-2 md:mb-3">
                    Academic Dossier
                  </span>
                  <h3 className="font-display-serif text-[26px] md:text-3xl text-[#F8F6F0] mb-3 md:mb-4">
                    Course Brochure
                  </h3>
                  <p className="text-[15px] md:text-base text-[#F8F6F0]/75 leading-relaxed mb-5 md:mb-6">
                    Download the complete IND Academy curriculum guide covering
                    all modules, practice labs, and tools for Digital Marketing,
                    Coding, Artificial Intelligence, and Video Editing.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:block gap-2 md:space-y-2.5 text-[13.5px] md:text-sm text-[#F8F6F0]/85 border-t border-[#333333] pt-4 md:pt-5">
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] shrink-0" />
                      <span>01 Digital Marketing</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] shrink-0" />
                      <span>02 Coding &amp; Web</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] shrink-0" />
                      <span>03 Artificial Intelligence</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] shrink-0" />
                      <span>04 Video Editing</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBrochureDownloaded(false);
                    setBrochureModalCourse('All IND Academy Programs');
                  }}
                  className="mt-6 md:mt-8 w-full min-h-[46px] py-3.5 px-6 md:py-4 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[14px] md:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download brochure</span>
                </button>
              </div>
            </ScrollRevealBlock>
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* =====================================================================
          WHY IND ACADEMY: 4 COLUMNS WITH HAIRLINE DIVIDERS
         ===================================================================== */}
      <section id="why-ind-section" className="bg-[#FFFFFF] py-12 md:pt-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-16">
            <ScrollRevealBlock direction="up">
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                Why IND Academy
              </span>
            </ScrollRevealBlock>
            <EditorialRevealTitle
              as="h2"
              className="section-h2-clamp text-[#171717]"
              segments={[
                { text: 'Education Built Around' },
                { text: 'Real Practice.', goldOnLight: true },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E7E2D8] md:border-x-0 md:border-y rounded-2xl md:rounded-none divide-y sm:divide-y-0 sm:divide-x divide-[#E7E2D8] overflow-hidden bg-[#F8F6F0]/40 md:bg-transparent">
            {WHY_IND_COLUMNS.map((col, idx) => (
              <ScrollRevealBlock
                key={col.number}
                direction="up"
                delay={idx * 0.05}
                className="p-5 sm:p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="small-gold-label text-[#A98747] block mb-2 md:mb-4 tabular-nums">
                    {col.number}
                  </span>
                  <h3 className="font-display-serif mobile-course-h3 md:text-2xl leading-snug text-[#171717] mb-2 md:mb-3">
                    {col.title}
                  </h3>
                </div>
                <p className="text-[15px] md:text-base text-[#171717]/75 leading-[1.6] md:leading-relaxed">
                  {col.description}
                </p>
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BROCHURE STRIP: "Syllabus & Admissions Guide / Ready to take your first step?"
          Preserved on both mobile and desktop
         ===================================================================== */}
      <section className="bg-[#171717] text-[#F8F6F0] py-10 md:py-12 border-y border-[#333333]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 md:gap-6">
          <div>
            <span className="small-gold-label text-[#C6A15B] block mb-1.5">
              Syllabus &amp; Admissions Guide
            </span>
            <h2 className="font-display-serif text-[26px] sm:text-3xl text-[#F8F6F0]">
              Ready to take your first step?
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 md:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setBrochureDownloaded(false);
                setBrochureModalCourse('Complete IND Academy Brochure');
              }}
              className="group min-h-[46px] px-4 md:px-6 py-3 md:py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[14px] md:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Download brochure</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('enrollment')}
              className="group min-h-[46px] px-4 md:px-6 py-3 md:py-3.5 rounded-xl border border-[#333333] hover:border-[#C6A15B] text-[#F8F6F0] text-[14px] md:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a callback</span>
              <ArrowRight className="w-4 h-4 text-[#C6A15B] transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PROGRAMS: SCALER-INSPIRED INTERACTIVE COURSE DISCOVERY ON MOBILE & 2x2 GRID ON DESKTOP
         ===================================================================== */}
      <section id="programs-section" className="bg-[#F8F6F0] py-14 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 md:gap-8 mb-6 md:mb-14">
            <div>
              <ScrollRevealBlock direction="up">
                <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                  All 4 Core Programs Highlighted
                </span>
              </ScrollRevealBlock>
              <EditorialRevealTitle
                as="h2"
                className="section-h2-clamp text-[#171717]"
                segments={[
                  { text: 'Programs Designed for' },
                  { text: 'Practical Fluency.', goldOnLight: true },
                ]}
              />
              <p className="text-[15.5px] sm:text-lg text-[#171717]/75 mt-3 max-w-2xl leading-[1.6]">
                Explore all four career tracks side by side. Click{' '}
                <span className="font-medium text-[#171717]">Full Details</span>{' '}
                on any program to inspect its skills covered, tools covered, and
                learning outcomes in a popup.
              </p>
            </div>

            {/* Mode Filter Pills (Online + Offline, Online, Offline Hyderabad) */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] self-start lg:self-auto">
              {(
                ['Online + Offline', 'Online', 'Offline Hyderabad'] as const
              ).map((pill) => {
                const active = modeFilter === pill;
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setModeFilter(pill)}
                    className={`px-3.5 md:px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#171717] text-[#F8F6F0]'
                        : 'text-[#171717]/75 hover:bg-[#F8F6F0]'
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile-Only (<768px) Scaler-Inspired Interactive Track Filter Tabs */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-5">
            <button
              type="button"
              onClick={() => setMobileCategoryFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                mobileCategoryFilter === 'all'
                  ? 'bg-[#171717] text-[#F8F6F0] border-[#171717]'
                  : 'bg-[#FFFFFF] text-[#171717] border-[#E7E2D8]'
              }`}
            >
              All 4 Programs
            </button>
            {COURSES_DATA.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setMobileCategoryFilter(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                  mobileCategoryFilter === c.id
                    ? 'bg-[#171717] text-[#F8F6F0] border-[#171717]'
                    : 'bg-[#FFFFFF] text-[#171717] border-[#E7E2D8]'
                }`}
              >
                {c.code} · {c.title}
              </button>
            ))}
          </div>

          {/* Mobile: Clearly Separated Structured Course Cards (1 col); Tablet/Desktop: 2x2 Grid */}
          <div className="md:hidden grid grid-cols-1 gap-5">
            {filteredMobileCourses.map((course, idx) => (
              <ScrollRevealBlock
                key={course.id}
                direction="up"
                delay={idx * 0.06}
              >
                <CourseCard
                  course={{
                    ...course,
                    mode: modeFilter,
                  }}
                  onNavigate={onNavigate}
                />
              </ScrollRevealBlock>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {COURSES_DATA.map((course, idx) => (
              <ScrollRevealBlock
                key={course.id}
                direction="up"
                delay={(idx % 2) * 0.08}
              >
                <CourseCard
                  course={{
                    ...course,
                    mode: modeFilter,
                  }}
                  onNavigate={onNavigate}
                />
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* =====================================================================
          PRACTICE LABS: 4 DEDICATED LABS (1 PER COURSE SO ALL 4 ARE EQUALLY HIGHLIGHTED)
         ===================================================================== */}
      <section id="labs-section" className="bg-[#FFFFFF] py-14 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-16">
            <ScrollRevealBlock direction="up">
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                Hands-On Execution Across All 4 Tracks
              </span>
            </ScrollRevealBlock>
            <EditorialRevealTitle
              as="h2"
              className="section-h2-clamp text-[#171717]"
              segments={[
                { text: 'Dedicated Studio' },
                { text: 'Practice Labs.', goldOnLight: true },
              ]}
            />
            <ScrollRevealBlock direction="up" delay={0.12}>
              <p className="text-[15.5px] sm:text-base md:text-lg text-[#171717]/75 mt-3 md:mt-4 leading-[1.6]">
                Every program has its own dedicated practice lab—where students
                launch campaigns, build full-stack web apps, automate AI
                workflows, and edit commercial video timelines.
              </p>
            </ScrollRevealBlock>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {PRACTICE_LABS_DATA.map((lab, idx) => (
              <ScrollRevealBlock
                key={lab.id}
                direction="up"
                delay={(idx % 2) * 0.09}
              >
                <InteractiveTiltCard className="h-full">
                  <div className="group h-full rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] hover:border-[#C6A15B] overflow-hidden flex flex-col justify-between transition-colors">
                    <div>
                      <div className="relative aspect-16/10 overflow-hidden bg-[#171717]">
                        <ResilientImage
                          src={lab.image}
                          alt={lab.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/75 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F8F6F0]">
                          <span className="small-gold-label text-[#C6A15B]">
                            {lab.number}
                          </span>
                          <span className="text-xs font-medium text-[#F8F6F0]/90">
                            {lab.programTag}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 md:p-6">
                        <h3 className="font-display-serif mobile-course-h3 md:text-2xl leading-snug text-[#171717] mb-2">
                          {lab.title}
                        </h3>
                        <p className="text-[15px] md:text-sm text-[#171717]/75 leading-[1.6] md:leading-relaxed">
                          {lab.oneLine}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-3.5 border-t border-[#E7E2D8]/80 flex flex-wrap gap-1.5">
                      {lab.topics.map((chip) => (
                        <span
                          key={chip}
                          className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E7E2D8] text-xs text-[#171717]/85"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </InteractiveTiltCard>
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* =====================================================================
          MENTORS: TWO ROWS MOVING IN A SLOW MARQUEE IN OPPOSITE DIRECTIONS
         ===================================================================== */}
      <section
        id="mentors-section"
        className="bg-[#FFFFFF] py-14 md:py-24 lg:py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 mb-8 md:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6">
            <div>
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                Practicing Educators Across All 4 Disciplines
              </span>
              <EditorialRevealTitle
                as="h2"
                className="section-h2-clamp text-[#171717]"
                segments={[
                  { text: 'Guided by Experienced' },
                  { text: 'Industry Mentors.', goldOnLight: true },
                ]}
              />
            </div>
            <p className="text-[15px] md:text-sm text-[#8B8983] max-w-md leading-[1.6]">
              Mentors bring active workflows in digital marketing, software
              engineering, applied AI, and video post-production directly into
              the classroom.
            </p>
          </div>
        </div>

        {/* Row 1: Slow Marquee Left */}
        <div className="mb-4 md:mb-6 overflow-hidden">
          <div className="animate-marquee-left gap-4 md:gap-6 px-3">
            {[...MENTORS_MARQUEE_ROW_1, ...MENTORS_MARQUEE_ROW_1].map(
              (mentor, idx) => (
                <div
                  key={`${mentor.id}-${idx}`}
                  className="w-[270px] md:w-[320px] shrink-0 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] p-3.5 md:p-4 flex items-center gap-3.5 md:gap-4 mr-4 md:mr-6"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shrink-0 border border-[#E7E2D8]"
                  />
                  <div className="min-w-0">
                    <span className="small-gold-label text-[#A98747] block truncate">
                      {mentor.discipline}
                    </span>
                    <h3 className="font-display-serif text-lg md:text-lg text-[#171717] mt-0.5 truncate">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-[#8B8983] mt-0.5 truncate">
                      {mentor.role}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Row 2: Slow Marquee Right (Opposite Direction) */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right gap-4 md:gap-6 px-3">
            {[...MENTORS_MARQUEE_ROW_2, ...MENTORS_MARQUEE_ROW_2].map(
              (mentor, idx) => (
                <div
                  key={`${mentor.id}-${idx}`}
                  className="w-[270px] md:w-[320px] shrink-0 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] p-3.5 md:p-4 flex items-center gap-3.5 md:gap-4 mr-4 md:mr-6"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shrink-0 border border-[#E7E2D8]"
                  />
                  <div className="min-w-0">
                    <span className="small-gold-label text-[#A98747] block truncate">
                      {mentor.discipline}
                    </span>
                    <h3 className="font-display-serif text-lg md:text-lg text-[#171717] mt-0.5 truncate">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-[#8B8983] mt-0.5 truncate">
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
          FREE MASTERCLASSES: 4 EPISODE-STYLE CARDS (1 FOR EACH COURSE)
         ===================================================================== */}
      <section
        id="masterclasses-section"
        className="bg-[#F8F6F0] py-14 md:py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-16">
            <div>
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                Open Academic Sessions Across All 4 Courses
              </span>
              <EditorialRevealTitle
                as="h2"
                className="section-h2-clamp text-[#171717]"
                segments={[
                  { text: 'Free Masterclasses &' },
                  { text: 'Demo Sessions.', goldOnLight: true },
                ]}
              />
            </div>

            <button
              type="button"
              onClick={() => onNavigate('enrollment')}
              className="group min-h-[46px] inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl border border-[#171717] hover:bg-[#171717] text-[#171717] hover:text-[#F8F6F0] text-[14px] md:text-sm font-medium transition-colors cursor-pointer self-start lg:self-auto"
            >
              <span>Reserve a Free Demo Seat</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {MASTERCLASSES_PLACEHOLDERS.map((mc, idx) => (
              <ScrollRevealBlock
                key={mc.id}
                direction="up"
                delay={(idx % 2) * 0.1}
              >
                <InteractiveTiltCard className="h-full">
                  <div className="group h-full rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] overflow-hidden flex flex-col justify-between transition-colors">
                    <div>
                      <div className="relative aspect-16/10 overflow-hidden bg-[#171717]">
                        <ResilientImage
                          src={mc.image}
                          alt={mc.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/75 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2.5 py-1 md:px-3 md:py-1 rounded-md bg-[#171717]/90 border border-[#C6A15B]/50 text-xs text-[#C6A15B] font-medium">
                          {mc.episode}
                        </div>
                      </div>

                      <div className="p-5 md:p-7">
                        <span className="small-gold-label text-[#A98747] block mb-1.5 md:mb-2">
                          {mc.discipline}
                        </span>
                        <h3 className="font-display-serif mobile-course-h3 md:text-2xl leading-snug text-[#171717] mb-2 md:mb-3">
                          {mc.title}
                        </h3>
                        <p className="text-xs text-[#8B8983] mb-1">
                          {mc.speakerPlaceholder}
                        </p>
                        <p className="text-xs text-[#171717]/75">
                          {mc.schedulePlaceholder}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3.5 md:px-7 md:pb-7 md:pt-4 border-t border-[#E7E2D8]">
                      <button
                        type="button"
                        onClick={() => onNavigate('enrollment')}
                        className="group/btn w-full min-h-[44px] py-2.5 px-4 md:py-3 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-[14px] md:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Register</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </InteractiveTiltCard>
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* =====================================================================
          HOW IND ACADEMY WORKS: VERTICAL NUMBERED TIMELINE ON MOBILE (<768px) & STICKY TWO-COLUMN ON TABLET/DESKTOP
         ===================================================================== */}
      <section className="bg-[#FFFFFF] py-14 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-16">
            <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
              How IND Academy Works
            </span>
            <EditorialRevealTitle
              as="h2"
              className="section-h2-clamp text-[#171717]"
              segments={[
                { text: 'Five Steps From Curiosity' },
                { text: 'to Portfolio.', goldOnLight: true },
              ]}
            />
          </div>

          {/* MOBILE ONLY (<768px): Dedicated Vertical Numbered Timeline with Subtle Animated Gold SVG Line */}
          <div className="md:hidden relative pl-8 space-y-4">
            {/* Vertical Connecting SVG Line */}
            <svg
              className="absolute left-3 top-4 bottom-4 w-[2px] h-[calc(100%-32px)] overflow-visible"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#E7E2D8"
                strokeWidth="2"
              />
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#C6A15B"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            {HOW_IND_WORKS_STICKY_STEPS.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] p-5 shadow-xs"
              >
                {/* Numbered Node on the Vertical Line */}
                <div className="absolute -left-8 top-5 w-6 h-6 rounded-full bg-[#171717] border border-[#C6A15B] text-[#C6A15B] text-[10px] font-semibold tabular-nums flex items-center justify-center">
                  {item.step}
                </div>

                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="small-gold-label text-[#A98747] tabular-nums">
                    Step {item.step}
                  </span>
                  <span className="text-[11px] text-[#8B8983]">
                    {item.deliverableNote}
                  </span>
                </div>
                <h3 className="font-display-serif mobile-course-h3 text-[#171717] mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#171717]/80 leading-[1.6]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* TABLET & DESKTOP (>=768px): Original Sticky Two-Column Layout Untouched */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Sticky Image that Cross-Fades */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-[#E7E2D8] bg-[#171717] shadow-lg">
                {HOW_IND_WORKS_STICKY_STEPS.map((s, idx) => {
                  const isCurrent = activeStickyStep === idx;
                  return (
                    <img
                      key={s.step}
                      src={s.image}
                      alt={s.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  );
                })}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-[#F8F6F0]">
                  <div>
                    <span className="small-gold-label text-[#C6A15B] block mb-1">
                      Step {HOW_IND_WORKS_STICKY_STEPS[activeStickyStep]?.step}
                    </span>
                    <p className="font-display-serif text-2xl">
                      {HOW_IND_WORKS_STICKY_STEPS[activeStickyStep]?.title}
                    </p>
                  </div>
                  <span className="text-xs text-[#F8F6F0]/75 hidden sm:inline-block">
                    {
                      HOW_IND_WORKS_STICKY_STEPS[activeStickyStep]
                        ?.deliverableNote
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Five Scrolling Steps (Active at full opacity, others dimmed) */}
            <div className="lg:col-span-6 space-y-16 lg:py-8">
              {HOW_IND_WORKS_STICKY_STEPS.map((item, idx) => {
                const isActive = activeStickyStep === idx;
                return (
                  <div
                    key={item.step}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    onClick={() => setActiveStickyStep(idx)}
                    className={`p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                      isActive
                        ? 'opacity-100 bg-[#F8F6F0] border-[#C6A15B] shadow-sm'
                        : 'opacity-35 hover:opacity-65 bg-[#FFFFFF] border-[#E7E2D8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="small-gold-label text-[#A98747] tabular-nums">
                        Step {item.step}
                      </span>
                      <span className="text-xs text-[#8B8983]">
                        {item.deliverableNote}
                      </span>
                    </div>
                    <h3 className="font-display-serif text-3xl text-[#171717] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#171717]/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          RESULTS (Charcoal Section #171717): FOUR BENCHMARKS
         ===================================================================== */}
      <section className="bg-[#171717] text-[#F8F6F0] py-14 md:py-24 border-y border-[#333333]">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-8 md:mb-14">
            <span className="small-gold-label text-[#C6A15B] block mb-2.5 md:mb-3">
              Institutional Depth
            </span>
            <h2 className="section-h2-clamp text-[#F8F6F0]">
              Measured by Practical Depth.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#333333] md:border-x-0 md:border-y rounded-2xl md:rounded-none divide-x divide-y lg:divide-y-0 divide-[#333333]">
            {INITIAL_RESULTS_PLACEHOLDERS.map((metric) => (
              <div key={metric.id} className="p-5 sm:p-6 md:p-8">
                <div className="font-display-serif text-4xl sm:text-5xl md:text-6xl text-[#C6A15B] tabular-nums mb-2 md:mb-3">
                  {metric.number}
                </div>
                <div className="text-[14px] sm:text-sm md:text-base font-medium text-[#F8F6F0] mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-[#8B8983] leading-snug">
                  {metric.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          JOURNAL: THREE ARTICLE CARDS
         ===================================================================== */}
      <section id="journal-section" className="bg-[#F8F6F0] py-14 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-16">
            <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
              IND Academy Journal
            </span>
            <EditorialRevealTitle
              as="h2"
              className="section-h2-clamp text-[#171717]"
              segments={[
                { text: 'Notes on Craft,' },
                { text: 'Code, AI & Media.', goldOnLight: true },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
            {JOURNAL_ARTICLES_DATA.map((article, idx) => (
              <ScrollRevealBlock
                key={article.id}
                direction="up"
                delay={idx * 0.1}
              >
                <InteractiveTiltCard className="h-full">
                  <article className="group h-full rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] overflow-hidden flex flex-col justify-between transition-colors">
                    <div>
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#171717]">
                        <ResilientImage
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-5 md:p-7">
                        <div className="flex items-center justify-between text-xs text-[#8B8983] mb-2.5 md:mb-3">
                          <span className="small-gold-label text-[#A98747]">
                            {article.category}
                          </span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="font-display-serif mobile-course-h3 md:text-2xl leading-snug text-[#171717] mb-2 md:mb-3 group-hover:text-[#A98747] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-[15px] md:text-sm text-[#171717]/75 leading-[1.6] md:leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3.5 md:px-7 md:pb-7 md:pt-3 border-t border-[#E7E2D8]">
                      <button
                        type="button"
                        onClick={() => setActiveArticle(article)}
                        className="group/read inline-flex items-center gap-2 text-[14px] md:text-sm font-medium text-[#171717] hover:text-[#A98747] transition-colors cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 text-[#A98747] transition-transform duration-300 group-hover/read:translate-x-1" />
                      </button>
                    </div>
                  </article>
                </InteractiveTiltCard>
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODALS (Watch Course Video Popup, Download Brochure, Read Journal)
         ===================================================================== */}

      {/* Watch Course Overview Video Popup Modal (Mobile-First Viewer on <768px; Original Modal on Tablet/Desktop) */}
      {showDayFilmModal && (
        <div
          onClick={() => setShowDayFilmModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="IND Academy Course Information Video Player"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full rounded-2xl bg-[#171717] text-[#F8F6F0] border border-[#333333] overflow-hidden shadow-2xl my-auto"
          >
            {/* Compact Top Header & Clear Close Button */}
            <div className="px-4 py-3 md:px-6 md:py-4 border-b border-[#333333] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="small-gold-label text-[#C6A15B] block truncate">
                  Course Information &amp; Program Overview
                </span>
                <h3 className="font-display-serif text-base md:text-xl text-[#F8F6F0] truncate">
                  Explore Our Courses &amp; Career Tracks — IND Academy
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDayFilmModal(false)}
                aria-label="Close video player"
                className="w-[42px] h-[42px] md:w-9 md:h-9 rounded-xl border border-[#333333] bg-[#0B0B0B] flex items-center justify-center text-[#F8F6F0] hover:border-[#C6A15B] hover:text-[#C6A15B] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Full Available Width 16:9 Branded Video Player */}
            <div className="p-2 sm:p-4 bg-[#0B0B0B]">
              <IndAcademyVideoPlayer
                youtubeVideoId={COURSE_OVERVIEW_VIDEO_CONFIG.youtubeVideoId}
                posterUrl={COURSE_OVERVIEW_VIDEO_CONFIG.posterUrl}
                directVideoUrl={COURSE_OVERVIEW_VIDEO_CONFIG.directVideoUrl}
                bunnyStream={COURSE_OVERVIEW_VIDEO_CONFIG.bunnyStream}
                autoPlay={!isMobileViewport}
                onExploreCourses={() => {
                  setShowDayFilmModal(false);
                  onNavigate('catalogue');
                }}
              />
            </div>

            {/* Mobile-Only Short Course Description & CTA Below Video (No nested scrollbars) */}
            <div className="md:hidden px-4 py-3.5 bg-[#171717] border-t border-[#333333] flex items-center justify-between gap-3">
              <p className="text-[12px] text-[#F8F6F0]/80 leading-snug">
                Practical training in Digital Marketing, Coding, AI &amp; Video Editing.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowDayFilmModal(false);
                  onNavigate('catalogue');
                }}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#C6A15B] text-[#171717] text-[12px] font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Courses →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Brochure Download Modal */}
      {brochureModalCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/80 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-lg w-full rounded-2xl bg-[#F8F6F0] text-[#171717] border border-[#E7E2D8] p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E2D8]">
              <div>
                <span className="small-gold-label text-[#A98747] block">
                  Curriculum Dossier
                </span>
                <h3 className="font-display-serif text-2xl text-[#171717]">
                  {brochureModalCourse}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBrochureModalCourse(null)}
                className="w-9 h-9 rounded-xl border border-[#E7E2D8] flex items-center justify-center text-[#171717] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {brochureDownloaded ? (
              <div className="space-y-4 text-center py-4">
                <CheckCircle2 className="w-10 h-10 text-[#A98747] mx-auto" />
                <h4 className="font-display-serif text-2xl text-[#171717]">
                  Your Syllabus Summary Is Ready
                </h4>
                <p className="text-sm text-[#171717]/75 leading-relaxed">
                  Thank you, {brochureName}. You can now view the full
                  module-by-module curriculum or speak with our admissions
                  counsellors for batch schedules.
                </p>
                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setBrochureModalCourse(null);
                      onNavigate('catalogue');
                    }}
                    className="px-6 py-3 rounded-xl bg-[#171717] text-[#F8F6F0] text-sm font-medium cursor-pointer"
                  >
                    Explore All 4 Programs
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="space-y-4">
                <p className="text-sm text-[#171717]/75 leading-relaxed">
                  Enter your details below to access the curriculum brochure and
                  receive cohort updates from IND Academy.
                </p>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.14em] text-[#171717] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brochureName}
                    onChange={(e) => setBrochureName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-[#E7E2D8] bg-[#FFFFFF] px-4 py-3 text-sm text-[#171717]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.14em] text-[#171717] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={brochurePhone}
                    onChange={(e) => setBrochurePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-[#E7E2D8] bg-[#FFFFFF] px-4 py-3 text-sm text-[#171717]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.14em] text-[#171717] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={brochureEmail}
                    onChange={(e) => setBrochureEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#E7E2D8] bg-[#FFFFFF] px-4 py-3 text-sm text-[#171717]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-sm font-medium transition-colors cursor-pointer"
                >
                  Download Brochure
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Journal Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/80 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-2xl w-full rounded-2xl bg-[#F8F6F0] text-[#171717] border border-[#E7E2D8] p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-[#E7E2D8]">
              <div>
                <span className="small-gold-label text-[#A98747] block mb-1">
                  {activeArticle.category} · {activeArticle.readTime}
                </span>
                <h3 className="font-display-serif text-2xl sm:text-3xl text-[#171717]">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="w-9 h-9 rounded-xl border border-[#E7E2D8] flex items-center justify-center text-[#171717] shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 text-base text-[#171717]/85 leading-relaxed">
              {activeArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 pt-5 border-t border-[#E7E2D8] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-[#171717] text-[#F8F6F0] text-sm font-medium cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
