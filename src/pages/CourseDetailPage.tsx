import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CourseData, COURSES_DATA, PageId } from '../data/siteData';
import {
  EditorialRevealTitle,
  ParallaxImageFrame,
} from '../components/MotionPrimitives';

interface CourseDetailPageProps {
  course: CourseData;
  onNavigate: (page: PageId, courseId?: string) => void;
}

const CONCISE_HERO_SUMMARY: Record<string, string> = {
  'digital-marketing':
    'Master SEO, Meta Ads, Google Ads, and analytics through live campaign execution.',
  coding:
    'Build and deploy full-stack applications with React, Node.js, and modern databases.',
  'artificial-intelligence':
    'Design prompt systems, automated workflows, and applied AI agents.',
  'video-editing':
    'Cut commercials, high-retention reels, motion graphics, and studio color grades.',
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  onNavigate,
}) => {
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('overview');

  React.useEffect(() => {
    setExpandedModules([0]);
    setOpenFaqIdx(0);
    setActiveSectionId('overview');
  }, [course.id]);

  const toggleModule = (idx: number) => {
    setExpandedModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const otherCourses = COURSES_DATA.filter((c) => c.id !== course.id);
  const conciseSummary =
    CONCISE_HERO_SUMMARY[course.id] || course.shortDescription;

  return (
    <div className="bg-[#F8F6F0] text-[#171717]">
      {/* 1. APPLE-STYLE PRODUCT HERO */}
      <section className="relative bg-[#171717] text-[#F8F6F0] pt-8 pb-12 md:pt-12 md:pb-16 border-b border-[#333333] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="inline-flex items-center gap-1.5 font-medium uppercase tracking-[0.14em] text-[#8B8983] hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Tracks</span>
            </button>
            <span className="text-[#333333]">/</span>
            <span className="small-gold-label text-[#C6A15B]">
              Track {course.code}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="small-gold-label text-[#C6A15B] block mb-2.5">
                Track {course.code} · {course.mode}
              </span>

              <EditorialRevealTitle
                as="h1"
                className="hero-h1-clamp text-[#F8F6F0] mb-3"
                segments={[
                  { text: course.title + '.' },
                  { text: 'Built by doing.', gold: true },
                ]}
              />

              <p className="text-[15.5px] sm:text-lg text-[#F8F6F0]/80 leading-relaxed max-w-xl mb-6">
                {conciseSummary}
              </p>

              {/* 3 Visual Spec Tiles */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <div className="p-3 rounded-2xl bg-[#0B0B0B] border border-[#2C2C2C]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8B8983]">
                    Format
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#F8F6F0] mt-0.5 truncate">
                    {course.mode}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-[#0B0B0B] border border-[#2C2C2C]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8B8983]">
                    Syllabus
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#C6A15B] mt-0.5">
                    {course.modules.length} Modules
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-[#0B0B0B] border border-[#2C2C2C]">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8B8983]">
                    Portfolio
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#F8F6F0] mt-0.5">
                    {course.realWorldProjects.length} Projects
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:inline-flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('enrollment', course.id)}
                  className="min-h-[46px] px-6 py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="min-h-[46px] px-6 py-3.5 rounded-xl border border-[#333333] hover:border-[#C6A15B] text-[#F8F6F0] text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center cursor-pointer"
                >
                  Callback
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ParallaxImageFrame
                src={course.image}
                alt={course.imageAlt}
                caption={course.imageCaption}
                aspectClass="aspect-[16/10]"
                badgeText={`Track ${course.code}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SUB-NAV */}
      <div className="sticky top-[68px] md:top-20 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between gap-4 overflow-x-auto py-2.5">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'overview', label: 'Highlights' },
              { id: 'syllabus', label: 'Modules' },
              { id: 'tools', label: 'Tools & Projects' },
              { id: 'outcomes', label: 'Careers' },
              { id: 'faqs', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeSectionId === tab.id
                    ? 'bg-[#171717] text-[#F8F6F0]'
                    : 'text-[#171717]/75 hover:bg-[#F8F6F0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('enrollment', course.id)}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C6A15B] text-[#171717] text-xs font-semibold shrink-0 cursor-pointer"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. HIGHLIGHTS & CORE SKILLS BENTO */}
      <section
        id="overview"
        className="scroll-mt-32 bg-[#FFFFFF] py-12 md:py-16 border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-7 md:mb-10">
            <span className="small-gold-label text-[#A98747] block mb-1.5">
              01 · Highlights
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              What you master.
            </h2>
          </div>

          {/* 3 Focus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {course.whatYouWillLearnThree.map((item) => (
              <div
                key={item.number}
                className="p-5 rounded-3xl bg-[#F8F6F0] border border-[#E7E2D8]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A98747] block mb-1.5">
                  Focus {item.number}
                </span>
                <h3 className="font-display-serif text-xl text-[#171717] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#57554F] leading-relaxed line-clamp-2">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Topic Pills */}
          <div className="flex flex-wrap gap-2">
            {course.keyTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-full bg-[#F8F6F0] border border-[#E7E2D8] text-xs font-medium text-[#171717]"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SYLLABUS ACCORDION */}
      <section id="syllabus" className="scroll-mt-32 bg-[#F8F6F0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-5 md:px-6">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div>
              <span className="small-gold-label text-[#A98747] block mb-1.5">
                02 · Syllabus
              </span>
              <h2 className="section-h2-clamp text-[#171717]">
                {course.modules.length} Practical Modules.
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setExpandedModules(
                  expandedModules.length === course.modules.length
                    ? []
                    : course.modules.map((_, i) => i)
                )
              }
              className="px-3.5 py-2 rounded-full bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] text-xs font-medium text-[#171717] cursor-pointer"
            >
              {expandedModules.length === course.modules.length
                ? 'Collapse All'
                : 'Expand All'}
            </button>
          </div>

          <div className="space-y-3">
            {course.modules.map((mod, idx) => {
              const isOpen = expandedModules.includes(idx);
              return (
                <div
                  key={mod.moduleNumber}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="font-display-serif text-xl md:text-2xl text-[#A98747] tabular-nums shrink-0">
                        {mod.moduleNumber}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display-serif text-lg md:text-xl text-[#171717] truncate">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-[#8B8983] truncate">
                          {mod.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#A98747]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#171717]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-3 border-t border-[#E7E2D8] grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex flex-wrap gap-1.5">
                        {mod.topics.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] text-xs text-[#171717]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#A98747] shrink-0" />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                      <div className="md:col-span-4 p-3 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8]">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#A98747] mb-0.5">
                          Deliverable
                        </span>
                        <p className="text-xs font-medium text-[#171717]">
                          {mod.deliverable}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TOOLS & LIVE PROJECTS (Charcoal Bento) */}
      <section
        id="tools"
        className="scroll-mt-32 bg-[#171717] text-[#F8F6F0] py-12 md:py-16 border-y border-[#333333]"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tools (5 Cols) */}
            <div className="lg:col-span-5">
              <span className="small-gold-label text-[#C6A15B] block mb-1.5">
                03 · Stack
              </span>
              <h2 className="section-h2-clamp text-[#F8F6F0] mb-5">
                Tools practiced.
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {course.softwareAndTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3.5 rounded-2xl bg-[#0B0B0B] border border-[#2C2C2C]"
                  >
                    <span className="block text-[10px] uppercase tracking-wider text-[#C6A15B] mb-0.5">
                      {tool.category}
                    </span>
                    <h3 className="font-display-serif text-lg text-[#F8F6F0]">
                      {tool.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects (7 Cols) */}
            <div className="lg:col-span-7">
              <span className="small-gold-label text-[#C6A15B] block mb-1.5">
                04 · Portfolio
              </span>
              <h2 className="section-h2-clamp text-[#F8F6F0] mb-5">
                Projects you ship.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {course.realWorldProjects.map((proj) => (
                  <div
                    key={proj.title}
                    className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#2C2C2C] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C6A15B] block mb-1">
                        {proj.number}
                      </span>
                      <h3 className="font-display-serif text-lg text-[#F8F6F0] mb-2 leading-snug">
                        {proj.title}
                      </h3>
                    </div>
                    <div className="pt-3 border-t border-[#2C2C2C] text-[11px] text-[#C6A15B]">
                      {proj.outcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAREERS & COMPACT FAQS */}
      <section id="outcomes" className="scroll-mt-32 bg-[#FFFFFF] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Career Roles */}
          <div className="lg:col-span-5">
            <span className="small-gold-label text-[#A98747] block mb-1.5">
              05 · Careers
            </span>
            <h2 className="section-h2-clamp text-[#171717] mb-5">
              Where this leads.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {course.careerOpportunities.map((career, idx) => (
                <div
                  key={career.role}
                  className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-between gap-3"
                >
                  <div>
                    <h3 className="font-display-serif text-lg text-[#171717]">
                      {career.role}
                    </h3>
                    <p className="text-xs text-[#8B8983]">{career.focusArea}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#A98747]">
                    0{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div id="faqs" className="lg:col-span-7 scroll-mt-32">
            <span className="small-gold-label text-[#A98747] block mb-1.5">
              06 · FAQs
            </span>
            <h2 className="section-h2-clamp text-[#171717] mb-5">
              Common questions.
            </h2>
            <div className="space-y-2.5">
              {course.faqs.slice(0, 4).map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-display-serif text-lg text-[#171717]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#A98747] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8B8983] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-2 border-t border-[#E7E2D8] text-sm text-[#57554F] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OTHER TRACKS & ENQUIRE FOOTER */}
      <section className="bg-[#F8F6F0] py-10 md:py-14 border-t border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <span className="small-gold-label text-[#A98747] block mb-4">
            Other Tracks
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherCourses.map((other) => (
              <button
                key={other.id}
                type="button"
                onClick={() => onNavigate(other.slug)}
                className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A98747] block">
                    Track {other.code}
                  </span>
                  <h3 className="font-display-serif text-xl text-[#171717]">
                    {other.title}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A98747]" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
