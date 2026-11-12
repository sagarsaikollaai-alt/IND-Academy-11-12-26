import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  BRAND_ASSETS,
  HOW_LEARNING_WORKS_STEPS,
  LEARNING_EXPERIENCE_PILLARS,
  PageId,
  PRACTICE_LABS_DATA,
} from '../data/siteData';
import {
  EditorialRevealTitle,
  HairlineDivider,
  InteractiveTiltCard,
  ParallaxImageFrame,
  ParallaxLayer,
  ParallaxTickerBand,
  ScrollRevealBlock,
} from '../components/MotionPrimitives';

interface LearningExperiencePageProps {
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const LearningExperiencePage: React.FC<LearningExperiencePageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="bg-[#F8F6F0] text-[#171717]">
      {/* HERO SECTION */}
      <section className="relative bg-[#F8F6F0] pt-10 pb-14 md:pt-16 md:pb-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollRevealBlock direction="up">
                <span className="small-gold-label text-[#A98747] block mb-3 md:mb-4">
                  IND Academy · Learning Experience
                </span>
              </ScrollRevealBlock>

              <EditorialRevealTitle
                as="h1"
                className="hero-h1-clamp text-[#171717] mb-4 md:mb-6"
                segments={[
                  { text: 'Learn Through' },
                  { text: 'Practice.', goldOnLight: true },
                ]}
              />

              <ScrollRevealBlock direction="up" delay={0.14}>
                <p className="text-[15.5px] md:text-lg text-[#171717]/80 leading-[1.6] md:leading-relaxed max-w-2xl mb-6 md:mb-8">
                  At IND Academy, every session is structured around live
                  demonstration, hands-on practice labs, and direct mentor
                  feedback—whether you join Online or at our Offline Hyderabad
                  classroom.
                </p>
              </ScrollRevealBlock>

