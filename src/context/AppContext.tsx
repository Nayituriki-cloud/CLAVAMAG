import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  LanguageCode,
  Currency,
  Course,
  Lesson,
  GymLocation,
  Competition,
  PaymentTransaction,
  CommunityPost,
  Certificate,
  DisciplineId,
} from '../types';
import {
  coursesList as initialCourses,
  gymsList as initialGyms,
  competitionsList as initialCompetitions,
  initialUserProfile,
  initialPaymentsLedger,
  initialCommunityPosts,
} from '../data/initialData';
import { translations } from '../data/translations';

interface PaymentPromptData {
  itemType: 'course' | 'membership' | 'coaching' | 'competition';
  title: string;
  amountRwf: number;
  amountUsd: number;
  onSuccess?: () => void;
}

interface AppContextType {
  user: UserProfile;
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: typeof translations.en;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  courses: Course[];
  gyms: GymLocation[];
  competitions: Competition[];
  payments: PaymentTransaction[];
  posts: CommunityPost[];

  // Active Modals & Flow
  activeLessonModal: { course: Course; lesson: Lesson } | null;
  openLesson: (course: Course, lesson: Lesson) => void;
  closeLesson: () => void;

  activeCertificate: Certificate | null;
  openCertificate: (cert: Certificate) => void;
  closeCertificate: () => void;

  paymentModalData: PaymentPromptData | null;
  openPayment: (data: PaymentPromptData) => void;
  closePayment: () => void;

  // Actions
  enrollInCourse: (courseId: string) => void;
  completeLesson: (lessonId: string, courseId: string) => void;
  bookGymClass: (gymName: string, className: string, date: string, time: string) => void;
  registerForTournament: (competitionId: string, division: string, fighterName: string) => void;
  processPaymentSuccess: (method: 'MTN Mobile Money' | 'Airtel Money' | 'Visa / Mastercard' | 'Bank Transfer', phoneOrCard: string) => void;
  addCourse: (course: Course) => void;
  addCommunityPost: (content: string, disciplineTag: DisciplineId) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cm_user_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [role, setRoleState] = useState<UserRole>('student');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currency, setCurrency] = useState<Currency>('RWF');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [gyms, setGyms] = useState<GymLocation[]>(initialGyms);
  const [competitions, setCompetitions] = useState<Competition[]>(initialCompetitions);
  const [payments, setPayments] = useState<PaymentTransaction[]>(initialPaymentsLedger);
  const [posts, setPosts] = useState<CommunityPost[]>(initialCommunityPosts);

  const [activeLessonModal, setActiveLessonModal] = useState<{ course: Course; lesson: Lesson } | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [paymentModalData, setPaymentModalData] = useState<PaymentPromptData | null>(null);

  useEffect(() => {
    localStorage.setItem('cm_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(prev => ({ ...prev, role: newRole }));
  };

  const t = translations[lang] || translations.en;

  const openLesson = (course: Course, lesson: Lesson) => {
    setActiveLessonModal({ course, lesson });
  };

  const closeLesson = () => {
    setActiveLessonModal(null);
  };

  const openCertificate = (cert: Certificate) => {
    setActiveCertificate(cert);
  };

  const closeCertificate = () => {
    setActiveCertificate(null);
  };

  const openPayment = (data: PaymentPromptData) => {
    setPaymentModalData(data);
  };

  const closePayment = () => {
    setPaymentModalData(null);
  };

  const enrollInCourse = (courseId: string) => {
    if (!user.enrolledCourseIds.includes(courseId)) {
      setUser(prev => ({
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
      }));
    }
  };

  const completeLesson = (lessonId: string, courseId: string) => {
    const targetCourse = courses.find(c => c.id === courseId);
    setUser(prev => {
      const alreadyDone = prev.completedLessonIds.includes(lessonId);
      const updatedLessons = alreadyDone ? prev.completedLessonIds : [...prev.completedLessonIds, lessonId];
      const newMinutes = prev.totalTrainingMinutes + 25;

      // Check if all lessons of this course are complete to award certificate!
      let newCertificates = [...prev.certificates];
      if (targetCourse) {
        const allCourseLessonIds = targetCourse.lessons.map(l => l.id);
        const hasCompletedAll = allCourseLessonIds.every(id => updatedLessons.includes(id));
        const hasCert = newCertificates.some(c => c.courseTitle === targetCourse.title);

        if (hasCompletedAll && !hasCert) {
          const freshCert: Certificate = {
            id: `cert-${Date.now()}`,
            studentName: prev.name,
            courseTitle: targetCourse.title,
            discipline: targetCourse.discipline.toUpperCase(),
            instructorName: targetCourse.instructorName,
            issueDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            certificateCode: `CM-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
            grade: 'Passed with Distinction',
          };
          newCertificates.push(freshCert);
          setTimeout(() => {
            setActiveCertificate(freshCert);
          }, 300);
        }
      }

      return {
        ...prev,
        completedLessonIds: updatedLessons,
        totalTrainingMinutes: newMinutes,
        certificates: newCertificates,
      };
    });
  };

  const bookGymClass = (gymName: string, className: string, date: string, time: string) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      gymName,
      className,
      date,
      time,
    };
    setUser(prev => ({
      ...prev,
      bookedClasses: [newBooking, ...prev.bookedClasses],
    }));
  };

  const registerForTournament = (competitionId: string, division: string, fighterName: string) => {
    setCompetitions(prev =>
      prev.map(c => {
        if (c.id === competitionId) {
          return {
            ...c,
            registeredFighters: Math.min(c.maxFighters, c.registeredFighters + 1),
          };
        }
        return c;
      })
    );
  };

  const processPaymentSuccess = (
    method: 'MTN Mobile Money' | 'Airtel Money' | 'Visa / Mastercard' | 'Bank Transfer',
    phoneOrCard: string
  ) => {
    if (!paymentModalData) return;

    const amount = currency === 'RWF' ? paymentModalData.amountRwf : paymentModalData.amountUsd;
    const refCode = `${method.includes('MTN') ? 'MOMO' : method.includes('Airtel') ? 'AIRTEL' : 'GATEWAY'}-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userName: user.name,
      userEmail: user.email,
      description: paymentModalData.title,
      amount,
      currency,
      paymentMethod: method,
      status: 'Completed',
      referenceCode: refCode,
      itemType: paymentModalData.itemType,
    };

    setPayments(prev => [newTx, ...prev]);

    if (paymentModalData.itemType === 'membership') {
      setUser(prev => ({
        ...prev,
        membershipPlan: 'Pro Warrior',
        membershipExpires: '2027-12-31',
      }));
    }

    if (paymentModalData.onSuccess) {
      paymentModalData.onSuccess();
    }

    closePayment();
  };

  const addCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const addCommunityPost = (content: string, disciplineTag: DisciplineId) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      authorRole: role === 'instructor' ? 'Certified Instructor' : role === 'admin' ? 'Head Administrator' : 'Martial Arts Practitioner',
      timestamp: 'Just now',
      content,
      disciplineTag,
      likes: 1,
      commentsCount: 0,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        setRole,
        lang,
        setLang,
        t,
        currency,
        setCurrency,
        theme,
        toggleTheme,
        courses,
        gyms,
        competitions,
        payments,
        posts,
        activeLessonModal,
        openLesson,
        closeLesson,
        activeCertificate,
        openCertificate,
        closeCertificate,
        paymentModalData,
        openPayment,
        closePayment,
        enrollInCourse,
        completeLesson,
        bookGymClass,
        registerForTournament,
        processPaymentSuccess,
        addCourse,
        addCommunityPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
