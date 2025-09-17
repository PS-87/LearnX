import React, { useState } from 'react';
import { Plus, Save, Gamepad2, Clock, Trophy, Target, BookOpen, Calculator, Atom, Globe, Palette, Music, Code, Zap, Users, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BadgeComponent } from '../ui/Badge';

interface QuestTask {
  id: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'file-upload' | 'code';
  points: number;
  options?: string[];
  correctAnswer?: string | number;
}

interface GameContext {
  type: 'sports' | 'digital' | 'adventure' | 'puzzle';
  theme: string;
  scenario: string;
}

const subjectCategories = {
  'Mathematics': ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
  'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'],
  'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics', 'Optics'],
  'History': ['Ancient History', 'Medieval History', 'Modern History', 'World Wars', 'Cultural History'],
  'English Literature': ['Classic Literature', 'Modern Literature', 'Poetry', 'Drama', 'Creative Writing'],
  'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Web Development', 'Database Design'],
  'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Human Anatomy', 'Evolution'],
  'Art': ['Drawing', 'Painting', 'Sculpture', 'Digital Art', 'Art History']
};

const gameThemes = {
  sports: [
    { theme: 'Football Championship', scenario: 'Lead your team to victory by solving challenges on the field!' },
    { theme: 'Olympic Games', scenario: 'Compete in various events where knowledge is your strength!' },
    { theme: 'Racing Championship', scenario: 'Speed through the track by answering questions correctly!' }
  ],
  digital: [
    { theme: 'RPG Adventure', scenario: 'Embark on an epic quest where knowledge unlocks new abilities!' },
    { theme: 'Strategy Game', scenario: 'Build your empire by making smart, knowledge-based decisions!' },
    { theme: 'Puzzle Platformer', scenario: 'Navigate through levels by solving educational puzzles!' }
  ],
  adventure: [
    { theme: 'Treasure Hunt', scenario: 'Follow clues and solve riddles to find the hidden treasure!' },
    { theme: 'Escape Room', scenario: 'Use your knowledge to solve puzzles and escape before time runs out!' },
    { theme: 'Space Exploration', scenario: 'Navigate through space by solving scientific challenges!' }
  ],
  puzzle: [
    { theme: 'Mystery Detective', scenario: 'Solve the case by gathering clues through correct answers!' },
    { theme: 'Brain Teaser Challenge', scenario: 'Test your mental agility with mind-bending puzzles!' },
    { theme: 'Logic Maze', scenario: 'Find your way through the maze using logical reasoning!' }
  ]
};

const subjectIcons = {
  'Mathematics': Calculator,
  'Chemistry': Atom,
  'Physics': Zap,
  'History': Globe,
  'English Literature': BookOpen,
  'Computer Science': Code,
  'Biology': Target,
  'Art': Palette,
  'Music': Music
};

