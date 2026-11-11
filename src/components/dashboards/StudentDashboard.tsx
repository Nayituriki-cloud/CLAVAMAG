import React from 'react';
import { useApp } from '../../context/AppContext';
import { Course, Lesson, Certificate } from '../../types';
import { Award, Flame, BookOpen, Clock, Calendar, CheckCircle2, Shield, Play, QrCode } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user, courses, openLesson, openCertificate } = useApp();

  const enrolledCourses = courses.filter((c: Course) => user.enrolledCourseIds.includes(c.id));

  return (
    <div className="space-y-8">
      {/* Top Profile & Membership Banner */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-red-600 shadow-md"
          />
          <div>
            <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
              Student Martial Artist
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <div className="text-xs text-neutral-400 mt-0.5">
              {user.city}, {user.country} · Discipline: <span className="text-neutral-200 capitalize">{user.selectedDiscipline}</span>
            </div>
          </div>
        </div>

        {/* Digital Membership Pass Card */}
        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center gap-4 w-full md:w-auto">
          <div className="w-12 h-12 bg-white rounded p-1 flex items-center justify-center shrink-0">
            <QrCode className="w-10 h-10 text-neutral-900" />
          </div>
          <div className="text-xs">
            <div className="text-neutral-400 text-[10px] uppercase font-bold">Mat Access Pass</div>
            <div className="font-bold text-red-500 text-sm">{user.membershipPlan}</div>
            <div className="text-neutral-500 text-[11px]">Valid through: {user.membershipExpires}</div>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Training Streak</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{user.trainingStreakDays} Days</span>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Mat Practice Time</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{user.totalTrainingMinutes} min</span>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Techniques Mastered</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{user.completedLessonIds.length} drills</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Official Certificates</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{user.certificates.length} credentials</span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
          My Active Training Programs
        </h3>

        {enrolledCourses.length === 0 ? (
          <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-xl text-center text-xs text-neutral-400">
            No courses enrolled yet. Head over to the Academy to enroll in your first program.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map((course: Course) => {
              const completedCount = course.lessons.filter((l: Lesson) => user.completedLessonIds.includes(l.id)).length;
              const percent = Math.round((completedCount / course.lessons.length) * 100);
              const nextLesson = course.lessons.find((l: Lesson) => !user.completedLessonIds.includes(l.id)) || course.lessons[0];

              return (
                <div key={course.id} className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-red-500 font-bold uppercase">{course.discipline} · {course.level}</div>
                      <h4 className="font-bold text-white text-base mt-0.5">{course.title}</h4>
                      <div className="text-xs text-neutral-400 mt-1">Instructor: {course.instructorName}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>Curriculum Completion:</span>
                      <span className="font-bold text-emerald-400 tabular-nums">{completedCount} of {course.lessons.length} ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => openLesson(course, nextLesson)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-md shadow-md shadow-red-600/30 flex items-center gap-1.5 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Continue: {nextLesson.title}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booked In-Person Dojo Sessions */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
          Upcoming In-Person Dojo Classes
        </h3>

        {user.bookedClasses.length === 0 ? (
          <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-xl text-center text-xs text-neutral-400">
            No gym classes booked. Explore our partner dojos in Kigali or internationally to reserve your spot on the tatami.
          </div>
        ) : (
          <div className="divide-y divide-neutral-800 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
            {user.bookedClasses.map((booking: any) => (
              <div key={booking.id} className="p-4 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">{booking.className}</div>
                  <div className="text-neutral-400 flex items-center gap-2">
                    <span>{booking.gymName}</span>
                    <span>·</span>
                    <span className="text-red-400 font-semibold">{booking.date} at {booking.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 rounded text-[11px] font-bold">
                    Reserved
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificates Awarded */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
          Official Verifiable Credentials
        </h3>

        {user.certificates.length === 0 ? (
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-400">
            Complete all lessons in any course to earn your verified CRAVA MAGA International Certificate.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.certificates.map((cert: Certificate) => (
              <div
                key={cert.id}
                className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="text-[11px] text-amber-500 font-bold uppercase">{cert.discipline} · {cert.grade}</div>
                  <h4 className="font-bold text-white text-sm">{cert.courseTitle}</h4>
                  <div className="text-[11px] text-neutral-500 font-mono">{cert.certificateCode} · Issued {cert.issueDate}</div>
                </div>
                <button
                  onClick={() => openCertificate(cert)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
