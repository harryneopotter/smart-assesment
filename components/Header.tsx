import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 glass-card m-4 rounded-2xl shadow-glow">
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold modern-heading">
              AI Candidate Assessment
            </h1>
            <p className="text-xs text-gray-500 dark:text-white hidden sm:block">Powered by Gemini AI</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-100">AI Ready</span>
          </div>

          <button
            onClick={() => setIsDark((v) => !v)}
            className="relative group p-3 glass-card rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-100 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-100 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-4 7a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zM3 11a1 1 0 100-2h0a1 1 0 100 2h0zm13 0a1 1 0 100-2h0a1 1 0 100 2h0zM5.636 5.636a1 1 0 011.414-1.414h0a1 1 0 11-1.414 1.414h0zM14.95 14.95a1 1 0 011.414-1.414h0a1 1 0 11-1.414 1.414h0zM5.636 14.95a1 1 0 011.414 1.414h0A1 1 0 115.636 14.95h0zM14.95 5.636a1 1 0 011.414-1.414h0a1 1 0 11-1.414 1.414h0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
