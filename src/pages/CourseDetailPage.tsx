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
  HairlineDivider,
  InteractiveTiltCard,
  ParallaxImageFrame,
  ParallaxLayer,
  ScrollRevealBlock,
} from '../components/MotionPrimitives';

interface CourseDetailPageProps {
  course: CourseData;
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  onNavigate,
}) => {
  const [expandedModules, setExpandedModules] = useState<number[]>(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? [0] : [0, 1]
  );
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('overview');

  React.useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setExpandedModules(isMobile ? [0] : [0, 1]);
    setOpenFaqIdx(0);
    setActiveSectionId('overview');
  }, [course.id]);

  const toggleModule = (idx: number) => {
    setExpandedModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const expandAll = () =>
    setExpandedModules(course.modules.map((_, idx) => idx));
  const collapseAll = () => setExpandedModules([]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const otherCourses = COURSES_DATA.filter((c) => c.id !== course.id);

  return (
    <div className="bg-[#F8F6F0] text-[#171717]">
      {/* COURSE HERO — Deep Charcoal #171717 */}
      <section className="relative bg-[#171717] text-[#F8F6F0] pt-8 pb-12 md:pt-12 md:pb-20 lg:py-24 border-b border-[#333333] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-5 md:mb-8 flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="inline-flex items-center gap-1.5 font-medium uppercase tracking-[0.16em] text-[#8B8983] hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Course Catalogue</span>
            </button>
            <span className="text-[#333333]">/</span>
            <span className="small-gold-label text-[#C6A15B]">
              Program {course.code} — {course.title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollRevealBlock direction="up">
                <span className="small-gold-label text-[#C6A15B] block mb-3 md:mb-4">
                  Program {course.code} · {course.mode}
                </span>
              </ScrollRevealBlock>

              <EditorialRevealTitle
                as="h1"
                className="hero-h1-clamp text-[#F8F6F0] mb-4 md:mb-5"
                segments={[
                  { text: course.heroHeading },
                  { text: course.heroItalicAccent, gold: true },
                ]}
              />

              <ScrollRevealBlock direction="up" delay={0.14}>
                <p className="text-[15.5px] sm:text-lg text-[#F8F6F0]/85 leading-[1.6] md:leading-relaxed max-w-2xl mb-6 md:mb-8">
                  {course.heroDescription}
                </p>
              </ScrollRevealBlock>

              {/* Spec Summary Bar */}
              <ScrollRevealBlock direction="up" delay={0.2}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 pb-6 md:pt-6 md:pb-8 border-t border-[#333333] text-sm">
                  <div>
                    <span className="block text-[11px] md:text-xs text-[#8B8983] uppercase tracking-[0.14em] mb-1">
                      Learning Mode
                    </span>
                    <span className="font-medium text-[#F8F6F0]">
                      {course.mode}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] md:text-xs text-[#8B8983] uppercase tracking-[0.14em] mb-1">
                      Duration
                    </span>
                    <span className="font-medium text-[#C6A15B]">
                      {course.durationPlaceholder}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-[11px] md:text-xs text-[#8B8983] uppercase tracking-[0.14em] mb-1">
                      Curriculum
                    </span>
                    <span className="font-medium text-[#F8F6F0]">
                      {course.modules.length} Numbered Modules
                    </span>
                  </div>
                </div>
              </ScrollRevealBlock>

              <ScrollRevealBlock direction="up" delay={0.26}>
                <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('enrollment', course.id)}
                    className="group min-h-[46px] px-4 md:px-8 py-3.5 md:py-4 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[14px] md:text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="min-h-[46px] px-4 md:px-8 py-3.5 md:py-4 rounded-xl border border-[#333333] hover:border-[#C6A15B] text-[#F8F6F0] text-[14px] md:text-sm font-medium transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Request a callback
                  </button>
                </div>
              </ScrollRevealBlock>
            </div>

            <div className="lg:col-span-5">
              <ParallaxLayer speedY={20}>
                <ParallaxImageFrame
                  src={course.image}
                  alt={course.imageAlt}
                  caption={course.imageCaption}
                  aspectClass="aspect-[16/10] md:aspect-4/3"
                  badgeText={`Program ${course.code}`}
                />
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SUB-NAVIGATION (Structured EdTech Section Tabs) */}
      <div className="sticky top-[68px] md:top-20 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between gap-4 overflow-x-auto py-2.5 md:py-3">
          <div className="flex items-center gap-1.5 md:gap-2">
            {[
              { id: 'overview', label: 'Course Overview' },
              { id: 'what-you-will-learn', label: 'What You Will Learn' },
              { id: 'syllabus', label: 'Course Modules' },
              { id: 'tools', label: 'Tools Covered' },
              { id: 'projects', label: 'Practical Projects' },
              { id: 'outcomes', label: 'Outcomes & Careers' },
              { id: 'faqs', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className={`px-3.5 md:px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
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
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C6A15B] text-[#171717] text-xs font-medium shrink-0 cursor-pointer"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. COURSE OVERVIEW & CONFIRMED TOPICS */}
      <section id="overview" className="scroll-mt-32 md:scroll-mt-36 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-7 space-y-4 md:space-y-5">
              <span className="small-gold-label text-[#A98747] block">
                01 · Course Overview
              </span>
              <h2 className="section-h2-clamp text-[#171717]">
                Built for Practical Mastery.
              </h2>
              {course.overview.map((p, idx) => (
                <p
                  key={idx}
                  className="text-[15.5px] sm:text-lg text-[#171717]/80 leading-[1.6] md:leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="p-5 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8]">
                <span className="small-gold-label text-[#A98747] block mb-3.5 md:mb-4">
                  Confirmed Topics Covered
                </span>
                <div className="flex flex-wrap gap-2">
                  {course.keyTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 md:px-3.5 py-1.5 md:py-2 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8] text-[13px] md:text-sm font-medium text-[#171717]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* 2. WHAT YOU WILL LEARN & SKILLS COVERED */}
      <section
        id="what-you-will-learn"
        className="scroll-mt-32 md:scroll-mt-36 bg-[#FFFFFF] py-12 md:py-20 border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-12">
            <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
              02 · What You Will Learn &amp; Skills Covered
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Core Competencies You Will Build.
            </h2>
          </div>

          {/* 3-Pillar Learning Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {course.whatYouWillLearnThree.map((item) => (
              <div
                key={item.number}
                className="p-5 md:p-6 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] flex flex-col justify-between"
              >
                <div>
                  <span className="small-gold-label text-[#A98747] block mb-2 tabular-nums">
                    Focus {item.number}
                  </span>
                  <h3 className="font-display-serif mobile-course-h3 md:text-2xl text-[#171717] mb-2">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[15px] text-[#171717]/75 leading-[1.6]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Skills Covered Grid */}
          <div>
            <span className="small-gold-label text-[#8B8983] block mb-4">
              Skills Covered Across the Curriculum
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {course.skillsCovered.map((skill, idx) => (
                <div
                  key={skill.title}
                  className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-medium text-[#A98747] tabular-nums">
                      Skill 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display-serif text-[21px] md:text-xl text-[#171717] mb-1.5">
                    {skill.title}
                  </h3>
                  <p className="text-[14.5px] text-[#57554F] leading-[1.58]">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED CURRICULUM & EXPANDABLE COURSE MODULES */}
      <section id="syllabus" className="scroll-mt-32 md:scroll-mt-36 bg-[#F8F6F0] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-14">
            <div>
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                03 · Detailed Curriculum &amp; Course Modules
              </span>
              <h2 className="section-h2-clamp text-[#171717]">
                Module-by-Module Curriculum.
              </h2>
              <p className="text-[14px] text-[#8B8983] mt-1.5">
                Tap any module below to expand syllabus topics and project deliverables.
              </p>
            </div>

            <div className="flex items-center gap-2.5 md:gap-3">
              <button
                type="button"
                onClick={expandAll}
                className="min-h-[40px] px-3.5 md:px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] text-xs font-medium text-[#171717] cursor-pointer"
              >
                Expand All ({course.modules.length})
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="min-h-[40px] px-3.5 md:px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] text-xs font-medium text-[#171717] cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-3.5 md:space-y-4">
            {course.modules.map((mod, idx) => {
              const isOpen = expandedModules.includes(idx);
              return (
                <div
                  key={mod.moduleNumber}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(idx)}
                    className="w-full px-5 py-4 md:px-7 md:py-6 text-left flex items-center justify-between gap-3 md:gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 md:gap-5">
                      <span className="font-display-serif text-2xl md:text-3xl text-[#A98747] tabular-nums shrink-0 mt-0.5 sm:mt-0">
                        {mod.moduleNumber}
                      </span>
                      <div>
                        <h3 className="font-display-serif mobile-course-h3 md:text-2xl text-[#171717] leading-snug">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-[#8B8983] mt-1">
                          {mod.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#A98747]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#171717]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 pt-4 md:px-7 md:pb-8 md:pt-4 border-t border-[#E7E2D8] bg-[#FFFFFF]">
                      <p className="text-[15px] md:text-base text-[#171717]/80 leading-[1.6] md:leading-relaxed mb-5 md:mb-6">
                        {mod.summary}
                      </p>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 items-start">
                        <div className="lg:col-span-8">
                          <span className="small-gold-label text-[#8B8983] block mb-2.5 md:mb-3">
                            Topics &amp; Practice Labs
                          </span>
                          <ul className="space-y-2 md:space-y-2.5 text-[14.5px] md:text-sm text-[#171717]/85">
                            {mod.topics.map((t, tIdx) => (
                              <li
                                key={tIdx}
                                className="flex items-start gap-2.5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#A98747] shrink-0 mt-0.5" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="lg:col-span-4 p-4 md:p-5 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8]">
                          <span className="small-gold-label text-[#A98747] block mb-1.5">
                            Practical Project Deliverable
                          </span>
                          <p className="text-sm font-medium text-[#171717]">
                            {mod.deliverable}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TOOLS COVERED & 5. PRACTICAL PROJECTS (Charcoal #171717) */}
      <section
        id="tools"
        className="scroll-mt-32 md:scroll-mt-36 bg-[#171717] text-[#F8F6F0] py-12 md:py-24 border-y border-[#333333]"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-12 md:mb-16">
            <span className="small-gold-label text-[#C6A15B] block mb-2.5 md:mb-3">
              04 · Tools Covered
            </span>
            <h2 className="section-h2-clamp text-[#F8F6F0] mb-7 md:mb-10">
              Tools &amp; Platforms Practiced.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {course.softwareAndTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-5 md:p-7 rounded-2xl bg-[#0B0B0B] border border-[#333333] hover:border-[#C6A15B] transition-colors"
                >
                  <span className="small-gold-label text-[#C6A15B] block mb-1.5 md:mb-2">
                    {tool.category}
                  </span>
                  <h3 className="font-display-serif mobile-course-h3 md:text-2xl text-[#F8F6F0] mb-1.5 md:mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-[15px] md:text-sm text-[#F8F6F0]/75 leading-[1.6] md:leading-relaxed">
                    {tool.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div id="projects" className="scroll-mt-32 md:scroll-mt-36 pt-12 md:pt-16 border-t border-[#333333]">
            <span className="small-gold-label text-[#C6A15B] block mb-2.5 md:mb-3">
              05 · Practical Projects
            </span>
            <h2 className="section-h2-clamp text-[#F8F6F0] mb-7 md:mb-10">
              Real-World Projects You Will Build.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
              {course.realWorldProjects.map((proj) => (
                <InteractiveTiltCard key={proj.title} className="h-full">
                  <div className="h-full p-5 md:p-7 rounded-2xl bg-[#0B0B0B] border border-[#333333] hover:border-[#C6A15B] transition-colors flex flex-col justify-between">
                    <div>
                      <span className="small-gold-label text-[#C6A15B] block mb-2">
                        {proj.number}
                      </span>
                      <h3 className="font-display-serif mobile-course-h3 md:text-2xl text-[#F8F6F0] mb-2.5 md:mb-3">
                        {proj.title}
                      </h3>
                      <p className="text-[15px] md:text-sm text-[#F8F6F0]/75 leading-[1.6] md:leading-relaxed mb-5 md:mb-6">
                        {proj.scenario}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#333333] text-xs space-y-2">
                      <div>
                        <span className="text-[#8B8983]">Tools: </span>
                        <span className="text-[#F8F6F0]">
                          {proj.toolsUsed.join(' · ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#C6A15B]">Deliverable: </span>
                        <span className="text-[#F8F6F0]">{proj.outcome}</span>
                      </div>
                    </div>
                  </div>
                </InteractiveTiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. LEARNING OUTCOMES & 7. CAREER OPPORTUNITIES */}
      <section
        id="outcomes"
        className="scroll-mt-32 md:scroll-mt-36 bg-[#FFFFFF] py-12 md:py-24 border-b border-[#E7E2D8]"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            <div className="lg:col-span-6">
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                06 · Learning Outcomes
              </span>
              <h2 className="section-h2-clamp text-[#171717] mb-6 md:mb-8">
                What You Will Achieve.
              </h2>
              <ul className="space-y-3.5 md:space-y-4">
                {course.learningOutcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="p-4 md:p-5 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] flex items-start gap-3.5 md:gap-4"
                  >
                    <span className="font-display-serif text-xl text-[#A98747] tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-[15px] sm:text-base text-[#171717]/85 leading-[1.58]">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="careers" className="lg:col-span-6">
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                07 · Career Opportunities
              </span>
              <h2 className="section-h2-clamp text-[#171717] mb-6 md:mb-8">
                Where This Program Can Lead.
              </h2>
              <div className="space-y-3.5 md:space-y-4">
                {course.careerOpportunities.map((career, idx) => (
                  <div
                    key={career.role}
                    className="p-4 md:p-5 rounded-2xl bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-display-serif text-[21px] md:text-xl text-[#171717]">
                        {career.role}
                      </h3>
                      <p className="text-xs text-[#8B8983] mt-1">
                        {career.focusArea}
                      </p>
                    </div>
                    <span className="small-gold-label text-[#A98747] shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="scroll-mt-32 md:scroll-mt-36 py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-5 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
              08 · Frequently Asked Questions
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Program Questions Answered.
            </h2>
          </div>

          <div className="space-y-3">
            {course.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-5 py-4 md:px-6 md:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display-serif text-[19px] md:text-xl text-[#171717] leading-snug">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#A98747] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8B8983] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 md:px-6 md:pb-6 border-t border-[#E7E2D8] text-[15px] sm:text-base text-[#171717]/80 leading-[1.6]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile-Only Bottom Enquire Now Section (< 768px) */}
          <div className="md:hidden mt-12 p-6 rounded-2xl bg-[#171717] text-[#F8F6F0] border border-[#333333]">
            <span className="small-gold-label text-[#C6A15B] block mb-2">
              Program {course.code} · Admissions
            </span>
            <h3 className="font-display-serif text-[26px] text-[#F8F6F0] leading-tight mb-2.5">
              Ready to Master {course.title}?
            </h3>
            <p className="text-[15px] text-[#F8F6F0]/75 leading-[1.6] mb-5">
              Speak with an academic advisor to explore batch schedules, hands-on
              practice labs, and Online or Offline Hyderabad learning options.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('enrollment', course.id)}
                className="min-h-[46px] px-4 py-3 rounded-xl bg-[#C6A15B] text-[#171717] text-[14px] font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="min-h-[46px] px-4 py-3 rounded-xl border border-[#333333] text-[#F8F6F0] text-[14px] font-medium flex items-center justify-center cursor-pointer"
              >
                <span>Talk to Us</span>
              </button>
            </div>
          </div>

          {/* Explore Other Programs */}
          <div className="mt-14 md:mt-20 pt-10 md:pt-12 border-t border-[#E7E2D8]">
            <span className="small-gold-label text-[#A98747] block mb-5 md:mb-6 text-center">
              Explore Other Programs at IND Academy
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {otherCourses.map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => onNavigate(other.slug)}
                  className="p-5 md:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] text-left transition-colors cursor-pointer"
                >
                  <span className="small-gold-label text-[#A98747] block mb-1">
                    Program {other.code}
                  </span>
                  <h3 className="font-display-serif mobile-course-h3 md:text-2xl text-[#171717] mb-1">
                    {other.title}
                  </h3>
                  <span className="text-xs text-[#8B8983]">
                    View Syllabus →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
