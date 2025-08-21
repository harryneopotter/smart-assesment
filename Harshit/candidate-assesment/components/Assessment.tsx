import React, { useState, useEffect } from 'react';
import { ASSESSMENT_QUESTIONS } from '../constants';
import { evaluateAnswers } from '../services/geminiService';
import { generateHTMLReport } from '../services/htmlReportService';
import { ScorecardData } from '../types';
import QuestionCard from './QuestionCard';
import Loader from './Loader';

const evaluationMessages = [
    "Analyzing linguistic patterns...",
    "Scoring for key competencies...",
    "Cross-referencing behavioral indicators...",
    "Compiling strength and improvement areas...",
    "Generating final scorecard...",
];

interface AssessmentProps {
  onComplete: (data: ScorecardData) => void;
  onStartEvaluation: () => void;
  onError: (message: string) => void;
  isEvaluating: boolean;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete, onStartEvaluation, onError, isEvaluating }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(ASSESSMENT_QUESTIONS.length).fill(''));
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isEvaluating) {
      interval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % evaluationMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isEvaluating]);


  const handleAnswerChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    onStartEvaluation();
    try {
      const result = await evaluateAnswers(ASSESSMENT_QUESTIONS, answers);

      // Generate HTML report
      try {
        await generateHTMLReport(result, answers);
        console.log('HTML report generated successfully');
      } catch (htmlError) {
        console.warn('Failed to generate HTML report:', htmlError);
        // Don't block the main flow if HTML generation fails
      }

      onComplete(result);
    } catch (error) {
        if (error instanceof Error) {
            onError(error.message);
        } else {
            onError("An unexpected error occurred.");
        }
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100;
  const allQuestionsAnswered = answers.every(answer => answer.trim() !== '');

  if (isEvaluating) {
    return (
      <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto text-center animate-fadeInUp shadow-glow">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulseGlow">
              <svg className="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-3xl font-bold modern-heading mb-4">Evaluating Responses</h2>
        <p className="text-lg text-gray-600 dark:text-gray-100 mb-6 h-8 transition-all duration-500 animate-pulse">
          {evaluationMessages[messageIndex]}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div className="progress-shimmer bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-in-out" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 sm:p-8 md:p-10 max-w-4xl mx-auto animate-fadeInUp shadow-glow">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold modern-heading">Candidate Assessment</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-100">
                {currentQuestionIndex + 1} <span className="text-gray-500">/ {ASSESSMENT_QUESTIONS.length}</span>
              </span>
            </div>
            <div className="hidden sm:block w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="progress-shimmer bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 h-full rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-shimmer"></div>
        </div>
      </div>

      <QuestionCard
        question={ASSESSMENT_QUESTIONS[currentQuestionIndex]}
        answer={answers[currentQuestionIndex]}
        onAnswerChange={handleAnswerChange}
      />

      <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="group relative w-full sm:w-auto flex items-center justify-center gap-3 glass-card px-6 py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-glow"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold relative z-10">Previous</span>
        </button>

        {currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1 ? (
          <button
            onClick={handleNext}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 btn-gradient px-8 py-4 rounded-xl shadow-lg hover:shadow-glow"
          >
            <span className="font-semibold relative z-10">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            title={!allQuestionsAnswered ? "Please answer all questions before submitting" : "Submit for evaluation"}
            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none hover:shadow-glow"
          >
            <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
              allQuestionsAnswered
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-90 group-hover:opacity-100'
                : 'bg-gray-400 opacity-50'
            }`}></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold relative z-10">Submit for Evaluation</span>
          </button>
        )}
      </div>

      {!allQuestionsAnswered && (
        <div className="mt-6 p-4 glass-card rounded-xl border border-yellow-300/30 bg-yellow-50/50 dark:bg-yellow-900/10">
          <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Complete all questions to proceed</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;