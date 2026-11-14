import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { COURSES_DATA, PageId } from '../data/siteData';
import { CourseCard } from '../components/CourseCard';
import {
  EditorialRevealTitle,
  HairlineDivider,
  ScrollRevealBlock,
} from '../components/MotionPrimitives';

interface CourseCataloguePageProps {
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const CourseCataloguePage: React.FC<CourseCataloguePageProps> = ({
  onNavigate,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  const displayedCourses =
    selectedTrack === 'all'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.id === selectedTrack);

  return (
    <div className="bg-[#F8F6F0] text-[#171717]">
      {/* 1. CONCISE APPLE-STYLE HEADER */}
      <section className="relative bg-[#F8F6F0] pt-10 pb-8 md:pt-16 md:pb-14 border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <ScrollRevealBlock direction="up">
              <span className="small-gold-label text-[#A98747] block mb-2.5">
                Course Catalogue
              </span>
            </ScrollRevealBlock>

            <EditorialRevealTitle
              as="h1"
              className="hero-h1-clamp text-[#171717] mb-2"
              segments={[
                { text: 'Four tracks.' },
                { text: 'One standard.', goldOnLight: true },
              ]}
            />

            <p className="text-[15.5px] md:text-lg text-[#57554F] max-w-lg">
              Choose your discipline. Taught live Online and in Hyderabad.
            </p>
          </div>

          {/* Interactive Track Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedTrack('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                selectedTrack === 'all'
                  ? 'bg-[#171717] text-[#F8F6F0] border-[#171717]'
                  : 'bg-[#FFFFFF] text-[#171717] border-[#E7E2D8] hover:border-[#C6A15B]'
              }`}
            >
              All 4 Tracks
            </button>
            {COURSES_DATA.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedTrack(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                  selectedTrack === c.id
                    ? 'bg-[#171717] text-[#F8F6F0] border-[#171717]'
                    : 'bg-[#FFFFFF] text-[#171717] border-[#E7E2D8] hover:border-[#C6A15B]'
                }`}
              >
                {c.code} · {c.shortTitle}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. COURSE BENTO CARDS */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* 3. SIDE-BY-SIDE SPEC COMPARISON TABLE */}
      <section className="bg-[#FFFFFF] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-7 md:mb-10">
            <span className="small-gold-label text-[#A98747] block mb-2">
              At a Glance
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Compare tracks.
            </h2>
          </div>

          <div className="divide-y divide-[#E7E2D8] border-y border-[#E7E2D8]">
            {COURSES_DATA.map((course) => (
              <div
                key={course.id}
                className="py-5 md:py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A98747] block">
                    Track {course.code} · {course.mode}
                  </span>
                  <h3 className="font-display-serif text-2xl text-[#171717]">
                    {course.title}
                  </h3>
                </div>

                <div className="hidden md:flex lg:col-span-6 flex-wrap gap-1.5">
                  {course.keyTopics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-full bg-[#F8F6F0] border border-[#E7E2D8] text-xs font-medium text-[#171717]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="lg:col-span-3 grid grid-cols-2 sm:flex lg:justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => onNavigate(course.slug)}
                    className="min-h-[42px] px-4 py-2 rounded-xl border border-[#E7E2D8] hover:border-[#171717] text-xs font-medium text-[#171717] transition-colors cursor-pointer"
                  >
                    Syllabus
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('enrollment', course.id)}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-xs font-medium transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MINIMALIST BOTTOM CTA */}
      <section className="bg-[#171717] text-[#F8F6F0] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-5 md:px-6 text-center">
          <span className="small-gold-label text-[#C6A15B] block mb-2">
            Advisor Call
          </span>
          <h2 className="section-h2-clamp text-[#F8F6F0] mb-3">
            Not sure which track fits?
          </h2>
          <p className="text-sm text-[#F8F6F0]/70 mb-6">
            Speak with an advisor to match your background to the right cohort.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('enrollment')}
            className="min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
          >
            <span>Request a Callback</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
