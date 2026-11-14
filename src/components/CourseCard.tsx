import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Layers,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CourseData, PageId } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import { APPLE_SPRING, InteractiveTiltCard } from './MotionPrimitives';

interface CourseCardProps {
  course: CourseData;
  onNavigate: (page: PageId, courseId?: string) => void;
}

const CONCISE_TAGLINES: Record<string, string> = {
  'digital-marketing':
    'Launch high-converting SEO, Meta Ads, Google Ads, and analytics campaigns.',
  coding:
    'Build and deploy full-stack web apps with React, Node.js, and modern databases.',
  'artificial-intelligence':
    'Automate workflows, engineer prompts, and build applied AI agents.',
  'video-editing':
    'Cut cinematic commercials, reels, motion graphics, and color grades.',
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onNavigate,
}) => {
  const [showFullDetailsModal, setShowFullDetailsModal] = useState(false);

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

  const conciseTagline =
    CONCISE_TAGLINES[course.id] || course.shortDescription;
  const topTopics = course.keyTopics.slice(0, 4);
  const remainingTopicsCount = Math.max(0, course.keyTopics.length - 4);

  return (
    <>
      <InteractiveTiltCard className="h-full">
        <article className="group h-full rounded-3xl bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_14px_34px_-18px_rgba(23,23,23,0.07)]">
          <div>
            {/* 1. Visual Header (16:10) */}
            <div
              onClick={() => onNavigate(course.slug)}
              className="relative aspect-16/10 w-full overflow-hidden bg-[#171717] border-b border-[#E7E2D8] cursor-pointer"
            >
              <ResilientImage
                src={course.image}
                alt={course.imageAlt}
                fallbackLabel={course.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/15 to-transparent" />

              {/* Top Floating Spec Pill */}
              <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#171717]/85 backdrop-blur-md border border-[#C6A15B]/45 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C6A15B]">
                  Track {course.code}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#171717]/80 backdrop-blur-md border border-[#FFFFFF]/15 text-[#F8F6F0] text-[11px] font-medium">
                  {course.mode}
                </span>
              </div>

              {/* Bottom Visual Metric */}
              <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs text-[#F8F6F0]">
                <span className="text-[11px] font-medium text-[#F8F6F0]/90">
                  {course.modules.length} Modules · {course.realWorldProjects.length} Live Projects
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullDetailsModal(true);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFFFF]/15 hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] backdrop-blur-md text-[11px] font-medium transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Quick Look</span>
                </button>
              </div>
            </div>

            {/* 2. Ultra-Clean Apple-Style Card Body */}
            <div className="p-5 md:p-7">
              <h3
                onClick={() => onNavigate(course.slug)}
                className="font-display-serif text-[25px] md:text-3xl leading-[1.12] font-semibold text-[#171717] mb-2 group-hover:text-[#A98747] transition-colors cursor-pointer"
              >
                {course.title}
              </h3>

              <p className="text-[14.5px] md:text-[15px] text-[#57554F] leading-[1.5] md:mb-4">
                {conciseTagline}
              </p>

              {/* 4 Key Visual Topic Pills (Desktop only; hidden on mobile so mobile shows only Course Name, Definition, and Syllabus + Enquire) */}
              <div className="hidden md:flex flex-wrap items-center gap-1.5 pt-3.5 border-t border-[#E7E2D8]/80">
                {topTopics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-1 rounded-full bg-[#F8F6F0] border border-[#E7E2D8] text-[11.5px] font-medium text-[#171717]"
                  >
                    {topic}
                  </span>
                ))}
                {remainingTopicsCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowFullDetailsModal(true)}
                    className="px-2.5 py-1 rounded-full bg-[#171717]/5 hover:bg-[#C6A15B]/25 text-[11px] font-semibold text-[#A98747] transition-colors cursor-pointer"
                  >
                    +{remainingTopicsCount} more
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3. Minimalist 2-Button Footer */}
          <div className="px-5 md:px-7 pb-5 md:pb-7 pt-1">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate(course.slug)}
                className="min-h-[44px] px-3.5 py-2.5 rounded-xl border border-[#E7E2D8] hover:border-[#171717] text-[#171717] text-[13.5px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Syllabus</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('enrollment', course.id)}
                className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-[13.5px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enquire</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#C6A15B] group-hover:text-current" />
              </button>
            </div>
          </div>
        </article>
      </InteractiveTiltCard>

      {/* QUICK LOOK MODAL (Progressive Disclosure with Smooth Apple Spring Morph) */}
      <AnimatePresence>
        {showFullDetailsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setShowFullDetailsModal(false)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0B0B0B]/75 backdrop-blur-md p-0 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${course.id}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={APPLE_SPRING}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-t-3xl sm:rounded-3xl bg-[#F8F6F0] text-[#171717] border border-[#E7E2D8] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.45)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-5 md:px-7 py-4 md:py-5 bg-[#171717] text-[#F8F6F0] border-b border-[#333333] flex items-center justify-between gap-3 shrink-0">
                <div>
                  <span className="small-gold-label text-[#C6A15B] block mb-0.5">
                    Track {course.code} · {course.mode}
                  </span>
                  <h3
                    id={`modal-title-${course.id}`}
                    className="font-display-serif text-xl md:text-2xl font-medium text-[#F8F6F0]"
                  >
                    {course.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullDetailsModal(false)}
                  className="w-9 h-9 rounded-full border border-[#333333] bg-[#0B0B0B] hover:border-[#C6A15B] text-[#F8F6F0] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Concise Visual Modal Body */}
              <div className="p-5 md:p-7 overflow-y-auto overscroll-contain space-y-5">
                <p className="text-[15px] text-[#171717]/85 leading-relaxed">
                  {conciseTagline}
                </p>

                {/* Topics */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#A98747]" />
                    <span className="small-gold-label text-[#A98747]">
                      Core Topics ({course.keyTopics.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.keyTopics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#E7E2D8] text-xs font-medium text-[#171717]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="pt-4 border-t border-[#E7E2D8]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Wrench className="w-3.5 h-3.5 text-[#A98747]" />
                    <span className="small-gold-label text-[#A98747]">
                      Tools Practiced
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {course.softwareAndTools.map((tool) => (
                      <div
                        key={tool.name}
                        className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8]"
                      >
                        <span className="block font-semibold text-xs text-[#171717]">
                          {tool.name}
                        </span>
                        <span className="block text-[10px] text-[#A98747]">
                          {tool.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Outcomes */}
                <div className="pt-4 border-t border-[#E7E2D8]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-[#A98747]" />
                    <span className="small-gold-label text-[#A98747]">
                      What You Ship
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#171717]/85">
                    {course.learningOutcomes.slice(0, 4).map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#A98747] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 md:px-7 py-3.5 bg-[#FFFFFF] border-t border-[#E7E2D8] grid grid-cols-2 gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowFullDetailsModal(false);
                    onNavigate(course.slug);
                  }}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl border border-[#171717] hover:bg-[#F8F6F0] text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Full Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowFullDetailsModal(false);
                    onNavigate('enrollment', course.id);
                  }}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-xs font-semibold uppercase tracking-[0.12em] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
