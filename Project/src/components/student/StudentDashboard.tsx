import React from 'react';
import { Zap, Award, Target, TrendingUp, Star, Flame } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Student, Quest } from '../../types';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { BadgeComponent } from '../ui/Badge';

const mockActiveQuests: Quest[] = [
  {
    id: '1',
    title: 'Algebra Master Challenge',
    description: 'Solve 20 algebraic equations to unlock the ancient mathematical secrets',
    difficulty: 'medium',
    xpReward: 150,
    subject: 'Mathematics',
    dueDate: '2024-12-20',
    isCompleted: false
  },
  {
    id: '2',
    title: 'Chemistry Lab Adventure',
    description: 'Conduct virtual experiments and discover the mysteries of molecular bonds',
    difficulty: 'hard',
    xpReward: 250,
    subject: 'Chemistry',
    dueDate: '2024-12-18',
    isCompleted: false
  }
];

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;

  const nextLevelXP = (student.level + 1) * 750;
  const currentLevelXP = student.level * 750;
  const progressToNextLevel = student.totalXp - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {student.name}
          </span>!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Ready for your next learning adventure?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Level</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{student.level}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total XP</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{student.totalXp.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Quests Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{student.completedQuests}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{student.currentStreak}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
              <Flame className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Level Progress
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Level {student.level}</span>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Level {student.level + 1}</span>
              </div>
              <ProgressBar
                value={progressToNextLevel}
                max={xpNeededForNextLevel}
                color="primary"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {xpNeededForNextLevel - progressToNextLevel} XP needed to reach Level {student.level + 1}
              </p>
            </div>
          </Card>

          {/* Active Quests */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-600" />
              Active Quests
            </h2>
            <div className="space-y-4">
              {mockActiveQuests.map(quest => (
                <Card key={quest.id} className="p-4 border border-gray-100" hover>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{quest.title}</h3>
                    <BadgeComponent 
                      variant={quest.difficulty === 'easy' ? 'success' : quest.difficulty === 'medium' ? 'warning' : 'secondary'}
                    >
                      {quest.difficulty}
                    </BadgeComponent>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{quest.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Due: {quest.dueDate}</span>
                      <span className="flex items-center gap-1 text-sm text-purple-600">
                        <Zap size={16} />
                        {quest.xpReward} XP
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                      Start Quest
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-600" />
              Recent Badges
            </h2>
            <div className="space-y-4">
              {student.badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{badge.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Goals</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Complete 5 Quests</span>
                  <span className="text-gray-700 dark:text-gray-300">3/5</span>
                </div>
                <ProgressBar value={3} max={5} color="success" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Earn 1000 XP</span>
                  <span className="text-gray-700 dark:text-gray-300">750/1000</span>
                </div>
                <ProgressBar value={750} max={1000} color="warning" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};