import React from 'react';
import { Users, BookOpen, TrendingUp, Calendar, Plus, BarChart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Teacher } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BadgeComponent } from '../ui/Badge';

const mockRecentActivity = [
  { id: '1', student: 'Alex Chen', action: 'Completed "Algebra Master Challenge"', time: '2 hours ago' },
  { id: '2', student: 'Maya Patel', action: 'Started "Chemistry Lab Adventure"', time: '4 hours ago' },
  { id: '3', student: 'Sam Johnson', action: 'Earned "Speed Runner" badge', time: '1 day ago' }
];

const mockAssignments = [
  { id: '1', title: 'Quadratic Equations Quest', students: 24, completed: 18, dueDate: '2024-12-20' },
  { id: '2', title: 'Periodic Table Adventure', students: 32, completed: 12, dueDate: '2024-12-22' }
];

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const teacher = user as Teacher;

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {teacher.name}
            </span>!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{teacher.subject} • {teacher.school}</p>
        </div>
        <Button icon={Plus} variant="primary">
          Create Assignment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{teacher.studentsCount}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Active Assignments</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Avg. Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">87%</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">This Week's XP</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">15.2K</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <BarChart className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Assignments */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Active Assignments
            </h2>
            <div className="space-y-4">
              {mockAssignments.map(assignment => (
                <Card key={assignment.id} className="p-4 border border-gray-100" hover>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{assignment.title}</h3>
                    <BadgeComponent variant="primary">
                      {Math.round((assignment.completed / assignment.students) * 100)}% Complete
                    </BadgeComponent>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Students:</span> {assignment.students}
                    </div>
                    <div>
                      <span className="font-medium">Completed:</span> {assignment.completed}
                    </div>
                    <div>
                      <span className="font-medium">Due:</span> {assignment.dueDate}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                      Edit Assignment
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-green-600" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {mockRecentActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {activity.student.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{activity.student}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.action}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline" icon={Plus}>
                Create New Quest
              </Button>
              <Button className="w-full justify-start" variant="outline" icon={Users}>
                Manage Students
              </Button>
              <Button className="w-full justify-start" variant="outline" icon={BarChart}>
                View Analytics
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};