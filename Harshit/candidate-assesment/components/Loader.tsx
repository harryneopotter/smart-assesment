
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Modern pulsing loader */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-transparent rounded-full animate-spin">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900"></div>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-indigo-500 border-l-transparent animate-spin"></div>
        <div className="absolute -inset-4 rounded-full border-2 border-purple-500/20 animate-ping"></div>
      </div>

      {/* Loading text with typing effect */}
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-100 loading-dots">
          Processing
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-white">
          AI is analyzing your responses...
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default Loader;