              <ScrollRevealBlock direction="up" delay={0.2}>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('enrollment')}
                    className="group min-h-[46px] px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-[14px] sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request a callback</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('catalogue')}
                    className="min-h-[46px] px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-[#171717] hover:border-[#C6A15B] text-[#171717] text-[14px] sm:text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Explore courses
                  </button>
                </div>
              </ScrollRevealBlock>
            </div>

            <div className="lg:col-span-5">
              <ParallaxLayer speedY={20}>
                <ParallaxImageFrame
                  src={BRAND_ASSETS.classroomImage}
                  alt="IND Academy Classroom"
                  caption="Collaborative Learning Studio"
                  aspectClass="aspect-[16/10] md:aspect-4/3"
                  badgeText="Online & Offline"
                />
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </section>

      <ParallaxTickerBand
        dark
        items={[
          'Live Interactive Classes',
          'Practice Labs',
          'Real-World Projects',
          'Mentor Support',
          'Portfolio Development',
        ]}
      />

      {/* MOBILE-ONLY ONLINE & OFFLINE LEARNING MODES (< 768px) */}
      <section className="md:hidden bg-[#F8F6F0] py-12 border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-6">
            <span className="small-gold-label text-[#A98747] block mb-2">
              Learning Modes
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Online &amp; Offline Studio Cohorts.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {/* Online Learning Card */}
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]">
                  <img
                    src={BRAND_ASSETS.codingImage}
                    alt="Online Learning at IND Academy"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#171717]/90 backdrop-blur-md border border-[#C6A15B]/45 text-[11px] font-medium uppercase tracking-[0.12em] text-[#C6A15B]">
                    Online
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display-serif mobile-course-h3 text-[#171717] mb-2">
                    Online Learning
                  </h3>
                  <p className="text-[15px] text-[#171717]/80 leading-[1.6] mb-3.5">
                    Live interactive sessions, remote practice labs &amp; 1-on-1 mentor reviews.
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-[#171717]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#A98747] shrink-0 mt-0.5" />
                      <span>Live instructor classes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#A98747] shrink-0 mt-0.5" />
                      <span>Remote practice labs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Offline Learning Card */}
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]">
                  <img
                    src={BRAND_ASSETS.classroomImage}
                    alt="Offline Classroom Learning in Hyderabad"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#171717]/90 backdrop-blur-md border border-[#C6A15B]/45 text-[11px] font-medium uppercase tracking-[0.12em] text-[#C6A15B]">
                    Offline Hyderabad
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display-serif mobile-course-h3 text-[#171717] mb-2">
                    Offline Hyderabad
                  </h3>
                  <p className="text-[15px] text-[#171717]/80 leading-[1.6] mb-3.5">
                    In-person studio cohorts at our Ameerpet campus with live mentor guidance.
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-[#171717]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#A98747] shrink-0 mt-0.5" />
                      <span>Ameerpet studio labs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#A98747] shrink-0 mt-0.5" />
                      <span>Direct mentor support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIX PILLARS */}
      <section className="bg-[#FFFFFF] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-16">
            <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
              01 · Methodology
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Six Pillars of Practical Education.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {LEARNING_EXPERIENCE_PILLARS.map((pillar, idx) => (
              <ScrollRevealBlock
                key={pillar.index}
                direction="up"
                delay={(idx % 3) * 0.08}
              >
                <InteractiveTiltCard className="h-full">
                  <div className="h-full p-5 md:p-8 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] hover:border-[#C6A15B] transition-colors flex flex-col justify-between">
                    <div>
                      <span className="small-gold-label text-[#A98747] block mb-2 md:mb-4 tabular-nums">
                        {pillar.index}
                      </span>
                      <h3 className="font-display-serif mobile-course-h3 md:text-2xl leading-snug text-[#171717] mb-2 md:mb-3">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-[15px] md:text-base text-[#171717]/75 leading-[1.6] md:leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </InteractiveTiltCard>
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* PRACTICE LABS PREVIEW */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-14">
            <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
              02 · Practice Labs
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Six Dedicated Practice Labs.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {PRACTICE_LABS_DATA.map((lab) => (
              <div
                key={lab.id}
                className="p-5 md:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] transition-colors"
              >
                <span className="small-gold-label text-[#A98747] block mb-2">
                  {lab.number} · {lab.programTag}
                </span>
                <h3 className="font-display-serif mobile-course-h3 md:text-2xl leading-snug text-[#171717] mb-2">
                  {lab.title}
                </h3>
                <p className="text-[15px] md:text-sm text-[#171717]/75 leading-[1.6] md:leading-relaxed mb-4">
                  {lab.oneLine}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {lab.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-[#F8F6F0] border border-[#E7E2D8] text-xs text-[#171717]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIVE STEP ARC */}
      <section className="bg-[#171717] text-[#F8F6F0] py-14 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-8 md:mb-14">
            <span className="small-gold-label text-[#C6A15B] block mb-2.5 md:mb-3">
              03 · Progression
            </span>
            <h2 className="section-h2-clamp text-[#F8F6F0]">
              From Foundation to Career Readiness.
            </h2>
          </div>

          {/* MOBILE VERTICAL NUMBERED TIMELINE (< 768px only) */}
          <div className="md:hidden relative pl-12 space-y-4">
            <div
              className="absolute left-[18px] top-4 bottom-4 w-px bg-gradient-to-b from-[#C6A15B] via-[#C6A15B]/50 to-[#333333]"
              aria-hidden="true"
            />
            {HOW_LEARNING_WORKS_STEPS.map((s) => (
              <div key={s.step} className="relative">
                <div className="absolute -left-12 top-0.5 w-9 h-9 rounded-full bg-[#0B0B0B] border border-[#C6A15B] flex items-center justify-center shadow-sm">
                  <span className="font-display-serif text-sm font-medium text-[#C6A15B] tabular-nums">
                    {s.step}
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-[#0B0B0B] border border-[#333333]">
                  <span className="small-gold-label text-[#C6A15B] block mb-1">
                    Step {s.step}
                  </span>
                  <h3 className="font-display-serif text-[21px] text-[#F8F6F0] mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-[14.5px] text-[#F8F6F0]/75 leading-[1.55]">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TABLET & DESKTOP 5-COLUMN GRID (>= 768px, untouched) */}
          <div className="hidden md:grid md:grid-cols-5 gap-6">
            {HOW_LEARNING_WORKS_STEPS.map((s) => (
              <div
                key={s.step}
                className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#333333] flex flex-col justify-between"
              >
                <div>
                  <span className="small-gold-label text-[#C6A15B] block mb-3">
                    Step {s.step}
                  </span>
                  <h3 className="font-display-serif text-2xl text-[#F8F6F0] mb-2">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-[#F8F6F0]/75 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
