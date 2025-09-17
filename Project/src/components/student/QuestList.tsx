import React, { useState } from 'react';
import { Sword, Trophy, Clock, Users, Zap, Play, BookOpen, Calculator, Atom, Globe, Palette, Music, Code, Gamepad2 } from 'lucide-react';
import { Quest } from '../../types';
import { Card } from '../ui/Card';
import { BadgeComponent } from '../ui/Badge';
import { Button } from '../ui/Button';

const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'The Great Algebra Tournament',
    description: 'Join the mathematical championship where you solve equations to defeat opponents in epic duels!',
    difficulty: 'medium',
    xpReward: 250,
    subject: 'Mathematics',
    category: 'Algebra',
    dueDate: '2024-12-25',
    isCompleted: false,
    createdBy: 'Dr. Sarah Johnson',
    isGameified: true,
    gameContext: {
      type: 'sports',
      theme: 'Tournament Championship',
      scenario: 'You are a gladiator in the Mathematical Colosseum. Each correct equation defeats an opponent!'
    },
    tasks: [
      {
        id: '1',
        title: 'Defeat the Linear Knight',
        description: 'Solve: 3x + 7 = 22',
        type: 'multiple-choice',
        points: 50,
        options: ['x = 5', 'x = 7', 'x = 3', 'x = 9'],
        correctAnswer: 0
      }
    ],
    maxScore: 100,
    timeLimit: 45,
    resources: ['Algebra Formula Sheet', 'Calculator']
  },
  {
    id: '2',
    title: 'Chemistry Lab Escape Room',
    description: 'You are trapped in a virtual lab! Use chemical reactions to unlock doors and escape before time runs out.',
    difficulty: 'hard',
    xpReward: 350,
    subject: 'Chemistry',
    category: 'Chemical Reactions',
    dueDate: '2024-12-28',
    isCompleted: false,
    createdBy: 'Prof. Michael Chen',
    isGameified: true,
    gameContext: {
      type: 'adventure',
      theme: 'Escape Room',
      scenario: 'The lab is in lockdown! Solve chemical puzzles to find the exit codes.'
    },
    tasks: [],
    maxScore: 150,
    timeLimit: 60
  },
  {
    id: '3',
    title: 'World War II Strategy Simulation',
    description: 'Command historical battles and make strategic decisions that shaped the world.',
    difficulty: 'epic',
    xpReward: 500,
    subject: 'History',
    category: 'World Wars',
    dueDate: '2024-12-30',
    isCompleted: false,
    createdBy: 'Dr. Emily Rodriguez',
    isGameified: true,
    gameContext: {
      type: 'digital',
      theme: 'Strategy Game',
      scenario: 'Lead your nation through critical wartime decisions in this historical simulation.'
    },
    tasks: [],
    maxScore: 200,
    timeLimit: 90
  },
  {
    id: '4',
    title: 'Shakespeare\'s Theater Challenge',
    description: 'Direct your own production of Hamlet while analyzing themes and character development.',
    difficulty: 'medium',
    xpReward: 200,
    subject: 'English Literature',
    category: 'Classic Literature',
    dueDate: '2024-12-27',
    isCompleted: true,
    createdBy: 'Ms. Jennifer Adams',
    isGameified: false,
    tasks: [],
    maxScore: 100
  },
  {
    id: '5',
    title: 'Physics Racing Championship',
    description: 'Design the perfect race car using physics principles. Calculate velocity, acceleration, and friction to win!',
    difficulty: 'hard',
    xpReward: 300,
    subject: 'Physics',
    category: 'Mechanics',
    dueDate: '2024-12-26',
    isCompleted: false,
    createdBy: 'Dr. Robert Kim',
    isGameified: true,
    gameContext: {
      type: 'sports',
      theme: 'Racing Championship',
      scenario: 'You are a race engineer. Use physics to optimize your car\'s performance!'
    },
    tasks: [],
    maxScore: 120,
    timeLimit: 75
  }
];

const subjectIcons = {
  'Mathematics': Calculator,
  'Chemistry': Atom,
  'History': Globe,
  'English Literature': BookOpen,
  'Physics': Zap,
  'Art': Palette,
  'Music': Music,
  'Computer Science': Code
};

const difficultyColors = {
  easy: 'success',
  medium: 'warning',
  hard: 'secondary',
  epic: 'primary'
} as const;

export const QuestList: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showGameifiedOnly, setShowGameifiedOnly] = useState(false);

  const subjects = Array.from(new Set(mockQuests.map(q => q.subject)));
  const difficulties = ['easy', 'medium', 'hard', 'epic'];

  const filteredQuests = mockQuests.filter(quest => {
    if (selectedSubject !== 'all' && quest.subject !== selectedSubject) return false;
    if (selectedDifficulty !== 'all' && quest.difficulty !== selectedDifficulty) return false;
    if (showGameifiedOnly && !quest.isGameified) return false;
    return true;
  });

  const startQuest = (questId: string) => {
    console.log('Starting quest:', questId);
    // In a real app, this would navigate to the quest interface
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Sword className="w-10 h-10 text-purple-600" />
          Epic Quests Await
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Choose your adventure and embark on learning journeys</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty} className="capitalize">{difficulty}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showGameifiedOnly}
                onChange={(e) => setShowGameifiedOnly(e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Gamepad2 size={16} />
                Gamified Only
              </span>
            </label>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{filteredQuests.length}</span> quests available
            </div>
          </div>
        </div>
      </Card>

      {/* Quest Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQuests.map(quest => {
          const SubjectIcon = subjectIcons[quest.subject as keyof typeof subjectIcons] || BookOpen;
          
          return (
            <Card key={quest.id} className="p-6 relative overflow-hidden" hover>
              {/* Gamified Badge */}
              {quest.isGameified && (
                <div className="absolute top-4 right-4">
                  <BadgeComponent variant="primary" className="flex items-center gap-1">
                    <Gamepad2 size={14} />
                    Gamified
                  </BadgeComponent>
                </div>
              )}

              {/* Completion Status */}
              {quest.isCompleted && (
                <div className="absolute top-4 left-4">
                  <BadgeComponent variant="success" className="flex items-center gap-1">
                    <Trophy size={14} />
                    Completed
                  </BadgeComponent>
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <SubjectIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{quest.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{quest.description}</p>
                  
                  {quest.isGameified && quest.gameContext && (
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-3 rounded-lg mb-3">
                      <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                        🎮 {quest.gameContext.theme}: {quest.gameContext.scenario}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <BadgeComponent variant={difficultyColors[quest.difficulty]} className="capitalize">
                    {quest.difficulty}
                  </BadgeComponent>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{quest.subject} • {quest.category}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <Zap size={16} />
                  <span className="font-bold">{quest.xpReward} XP</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    Due: {quest.dueDate}
                  </span>
                  {quest.timeLimit && (
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {quest.timeLimit} min
                    </span>
                  )}
                </div>
                <span>Max Score: {quest.maxScore}</span>
              </div>

              <div className="flex gap-3">
                {quest.isCompleted ? (
                  <Button variant="outline" className="flex-1">
                    View Results
                  </Button>
                ) : (
                  <Button 
                    onClick={() => startQuest(quest.id)}
                    className="flex-1"
                    icon={Play}
                  >
                    Start Quest
                  </Button>
                )}
                <Button variant="ghost">
                  Preview
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredQuests.length === 0 && (
        <Card className="p-12 text-center">
          <Sword className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Quests Found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to find more adventures!</p>
        </Card>
      )}
    </div>
  );
};