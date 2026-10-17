export type ScreenType = 'dashboard' | 'planner' | 'quiz' | 'stats' | 'more' | 'syllabus' | 'landing';

export interface TaskItem {
  id: string;
  title: string;
  duration: number; // in minutes
  completed: boolean;
  subject: string;
  priority: 'P1' | 'P2' | 'P3' | 'URGENT';
  dueText?: string;
  scheduledText?: string;
  xpReward: number;
}

export interface PlannerScheduleItem {
  id: string;
  timeRange: string;
  durationMin: number;
  type: 'work' | 'break';
  category: string; // "Deep Work", "Focused Study", "Active Recall", "Light Revision", "Pomodoro AI Brain Break", "Walk & Hydration Break"
  title: string;
  subtitle?: string;
  subjectTag?: string;
  priorityTag?: string;
  completed: boolean;
  inProgress?: boolean;
}

export interface SyllabusTopic {
  id: string;
  unitNumber: string;
  title: string;
  description: string;
  difficulty: 'Hard' | 'Medium' | 'Easy' | 'Custom';
  estHours: number;
}

export interface QuizQuestion {
  id: string;
  category: string;
  subCategory: string;
  difficulty: 'easy' | 'med' | 'hard';
  question: string;
  referenceTrace?: string[];
  options: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
  explanation: string;
  hint: string;
  framesTrace?: { label: string; val: string }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'urgent' | 'info' | 'streak' | 'ai';
}
