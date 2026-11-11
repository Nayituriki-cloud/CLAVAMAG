import React from 'react';
import { useApp } from '../context/AppContext';
import { disciplinesList } from '../data/initialData';
import { DisciplineId } from '../types';
import { Shield, ArrowRight, Target } from 'lucide-react';

interface DisciplinesSectionProps {
  onSelectDiscipline: (id: DisciplineId) => void;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ onSelectDiscipline }) => {
  const { lang } = useApp();

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Combat Arts Mastery</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            {lang === 'rw' ? 'Imikino 12 yo Kurwana n’Ubuhanga Bwayo' : lang === 'fr' ? '12 Disciplines de Combat & Arts Martiaux' : '12 Combat Disciplines & Self-Defense Systems'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Whether your goal is tactical street survival, ring championship titles, or elite martial fitness, our certified instructors teach authentic lineages with modern sports science.
          </p>
        </div>

        {/* 12 Disciplines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {disciplinesList.map(disc => (
            <div
              key={disc.id}
              className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-medium">Origin: {disc.origin}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${disc.badgeColor}`}>
                    {disc.focus}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-red-500 transition-colors">
                  {disc.name}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {disc.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-semibold">Federation Certified</span>
                <button
                  onClick={() => onSelectDiscipline(disc.id)}
                  className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 group/btn"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
