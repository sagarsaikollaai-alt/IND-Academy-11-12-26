import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { COURSES_DATA, PageId } from '../data/siteData';
import { CourseCard } from '../components/CourseCard';
import {
  EditorialRevealTitle,
  HairlineDivider,
  ParallaxLayer,
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
      {/* HERO HEADER — Primary Ivory #F8F6F0 */}
      <section className="relative bg-[#F8F6F0] pt-10 pb-8 md:pt-16 md:pb-20 lg:py-28 overflow-hidden border-b border-[#E7E2D8] md:border-b-0">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <ScrollRevealBlock direction="up">
              <span className="small-gold-label text-[#A98747] block mb-3 md:mb-4">
                IND Academy · Course Catalogue
              </span>
            </ScrollRevealBlock>

            <EditorialRevealTitle
              as="h1"
              className="hero-h1-clamp text-[#171717] mb-4 md:mb-5"
              segments={[
                { text: 'Find Your' },
                { text: 'Path.', goldOnLight: true },
              ]}
            />

            <ScrollRevealBlock direction="up" delay={0.14}>
              <p className="text-[15.5px] md:text-lg text-[#171717]/80 leading-[1.6] md:leading-relaxed max-w-2xl">
                Explore four specialized programs in Digital Marketing,
                Coding, Artificial Intelligence, and Video Editing—designed
                around practical training, guided practice labs, and real-world
                projects. Click Full Details on any card to view skills, tools,
                and outcomes.
              </p>
            </ScrollRevealBlock>
          </div>
        </div>
      </section>

      {/* ALL FOUR PREMIUM COURSE CARDS */}
      <section className="py-10 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          {/* Mobile-Only (<768px) Scaler-Inspired Interactive Track Discovery Tabs */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-6">
            <button
              type="button"
              onClick={() => setSelectedTrack('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                selectedTrack === 'all'
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
                onClick={() => setSelectedTrack(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-colors cursor-pointer ${
                  selectedTrack === c.id
                    ? 'bg-[#171717] text-[#F8F6F0] border-[#171717]'
                    : 'bg-[#FFFFFF] text-[#171717] border-[#E7E2D8]'
                }`}
              >
                {c.code} · {c.title}
              </button>
            ))}
          </div>

          {/* Mobile: Clearly Separated Structured Course Cards (1 col) */}
          <div className="md:hidden grid grid-cols-1 gap-5">
            {displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* Tablet & Desktop: Original 2x2 Grid Untouched */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 items-stretch">
            {COURSES_DATA.map((course, idx) => (
              <ParallaxLayer
                key={course.id}
                speedY={idx % 2 === 1 ? -10 : 10}
                className="h-full"
              >
                <CourseCard course={course} onNavigate={onNavigate} />
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </section>

      <HairlineDivider />

      {/* COMPARATIVE INDEX — Pure White #FFFFFF */}
      <section className="bg-[#FFFFFF] py-14 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <ScrollRevealBlock direction="up">
            <div className="mb-8 md:mb-12">
              <span className="small-gold-label text-[#A98747] block mb-2.5 md:mb-3">
                Program Index
              </span>
              <h2 className="section-h2-clamp text-[#171717]">
                Compare Our Core Disciplines.
              </h2>
            </div>
          </ScrollRevealBlock>

          <div className="divide-y divide-[#E7E2D8] border-y border-[#E7E2D8]">
            {COURSES_DATA.map((course) => (
              <ScrollRevealBlock key={course.id} direction="up">
                <div className="py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-center">
                  <div className="lg:col-span-3">
                    <span className="small-gold-label text-[#A98747] block mb-1">
                      Program {course.code}
                    </span>
                    <h3 className="font-display-serif mobile-course-h3 md:text-3xl text-[#171717]">
                      {course.title}
                    </h3>
                    <span className="text-xs text-[#8B8983] mt-1 block">
                      {course.mode}
                    </span>
                  </div>

                  <div className="lg:col-span-6">
                    <span className="small-gold-label text-[#8B8983] block mb-1.5 md:mb-2">
                      Confirmed Syllabus Topics
                    </span>
                    <p className="text-[14.5px] md:text-sm text-[#171717]/80 leading-relaxed">
                      {course.keyTopics.join(' · ')}
                    </p>
                  </div>

                  <div className="lg:col-span-3 grid grid-cols-2 sm:flex lg:justify-end gap-2.5 md:gap-3 pt-1 md:pt-0">
                    <button
                      type="button"
                      onClick={() => onNavigate(course.slug)}
                      className="min-h-[46px] px-4 md:px-5 py-2.5 md:py-3 rounded-xl border border-[#171717] hover:border-[#C6A15B] text-[14px] md:text-sm font-medium text-[#171717] transition-colors cursor-pointer"
                    >
                      View Syllabus
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('enrollment', course.id)}
                      className="min-h-[46px] px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-[14px] md:text-sm font-medium transition-colors cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </ScrollRevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM ADVISORY CTA */}
      <section className="bg-[#171717] text-[#F8F6F0] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-5 md:px-6 text-center">
          <span className="small-gold-label text-[#C6A15B] block mb-2.5 md:mb-3">
            Academic Counselling
          </span>
          <h2 className="section-h2-clamp text-[#F8F6F0] mb-3.5 md:mb-4">
            Need Help Choosing Your Program?
          </h2>
          <p className="text-[15.5px] md:text-base text-[#F8F6F0]/75 max-w-xl mx-auto leading-[1.6] md:leading-relaxed mb-7 md:mb-8">
            Speak with an academic advisor to review the syllabus, practice
            labs, and Online or Offline Hyderabad batch options.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('enrollment')}
            className="group w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[14px] md:text-sm font-medium transition-colors cursor-pointer"
          >
            <span>Request a callback</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};
