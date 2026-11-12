import React from 'react';

interface AeroXHeaderProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenReservation: () => void;
}

export const AeroXHeader: React.FC<AeroXHeaderProps> = ({
  onNavigateSection,
  onOpenReservation,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080A0F]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8 px-6 py-4 lg:px-10">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl font-semibold tracking-tight text-[#F5F7FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
        >
          Aero X
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]"
        >
          <button
            type="button"
            onClick={() => onNavigateSection('architecture')}
            className="relative py-1 text-[#94A3B8] transition-colors duration-150 hover:text-[#F5F7FA] whitespace-nowrap shrink-0 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#F59E0B] after:transition-all after:duration-200 hover:after:w-full"
          >
            Architecture
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('transition')}
            className="relative py-1 text-[#94A3B8] transition-colors duration-150 hover:text-[#F5F7FA] whitespace-nowrap shrink-0 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#F59E0B] after:transition-all after:duration-200 hover:after:w-full"
          >
            Transition
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('propulsion')}
            className="relative py-1 text-[#94A3B8] transition-colors duration-150 hover:text-[#F5F7FA] whitespace-nowrap shrink-0 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#F59E0B] after:transition-all after:duration-200 hover:after:w-full"
          >
            Propulsion
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('specifications')}
            className="relative py-1 text-[#94A3B8] transition-colors duration-150 hover:text-[#F5F7FA] whitespace-nowrap shrink-0 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#F59E0B] after:transition-all after:duration-200 hover:after:w-full"
          >
            Specifications
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenReservation}
            className="rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-wide text-[#F5F7FA] transition-colors duration-150 hover:border-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#080A0F] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
          >
            Reserve Allocation
          </button>
        </div>
      </div>
    </header>
  );
};