export const AssignmentCreator: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    category: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard' | 'epic',
    xpReward: 100,
    maxScore: 100,
    dueDate: '',
    timeLimit: 60,
    isGameified: false
  });

  const [gameContext, setGameContext] = useState<GameContext>({
    type: 'adventure',
    theme: '',
    scenario: ''
  });

  const [tasks, setTasks] = useState<QuestTask[]>([]);
  const [currentTask, setCurrentTask] = useState<Partial<QuestTask>>({
    title: '',
    description: '',
    type: 'multiple-choice',
    points: 10,
    options: ['', '', '', '']
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGameContextChange = (field: keyof GameContext, value: string) => {
    setGameContext(prev => ({ ...prev, [field]: value }));
  };

  const addTask = () => {
    if (currentTask.title && currentTask.description) {
      const newTask: QuestTask = {
        id: Date.now().toString(),
        title: currentTask.title!,
        description: currentTask.description!,
        type: currentTask.type!,
        points: currentTask.points!,
        options: currentTask.options,
        correctAnswer: currentTask.correctAnswer
      };
      setTasks(prev => [...prev, newTask]);
      setCurrentTask({
        title: '',
        description: '',
        type: 'multiple-choice',
        points: 10,
        options: ['', '', '', '']
      });
    }
  };

  const removeTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const saveAssignment = () => {
    const assignment = {
      ...formData,
      gameContext: formData.isGameified ? gameContext : undefined,
      tasks,
      createdAt: new Date().toISOString()
    };
    console.log('Saving assignment:', assignment);
    // In a real app, this would save to backend
  };

  const categories = formData.subject ? subjectCategories[formData.subject as keyof typeof subjectCategories] || [] : [];
  const themes = gameContext.type ? gameThemes[gameContext.type] || [] : [];
  const SubjectIcon = formData.subject ? subjectIcons[formData.subject as keyof typeof subjectIcons] : BookOpen;

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Target className="w-10 h-10 text-purple-600" />
          Create Epic Quest
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Design engaging assignments that inspire learning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quest Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter an exciting quest title..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the quest adventure..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Subject</option>
                    {Object.keys(subjectCategories).map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    disabled={!formData.subject}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="epic">Epic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">XP Reward</label>
                  <input
                    type="number"
                    value={formData.xpReward}
                    onChange={(e) => handleInputChange('xpReward', parseInt(e.target.value))}
                    min="50"
                    max="1000"
                    step="50"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Limit (min)</label>
                  <input
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
                    min="15"
                    max="180"
                    step="15"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </Card>

          {/* Gamification Settings */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-purple-600" />
                Gamification Settings
              </h2>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isGameified}
                  onChange={(e) => handleInputChange('isGameified', e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Gamification</span>
              </label>
            </div>

            {formData.isGameified && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Game Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(gameThemes).map(type => (
                      <button
                        key={type}
                        onClick={() => handleGameContextChange('type', type as any)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 capitalize ${
                          gameContext.type === type
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                  <select
                    value={gameContext.theme}
                    onChange={(e) => {
                      const selectedTheme = themes.find(t => t.theme === e.target.value);
                      handleGameContextChange('theme', e.target.value);
                      if (selectedTheme) {
                        handleGameContextChange('scenario', selectedTheme.scenario);
                      }
                    }}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Theme</option>
                    {themes.map(theme => (
                      <option key={theme.theme} value={theme.theme}>{theme.theme}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scenario Description</label>
                  <textarea
                    value={gameContext.scenario}
                    onChange={(e) => handleGameContextChange('scenario', e.target.value)}
                    placeholder="Describe the game scenario..."
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Task Creation */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Plus className="w-6 h-6 text-green-600" />
              Add Quest Tasks
            </h2>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={currentTask.title || ''}
                    onChange={(e) => setCurrentTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task Type</label>
                  <select
                    value={currentTask.type || 'multiple-choice'}
                    onChange={(e) => setCurrentTask(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="short-answer">Short Answer</option>
                    <option value="essay">Essay</option>
                    <option value="file-upload">File Upload</option>
                    <option value="code">Code</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task Description</label>
                <textarea
                  value={currentTask.description || ''}
                  onChange={(e) => setCurrentTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter task description..."
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {currentTask.type === 'multiple-choice' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options</label>
                  <div className="space-y-2">
                    {(currentTask.options || ['', '', '', '']).map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(currentTask.options || ['', '', '', ''])];
                          newOptions[index] = e.target.value;
                          setCurrentTask(prev => ({ ...prev, options: newOptions }));
                        }}
                        placeholder={`Option ${index + 1}`}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Points</label>
                  <input
                    type="number"
                    value={currentTask.points || 10}
                    onChange={(e) => setCurrentTask(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addTask} icon={Plus}>
                    Add Task
                  </Button>
                </div>
              </div>
            </div>

            {/* Task List */}
            {tasks.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">Quest Tasks ({tasks.length})</h3>
                {tasks.map((task, index) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{index + 1}. {task.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{task.type} • {task.points} points</p>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-600" />
              Quest Preview
            </h2>

            {formData.title ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <SubjectIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{formData.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formData.subject} • {formData.category}</p>
                  </div>
                </div>

                {formData.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{formData.description}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  <BadgeComponent variant="primary" className="capitalize">
                    {formData.difficulty}
                  </BadgeComponent>
                  {formData.isGameified && (
                    <BadgeComponent variant="secondary" className="flex items-center gap-1">
                      <Gamepad2 size={12} />
                      Gamified
                    </BadgeComponent>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">XP Reward:</span>
                    <span className="font-medium text-purple-600">{formData.xpReward}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Time Limit:</span>
                    <span className="font-medium">{formData.timeLimit} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                    <span className="font-medium">{tasks.length}</span>
                  </div>
                </div>

                {formData.isGameified && gameContext.scenario && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      🎮 {gameContext.scenario}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Fill in the quest details to see preview
              </p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Users size={16} />
                  Estimated Time
                </span>
                <span className="font-medium">{formData.timeLimit} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Target size={16} />
                  Total Points
                </span>
                <span className="font-medium">{tasks.reduce((sum, task) => sum + task.points, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Calendar size={16} />
                  Due Date
                </span>
                <span className="font-medium">{formData.dueDate || 'Not set'}</span>
              </div>
            </div>
          </Card>

          <Button onClick={saveAssignment} className="w-full" icon={Save}>
            Create Quest
          </Button>
        </div>
      </div>
    </div>
  );
};