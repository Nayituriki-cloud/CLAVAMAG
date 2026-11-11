import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { workoutRoutinesList } from '../data/initialData';
import { WorkoutRoutine } from '../types';
import { Play, Pause, RotateCcw, Flame, Dumbbell, HeartPulse, CheckSquare, Trophy, Volume2 } from 'lucide-react';

export const FitnessSection: React.FC = () => {
  const { lang } = useApp();
  const [selectedRoutine, setSelectedRoutine] = useState<WorkoutRoutine>(workoutRoutinesList[0]);

  // Round Timer State
  const [roundTimeSeconds, setRoundTimeSeconds] = useState(180); // 3 mins
  const [restTimeSeconds, setRestTimeSeconds] = useState(60); // 1 min
  const [totalRounds, setTotalRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isResting, setIsResting] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedRoundsCount, setCompletedRoundsCount] = useState(0);

  // Goal Checklist
  const [goals, setGoals] = useState([
    { id: 'g1', text: '5 Rounds of Shadowboxing (15 min)', done: true },
    { id: 'g2', text: '100 Sprawl Burpees under 10 minutes', done: false },
    { id: 'g3', text: 'Hanging Core Leg Raises (4 x 15)', done: false },
    { id: 'g4', text: 'Post-Combat Hip & Hamstring Flow', done: true },
  ]);

  // Timer Tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Switch state between work and rest
            if (!isResting) {
              if (currentRound >= totalRounds) {
                // Workout Finished!
                setTimerRunning(false);
                setCompletedRoundsCount(c => c + 1);
                return 0;
              }
              setIsResting(true);
              setCompletedRoundsCount(c => c + 1);
              return restTimeSeconds;
            } else {
              setIsResting(false);
              setCurrentRound(r => r + 1);
              return roundTimeSeconds;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, isResting, currentRound, totalRounds, restTimeSeconds, roundTimeSeconds]);

  const resetTimer = () => {
    setTimerRunning(false);
    setIsResting(false);
    setCurrentRound(1);
    setTimeLeft(roundTimeSeconds);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, done: !g.done } : g)));
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            <span>Combat Fitness & Conditioning</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            {lang === 'rw' ? 'Imyitozo Ngororangingo y’Abarwanyi' : lang === 'fr' ? 'Condition Physique & Préparation Athlétique' : 'Combat Conditioning & Athletic Power'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            Engineered specifically for martial artists: explosive rotational power, neck injury defense, high-aerobic lactate endurance, and rapid recovery.
          </p>
        </div>

        {/* Top Interactive Champion Round Timer */}
        <div className="p-6 sm:p-8 bg-neutral-900 border border-neutral-800 rounded-xl relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Timer Display */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center text-center p-6 bg-neutral-950 rounded-xl border border-neutral-800">
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isResting ? 'bg-amber-500' : 'bg-red-600'}`} />
                <span className={isResting ? 'text-amber-400' : 'text-red-500'}>
                  {isResting ? 'REST INTERVAL' : `ROUND ${currentRound} OF ${totalRounds}`}
                </span>
              </div>

              {/* Large Clock Display */}
              <div className="font-display text-6xl sm:text-7xl font-extrabold text-white tabular-nums tracking-tighter my-2">
                {formatTime(timeLeft)}
              </div>

              <div className="text-xs text-neutral-400 flex items-center gap-4 mt-2">
                <span>Rounds: <strong className="text-white">{currentRound}/{totalRounds}</strong></span>
                <span>·</span>
                <span>Est. Burn: <strong className="text-red-400">{completedRoundsCount * 75} kcal</strong></span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                    timerRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                  }`}
                >
                  {timerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{timerRunning ? 'Pause Round' : 'Start Round'}</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="p-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Timer Settings & Quick Presets */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="font-bold text-white text-base">Combat Round Presets</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Choose an official match standard or customize interval lengths.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <button
                  onClick={() => {
                    setRoundTimeSeconds(180);
                    setRestTimeSeconds(60);
                    setTotalRounds(5);
                    resetTimer();
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    roundTimeSeconds === 180 && totalRounds === 5
                      ? 'border-red-500 bg-red-950/20 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-neutral-200">Boxing Standard</div>
                  <div className="text-[11px] text-neutral-500">5 x 3 min · 60s rest</div>
                </button>

                <button
                  onClick={() => {
                    setRoundTimeSeconds(300);
                    setRestTimeSeconds(60);
                    setTotalRounds(3);
                    resetTimer();
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    roundTimeSeconds === 300
                      ? 'border-red-500 bg-red-950/20 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-neutral-200">MMA Championship</div>
                  <div className="text-[11px] text-neutral-500">3 x 5 min · 60s rest</div>
                </button>

                <button
                  onClick={() => {
                    setRoundTimeSeconds(45);
                    setRestTimeSeconds(15);
                    setTotalRounds(8);
                    resetTimer();
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    roundTimeSeconds === 45
                      ? 'border-red-500 bg-red-950/20 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-neutral-200">Tabata Burst</div>
                  <div className="text-[11px] text-neutral-500">8 x 45s · 15s rest</div>
                </button>
              </div>

              {/* Goal Checklist */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                  <span>Daily Fighter Goals</span>
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="space-y-2">
                  {goals.map(g => (
                    <button
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className="w-full flex items-center gap-2.5 text-xs text-left text-neutral-300 hover:text-white"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${g.done ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-700'}`}>
                        {g.done && <span className="text-[10px]">✓</span>}
                      </div>
                      <span className={g.done ? 'line-through text-neutral-500' : ''}>{g.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Routines Catalog */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              Structured Combat Workouts
            </h3>
            <div className="flex gap-2">
              {workoutRoutinesList.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoutine(r)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold ${
                    selectedRoutine.id === r.id
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {r.title}
                </button>
              ))}
            </div>
          </div>

          {/* Routine Exercises Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
                  Focus: {selectedRoutine.focus} · Intensity: {selectedRoutine.intensity}
                </div>
                <h4 className="text-lg font-bold text-white mt-0.5">{selectedRoutine.title}</h4>
              </div>
              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="tabular-nums font-bold text-white">~{selectedRoutine.caloriesBurnedEstimate}</span> kcal
                </span>
                <span>·</span>
                <span className="tabular-nums font-bold text-white">{selectedRoutine.durationMinutes}</span> minutes
              </div>
            </div>

            <div className="divide-y divide-neutral-800">
              {selectedRoutine.exercises.map((ex, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-800/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-neutral-500 text-xs">0{idx + 1}</span>
                      <span className="font-bold text-white text-sm">{ex.name}</span>
                    </div>
                    <p className="text-xs text-neutral-400 pl-7">{ex.notes}</p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-neutral-300 shrink-0 pl-7 sm:pl-0">
                    <div>
                      <span className="text-neutral-500 text-[10px] block">Sets:</span>
                      <span className="font-bold text-white tabular-nums">{ex.sets} sets</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block">Target:</span>
                      <span className="font-bold text-white tabular-nums">{ex.repsOrSeconds}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px] block">Rest:</span>
                      <span className="font-bold text-white tabular-nums">{ex.restSeconds}s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
