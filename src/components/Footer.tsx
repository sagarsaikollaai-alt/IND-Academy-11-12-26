import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Phone, X } from 'lucide-react';
import { BRAND_ASSETS, ContactConfig, PageId } from '../data/siteData';

interface FooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId, courseId?: string) => void;
  contactConfig: ContactConfig;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  onNavigate,
  contactConfig,
}) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(
    null
  );
  const [openMobileGroup, setOpenMobileGroup] = useState<
    'programs' | 'resources' | null
  >('programs');

  useEffect(() => {
    if (!legalModal) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [legalModal]);

  const navigateOrScroll = (page: PageId, sectionId?: string) => {
    if (page === 'home' && sectionId) {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    onNavigate(page);
  };

  return (
    <footer className="relative overflow-hidden bg-[#171717] text-[#F8F6F0] border-t border-[#333333]">
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 pt-12 md:pt-20 pb-10 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 pb-12 md:pb-16 border-b border-[#333333]">
          {/* Column 1: IND Academy Logo & Brightlume Digital Media Private Limited Attribution */}
          <div className="lg:col-span-4 space-y-5 md:space-y-6">
            <div>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-block cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6A15B] rounded-xl"
              >
                <img
                  src={BRAND_ASSETS.indAcademyLogo}
                  alt="IND Academy Logo"
                  className="h-10 md:h-11 w-auto object-contain"
                />
              </button>
              <p className="mt-3.5 md:mt-4 text-sm font-normal text-[#F8F6F0]/75 leading-relaxed max-w-sm">
                An EdTech initiative by Brightlume Digital Media Private Limited.
                Practical education in Digital Marketing, Coding, Artificial
                Intelligence, and Video Editing.
              </p>
            </div>

            {/* Separate Brightlume Digital Media Private Limited Logo */}
            <div className="pt-4 md:pt-5 border-t border-[#333333]">
              <span className="small-gold-label text-[#C6A15B] block mb-2.5 md:mb-3">
                Parent Company
              </span>
              <div className="inline-flex items-center gap-3 md:gap-3.5 px-3.5 md:px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E7E2D8]">
                <img
                  src={BRAND_ASSETS.brightlumeLogo}
                  alt="Brightlume Digital Media Private Limited Logo"
                  className="h-7 md:h-8 w-auto object-contain shrink-0"
                />
                <div className="border-l border-[#E7E2D8] pl-3">
                  <span className="block text-[13px] md:text-sm font-medium text-[#171717]">
                    Brightlume Digital Media Private Limited
                  </span>
                  <span className="block text-[11px] md:text-xs text-[#8B8983]">
                    Parent Organization
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: All 4 Programs (Collapsible on mobile, always expanded on md+) */}
          <div className="lg:col-span-3 border-t border-[#333333] pt-5 md:border-t-0 md:pt-0">
            <button
              type="button"
              onClick={() =>
                setOpenMobileGroup((prev) =>
                  prev === 'programs' ? null : 'programs'
                )
              }
              className="md:hidden w-full flex items-center justify-between text-left py-1 cursor-pointer"
              aria-expanded={openMobileGroup === 'programs'}
            >
              <h4 className="small-gold-label text-[#C6A15B]">Programs</h4>
              <ChevronDown
                className={`w-4 h-4 text-[#C6A15B] transition-transform duration-200 ${
                  openMobileGroup === 'programs' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <h4 className="hidden md:block small-gold-label text-[#C6A15B] mb-5">
              Programs
            </h4>
            <ul
              className={`${
                openMobileGroup === 'programs' ? 'block mt-3.5' : 'hidden'
              } md:block md:mt-0 space-y-3 md:space-y-3.5 text-sm`}
            >
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('course-digital-marketing')}
                  className="text-[#F8F6F0]/85 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  01 Digital Marketing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('course-coding')}
                  className="text-[#F8F6F0]/85 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  02 Coding
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('course-ai')}
                  className="text-[#F8F6F0]/85 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  03 Artificial Intelligence
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('course-video-editing')}
                  className="text-[#F8F6F0]/85 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  04 Video Editing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalogue')}
                  className="text-[#C6A15B] hover:text-[#F8F6F0] transition-colors cursor-pointer text-left"
                >
                  Course Catalogue →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Quick Links (Collapsible on mobile, always expanded on md+) */}
          <div className="lg:col-span-2 border-t border-[#333333] pt-5 md:border-t-0 md:pt-0">
            <button
              type="button"
              onClick={() =>
                setOpenMobileGroup((prev) =>
                  prev === 'resources' ? null : 'resources'
                )
              }
              className="md:hidden w-full flex items-center justify-between text-left py-1 cursor-pointer"
              aria-expanded={openMobileGroup === 'resources'}
            >
              <h4 className="small-gold-label text-[#C6A15B]">Quick Links</h4>
              <ChevronDown
                className={`w-4 h-4 text-[#C6A15B] transition-transform duration-200 ${
                  openMobileGroup === 'resources' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <h4 className="hidden md:block small-gold-label text-[#C6A15B] mb-5">
              Resources
            </h4>
            <ul
              className={`${
                openMobileGroup === 'resources' ? 'block mt-3.5' : 'hidden'
              } md:block md:mt-0 space-y-3 text-sm`}
            >
              <li>
                <button
                  type="button"
                  onClick={() =>
                    navigateOrScroll('home', 'masterclasses-section')
                  }
                  className="text-[#F8F6F0]/80 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  Free Demo Class
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateOrScroll('home', 'labs-section')}
                  className="text-[#F8F6F0]/80 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  Practice Labs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateOrScroll('home', 'journal-section')}
                  className="text-[#F8F6F0]/80 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  Resources &amp; Journal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('learning-experience')}
                  className="text-[#F8F6F0]/80 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  Learning Experience
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-[#F8F6F0]/80 hover:text-[#C6A15B] transition-colors cursor-pointer text-left"
                >
                  About IND Academy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-3 border-t border-[#333333] pt-5 md:border-t-0 md:pt-0">
            <h4 className="small-gold-label text-[#C6A15B] mb-4 md:mb-5">Connect</h4>
            <div className="space-y-3.5 md:space-y-4 text-sm text-[#F8F6F0]/80">
              <div>
                <span className="block text-xs text-[#8B8983] uppercase tracking-[0.14em] mb-1">
                  Campus Address
                </span>
                <p className="leading-relaxed">
                  {contactConfig.officeAddressLine1},{' '}
                  {contactConfig.officeAddressLine2}
                </p>
              </div>
              <div>
                <span className="block text-xs text-[#8B8983] uppercase tracking-[0.14em] mb-1">
                  Phone
                </span>
                <a
                  href={`tel:${contactConfig.phonePrimary.replace(/\s+/g, '')}`}
                  className="text-[#F8F6F0] hover:text-[#C6A15B] transition-colors font-medium"
                >
                  {contactConfig.phonePrimary}
                </a>
              </div>
              <div>
                <span className="block text-xs text-[#8B8983] uppercase tracking-[0.14em] mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${contactConfig.emailAdmissions}`}
                  className="block text-[#F8F6F0] hover:text-[#C6A15B] transition-colors"
                >
                  {contactConfig.emailAdmissions}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8B8983]">
          <p>
            © {new Date().getFullYear()} IND Academy — An EdTech initiative by
            Brightlume Digital Media Private Limited.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
        </div>
      </div>

      {/* Static Last-Place Callout Bar (Moved from traveling sticky bar to the very bottom of the page) */}
      <div className="bg-[#0B0B0B] border-t border-[#333333] text-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span className="text-[#F8F6F0]/85">
              Questions about the programs? Talk to us at
            </span>
            <a
              href={`tel:${contactConfig.phonePrimary.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 font-medium text-[#C6A15B] hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{contactConfig.phonePrimary}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('enrollment')}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-sm font-medium transition-colors cursor-pointer shrink-0"
          >
            <span>Request a call</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/80 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-xl w-full rounded-2xl bg-[#F8F6F0] text-[#171717] border border-[#E7E2D8] p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7E2D8]">
              <h3 className="font-display-serif text-2xl font-medium text-[#171717]">
                {legalModal === 'privacy'
                  ? 'Privacy Policy — IND Academy'
                  : 'Terms — IND Academy'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="w-9 h-9 rounded-xl border border-[#E7E2D8] flex items-center justify-center text-[#171717] hover:border-[#C6A15B] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-[#171717]/80 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    IND Academy (an EdTech initiative by Brightlume Digital
                    Media Private Limited) collects contact details submitted
                    voluntarily through our callback, brochure, and enrollment
                    forms solely for academic counselling.
                  </p>
                  <p>
                    We never sell or distribute student personal information to
                    third parties.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All Digital Marketing, Coding, Artificial Intelligence, and
                    Video Editing programs at IND Academy focus on practical
                    training, guided labs, and real-world project execution.
                  </p>
                  <p>
                    All logos, syllabus documentation, and learning frameworks
                    remain the intellectual property of Brightlume Digital Media
                    Private Limited.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-[#E7E2D8] flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-6 py-2.5 rounded-xl bg-[#171717] text-[#F8F6F0] text-sm font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
