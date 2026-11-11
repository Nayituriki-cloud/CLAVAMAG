import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, DisciplineId } from '../../types';
import { Plus, Users, Video, Calendar, Award, CheckCircle2, DollarSign, BookOpen, Clock } from 'lucide-react';

export const InstructorDashboard: React.FC = () => {
  const { courses, addCourse, currency } = useApp();
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showCertIssueModal, setShowCertIssueModal] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDiscipline, setNewDiscipline] = useState<DisciplineId>('krav-maga');
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newPriceRwf, setNewPriceRwf] = useState(40000);
  const [newDescription, setNewDescription] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('Lesson 01: Core Mechanics');

  // Issue Cert Form State
  const [certStudentName, setCertStudentName] = useState('Jean-Paul Mugisha');
  const [certCourseTitle, setCertCourseTitle] = useState('Krav Maga Tactical Foundations 101');
  const [certGrade, setCertGrade] = useState<'Passed with Distinction' | 'Certified Practitioner'>('Passed with Distinction');

  // Mock Students Roster
  const [students, setStudents] = useState([
    { id: 'st-1', name: 'Jean-Paul Mugisha', course: 'Krav Maga Foundations', progress: 85, belt: 'Green Belt Candidate', attendance: 'Present' },
    { id: 'st-2', name: 'Nathalie Gasana', course: 'Championship Boxing', progress: 60, belt: 'Amateur Gold', attendance: 'Present' },
    { id: 'st-3', name: 'Eric Rwabukamba', course: 'BJJ Closed Guard Mastery', progress: 100, belt: 'Blue Belt 2 Stripes', attendance: 'Excused' },
    { id: 'st-4', name: 'Claire Mukandori', course: 'Street Self-Defense', progress: 40, belt: 'White Belt Practitioner', attendance: 'Present' },
  ]);

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdCourse: Course = {
      id: `course-custom-${Date.now()}`,
      title: newTitle,
      discipline: newDiscipline,
      level: newLevel,
      instructorId: 'inst-1',
      instructorName: 'Master Erick Reghine',
      instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      coverImage: '/src/assets/images/martial_arts_academy_dojo_1794374657031.jpg',
      rating: 5.0,
      reviewCount: 1,
      durationHours: 4.5,
      lessonsCount: 6,
      priceRwf: Number(newPriceRwf),
      priceUsd: Math.round(Number(newPriceRwf) / 1300),
      description: newDescription || 'Advanced tactical combat curriculum developed for high-stress defense.',
      prerequisites: ['Commitment to discipline', 'Safety gear'],
      learningOutcomes: ['Reaction timing under adrenaline', 'High percentage neutralization techniques'],
      lessons: [
        {
          id: `l-custom-${Date.now()}`,
          title: newLessonTitle,
          durationMinutes: 25,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          summary: 'Introduction to tactical kinetic chain movement and safety margins.',
          keyTechniques: ['Rooted footwork', 'Simultaneous parry and strike'],
          safetyTips: ['Do not lock joints during dynamic partner drills'],
          drillInstructions: '3 rounds of 3 minutes focused on rhythm breaking and angle exits.',
        },
      ],
    };

    addCourse(createdCourse);
    setShowCreateCourseModal(false);
    setActionSuccessMessage(`Course "${newTitle}" created and published to the International Academy!`);
    setTimeout(() => setActionSuccessMessage(null), 5000);
  };

  const handleIssueCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCertIssueModal(false);
    setActionSuccessMessage(`Official Credential issued for ${certStudentName}! Electronic certificate recorded with SHA-256 verification.`);
    setTimeout(() => setActionSuccessMessage(null), 5000);
  };

  const toggleAttendance = (id: string) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, attendance: s.attendance === 'Present' ? 'Absent' : 'Present' } : s))
    );
  };

  return (
    <div className="space-y-8 text-neutral-100">
      {/* Top Banner */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs text-red-500 font-bold uppercase tracking-wider">
            Instructor Command Hub
          </div>
          <h2 className="text-xl font-bold text-white">Master Erick Reghine</h2>
          <div className="text-xs text-neutral-400 mt-0.5">
            Krav Maga Lead Director · Kigali Central Dojo & International Academy
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCertIssueModal(true)}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Issue Belt Certificate</span>
          </button>

          <button
            onClick={() => setShowCreateCourseModal(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-md shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </button>
        </div>
      </div>

      {actionSuccessMessage && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Active Students</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>1,840</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Published Academy Courses</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{courses.length}</span>
            <Video className="w-4 h-4 text-red-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Weekly In-Person Classes</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>14 sessions</span>
            <Calendar className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
          <div className="text-neutral-400 text-xs font-medium">Monthly Royalties & Bookings</div>
          <div className="font-display text-2xl font-bold text-white tabular-nums mt-1 flex items-center gap-2">
            <span>{currency === 'RWF' ? '1,450,000 RWF' : '$1,115 USD'}</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Student Roster & Live Attendance */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-white">
              Student Roster & Mat Attendance
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click attendance badge to toggle check-in for today's session.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Enrolled Program</th>
                <th className="py-3 px-4">Belt / Rank</th>
                <th className="py-3 px-4">Curriculum Progress</th>
                <th className="py-3 px-4 text-right">Today's Mat Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {students.map(st => (
                <tr key={st.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{st.name}</td>
                  <td className="py-3.5 px-4 text-neutral-300">{st.course}</td>
                  <td className="py-3.5 px-4 text-red-400 font-medium">{st.belt}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600 rounded-full" style={{ width: `${st.progress}%` }} />
                      </div>
                      <span className="text-neutral-400 font-mono">{st.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleAttendance(st.id)}
                      className={`px-3 py-1 rounded text-[11px] font-bold transition-colors ${
                        st.attendance === 'Present'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {st.attendance}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create New Course */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-4 text-neutral-100">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-base">Publish New Master Course</h3>
              <button onClick={() => setShowCreateCourseModal(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateCourseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 font-semibold">Course Title:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Tactical Defense Against Multiple Attackers"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 font-semibold">Discipline:</label>
                  <select
                    value={newDiscipline}
                    onChange={e => setNewDiscipline(e.target.value as DisciplineId)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                  >
                    <option value="krav-maga">Krav Maga</option>
                    <option value="bjj">Brazilian Jiu-Jitsu</option>
                    <option value="boxing">Boxing</option>
                    <option value="muay-thai">Muay Thai</option>
                    <option value="self-defense">Street Self-Defense</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Level:</label>
                  <select
                    value={newLevel}
                    onChange={e => setNewLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-300 font-semibold">Price (RWF):</label>
                <input
                  type="number"
                  value={newPriceRwf}
                  onChange={e => setNewPriceRwf(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold">First Lesson Title:</label>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={e => setNewLessonTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold">Curriculum Summary:</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Outline core survival competencies and drills..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-md shadow-red-600/30"
              >
                Publish to Global Academy
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Issue Certificate */}
      {showCertIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-4 text-neutral-100">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-base">Issue Verified Belt Certificate</h3>
              <button onClick={() => setShowCertIssueModal(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleIssueCertSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 font-semibold">Student Name:</label>
                <input
                  type="text"
                  required
                  value={certStudentName}
                  onChange={e => setCertStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold">Course or Examination Level:</label>
                <input
                  type="text"
                  required
                  value={certCourseTitle}
                  onChange={e => setCertCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold">Grade Distinction:</label>
                <select
                  value={certGrade}
                  onChange={e => setCertGrade(e.target.value as any)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded mt-1 text-white"
                >
                  <option value="Passed with Distinction">Passed with Distinction</option>
                  <option value="Certified Practitioner">Certified Practitioner</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
              >
                Confer Official Certificate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
