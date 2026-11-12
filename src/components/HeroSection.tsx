import React, { useState } from 'react';
import { ArrowRight, Compass, Layers, Play } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AERO_X_MODES,
  EngineeringHotspot,
  VehicleMode,
} from '../data/aeroXData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  activeMode: VehicleMode;
  onSelectMode: (mode: VehicleMode) => void;
  onExploreClick: () => void;
  onOpenTransitionModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeMode,
  onSelectMode,
  onExploreClick,
  onOpenTransitionModal,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const currentConfig = AERO_X_MODES[activeMode];

  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(
    currentConfig.hotspots[0].id
  );
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Ensure selected hotspot stays valid when mode switches
  const activeHotspot: EngineeringHotspot | null =
    currentConfig.hotspots.find((h) => h.id === selectedHotspotId) ||
    currentConfig.hotspots[0] ||
    null;

  const handleModeSwitch = (mode: VehicleMode) => {
    onSelectMode(mode);
    setSelectedHotspotId(AERO_X_MODES[mode].hotspots[0].id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({
      x: normX * -14,
      y: normY * -10,
    });
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-4.25rem)] w-full overflow-hidden bg-[#080A0F] flex flex-col justify-between border-b border-white/10"
    >
      {/* FULL-BLEED 3D RENDER STAGE WITH SUBTLE COMPOSITOR PARALLAX */}
      <div className=" absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentConfig.id}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 1.04 }
            }
            animate={{
              opacity: 1,
              scale: 1.02,
              x: pointerOffset.x,
              y: pointerOffset.y,
            }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{
              opacity: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 0.4, ease: 'easeOut' },
              y: { duration: 0.4, ease: 'easeOut' },
            }}
            className="h-full w-full"
          >
            <ResilientImage
              src={currentConfig.image}
              alt={currentConfig.imageAlt}
              fallbackLabel="Aero X 3D Flagship Render"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured multi-layered contrast scrims ensuring >4.5:1 legibility on left & bottom while preserving the 3D render on the right */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080A0F]/95 via-[#080A0F]/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/25 to-[#080A0F]/40"
          aria-hidden="true"
        />

        {/* Subtle horizon reference grid lines on the 3D stage */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          aria-hidden="true"
        />

        {/* Interactive Engineering Hotspots on the 3D Render (Desktop Stage) */}
        {showHotspots && (
          <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
            {currentConfig.hotspots.map((hotspot) => {
              const isSelected = activeHotspot?.id === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  style={{
                    left: `${hotspot.xPercent}%`,
                    top: `${hotspot.yPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    aria-label={`Inspect ${hotspot.title}`}
                    className={`group flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-mono-tabular transition-all duration-150 cursor-pointer backdrop-blur-md whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#080A0F]/90 text-[#F59E0B] shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                        : 'border-white/25 bg-[#080A0F]/75 text-[#F5F7FA] hover:border-white/60 hover:bg-[#080A0F]/90'
                    }`}
                  >
                    <span className="font-semibold">{hotspot.index}</span>
                    <span className="font-sans text-[11px] font-medium text-[#F5F7FA]">
                      {hotspot.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MAIN HERO FOREGROUND CONTENT */}
      <div className="relative z-20 mx-auto w-full max-w-[1380px] flex-1 px-6 pt-10 pb-8 lg:px-10 lg:pt-14 flex flex-col justify-between">
        {/* Top Row: Unboxed Metadata Kicker + Interactive Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Zero-Pill Unboxed Metadata with typographic middot separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-[#94A3B8]">
            <span className="font-medium text-[#F5F7FA]">Aero X Flagship</span>
            <span aria-hidden="true">·</span>
            <span>Dual-Mode Electric VTOL</span>
            <span aria-hidden="true">·</span>
            <span className="hidden sm:inline">{currentConfig.environmentTag}</span>
          </div>

          {/* Interactive Flight / Road Mode Segmented Control & Hotspot Toggle */}
          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label="Vehicle Operating Mode"
              className="flex items-center gap-1 rounded-lg border border-white/15 bg-[#11151E]/90 p-1 backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => handleModeSwitch('sky')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeMode === 'sky'
                    ? 'bg-[#F59E0B] text-[#080A0F] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F5F7FA]'
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Sky Mode (400m)</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('road')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeMode === 'road'
                    ? 'bg-[#F59E0B] text-[#080A0F] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F5F7FA]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Road Mode (GT)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowHotspots((prev) => !prev)}
              className="hidden lg:inline-flex items-center rounded-lg border border-white/15 bg-[#11151E]/80 px-3 py-2 text-xs font-medium text-[#94A3B8] transition-colors duration-150 hover:border-white/30 hover:text-[#F5F7FA] whitespace-nowrap shrink-0 cursor-pointer backdrop-blur-md"
            >
              {showHotspots ? 'Hide Callouts' : 'Show Callouts'}
            </button>
          </div>
        </div>

        {/* Center Split: Left Bold Editorial Narrative | Right Interactive Node Inspector */}
        <div className="my-auto grid grid-cols-1 items-end gap-10 py-10 lg:grid-cols-12 lg:py-14">
          {/* Left Column: Compelling Headline, Value Proposition, and Primary "Explore Aero X" CTA */}
          <div className="lg:col-span-7">
            <motion.div
              key={`copy-${currentConfig.id}`}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-3 font-mono-tabular text-xs font-medium tracking-wider text-[#F59E0B]">
                01. {currentConfig.label}
              </p>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 4.6vw, 4.25rem)',
                  textWrap: 'balance',
                }}
                className="font-display max-w-2xl leading-[1.05] font-semibold tracking-tight text-[#F5F7FA]"
              >
                {currentConfig.headline}
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-[1.65] text-[#CBD5E1] sm:text-lg">
                {currentConfig.subheadline}
              </p>

              {/* Primary CTA ("Explore Aero X") + Secondary Interactive Sequence Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="group inline-flex items-center gap-3 rounded-lg bg-[#F59E0B] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#080A0F] shadow-[0_12px_32px_-8px_rgba(245,158,11,0.45)] transition-all duration-150 hover:bg-[#FBBF24] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                >
                  <span>Explore Aero X</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onOpenTransitionModal}
                  className="inline-flex items-center gap-2.5 rounded-lg border border-white/20 bg-[#11151E]/80 px-5 py-3.5 text-sm font-medium text-[#F5F7FA] backdrop-blur-md transition-colors duration-150 hover:border-white/40 hover:bg-[#11151E] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>Inspect 18s Transition</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Engineering Callout Inspector Card */}
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            {activeHotspot && (
              <motion.div
                key={activeHotspot.id}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md rounded-xl border border-white/15 bg-[#0C1017]/85 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <span className="font-mono-tabular font-semibold text-[#F59E0B]">
                      Node {activeHotspot.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeHotspot.subtitle}</span>
                  </div>

                  {/* Mobile / Quick Node Selector Buttons */}
                  <div className="flex items-center gap-1">
                    {currentConfig.hotspots.map((node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedHotspotId(node.id)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono-tabular transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          node.id === activeHotspot.id
                            ? 'bg-[#F59E0B] text-[#080A0F] font-semibold'
                            : 'text-[#94A3B8] hover:text-[#F5F7FA]'
                        }`}
                      >
                        {node.index}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold text-[#F5F7FA]">
                    {activeHotspot.title}
                  </h2>
                  <span className="font-mono-tabular text-lg font-semibold text-[#F59E0B] whitespace-nowrap shrink-0">
                    {activeHotspot.metric}
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8] mb-2">
                  {activeHotspot.metricLabel}
                </p>

                <p className="text-xs leading-[1.65] text-[#CBD5E1]">
                  {activeHotspot.description}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Full-Width 4-Column Tabular Telemetry Strip */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 lg:grid-cols-4 lg:gap-8">
          {currentConfig.telemetry.map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-xs font-medium text-[#94A3B8]">
                {item.label}
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="font-mono-tabular text-2xl font-semibold tracking-tight text-[#F5F7FA] sm:text-3xl">
                  {item.value}
                </span>
                <span className="font-mono-tabular text-xs font-medium text-[#F59E0B]">
                  {item.unit}
                </span>
              </div>
              <span className="mt-1 text-xs leading-snug text-[#64748B]">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
