import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, AlertCircle, Eye, Hand, Lock, ArrowUpRight, CheckCircle, HelpCircle } from 'lucide-react';

interface Scenario {
  id: string;
  situation: string;
  threatLevel: 'Elevated' | 'Immediate Danger' | 'Critical Weapon Threat';
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const SelfDefenseSystem: React.FC = () => {
  const { lang, courses, openLesson } = useApp();
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const scenarios: Scenario[] = [
    {
      id: 'sc-1',
      situation: 'You are walking to your vehicle at night in an underground lot. An aggressive stranger abruptly corners you shouting demands and stepping into your intimate space (1 meter away).',
      threatLevel: 'Elevated',
      options: [
        {
          text: 'Clench your fists, square your hips, and scream back insults to intimidate them.',
          isCorrect: false,
          explanation: 'Squaring up escalates physical aggression and compromises your balance and escape angles.',
        },
        {
          text: 'Adopt a non-violent tactical fence (hands open at chest height, palms forward, 60/40 stance) while verbally setting loud boundaries: "Stay back!"',
          isCorrect: true,
          explanation: 'The fence shields your chin, allows instant 360-degree deflection, signals innocent intent to security cameras/witnesses, and sets an immediate strike perimeter.',
        },
        {
          text: 'Turn your back and sprint without looking at their hands or surroundings.',
          isCorrect: false,
          explanation: 'Turning your back blindly exposes your spine and rear head to a sudden strike or tackle.',
        },
      ],
    },
    {
      id: 'sc-2',
      situation: 'An assailant suddenly drives both hands around your throat, pushing you backward against a solid wall.',
      threatLevel: 'Immediate Danger',
      options: [
        {
          text: 'Try to pull their fingers off one by one while pushing their chest away.',
          isCorrect: false,
          explanation: 'Fine motor skills fail under acute adrenaline, and pulling straight back fails against a larger attacker’s grip.',
        },
        {
          text: 'Explosively pluck down and outward at their thumbs with a C-clamp grip, drive your hips forward into a groin kick or knee strike, and turn your body to peel away.',
          isCorrect: true,
          explanation: 'Targeting the thumbs exploits the weakest anatomical link of the grip, while an instant explosive strike disrupts oxygen flow and balance.',
        },
        {
          text: 'Hold your breath and wait for someone nearby to call the police.',
          isCorrect: false,
          explanation: 'Blood chokes cause unconsciousness within 6 to 9 seconds; immediate explosive action is critical for survival.',
        },
      ],
    },
    {
      id: 'sc-3',
      situation: 'An attacker pulls a blade from their pocket and demands your wallet at a distance of 3 meters.',
      threatLevel: 'Critical Weapon Threat',
      options: [
        {
          text: 'Attempt an acrobatic flying disarm kick to knock the knife out of their hand.',
          isCorrect: false,
          explanation: 'Hollywood martial arts disarms against an edged weapon carry extreme mortality risk.',
        },
        {
          text: 'Comply with non-violent material demands (throw the wallet away from you to draw their eyes) and sprint in the opposite direction toward populated safety.',
          isCorrect: true,
          explanation: 'In Krav Maga doctrine, your life is irreplaceable while cash is replaceable. Only engage an armed attacker physically if trapped or facing lethal execution.',
        },
      ],
    },
  ];

  const currentScenario = scenarios[selectedScenarioIndex];

  const handleLaunchKravCourse = () => {
    const kravCourse = courses.find(c => c.discipline === 'krav-maga');
    if (kravCourse) {
      openLesson(kravCourse, kravCourse.lessons[0]);
    }
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Tactical Self-Defense & Crisis Survival</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Practical Self-Defense & De-Escalation
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            Real-world defense is not sport fighting. There are no rounds, weight classes, or referees. Our training focuses on threat awareness, preemptive positioning, decisive neutralizations, and immediate safe escape.
          </p>
        </div>

        {/* Cooper's Color Code of Awareness Framework */}
        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Tactical Mindset Framework: Cooper's Color Codes
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
              <div className="text-neutral-300 font-bold uppercase flex items-center justify-between">
                <span>Code White</span>
                <span className="text-[10px] text-neutral-500">Unaware</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Head buried in smartphone, wearing noise-canceling headphones in public. Prime target for opportunistic predators.
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-amber-900/50 rounded-lg space-y-2">
              <div className="text-amber-400 font-bold uppercase flex items-center justify-between">
                <span>Code Yellow</span>
                <span className="text-[10px] text-amber-500/80">Relaxed Alert</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Baseline situational scanning. Conscious of exits, obstacles, and approaching persons without anxiety.
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-orange-900/50 rounded-lg space-y-2">
              <div className="text-orange-400 font-bold uppercase flex items-center justify-between">
                <span>Code Orange</span>
                <span className="text-[10px] text-orange-500/80">Specific Threat</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                A specific anomaly is identified (e.g., someone pacing or shadowing you). Mental trigger set: "If they close to 2 meters, I will act."
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-red-900/60 rounded-lg space-y-2">
              <div className="text-red-500 font-bold uppercase flex items-center justify-between">
                <span>Code Red</span>
                <span className="text-[10px] text-red-400">Lethal Combat</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Assault initiated. Instant commitment to 360-degree defense, explosive counterstrike, disengagement, and sprint to safety.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Core Defense Pillars */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider">
            Curriculum Pillars
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 text-red-500 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                1. De-escalation & Fence
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Master verbal diffusion commands and non-threatening hand positioning that disguises a hair-trigger defensive strike.
              </p>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 text-red-500 flex items-center justify-center">
                <Hand className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                2. 360-Degree Defense
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Instinctive wedge deflections against circular strikes, blunt clubs, and wild punches with simultaneous counter-impact.
              </p>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 text-red-500 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                3. Choke & Headlock Releases
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Uncompromising releases against front, rear, and wall chokes using anatomical leverage and rapid airway protection.
              </p>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 text-red-500 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                4. Edged Weapon Protocol
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Distance management, recognizing concealed carry indicators, wrist redirection, and disengagement rules.
              </p>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 text-red-500 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                5. Ground Survival & Get-up
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                How to survive if knocked down onto pavement, defend against soccer kicks, and execute a protected tactical stand-up.
              </p>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 text-red-500 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">
                6. Women's Empowerment Tactics
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Specialized defenses against larger assailants, hair pulls, wrist grabs, ground pinning, and vocal alarm commands.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Tactical Scenario Simulator */}
        <div className="p-6 sm:p-8 bg-neutral-900 border border-neutral-800 rounded-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <div className="text-xs text-red-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Tactical Decision Simulator</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Scenario 0{selectedScenarioIndex + 1}: Real-World Threat Assessment
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {scenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenarioIndex(idx);
                    setSelectedAnswer(null);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-semibold ${
                    selectedScenarioIndex === idx
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Scenario {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
            <div className="text-[11px] font-semibold text-amber-500 uppercase tracking-wide">
              Situation Assessment:
            </div>
            <p className="text-sm text-neutral-200 leading-relaxed font-medium">
              {currentScenario.situation}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-400">
              Select your immediate tactical response:
            </div>
            <div className="space-y-2">
              {currentScenario.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-left p-4 rounded-lg border text-xs sm:text-sm transition-all ${
                      isSelected
                        ? opt.isCorrect
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-red-500 bg-red-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-medium">{opt.text}</div>
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-neutral-800 text-xs">
                        <span className={opt.isCorrect ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                          {opt.isCorrect ? '✓ TACTICALLY SOUND: ' : '✗ HIGH RISK: '}
                        </span>
                        <span className="text-neutral-300">{opt.explanation}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div className="text-xs text-neutral-400">
              Approved by CRAVA MAGA Chief Safety Committee
            </div>
            <button
              onClick={handleLaunchKravCourse}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-md shadow-md shadow-red-600/30 flex items-center gap-1.5"
            >
              <span>Watch Full Video Defense Breakdown</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
