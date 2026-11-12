import React from 'react';
import {
  ArrowRight,
  Compass,
  Award,
  Sparkles,
  BookOpen,
  Users,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { BRAND_ASSETS, PageId } from '../data/siteData';
import {
  HairlineDivider,
  ParallaxLayer,
  ParallaxBackdropText,
  InteractiveTiltCard,
  ScrollRevealBlock,
  EditorialRevealTitle,
  ParallaxImageFrame,
} from '../components/MotionPrimitives';

interface AboutPageProps {
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#171717]">
      {/* Hero Section */}
      <section className="relative pt-10 pb-14 md:pt-32 md:pb-28 bg-[#F8F6F0] overflow-hidden border-b border-[#E7E2D8]">
        <ParallaxBackdropText
          text="ORIGIN"
          direction="left"
          className="absolute top-12 right-0"
        />
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-6 md:w-8 h-[1px] bg-[#A98747] shrink-0" />
                <span className="small-gold-label text-[#A98747]">
                  About IND Academy · An Initiative by Brightlume Digital Media Private Limited
                </span>
              </div>
              <EditorialRevealTitle
                as="h1"
                className="hero-h1-clamp text-[#171717]"
                segments={[
                  { text: 'A' },
                  { text: 'Better', goldOnLight: true },
                  { text: 'Way to' },
                  { text: 'Learn.', goldOnLight: true },
                ]}
              />
            </div>
            <div className="lg:col-span-4">
              <ParallaxLayer speedY={-16}>
                <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65] border-l border-[#C6A15B] pl-4 md:pl-6">
                  IND Academy was founded as the dedicated educational initiative of Brightlume Digital Media Private Limited to replace passive theoretical lectures with disciplined, mentor-led studio execution.
                </p>
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Brand & Academy Relationship Section */}
      <section className="py-14 md:py-32 bg-[#FFFFFF] border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <ScrollRevealBlock className="lg:col-span-6 space-y-4 md:space-y-6">
              <span className="small-gold-label text-[#A98747] block">
                01 / Brand Architecture & Story
              </span>
              <EditorialRevealTitle
                as="h2"
                className="section-h2-clamp text-[#171717]"
                segments={[
                  { text: 'Born Inside a Working' },
                  { text: 'Digital Media & Technology', goldOnLight: true },
                  { text: 'Organization.' },
                ]}
              />
              <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65]">
                Brightlume Digital Media Private Limited established IND Academy after recognizing a persistent gap between traditional classroom curricula and the day-to-day workflows required in modern technology and growth teams.
              </p>
              <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65]">
                Rather than teaching static slides, IND Academy brings learners directly into structured practice labs across Digital Marketing, Coding, Artificial Intelligence, and Video Editing—guided by practitioners who build and ship real systems every day.
              </p>

              <div className="pt-2 md:pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 md:p-6 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8]">
                  <p className="small-gold-label text-[#A98747] mb-3">
                    Primary Education Brand
                  </p>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-[#171717] p-2 flex items-center justify-center shrink-0">
                      <img
                        src={BRAND_ASSETS.indAcademyLogo}
                        alt="IND Academy Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-display-serif text-xl font-medium text-[#171717]">
                        IND Academy
                      </h3>
                      <p className="text-xs text-[#8B8983] font-medium">
                        EdTech Initiative
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#57554F] font-normal leading-relaxed">
                    Dedicated to career-defining education in Digital Marketing, Software Engineering, Applied AI, and Video Editing.
                  </p>
                </div>

                <div className="p-5 md:p-6 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8]">
                  <p className="small-gold-label text-[#A98747] mb-3">
                    Parent Company
                  </p>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-[#FFFFFF] border border-[#E7E2D8] p-2 flex items-center justify-center shrink-0">
                      <img
                        src={BRAND_ASSETS.brightlumeLogo}
                        alt="Brightlume Digital Media Private Limited Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-display-serif text-xl font-medium text-[#171717]">
                        Brightlume Digital Media Private Limited
                      </h3>
                      <p className="text-xs text-[#8B8983] font-medium">
                        Parent Organization
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#57554F] font-normal leading-relaxed">
                    Provides industry mentorship, production case studies, and real-world project benchmarks for every cohort.
                  </p>
                </div>
              </div>
            </ScrollRevealBlock>

            <div className="lg:col-span-6">
              <ParallaxImageFrame
                src={BRAND_ASSETS.classroomImage}
                alt="IND Academy Mentorship Studio"
                caption="Collaborative curriculum reviews & practical mentorship"
                badgeText="BRIGHTLUME DIGITAL MEDIA × IND ACADEMY"
                aspectClass="aspect-[16/10] md:aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Philosophy, Approach, Commitment */}
      <section className="py-14 md:py-32 bg-[#F8F6F0] border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-8 md:mb-16">
            <span className="small-gold-label text-[#A98747] block mb-3 md:mb-4">
              02 / Mission & Educational Philosophy
            </span>
            <EditorialRevealTitle
              as="h2"
              className="section-h2-clamp text-[#171717]"
              segments={[
                { text: 'Four' },
                { text: 'Principles', goldOnLight: true },
                { text: 'That Govern Every Classroom &' },
                { text: 'Cohort.', goldOnLight: true },
              ]}
            />
          </div>

          <HairlineDivider className="mb-8 md:mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {[
              {
                number: '01',
                label: 'Our Mission',
                title: 'Clarity Over Complexity',
                description:
                  'We strip away academic filler and focus entirely on the core concepts, tools, and mental models that enable students to build, launch, and measure real digital work.',
                icon: Compass,
              },
              {
                number: '02',
                label: 'Our Philosophy',
                title: 'Proof of Work Over Memorization',
                description:
                  'Competence is demonstrated through audited campaigns, deployed full-stack repositories, and working AI workflows—never through rote multiple-choice tests.',
                icon: BookOpen,
              },
              {
                number: '03',
                label: 'Our Approach',
                title: 'Small-Cohort Practitioner Mentorship',
                description:
                  'Every module is accompanied by live walkthroughs, line-by-line code and campaign critiques, and structured lab hours where questions are resolved in real time.',
                icon: Users,
              },
              {
                number: '04',
                label: 'Our Commitment',
                title: 'Honest Guidance & Career Readiness',
                description:
                  'We provide transparent curriculum guidance, structured portfolio reviews, and interview preparation tailored to each student’s starting background.',
                icon: Award,
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <ScrollRevealBlock key={item.number} delay={idx * 0.08}>
                  <InteractiveTiltCard className="h-full bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#C6A15B] rounded-2xl p-6 md:p-10 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <span className="small-gold-label text-[#A98747]">
                          {item.number} · {item.label}
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center text-[#A98747]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-display-serif mobile-course-h3 md:text-3xl leading-snug font-medium text-[#171717] mb-2.5 md:mb-4">
                        {item.title}
                      </h3>
                      <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65]">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-5 mt-5 md:pt-6 md:mt-6 border-t border-[#E7E2D8] flex items-center gap-2 text-xs font-medium text-[#8B8983]">
                      <CheckCircle2 className="w-4 h-4 text-[#A98747]" />
                      <span>Applied across all 4 core tracks</span>
                    </div>
                  </InteractiveTiltCard>
                </ScrollRevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Charcoal Brand Attribution Showcase */}
      <section className="py-14 md:py-32 bg-[#171717] text-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 md:space-y-6">
              <span className="small-gold-label text-[#C6A15B] block">
                03 / Institutional Standards
              </span>
              <EditorialRevealTitle
                as="h2"
                className="section-h2-clamp text-[#F8F6F0]"
                segments={[
                  { text: 'Designed for' },
                  { text: 'Ambitious', gold: true },
                  { text: 'Learners Ready to Build the' },
                  { text: 'Future.', gold: true },
                ]}
              />
              <p className="text-[15.5px] md:text-[17px] text-[#B8B5AD] font-normal leading-[1.6] md:leading-[1.65] max-w-2xl">
                Whether you are a university student preparing for your first technical role, a professional transitioning into growth or AI engineering, or a founder building your own product, IND Academy provides a calm, rigorous environment to master your craft.
              </p>
              <div className="pt-2 md:pt-4 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="min-h-[46px] px-4 sm:px-7 py-3.5 sm:py-4 rounded-lg bg-[#C6A15B] text-[#171717] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#F8F6F0] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <button
                  onClick={() => onNavigate('enrollment')}
                  className="min-h-[46px] px-4 sm:px-7 py-3.5 sm:py-4 rounded-lg border border-[#333333] hover:border-[#C6A15B] text-[#F8F6F0] font-semibold text-xs uppercase tracking-[0.14em] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Callback</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 md:p-10 rounded-2xl bg-[#1F1F1F] border border-[#2C2C2C] space-y-5 md:space-y-6">
                <div className="flex items-center justify-between pb-5 md:pb-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B0B0B] border border-[#333333] p-2 flex items-center justify-center">
                      <img
                        src={BRAND_ASSETS.indAcademyLogo}
                        alt="IND Academy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-display-serif text-lg font-medium text-[#F8F6F0]">
                        IND Academy
                      </p>
                      <p className="text-xs text-[#C6A15B]">
                        Primary Education Brand
                      </p>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#C6A15B]" />
                </div>

                <div className="flex items-center justify-between pb-5 md:pb-6 border-b border-[#2C2C2C]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] p-2 flex items-center justify-center">
                      <img
                        src={BRAND_ASSETS.brightlumeLogo}
                        alt="Brightlume Digital Media Private Limited"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-display-serif text-lg font-medium text-[#F8F6F0]">
                        Brightlume Digital Media Private Limited
                      </p>
                      <p className="text-xs text-[#8B8983]">
                        Parent Company
                      </p>
                    </div>
                  </div>
                  <Layers className="w-5 h-5 text-[#C6A15B]" />
                </div>

                <p className="text-xs text-[#8B8983] leading-relaxed">
                  IND Academy is an EdTech initiative by Brightlume Digital Media Private Limited. All programs are delivered through structured classroom, online, and hybrid cohorts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
