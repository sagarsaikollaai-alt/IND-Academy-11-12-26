import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_ASSETS, COURSES_DATA, PageId } from '../data/siteData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navigateOrScroll = (
    targetPage: PageId,
    sectionId?: string,
    courseId?: string
  ) => {
    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);

    if (targetPage === 'home' && sectionId) {
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

    onNavigate(targetPage, courseId);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b border-[#E7E2D8] ${
        isScrolled
          ? 'bg-[#F8F6F0]/92 backdrop-blur-md shadow-[0_8px_24px_-16px_rgba(23,23,23,0.1)]'
          : 'bg-[#F8F6F0]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-6 px-5 md:px-6 h-[68px] md:h-20">
        {/* Left: Original IND Academy Logo Only (~96px wide on mobile, original on tablet/desktop) */}
        <button
          type="button"
          onClick={() => navigateOrScroll('home')}
          className="flex items-center text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6A15B] rounded-xl shrink-0"
          aria-label="IND Academy Home"
        >
          <div className="px-3 py-1.5 md:px-3.5 md:py-1.5 rounded-xl bg-[#171717] border border-[#333333] group-hover:border-[#C6A15B] transition-colors">
            <img
              src={BRAND_ASSETS.indAcademyLogo}
              alt="IND Academy Logo"
              className="w-[96px] h-7 md:w-auto md:h-9 object-contain"
            />
          </div>
        </button>

        {/* Centre Links: Why IND, Programs, Mentors, Journal, About, Contact */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          <button
            type="button"
            onClick={() => navigateOrScroll('home', 'why-ind-section')}
            className="relative py-1 text-sm font-medium text-[#171717]/85 hover:text-[#171717] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#A98747] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 cursor-pointer"
          >
            Why IND
          </button>

          {/* Programs Link + Hover Popover */}
          <div
            className="relative"
            onMouseEnter={() => setProgramsDropdownOpen(true)}
            onMouseLeave={() => setProgramsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => navigateOrScroll('catalogue')}
              className={`relative py-1 text-sm font-medium inline-flex items-center gap-1 transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#A98747] after:origin-left after:transition-transform after:duration-300 cursor-pointer ${
                [
                  'catalogue',
                  'course-digital-marketing',
                  'course-coding',
                  'course-ai',
                  'course-video-editing',
                ].includes(currentPage)
                  ? 'text-[#171717] after:scale-x-100'
                  : 'text-[#171717]/85 hover:text-[#171717] after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              <span>Programs</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#A98747]" />
            </button>

            <AnimatePresence>
              {programsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 pt-3 w-[380px] z-50"
                >
                  <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E2D8] shadow-[0_24px_50px_-16px_rgba(23,23,23,0.14)] p-3 space-y-1">
                    <div className="px-3 py-1.5 border-b border-[#E7E2D8] flex items-center justify-between">
                      <span className="small-gold-label text-[#A98747]">
                        All 4 Programs
                      </span>
                      <button
                        type="button"
                        onClick={() => navigateOrScroll('catalogue')}
                        className="text-xs font-medium text-[#171717] hover:text-[#A98747] cursor-pointer"
                      >
                        All Courses →
                      </button>
                    </div>
                    {COURSES_DATA.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => navigateOrScroll(course.slug)}
                        className="w-full p-3 rounded-xl hover:bg-[#F8F6F0] text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display-serif text-base font-medium text-[#171717] group-hover:text-[#A98747]">
                            {course.code}. {course.title}
                          </span>
                          <span className="text-xs text-[#8B8983]">
                            {course.mode}
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8983] mt-1 line-clamp-1">
                          {course.keyTopics.slice(0, 4).join(' · ')}
                        </p>
                      </button>
                    ))}
                    <div className="pt-2 border-t border-[#E7E2D8] flex items-center justify-between px-3 py-1.5 text-xs">
                      <button
                        type="button"
                        onClick={() => navigateOrScroll('learning-experience')}
                        className="font-medium text-[#171717]/80 hover:text-[#A98747] cursor-pointer"
                      >
                        Learning Experience
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateOrScroll('about')}
                        className="font-medium text-[#171717]/80 hover:text-[#A98747] cursor-pointer"
                      >
                        About IND Academy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => navigateOrScroll('home', 'mentors-section')}
            className="relative py-1 text-sm font-medium text-[#171717]/85 hover:text-[#171717] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#A98747] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 cursor-pointer"
          >
            Mentors
          </button>

          <button
            type="button"
            onClick={() => navigateOrScroll('home', 'journal-section')}
            className="relative py-1 text-sm font-medium text-[#171717]/85 hover:text-[#171717] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#A98747] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 cursor-pointer"
          >
            Journal
          </button>

          <button
            type="button"
            onClick={() => navigateOrScroll('about')}
            className={`relative py-1 text-sm font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#A98747] after:origin-left after:transition-transform after:duration-300 cursor-pointer ${
              currentPage === 'about'
                ? 'text-[#171717] after:scale-x-100'
                : 'text-[#171717]/85 hover:text-[#171717] after:scale-x-0 hover:after:scale-x-100'
            }`}
          >
            About
          </button>

          <button
            type="button"
            onClick={() => navigateOrScroll('contact')}
            className={`relative py-1 text-sm font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#A98747] after:origin-left after:transition-transform after:duration-300 cursor-pointer ${
              currentPage === 'contact'
                ? 'text-[#171717] after:scale-x-100'
                : 'text-[#171717]/85 hover:text-[#171717] after:scale-x-0 hover:after:scale-x-100'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Mobile "Enquire Now" Quick CTA + Desktop "Request a callback" Button + Hamburger Button */}
        <div className="flex items-center gap-2.5 md:gap-3">
          {/* Mobile-only quick Enquire Now button for effortless one-hand access */}
          <button
            type="button"
            onClick={() => navigateOrScroll('enrollment')}
            className="md:hidden inline-flex items-center justify-center min-h-[38px] px-3.5 py-2 rounded-xl bg-[#171717] active:bg-[#C6A15B] text-[#F8F6F0] active:text-[#171717] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Enquire Now</span>
          </button>

          <button
            type="button"
            onClick={() => navigateOrScroll('enrollment')}
            className="group hidden md:inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#171717] hover:bg-[#C6A15B] text-[#F8F6F0] hover:text-[#171717] text-sm font-medium transition-all duration-300 cursor-pointer"
          >
            <span>Request a callback</span>
            <ArrowRight className="w-4 h-4 text-[#C6A15B] group-hover:text-[#171717] transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          {/* Hamburger Button (42px x 42px on mobile, 40px on tablet) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-[42px] h-[42px] md:w-10 md:h-10 rounded-xl border border-[#E7E2D8] bg-[#FFFFFF] text-[#171717] hover:border-[#C6A15B] transition-colors cursor-pointer shrink-0"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Slide-In Navigation Drawer (Mobile & Tablet < 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-[#0B0B0B]/65 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-In Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile Navigation Drawer"
              className="fixed top-0 right-0 bottom-0 z-50 w-[88vw] max-w-[360px] bg-[#F8F6F0] border-l border-[#E7E2D8] shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div>
                {/* Drawer Header */}
                <div className="px-5 h-[68px] border-b border-[#E7E2D8] bg-[#FFFFFF] flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-xl bg-[#171717] border border-[#333333]">
                    <img
                      src={BRAND_ASSETS.indAcademyLogo}
                      alt="IND Academy"
                      className="w-[92px] h-6 object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-[42px] h-[42px] rounded-xl border border-[#E7E2D8] bg-[#F8F6F0] text-[#171717] flex items-center justify-center hover:border-[#C6A15B] cursor-pointer"
                    aria-label="Close navigation drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Structured EdTech Course Discovery inside Drawer */}
                <div className="p-5 border-b border-[#E7E2D8] bg-[#FFFFFF]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="small-gold-label text-[#A98747]">
                      Career Programs (4 Tracks)
                    </span>
                    <button
                      type="button"
                      onClick={() => navigateOrScroll('catalogue')}
                      className="text-xs font-medium text-[#171717] hover:text-[#A98747] cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {COURSES_DATA.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => navigateOrScroll(course.slug)}
                        className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                          currentPage === course.slug
                            ? 'bg-[#171717] text-[#F8F6F0] border-[#C6A15B]'
                            : 'bg-[#F8F6F0] text-[#171717] border-[#E7E2D8] hover:border-[#C6A15B]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display-serif text-[17px] font-medium leading-snug">
                            {course.code}. {course.title}
                          </span>
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 ${
                              currentPage === course.slug
                                ? 'text-[#C6A15B]'
                                : 'text-[#A98747]'
                            }`}
                          />
                        </div>
                        <span
                          className={`block text-[11px] mt-0.5 ${
                            currentPage === course.slug
                              ? 'text-[#F8F6F0]/75'
                              : 'text-[#8B8983]'
                          }`}
                        >
                          {course.mode}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* All Existing Navigation Destinations */}
                <nav className="p-5 space-y-1">
                  <span className="small-gold-label text-[#8B8983] block px-3 mb-2">
                    Explore IND Academy
                  </span>
                  {[
                    {
                      label: 'Home',
                      active: currentPage === 'home',
                      action: () => navigateOrScroll('home'),
                    },
                    {
                      label: 'Why IND',
                      active: false,
                      action: () => navigateOrScroll('home', 'why-ind-section'),
                    },
                    {
                      label: 'Programs & Catalogue',
                      active: currentPage === 'catalogue',
                      action: () => navigateOrScroll('catalogue'),
                    },
                    {
                      label: 'Learning Experience',
                      active: currentPage === 'learning-experience',
                      action: () => navigateOrScroll('learning-experience'),
                    },
                    {
                      label: 'Mentors',
                      active: false,
                      action: () => navigateOrScroll('home', 'mentors-section'),
                    },
                    {
                      label: 'Journal',
                      active: false,
                      action: () => navigateOrScroll('home', 'journal-section'),
                    },
                    {
                      label: 'About',
                      active: currentPage === 'about',
                      action: () => navigateOrScroll('about'),
                    },
                    {
                      label: 'Contact',
                      active: currentPage === 'contact',
                      action: () => navigateOrScroll('contact'),
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action}
                      className={`w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-[14.5px] font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        item.active
                          ? 'bg-[#171717] text-[#F8F6F0]'
                          : 'text-[#171717] hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        className={`w-4 h-4 ${
                          item.active ? 'text-[#C6A15B]' : 'text-[#8B8983]'
                        }`}
                      />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer CTA: Enquire Now / Request a callback */}
              <div className="p-5 border-t border-[#E7E2D8] bg-[#FFFFFF] space-y-2.5">
                <button
                  type="button"
                  onClick={() => navigateOrScroll('enrollment')}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-[14.5px] font-medium transition-colors cursor-pointer"
                >
                  <span>Enquire Now — Request a callback</span>
                  <ArrowRight className="w-4 h-4 text-[#171717]" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
