export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  avatar?: string;
  institution?: string;
  grade?: string;
  year?: string;
  semester?: string;
  studentId?: string;
  idCardVerified?: boolean;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface Student extends User {
  level: number;
  xp: number;
  totalXp: number;
  badges: Badge[];
  completedQuests: number;
  currentStreak: number;
}

export interface Teacher extends User {
  school: string;
  subject: string;
  studentsCount: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  xpReward: number;
  subject: string;
  category: string;
  dueDate: string;
  isCompleted: boolean;
  completionRate?: number;
  createdBy: string;
  isGameified?: boolean;
  gameContext?: {
    type: 'sports' | 'digital' | 'adventure' | 'puzzle';
    theme: string;
    scenario: string;
  };
  tasks: QuestTask[];
  maxScore: number;
  timeLimit?: number;
  resources?: string[];
}

export interface QuestTask {
  id: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'file-upload' | 'code';
  points: number;
  options?: string[];
  correctAnswer?: string | number;
}

export interface QuestSubmission {
  id: string;
  questId: string;
  studentId: string;
  answers: { [taskId: string]: any };
  score?: number;
  submittedAt: string;
  feedback?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  level: number;
  badge?: Badge;
  avatar?: string;
}