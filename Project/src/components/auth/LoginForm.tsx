import React, { useState } from 'react';
import { User, Lock, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, role);
  };

  const demoCredentials = {
    student: { email: 'alex@student.edu', password: 'demo123' },
    teacher: { email: 'sarah@teacher.edu', password: 'demo123' }
  };

  const fillDemo = () => {
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8" glass>
          <div className="text-center mb-8">
            <img 
              src="/a-paper-gamepad-logo-with-visible-button_8VJjUbHqSTalfw2Hg4YN4w_CRJ9PcwFRASv8F0rspwg6g.png" 
              alt="LearnX Logo" 
             className="w-24 h-24 mx-auto mb-2 object-contain"
            />
            <h1 className="text-3xl font-bold text-white mb-2">LearnX</h1>
            <p className="text-gray-300">Transform learning into an adventure</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-6">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === 'student'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('teacher')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === 'teacher'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Begin Your Quest
            </Button>

            <button
              type="button"
              onClick={fillDemo}
              className="w-full text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Try Demo ({role} account)
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};