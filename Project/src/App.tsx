import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginForm } from './components/auth/LoginForm';
import { Navigation } from './components/layout/Navigation';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { QuestList } from './components/student/QuestList';
import { AssignmentCreator } from './components/teacher/AssignmentCreator';
import { Settings } from './components/settings/Settings';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return user?.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />;
      case 'quests':
        return user?.role === 'student' ? <QuestList /> : <AssignmentCreator />;
      case 'assignments':
        return <AssignmentCreator />;
      case 'leaderboard':
      case 'students':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {user?.role === 'student' ? 'Leaderboard' : 'Students'}
            </h1>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Coming soon! This feature is under development.</p>
            </div>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return user?.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-64 flex-shrink-0">
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="min-h-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 -left-20 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          </div>
          <div className="relative z-10">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;