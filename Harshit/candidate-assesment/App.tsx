import React, { useState, useCallback } from 'react';
import Assessment from './components/Assessment';
import Scorecard from './components/Scorecard';
import Header from './components/Header';
import { ScorecardData } from './types';

const App: React.FC = () => {
  const [scorecardData, setScorecardData] = useState<ScorecardData | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssessmentComplete = useCallback((data: ScorecardData) => {
    setScorecardData(data);
    setIsEvaluating(false);
  }, []);

  const handleStartEvaluation = () => {
    setIsEvaluating(true);
    setScorecardData(null);
    setError(null);
  };
  
  const handleReset = () => {
    setScorecardData(null);
    setIsEvaluating(false);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsEvaluating(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden dark dark:bg-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
      </div>

      <Header />

      <main className="container mx-auto p-4 md:p-8 flex-grow w-full relative z-10">
        {/* Hero section for initial state */}
        {!scorecardData && !isEvaluating && !error && (
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h1 className="modern-heading text-4xl md:text-6xl font-bold mb-4">
                AI Candidate Assessment
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-100 mb-6 max-w-2xl mx-auto leading-relaxed">
                Discover your potential with our advanced AI-powered evaluation system.
                Get comprehensive insights into your skills, motivation, and behavior patterns.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-white">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  AI-Powered Analysis
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Comprehensive Feedback
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant Results
                </span>
              </div>
            </div>
          </div>
        )}

        {!scorecardData && (
          <Assessment
            onComplete={handleAssessmentComplete}
            onStartEvaluation={handleStartEvaluation}
            isEvaluating={isEvaluating}
            onError={handleError}
          />
        )}

        {scorecardData && (
          <Scorecard data={scorecardData} onReset={handleReset} />
        )}

        {error && !scorecardData && (
          <div className="glass-card p-8 max-w-2xl mx-auto mt-8 text-center animate-fadeInUp shadow-glow">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 modern-heading">
              Evaluation Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-100 mb-8 text-lg">{error}</p>
            <button
              onClick={handleReset}
              className="btn-gradient px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-glow"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;