import React from 'react';
import { ArrowRight, CheckCircle2, Laptop, MapPin } from 'lucide-react';
import {
  BRAND_ASSETS,
  HOW_LEARNING_WORKS_STEPS,
  PageId,
  PRACTICE_LABS_DATA,
} from '../data/siteData';
import {
  EditorialRevealTitle,
  HairlineDivider,
  ParallaxImageFrame,
} from '../components/MotionPrimitives';

interface LearningExperiencePageProps {
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const LearningExperiencePage: React.FC<LearningExperiencePageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="bg-[#F8F6F0] text-[#171717]">
      {/* 1. CONCISE HERO */}
      <section className="relative bg-[#F8F6F0] pt-10 pb-12 md:pt-16 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="small-gold-label text-[#A98747] block mb-2.5">
                Learning Experience
              </span>

              <EditorialRevealTitle
                as="h1"
                className="hero-h1-clamp text-[#171717] mb-3"
                segments={[
                  { text: 'Learn by' },
                  { text: 'building.', goldOnLight: true },
                ]}
              />

              <p className="text-[15.5px] md:text-lg text-[#57554F] max-w-lg mb-6">
                Live demonstrations, hands-on studio labs, and 1-on-1 mentor
                feedback—Online or at our Hyderabad studio.
              </p>

              <div className="grid grid-cols-2 sm:inline-flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('enrollment')}
                  className="min-h-[46px] px-6 py-3.5 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('catalogue')}
                  className="min-h-[46px] px-6 py-3.5 rounded-xl border border-[#171717] hover:border-[#C6A15B] text-[#171717] text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center cursor-pointer"
                >
                  All 4 Tracks
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ParallaxImageFrame
                src={BRAND_ASSETS.classroomImage}
                alt="IND Academy Studio"
                caption="Collaborative Studio Cohorts"
                aspectClass="aspect-[16/10]"
                badgeText="Online & Offline"
              />
            </div>
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* 2. TWO LEARNING FORMATS BENTO */}
      <section className="bg-[#FFFFFF] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-7 md:mb-10">
            <span className="small-gold-label text-[#A98747] block mb-1.5">
              01 · Formats
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Two ways to attend.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="rounded-3xl bg-[#F8F6F0] border border-[#E7E2D8] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] flex items-center justify-center text-[#A98747] mb-4">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="font-display-serif text-2xl md:text-3xl text-[#171717] mb-2">
                  Live Online
                </h3>
                <p className="text-sm text-[#57554F] mb-4">
                  Interactive remote classes with real-time screen-share reviews.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E7E2D8]">
                {['Live Mentors', 'Remote Labs', '1:1 Reviews'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E2D8] text-xs font-medium text-[#171717]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#A98747]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#171717] text-[#F8F6F0] border border-[#333333] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#0B0B0B] border border-[#333333] flex items-center justify-center text-[#C6A15B] mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display-serif text-2xl md:text-3xl text-[#F8F6F0] mb-2">
                  Hyderabad Studio
                </h3>
                <p className="text-sm text-[#F8F6F0]/75 mb-4">
                  In-person studio cohorts at our Ameerpet classroom.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#333333]">
                {['Ameerpet Campus', 'Studio Desk', 'Peer Sprints'].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B0B0B] border border-[#2C2C2C] text-xs font-medium text-[#F8F6F0]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#C6A15B]" />
                      <span>{item}</span>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR DEDICATED PRACTICE LABS */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-7 md:mb-10">
            <span className="small-gold-label text-[#A98747] block mb-1.5">
              02 · Studio Labs
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Four dedicated labs.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRACTICE_LABS_DATA.map((lab) => (
              <div
                key={lab.id}
                className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D8] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A98747] block mb-1.5">
                    {lab.number} · {lab.programTag}
                  </span>
                  <h3 className="font-display-serif text-xl text-[#171717] mb-3">
                    {lab.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E7E2D8]">
                  {lab.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full bg-[#F8F6F0] border border-[#E7E2D8] text-[11px] text-[#171717]"
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

      {/* 4. FIVE-STEP PROGRESSION */}
      <section className="bg-[#171717] text-[#F8F6F0] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-7 md:mb-10">
            <span className="small-gold-label text-[#C6A15B] block mb-1.5">
              03 · Progression
            </span>
            <h2 className="section-h2-clamp text-[#F8F6F0]">
              Five steps to career readiness.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {HOW_LEARNING_WORKS_STEPS.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-[#0B0B0B] border border-[#2C2C2C]"
              >
                <span className="text-xs font-semibold text-[#C6A15B] block mb-2">
                  Step {s.step}
                </span>
                <h3 className="font-display-serif text-xl text-[#F8F6F0] mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-[#8B8983] leading-relaxed">
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
