import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Teacher } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@student.edu',
    role: 'student',
    level: 12,
    xp: 2340,
    totalXp: 8760,
    badges: [
      { id: '1', name: 'First Quest', description: 'Completed your first quest', icon: '⭐', rarity: 'common' },
      { id: '2', name: 'Speed Runner', description: 'Completed 5 quests in one day', icon: '⚡', rarity: 'rare' }
    ],
    completedQuests: 47,
    currentStreak: 12
  }
];

const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@teacher.edu',
    role: 'teacher',
    school: 'Quest Academy',
    subject: 'Mathematics',
    studentsCount: 124
  }
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'student' | 'teacher') => {
    // Mock login logic
    if (role === 'student') {
      const student = mockStudents.find(s => s.email === email);
      if (student) {
        setUser(student);
      }
    } else {
      const teacher = mockTeachers.find(t => t.email === email);
      if (teacher) {
        setUser(teacher);
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};