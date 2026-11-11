export type DisciplineId =
  | 'krav-maga'
  | 'boxing'
  | 'kickboxing'
  | 'muay-thai'
  | 'bjj'
  | 'karate'
  | 'taekwondo'
  | 'judo'
  | 'wrestling'
  | 'mma'
  | 'fitness'
  | 'self-defense';

export type UserRole = 'student' | 'instructor' | 'gym_owner' | 'admin';

export type LanguageCode = 'en' | 'fr' | 'rw';

export type Currency = 'RWF' | 'USD' | 'EUR';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string; // standard MP4 / stream preview
  summary: string;
  keyTechniques: string[];
  safetyTips: string[];
  drillInstructions: string;
}

export interface Course {
  id: string;
  title: string;
  discipline: DisciplineId;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  durationHours: number;
  lessonsCount: number;
  priceRwf: number;
  priceUsd: number;
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  lessons: Lesson[];
  featured?: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  disciplines: DisciplineId[];
  experienceYears: number;
  rank: string;
  country: string;
  city: string;
  bio: string;
  avatar: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  verified: boolean;
  hourlyRateRwf: number;
  hourlyRateUsd: number;
}

export interface GymLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  image: string;
  disciplines: DisciplineId[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  headCoach: string;
  monthlyFeeRwf: number;
  monthlyFeeUsd: number;
  schedule: {
    day: string;
    classes: { time: string; name: string; instructor: string; discipline: DisciplineId }[];
  }[];
}

export interface Competition {
  id: string;
  title: string;
  discipline: DisciplineId;
  date: string;
  time: string;
  location: string;
  city: string;
  image: string;
  divisions: string[];
  registrationFeeRwf: number;
  registrationFeeUsd: number;
  spectatorTicketRwf: number;
  spectatorTicketUsd: number;
  registeredFighters: number;
  maxFighters: number;
  status: 'Open' | 'Filling Fast' | 'Sold Out';
  description: string;
  rulesHighlight: string[];
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  focus: 'Conditioning' | 'Strength' | 'Endurance' | 'Flexibility' | 'Recovery';
  durationMinutes: number;
  intensity: 'Medium' | 'High' | 'Extreme';
  caloriesBurnedEstimate: number;
  exercises: {
    name: string;
    sets: number;
    repsOrSeconds: string;
    restSeconds: number;
    notes: string;
  }[];
}

export interface Certificate {
  id: string;
  studentName: string;
  courseTitle: string;
  discipline: string;
  instructorName: string;
  issueDate: string;
  certificateCode: string;
  grade: 'Passed with Distinction' | 'Certified Practitioner';
}

export interface PaymentTransaction {
  id: string;
  date: string;
  userName: string;
  userEmail: string;
  description: string;
  amount: number;
  currency: Currency;
  paymentMethod: 'MTN Mobile Money' | 'Airtel Money' | 'Visa / Mastercard' | 'Bank Transfer';
  status: 'Completed' | 'Pending' | 'Refunded';
  referenceCode: string;
  itemType: 'course' | 'membership' | 'coaching' | 'competition';
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  timestamp: string;
  content: string;
  disciplineTag: DisciplineId;
  likes: number;
  commentsCount: number;
  pinned?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  city: string;
  country: string;
  avatar: string;
  selectedDiscipline: DisciplineId;
  membershipPlan: 'Free' | 'Pro Warrior' | 'Elite Black Belt';
  membershipExpires: string;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookedClasses: {
    id: string;
    gymName: string;
    className: string;
    date: string;
    time: string;
  }[];
  certificates: Certificate[];
  trainingStreakDays: number;
  totalTrainingMinutes: number;
}
