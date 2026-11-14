import React from 'react';
import { ArrowRight, Award, BookOpen, Compass, Users } from 'lucide-react';
import { BRAND_ASSETS, PageId } from '../data/siteData';
import {
  EditorialRevealTitle,
  ParallaxImageFrame,
} from '../components/MotionPrimitives';

interface AboutPageProps {
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#171717]">
      {/* 1. CONCISE HERO */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-20 bg-[#F8F6F0] border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="small-gold-label text-[#A98747] block mb-2.5">
              About IND Academy · By Brightlume Digital Media
            </span>
            <EditorialRevealTitle
              as="h1"
              className="hero-h1-clamp text-[#171717] mb-3"
              segments={[
                { text: 'A better way' },
                { text: 'to learn.', goldOnLight: true },
              ]}
            />
            <p className="text-[15.5px] md:text-lg text-[#57554F] max-w-lg mb-6">
              Founded by Brightlume Digital Media Private Limited to replace
              passive lectures with mentor-led studio execution.
            </p>

            {/* Brand Attribution Dual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#171717] p-2 flex items-center justify-center shrink-0">
                  <img
                    src={BRAND_ASSETS.indAcademyLogo}
                    alt="IND Academy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display-serif text-lg font-semibold text-[#171717]">
                    IND Academy
                  </h3>
                  <p className="text-xs text-[#A98747]">Education Brand</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8] p-2 flex items-center justify-center shrink-0">
                  <img
                    src={BRAND_ASSETS.brightlumeLogo}
                    alt="Brightlume Digital Media Private Limited"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display-serif text-lg font-semibold text-[#171717]">
                    Brightlume Digital Media
                  </h3>
                  <p className="text-xs text-[#8B8983]">Parent Company</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ParallaxImageFrame
              src={BRAND_ASSETS.classroomImage}
              alt="IND Academy Studio"
              caption="Practitioner-led studio mentorship"
              badgeText="BRIGHTLUME × IND ACADEMY"
              aspectClass="aspect-[16/10]"
            />
          </div>
        </div>
      </section>

      {/* 2. FOUR CORE PRINCIPLES BENTO */}
      <section className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-8 md:mb-12">
            <span className="small-gold-label text-[#A98747] block mb-1.5">
              Philosophy
            </span>
            <h2 className="section-h2-clamp text-[#171717]">
              Four studio principles.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                number: '01',
                title: 'Clarity First',
                desc: 'Zero academic filler. Only tools and workflows used in real teams.',
                icon: Compass,
              },
              {
                number: '02',
                title: 'Proof of Work',
                desc: 'Audited campaigns, live code repos, and shipped video edits.',
                icon: BookOpen,
              },
              {
                number: '03',
                title: 'Small Cohorts',
                desc: 'Direct line-by-line feedback from working practitioners.',
                icon: Users,
              },
              {
                number: '04',
                title: 'Career Focus',
                desc: 'Portfolio reviews and interview prep tailored to your track.',
                icon: Award,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-6 rounded-3xl bg-[#F8F6F0] border border-[#E7E2D8] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-[#A98747]">
                        {item.number}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8] flex items-center justify-center text-[#A98747]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-display-serif text-2xl text-[#171717] mb-2">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#57554F] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CLOSING CTA */}
      <section className="py-14 md:py-20 bg-[#171717] text-[#F8F6F0]">
        <div className="max-w-3xl mx-auto px-5 md:px-6 text-center">
          <span className="small-gold-label text-[#C6A15B] block mb-2">
            Join a Cohort
          </span>
          <h2 className="section-h2-clamp text-[#F8F6F0] mb-3">
            Ready to build your portfolio?
          </h2>
          <p className="text-sm text-[#F8F6F0]/70 mb-7">
            Explore our four career tracks or book a 1-on-1 counselling call.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('catalogue')}
              className="min-h-[46px] px-6 py-3.5 rounded-xl bg-[#C6A15B] text-[#171717] font-semibold text-xs uppercase tracking-[0.14em] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('enrollment')}
              className="min-h-[46px] px-6 py-3.5 rounded-xl border border-[#333333] hover:border-[#C6A15B] text-[#F8F6F0] font-semibold text-xs uppercase tracking-[0.14em] cursor-pointer"
            >
              Request Callback
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
