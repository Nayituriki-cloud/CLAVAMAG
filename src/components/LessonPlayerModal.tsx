import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Lesson } from '../types';
import { X, Play, Pause, CheckCircle2, AlertTriangle, BookOpen, Clock, ShieldCheck, Award } from 'lucide-react';

export const LessonPlayerModal: React.FC = () => {
  const { activeLessonModal, closeLesson, user, completeLesson, openCertificate } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'drill' | 'safety' | 'syllabus'>('drill');
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!activeLessonModal) return null;
  const { course, lesson } = activeLessonModal;
  const isCompleted = user.completedLessonIds.includes(lesson.id);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleMarkComplete = () => {
    completeLesson(lesson.id, course.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-auto text-neutral-100">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div>
            <div className="text-xs text-red-500 font-bold uppercase tracking-wider flex items-center gap-2">
              <span>{course.title}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">Lesson {course.lessons.findIndex(l => l.id === lesson.id) + 1} of {course.lessons.length}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">{lesson.title}</h2>
          </div>
          <button
            onClick={closeLesson}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Section */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={lesson.videoUrl}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls
          />

          {/* Quick overlay speed toggle */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-neutral-950/80 backdrop-blur-sm px-2 py-1 rounded text-xs border border-neutral-800">
            <span className="text-neutral-400">Speed:</span>
            {[1, 1.25, 1.5].map(s => (
              <button
                key={s}
                onClick={() => changeSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[11px] ${
                  playbackSpeed === s ? 'bg-red-600 text-white font-bold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Lesson Details & Interactive Tabs */}
        <div className="p-6 space-y-6">
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-500" />
                <span>{lesson.durationMinutes} Minutes Breakdown</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Instructor Verified Standard</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkComplete}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/40'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Completed (Click to Re-mark)' : 'Mark Lesson as Mastered'}</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
            <button
              onClick={() => setActiveTab('drill')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'drill' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Drill Breakdown & Mechanics
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'safety' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Safety Precautions
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'syllabus' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Course Syllabus ({course.lessons.length} Lessons)
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'drill' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {lesson.summary}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Key Technique checkpoints:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {lesson.keyTechniques.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-200"
                    >
                      <div className="text-red-500 font-bold mb-1">Step 0{idx + 1}</div>
                      <div>{tech}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-lg">
                <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mat Practice Instructions</span>
                </div>
                <div className="text-xs text-neutral-300 leading-relaxed">
                  {lesson.drillInstructions}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-950/30 border border-amber-900/40 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Safe Training Protocol & Injury Prevention
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    CRAVA MAGA teaches devastating techniques for real danger; training in the academy must always prioritize your training partner’s safety and longevity.
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-neutral-300">
                {lesson.safetyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {course.lessons.map((l, idx) => {
                const done = user.completedLessonIds.includes(l.id);
                const isCurrent = l.id === lesson.id;
                return (
                  <div
                    key={l.id}
                    onClick={() => {
                      // Switch to selected lesson
                      useApp; // trigger parent
                    }}
                    className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                      isCurrent
                        ? 'bg-neutral-800 border-red-500/50 text-white'
                        : 'bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-neutral-500">0{idx + 1}</span>
                      <span className="font-medium">{l.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{l.durationMinutes} min</span>
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-neutral-700" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
