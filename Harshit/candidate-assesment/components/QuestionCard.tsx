import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (text: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer, onAnswerChange }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Passion':
        return 'from-red-500/20 to-pink-500/20 border-red-300/50 text-red-700 dark:text-red-300';
      case 'Motivation':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-300/50 text-blue-700 dark:text-blue-300';
      case 'Skills':
        return 'from-green-500/20 to-emerald-500/20 border-green-300/50 text-green-700 dark:text-green-300';
      case 'Behavior':
        return 'from-purple-500/20 to-indigo-500/20 border-purple-300/50 text-purple-700 dark:text-purple-300';
      default:
        return 'from-gray-500/20 to-gray-500/20 border-gray-300/50 text-gray-700 dark:text-gray-100';
    }
  };

  return (
    <div className="animate-fadeInUp">
      <div className="flex items-center gap-3 mb-6">
        <div className={`px-4 py-2 rounded-full text-sm font-bold border backdrop-blur-sm bg-gradient-to-r ${getCategoryColor(question.category)} shadow-sm`}>
          {question.category}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
      </div>

      <div className="glass-card p-6 md:p-8 mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed modern-heading">
          {question.text}
        </h3>

        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Your detailed answer helps our AI provide a more accurate evaluation. Be specific and provide concrete examples from your experience..."
            className="modern-input w-full h-64 md:h-56 p-6 text-base md:text-lg leading-relaxed resize-none shadow-inner"
            aria-label={`Answer for question: ${question.text}`}
          />

          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm text-gray-500 dark:text-white">
            <div className={`w-2 h-2 rounded-full ${answer.trim() ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="hidden sm:inline">{answer.trim() ? 'Answered' : 'Not answered'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-white">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Provide detailed, specific examples</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{answer.length}</span>
          <span className="text-gray-400">characters</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;