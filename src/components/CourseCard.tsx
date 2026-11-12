import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  Layers,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { CourseData, PageId } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import { InteractiveTiltCard } from './MotionPrimitives';

interface CourseCardProps {
  course: CourseData;
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onNavigate,
}) => {
  const [showFullDetailsModal, setShowFullDetailsModal] = useState(false);
  const [mobileSkillsExpanded, setMobileSkillsExpanded] = useState(false);

  useEffect(() => {
    if (showFullDetailsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFullDetailsModal]);

  return (
    <>
      {/* =====================================================================
          SCALER-INSPIRED MOBILE COURSE DISCOVERY CARD (< 768px ONLY)
          Logical Order:
          1. Course image
          2. Course name
          3. Course overview
          4. Key topics
          5. Skills covered (clean expandable section + full details drawer)
          6. View Syllabus
          7. Enquire Now
         ===================================================================== */}
      <article className="md:hidden group h-full rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden flex flex-col justify-between shadow-[0_12px_28px_-16px_rgba(23,23,23,0.08)]">
        <div>
          {/* 1. Course Image */}
          <div
            onClick={() => onNavigate(course.slug)}
            className="relative aspect-16/10 w-full overflow-hidden bg-[#171717] border-b border-[#E7E2D8] cursor-pointer"
          >
            <ResilientImage
              src={course.image}
              alt={course.imageAlt}
              fallbackLabel={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 text-xs text-[#F8F6F0]">
              <span className="small-gold-label text-[#C6A15B]">
                Program {course.code}
              </span>
              <span className="text-[11px] font-medium text-[#F8F6F0]/90">
                {course.mode}
              </span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* 2. Course Name & Structured Meta Summary */}
            <div>
              <div className="flex items-center gap-2 text-[12px] text-[#8B8983] mb-1.5">
                <span className="font-medium text-[#A98747] tabular-nums">
                  {course.modules.length} Curriculum Modules
                </span>
                <span aria-hidden="true">·</span>
                <span>{course.level}</span>
              </div>
              <h3 className="font-display-serif mobile-course-h3 font-semibold text-[#171717]">
                {course.title}
              </h3>
            </div>

            {/* 3. Course Overview */}
            <p className="text-[15px] text-[#171717]/80 leading-[1.6]">
              {course.shortDescription}
            </p>

            {/* 4. Key Topics */}
            <div className="pt-3.5 border-t border-[#E7E2D8]">
              <span className="small-gold-label text-[#A98747] block mb-2.5">
                Key Topics Covered
              </span>
              <div className="flex flex-wrap gap-1.5">
                {course.keyTopics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-1 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] text-[12px] font-medium text-[#171717]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Skills Covered (Structured Preview + Expandable Full List) */}
            <div className="pt-3.5 border-t border-[#E7E2D8]">
              <button
                type="button"
                onClick={() => setMobileSkillsExpanded((prev) => !prev)}
                aria-expanded={mobileSkillsExpanded}
                className="w-full flex items-center justify-between text-left py-1 cursor-pointer"
              >
                <div>
                  <span className="small-gold-label text-[#A98747] block">
                    Skills Covered ({course.skillsCovered.length})
                  </span>
                  <span className="text-[12px] text-[#8B8983] mt-0.5 block">
                    {mobileSkillsExpanded
                      ? 'Tap to collapse skill breakdown'
                      : `${course.skillsCovered
                          .slice(0, 2)
                          .map((s) => s.title)
                          .join(' · ')} + more`}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center shrink-0">
                  {mobileSkillsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#A98747]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#171717]" />
                  )}
                </div>
              </button>

              {mobileSkillsExpanded && (
                <div className="mt-3 space-y-2.5 pt-2 border-t border-[#E7E2D8]/60">
                  {course.skillsCovered.map((skill) => (
                    <div
                      key={skill.title}
                      className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8]"
                    >
                      <h4 className="font-display-serif text-[17px] font-semibold text-[#171717] mb-0.5">
                        {skill.title}
                      </h4>
                      <p className="text-[13px] text-[#57554F] leading-[1.5]">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowFullDetailsModal(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#FFFFFF] border border-[#C6A15B] text-[12px] font-medium text-[#171717] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#A98747]" />
                    <span>View Tools Covered &amp; Learning Outcomes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6 & 7. Action Footer: View Syllabus + Enquire Now (+ Full Details Modal Trigger) */}
        <div className="px-5 pb-5 pt-1 space-y-2.5">
          <div className="pt-3.5 border-t border-[#E7E2D8] grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate(course.slug)}
              className="min-h-[46px] px-3.5 py-2.5 rounded-xl border border-[#171717] active:bg-[#C6A15B] text-[#171717] text-[14px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>View Syllabus</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('enrollment', course.id)}
              className="min-h-[46px] px-3.5 py-2.5 rounded-xl bg-[#171717] active:bg-[#C6A15B] text-[#F8F6F0] active:text-[#171717] text-[14px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-[#C6A15B]" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowFullDetailsModal(true)}
            className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-[#F8F6F0] hover:bg-[#E7E2D8]/50 text-[#171717]/80 text-[12.5px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#A98747]" />
            <span>Quick Overview: Skills, Tools &amp; Outcomes</span>
          </button>
        </div>
      </article>

      {/* =====================================================================
          TABLET & DESKTOP COURSE CARD (>= 768px, UNTOUCHED)
         ===================================================================== */}
      <InteractiveTiltCard className="hidden md:block h-full">
        <article className="group h-full rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] overflow-hidden flex flex-col justify-between transition-colors duration-300 shadow-[0_14px_34px_-18px_rgba(23,23,23,0.07)]">
          <div>
            {/* Image Header with 16:10 Aspect Ratio & 5% Slow Hover Zoom */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#171717] border-b border-[#E7E2D8]">
              <ResilientImage
                src={course.image}
                alt={course.imageAlt}
                fallbackLabel={course.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 md:bottom-4 md:left-5 md:right-5 flex items-center justify-between text-xs text-[#F8F6F0]">
                <span className="small-gold-label text-[#C6A15B]">
                  Program {course.code}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#171717]/80 border border-[#C6A15B]/40 text-[#F8F6F0] text-[11px] md:text-xs font-medium">
                  {course.mode}
                </span>
              </div>
            </div>

            {/* Concise Card Body: Course Title, Overview & What We Teach */}
            <div className="p-5 md:p-8 space-y-4 md:space-y-5">
              <div>
                <h3 className="font-display-serif text-[26px] leading-[1.18] md:text-3xl font-medium text-[#171717] mb-2 md:mb-2.5 group-hover:text-[#A98747] transition-colors">
                  {course.title}
                </h3>
                <p className="text-[15px] md:text-sm text-[#171717]/80 leading-[1.58] md:leading-relaxed">
                  {course.shortDescription}
                </p>
              </div>

              {/* What You Will Learn / Core Topics Taught */}
              <div className="pt-4 md:pt-5 border-t border-[#E7E2D8]">
                <div className="flex items-center justify-between mb-2.5 md:mb-3">
                  <span className="small-gold-label text-[#A98747] block">
                    What We Teach
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {course.keyTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] text-[11px] md:text-xs font-medium text-[#171717]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer: Full Details Popup Trigger + Enquire Now */}
          <div className="px-5 md:px-8 pb-5 md:pb-8 pt-1 md:pt-2">
            <div className="pt-4 md:pt-5 border-t border-[#E7E2D8] grid grid-cols-2 gap-2.5 md:gap-3">
              <button
                type="button"
                onClick={() => setShowFullDetailsModal(true)}
                className="group/btn min-h-[44px] px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-[#171717] hover:border-[#C6A15B] text-[#171717] hover:bg-[#C6A15B] text-[14px] md:text-sm font-medium transition-all flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#A98747] group-hover/btn:text-[#171717] shrink-0" />
                <span>Full Details</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('enrollment', course.id)}
                className="min-h-[44px] px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-[14px] md:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </article>
      </InteractiveTiltCard>

      {/* FULL DETAILS POPUP MODAL (Skills Covered, Tools Covered, Learning Outcomes, View Syllabus & Enquire Now) */}
      {showFullDetailsModal && (
        <div
          onClick={() => setShowFullDetailsModal(false)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0B0B0B]/82 backdrop-blur-sm p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${course.id}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full rounded-t-2xl sm:rounded-2xl bg-[#F8F6F0] text-[#171717] border border-[#E7E2D8] shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col"
          >
            {/* Modal Header with Close Button */}
            <div className="px-5 md:px-8 py-4 md:py-5 bg-[#171717] text-[#F8F6F0] border-b border-[#333333] flex items-center justify-between gap-3 shrink-0">
              <div>
                <span className="small-gold-label text-[#C6A15B] block mb-0.5 md:mb-1">
                  Program {course.code} · {course.mode}
                </span>
                <h3
                  id={`modal-title-${course.id}`}
                  className="font-display-serif text-xl md:text-3xl font-medium text-[#F8F6F0]"
                >
                  {course.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowFullDetailsModal(false)}
                className="w-[42px] h-[42px] md:w-10 md:h-10 rounded-xl border border-[#333333] bg-[#0B0B0B] hover:border-[#C6A15B] text-[#F8F6F0] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body (Single scroll container) */}
            <div className="p-5 md:p-8 overflow-y-auto overscroll-contain space-y-6 md:space-y-8">
              {/* Overview & Core Topics */}
              <div>
                <p className="text-[15px] md:text-base text-[#171717]/85 leading-relaxed mb-4">
                  {course.heroDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {course.keyTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 md:px-3 md:py-1 rounded-lg bg-[#FFFFFF] border border-[#E7E2D8] text-[11px] md:text-xs font-medium text-[#171717]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* 1. Skills Covered */}
              <div className="pt-5 md:pt-6 border-t border-[#E7E2D8]">
                <div className="flex items-center gap-2 mb-3.5 md:mb-4">
                  <Sparkles className="w-4 h-4 text-[#A98747]" />
                  <span className="small-gold-label text-[#A98747]">
                    Skills Covered
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {course.skillsCovered.map((skill) => (
                    <div
                      key={skill.title}
                      className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8]"
                    >
                      <h4 className="font-display-serif text-lg font-medium text-[#171717] mb-1">
                        {skill.title}
                      </h4>
                      <p className="text-xs text-[#57554F] leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Tools Covered */}
              <div className="pt-5 md:pt-6 border-t border-[#E7E2D8]">
                <div className="flex items-center gap-2 mb-3.5 md:mb-4">
                  <Wrench className="w-4 h-4 text-[#A98747]" />
                  <span className="small-gold-label text-[#A98747]">
                    Tools &amp; Software Covered
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.softwareAndTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-sm text-[#171717]">
                          {tool.name}
                        </span>
                        <span className="text-[11px] text-[#A98747] font-medium">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#57554F] leading-relaxed">
                        {tool.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Learning Outcomes */}
              <div className="pt-5 md:pt-6 border-t border-[#E7E2D8]">
                <div className="flex items-center gap-2 mb-3.5 md:mb-4">
                  <Layers className="w-4 h-4 text-[#A98747]" />
                  <span className="small-gold-label text-[#A98747]">
                    Learning Outcomes
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm text-[#171717]/85">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#A98747] shrink-0 mt-1" />
                      <span className="leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer: Close Button + View Syllabus + Enquire Now */}
            <div className="px-5 md:px-8 py-3.5 md:py-4 bg-[#FFFFFF] border-t border-[#E7E2D8] flex flex-wrap items-center justify-between gap-2.5 md:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowFullDetailsModal(false)}
                className="hidden sm:inline-flex px-5 py-2.5 rounded-xl border border-[#E7E2D8] hover:border-[#171717] text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] transition-colors cursor-pointer"
              >
                Close
              </button>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowFullDetailsModal(false);
                    onNavigate(course.slug);
                  }}
                  className="min-h-[44px] px-4 md:px-5 py-2.5 rounded-xl border border-[#171717] hover:border-[#C6A15B] hover:bg-[#C6A15B] text-[12px] font-semibold uppercase tracking-[0.12em] text-[#171717] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowFullDetailsModal(false);
                    onNavigate('enrollment', course.id);
                  }}
                  className="min-h-[44px] px-4 md:px-6 py-2.5 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
