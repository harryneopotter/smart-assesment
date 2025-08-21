import React from 'react';
import { ScorecardData } from '../types';
import RadarChartComponent from './RadarChartComponent';

interface ScorecardProps {
  data: ScorecardData;
  onReset: () => void;
}

const getScoreColorClasses = (score: number): string => {
   if (score >= 7) return 'border-green-500 bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300';
   if (score >= 4) return 'border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 text-yellow-700 dark:text-yellow-300';
   return 'border-red-500 bg-gradient-to-br from-red-500/10 to-pink-500/10 text-red-700 dark:text-red-300';
}

const CategoryCard: React.FC<{ title: string; score: number; reasoning: string }> = ({ title, score, reasoning }) => {
     const colorClasses = getScoreColorClasses(score);
     const scoreColorClasses = score >= 7 ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' : score >= 4 ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-br from-red-500 to-pink-500 text-white';

     const getCategoryIcon = (title: string) => {
       switch (title) {
         case 'Passion': return '🔥';
         case 'Motivation': return '⚡';
         case 'Skills': return '🛠️';
         case 'Behavior': return '🧠';
         default: return '📊';
       }
     };

     return (
       <div className={`glass-card p-6 rounded-2xl border-l-4 ${colorClasses} hover:shadow-glow transition-all duration-300`}>
         <div className="flex justify-between items-start mb-4">
           <div className="flex items-center gap-3">
             <span className="text-2xl">{getCategoryIcon(title)}</span>
             <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
           </div>
           <div className="relative">
             <span className={`text-2xl font-bold w-14 h-14 flex items-center justify-center rounded-2xl ${scoreColorClasses} shadow-lg`}>
               {score}
             </span>
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-sm">
               <div className={`w-2 h-2 rounded-full ${score >= 7 ? 'bg-green-500' : score >= 4 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
             </div>
           </div>
         </div>
         <p className="text-gray-600 dark:text-gray-100 text-base leading-relaxed">{reasoning}</p>
       </div>
     );
}

const ListCard: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
  <div className="glass-card p-6 rounded-2xl h-full hover:shadow-glow transition-all duration-300">
    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          {icon}
        </div>
        <span>{title}</span>
    </h4>
    <ul className="space-y-3 text-gray-600 dark:text-gray-100 text-base">
      {items.map((item, index) => (
        <li key={index} className="flex items-start group">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Scorecard: React.FC<ScorecardProps> = ({ data, onReset }) => {
  const chartData = [
    { category: 'Passion', score: data.scores.passion.score },
    { category: 'Motivation', score: data.scores.motivation.score },
    { category: 'Skills', score: data.scores.skills.score },
    { category: 'Behavior', score: data.scores.behavior.score },
  ];
  
  const overallScore = (chartData.reduce((acc, item) => acc + item.score, 0) / chartData.length);
  const overallScoreDisplay = overallScore.toFixed(1);
  const overallScoreColor = getScoreColorClasses(overallScore);

  return (
    <div className="max-w-7xl mx-auto animate-fadeInUp">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div className="flex items-center gap-4 mb-6 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold modern-heading">Candidate Scorecard</h2>
            </div>
            <button
                onClick={onReset}
                className="group relative btn-gradient px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-glow flex items-center gap-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="relative z-10">New Assessment</span>
            </button>
        </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

         <div className="lg:col-span-2 glass-card p-8 rounded-2xl flex flex-col items-center justify-center shadow-glow">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Score Profile</h3>
             </div>
             <RadarChartComponent data={chartData} />
             <div className={`mt-6 text-center p-6 rounded-2xl border-2 w-full ${overallScoreColor} shadow-lg`}>
                 <p className="font-semibold text-lg text-gray-600 dark:text-gray-100 mb-2">Overall Score</p>
                 <p className="text-5xl font-bold modern-heading">{overallScoreDisplay}</p>
                 <div className="mt-2 flex items-center justify-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-sm text-gray-500 dark:text-white">Evaluation Complete</span>
                 </div>
             </div>
         </div>

         <div className="lg:col-span-3 space-y-8">
           <div className="glass-card p-8 rounded-2xl shadow-glow">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI Summary & Recommendation</h3>
             </div>
             <p className="text-gray-600 dark:text-gray-100 text-lg leading-relaxed whitespace-pre-wrap">{data.summary}</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <ListCard
                 title="Key Strengths"
                 items={data.strengths}
                 icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
             />
             <ListCard
                 title="Improvement Areas"
                 items={data.areasForImprovement}
                 icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
             />
           </div>
         </div>
       </div>
      
      <div className="mt-16">
         <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
             </svg>
           </div>
           <h3 className="text-3xl font-bold modern-heading">Detailed Breakdown</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <CategoryCard title="Passion" score={data.scores.passion.score} reasoning={data.scores.passion.reasoning} />
           <CategoryCard title="Motivation" score={data.scores.motivation.score} reasoning={data.scores.motivation.reasoning} />
           <CategoryCard title="Skills" score={data.scores.skills.score} reasoning={data.scores.skills.reasoning} />
           <CategoryCard title="Behavior" score={data.scores.behavior.score} reasoning={data.scores.behavior.reasoning} />
         </div>
       </div>
    </div>
  );
};

export default Scorecard;