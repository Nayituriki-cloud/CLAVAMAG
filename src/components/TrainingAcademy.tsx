import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, DisciplineId } from '../types';
import { Play, Star, BookOpen, Clock, CheckCircle2, ShieldCheck, ChevronRight, Lock } from 'lucide-react';

export const TrainingAcademy: React.FC = () => {
  const { courses, user, enrollInCourse, openLesson, openPayment, currency, t, lang } = useApp();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const disciplinesOptions = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'krav-maga', label: 'Krav Maga' },
    { id: 'bjj', label: 'Brazilian Jiu-Jitsu' },
    { id: 'boxing', label: 'Boxing' },
    { id: 'muay-thai', label: 'Muay Thai' },
    { id: 'fitness', label: 'Combat Conditioning' },
    { id: 'self-defense', label: 'Street Self-Defense' },
  ];

  const levelsOptions = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const filteredCourses = courses.filter(course => {
    const matchesDiscipline = selectedDiscipline === 'all' || course.discipline === selectedDiscipline;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiscipline && matchesLevel && matchesSearch;
  });

  const handleCourseAction = (course: Course) => {
    const isEnrolled = user.enrolledCourseIds.includes(course.id);
    if (isEnrolled) {
      // Find first incomplete lesson or first lesson
      const nextLesson = course.lessons.find(l => !user.completedLessonIds.includes(l.id)) || course.lessons[0];
      openLesson(course, nextLesson);
    } else {
      openPayment({
        itemType: 'course',
        title: `Enrollment: ${course.title}`,
        amountRwf: course.priceRwf,
        amountUsd: course.priceUsd,
        onSuccess: () => {
          enrollInCourse(course.id);
          openLesson(course, course.lessons[0]);
        },
      });
    }
  };

  return (
    <div className="py-12 bg-neutral-950 text-neutral-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
            <span>Online Combat Academy</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Master Level Video Curricula</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            {lang === 'rw' ? 'Ishuri Rikuru ry’Amahugurwa' : lang === 'fr' ? 'Académie de Formation en Ligne' : 'Online Training Academy'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            Step-by-step master programs with instructional video breakdowns, live drill tracking, injury prevention protocols, and verified graduation certificates.
          </p>
        </div>

        {/* Filter Controls Bar (Interactive buttons, Anti-slop zero pills) */}
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
          {/* Discipline tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {disciplinesOptions.map(disc => (
              <button
                key={disc.id}
                onClick={() => setSelectedDiscipline(disc.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedDiscipline === disc.id
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                {disc.label}
              </button>
            ))}
          </div>

          {/* Level Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-neutral-800 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-neutral-400 font-medium">Difficulty:</span>
              <div className="flex gap-1">
                {levelsOptions.map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedLevel === lvl
                        ? 'bg-neutral-700 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lvl === 'all' ? 'All' : lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search techniques or master..."
                className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-md text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const isEnrolled = user.enrolledCourseIds.includes(course.id);
            const completedCount = course.lessons.filter(l => user.completedLessonIds.includes(l.id)).length;
            const progressPercent = Math.round((completedCount / course.lessons.length) * 100);

            return (
              <div
                key={course.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col group hover:border-neutral-700 transition-all shadow-lg"
              >
                {/* Course Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />

                  {/* Level & Discipline kicker on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-semibold text-white bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-neutral-800">
                    <span className="uppercase text-red-500 font-bold">{course.discipline}</span>
                    <span>·</span>
                    <span>{course.level}</span>
                  </div>

                  {isEnrolled && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-neutral-950/80 backdrop-blur-sm px-2 py-1 rounded border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enrolled</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Metadata line (Unboxed) */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{course.rating}</span>
                      </span>
                      <span>·</span>
                      <span>{course.lessonsCount} lessons</span>
                      <span>·</span>
                      <span>{course.durationHours} hrs</span>
                    </div>

                    <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Instructor line */}
                  <div className="flex items-center gap-3 pt-3 border-t border-neutral-800/80">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-neutral-700"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-neutral-200">{course.instructorName}</div>
                      <div className="text-neutral-500 text-[10px]">Senior Federation Master</div>
                    </div>
                  </div>

                  {/* Progress or Pricing Footer */}
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div>
                      {isEnrolled ? (
                        <div className="text-xs">
                          <div className="text-neutral-400 text-[10px]">Progress:</div>
                          <div className="font-semibold text-emerald-400 tabular-nums">
                            {completedCount} / {course.lessons.length} Lessons ({progressPercent}%)
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-[10px] text-neutral-400">One-Time Lifetime Access:</div>
                          <div className="font-display text-lg font-bold text-white tabular-nums">
                            {currency === 'RWF'
                              ? `${course.priceRwf.toLocaleString()} RWF`
                              : `$${course.priceUsd} USD`}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleCourseAction(course)}
                      className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isEnrolled
                          ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isEnrolled ? 'Resume' : 'Enroll Now'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
