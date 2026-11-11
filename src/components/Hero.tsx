import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, ArrowRight, MapPin, Award, Users, Play, Target } from 'lucide-react';

interface HeroProps {
  onExploreAcademy: () => void;
  onFindGym: () => void;
  onExploreSelfDefense: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreAcademy,
  onFindGym,
  onExploreSelfDefense,
}) => {
  const { t, lang } = useApp();

  return (
    <div className="relative overflow-hidden bg-neutral-950 text-white border-b border-neutral-800">
      {/* Background radial gradient accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission, Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Kicker (Anti-slop: NO PILLS) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase">
              <span>{t.hero.kicker}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">HQ KIGALI / EXPANDING WORLDWIDE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none text-balance">
              {lang === 'rw' ? (
                <>
                  MENYA KURWANA. <span className="text-red-600">RINDA UBUZIMA.</span> HINDURA UMUBIRI.
                </>
              ) : lang === 'fr' ? (
                <>
                  MAÎTRISEZ LE COMBAT. <span className="text-red-600">DÉFENDEZ LA VIE.</span> FORGEZ VOTRE CORPS.
                </>
              ) : (
                <>
                  TRAIN STRONG. <span className="text-red-600">FIGHT SMART.</span> STAY SAFE.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreAcademy}
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-md shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onFindGym}
                className="px-6 py-3.5 border border-neutral-700 hover:border-neutral-500 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 font-semibold text-sm rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{t.hero.ctaSecondary}</span>
              </button>

              <button
                onClick={onExploreSelfDefense}
                className="px-4 py-3.5 text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span>Krav Maga Tactical Protocols</span>
              </button>
            </div>

            {/* Discipline Highlights Line */}
            <div className="pt-4 border-t border-neutral-800/80">
              <div className="text-xs text-neutral-400 mb-2 font-medium">
                Official Certifications & Disciplines:
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-300">
                <span className="text-white font-semibold">Krav Maga</span>
                <span className="text-neutral-600">/</span>
                <span>Boxing</span>
                <span className="text-neutral-600">/</span>
                <span>Muay Thai</span>
                <span className="text-neutral-600">/</span>
                <span className="text-white font-semibold">BJJ Grappling</span>
                <span className="text-neutral-600">/</span>
                <span>MMA</span>
                <span className="text-neutral-600">/</span>
                <span>Judo</span>
                <span className="text-neutral-600">/</span>
                <span className="text-red-400 font-semibold">Street Self-Defense</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Image Asset with Tactical Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_krav_maga_strike_1794374656380.jpg"
                alt="Tactical Krav Maga strike demonstration"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              {/* Floating Technique Stamp */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
                    Demonstration Focus
                  </div>
                  <div className="text-sm font-semibold text-white">
                    360° Wedge Defense & Immediate Counter
                  </div>
                  <div className="text-xs text-neutral-400">
                    Lead by Master Erick Reghine · Kigali Central Dojo
                  </div>
                </div>
                <button
                  onClick={onExploreAcademy}
                  className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/40 transition-transform active:scale-95"
                  title="Watch Demonstration"
                >
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Evidence Strip (Single level elevation, tabular nums) */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
              3,200<span className="text-red-500">+</span>
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              {t.hero.statsActiveFighters}
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
              24<span className="text-red-500"> certified</span>
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              {t.hero.statsCertifiedInstructors}
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
              18<span className="text-red-500"> dojos</span>
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              {t.hero.statsPartnerGyms}
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
              100<span className="text-red-500">%</span>
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              Verifiable Belt & Course Certificates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
