import { ScorecardData } from '../types';
import { ASSESSMENT_QUESTIONS } from '../constants';

interface AssessmentReportData extends ScorecardData {
  answers: string[];
  timestamp: string;
  reportId: string;
}

const getScoreColorClasses = (score: number): string => {
  if (score >= 7) return 'border-green-500 bg-green-50 text-green-700';
  if (score >= 4) return 'border-yellow-500 bg-yellow-50 text-yellow-700';
  return 'border-red-500 bg-red-50 text-red-700';
};

// Browser-compatible function to download content as a file
const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const getOverallScore = (scorecardData: ScorecardData): number => {
  const chartData = [
    scorecardData.scores.passion.score,
    scorecardData.scores.motivation.score,
    scorecardData.scores.skills.score,
    scorecardData.scores.behavior.score,
  ];
  return chartData.reduce((acc, item) => acc + item, 0) / chartData.length;
};

const generateIndividualReportHTML = (data: AssessmentReportData): string => {
  const chartData = [
    { category: 'Passion', score: data.scores.passion.score },
    { category: 'Motivation', score: data.scores.motivation.score },
    { category: 'Skills', score: data.scores.skills.score },
    { category: 'Behavior', score: data.scores.behavior.score },
  ];

  const overallScore = (chartData.reduce((acc, item) => acc + item.score, 0) / chartData.length);
  const overallScoreDisplay = overallScore.toFixed(1);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Candidate Assessment Report - ${data.timestamp}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .glass-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .shadow-glow {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.15);
        }
        .modern-heading {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
            <div class="flex items-center justify-center gap-4 mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold modern-heading">Candidate Assessment Report</h1>
            </div>
            <p class="text-gray-600 text-lg">Generated on ${new Date(data.timestamp).toLocaleString()}</p>
            <p class="text-gray-500 text-sm mt-2">Report ID: ${data.reportId}</p>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">

            <!-- Score Profile -->
            <div class="lg:col-span-2 glass-card p-8 rounded-2xl shadow-glow">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900">Score Profile</h3>
                </div>

                <!-- Simple Bar Chart for HTML -->
                <div class="space-y-4 mb-6">
                    ${chartData.map(item => `
                        <div class="flex items-center gap-3">
                            <span class="text-sm font-medium text-gray-700 w-20">${item.category}</span>
                            <div class="flex-1 bg-gray-200 rounded-full h-4">
                                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-700" style="width: ${(item.score / 10) * 100}%"></div>
                            </div>
                            <span class="text-sm font-bold text-gray-900 w-8">${item.score}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="text-center p-6 rounded-2xl border-2 ${getScoreColorClasses(overallScore)} shadow-lg">
                    <p class="font-semibold text-lg text-gray-600 mb-2">Overall Score</p>
                    <p class="text-5xl font-bold modern-heading">${overallScoreDisplay}</p>
                    <div class="mt-2 flex items-center justify-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-sm text-gray-500">Evaluation Complete</span>
                    </div>
                </div>
            </div>

            <!-- Summary and Lists -->
            <div class="lg:col-span-3 space-y-8">
                <div class="glass-card p-8 rounded-2xl shadow-glow">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">AI Summary & Recommendation</h3>
                    </div>
                    <p class="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">${data.summary}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="glass-card p-6 rounded-2xl shadow-glow">
                        <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            Key Strengths
                        </h4>
                        <ul class="space-y-3 text-gray-600 text-base">
                            ${data.strengths.map(strength => `
                                <li class="flex items-start group">
                                    <div class="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-sm">
                                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span class="leading-relaxed">${strength}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="glass-card p-6 rounded-2xl shadow-glow">
                        <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            Improvement Areas
                        </h4>
                        <ul class="space-y-3 text-gray-600 text-base">
                            ${data.areasForImprovement.map(area => `
                                <li class="flex items-start group">
                                    <div class="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-sm">
                                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span class="leading-relaxed">${area}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detailed Breakdown -->
        <div class="mt-16">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 class="text-3xl font-bold modern-heading">Detailed Breakdown</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${['passion', 'motivation', 'skills', 'behavior'].map(category => {
                    const categoryData = data.scores[category as keyof typeof data.scores];
                    const score = categoryData.score;
                    const colorClasses = getScoreColorClasses(score);
                    const icon = category === 'passion' ? '🔥' : category === 'motivation' ? '⚡' : category === 'skills' ? '🛠️' : '🧠';
                    return `
                        <div class="glass-card p-6 rounded-2xl border-l-4 ${colorClasses} shadow-glow">
                            <div class="flex justify-between items-start mb-4">
                                <div class="flex items-center gap-3">
                                    <span class="text-2xl">${icon}</span>
                                    <h4 class="text-xl font-bold text-gray-900 capitalize">${category}</h4>
                                </div>
                                <div class="relative">
                                    <span class="text-2xl font-bold w-14 h-14 flex items-center justify-center rounded-2xl bg-white shadow-lg border-2 ${colorClasses.split(' ')[0]}">
                                        ${score}
                                    </span>
                                </div>
                            </div>
                            <p class="text-gray-600 text-base leading-relaxed">${categoryData.reasoning}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Candidate Answers Section -->
        <div class="mt-16">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h3 class="text-3xl font-bold modern-heading">Candidate Answers</h3>
            </div>
            <div class="space-y-6">
                ${ASSESSMENT_QUESTIONS.map((question, index) => `
                    <div class="glass-card p-6 rounded-2xl shadow-glow">
                        <div class="flex items-start gap-3 mb-4">
                            <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                <span class="text-white font-bold text-sm">${index + 1}</span>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-lg font-bold text-gray-900 mb-2">${question.text}</h4>
                                <span class="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full mb-3">
                                    ${question.category}
                                </span>
                                <p class="text-gray-600 leading-relaxed">${data.answers[index] || 'No answer provided'}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-16 text-center">
            <div class="glass-card p-8 rounded-2xl shadow-glow">
                <p class="text-gray-600 text-lg">Generated by Candidate Assessment System</p>
                <p class="text-gray-500 text-sm mt-2">Report ID: ${data.reportId}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

interface ReportEntry {
  filename: string;
  timestamp: string;
  reportId: string;
  overallScore: string;
}

const getStoredReports = (): ReportEntry[] => {
  try {
    const stored = localStorage.getItem('assessmentReports');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to read stored reports:', error);
    return [];
  }
};

const storeReports = (reports: ReportEntry[]): void => {
  try {
    localStorage.setItem('assessmentReports', JSON.stringify(reports));
  } catch (error) {
    console.warn('Failed to store reports:', error);
  }
};

const updateIndexPage = async (newReport: ReportEntry): Promise<void> => {
  // Get existing reports from storage
  const existingReports = getStoredReports();

  // Check if this report already exists (avoid duplicates)
  const reportExists = existingReports.some(report => report.reportId === newReport.reportId);

  if (!reportExists) {
    // Add the new report to the list
    const updatedReports = [...existingReports, newReport];

    // Store the updated list
    storeReports(updatedReports);

    // Generate the updated index HTML
    const indexContent = generateIndexHTML(updatedReports);

    // Download the updated index file
    downloadFile(indexContent, 'index.html');
  } else {
    // If report exists, just regenerate the index with current data
    const indexContent = generateIndexHTML(existingReports);
    downloadFile(indexContent, 'index.html');
  }
};

const generateIndexHTML = (reports: Array<{ filename: string; timestamp: string; reportId: string; overallScore: string }>): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Candidate Assessment Reports</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .glass-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .shadow-glow {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.15);
        }
        .modern-heading {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
            <div class="flex items-center justify-center gap-4 mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 class="text-4xl md:text-6xl font-bold modern-heading">Assessment Reports</h1>
            </div>
            <p class="text-gray-600 text-xl">View all candidate assessment reports</p>
        </div>

        <!-- Reports List -->
        ${reports.length > 0 ? `
            <div class="space-y-6">
                <div class="text-center mb-8">
                    <p class="text-gray-600 text-lg">Total Reports: <span class="font-bold text-purple-600">${reports.length}</span></p>
                </div>
                ${reports.map(report => `
                    <div class="glass-card p-6 rounded-2xl shadow-glow hover:shadow-lg transition-all duration-300">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-4 mb-2">
                                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-900">Assessment Report</h3>
                                        <p class="text-gray-600 text-sm">ID: ${report.reportId}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4 text-sm text-gray-500">
                                    <span>Generated: ${new Date(report.timestamp).toLocaleString()}</span>
                                    <span class="text-purple-600 font-semibold">Overall Score: ${report.overallScore}</span>
                                </div>
                            </div>
                            <a href="${report.filename}"
                               class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                View Report
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : `
            <div class="text-center py-16">
                <div class="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">No Reports Yet</h2>
                <p class="text-gray-600 text-lg">Complete an assessment to generate your first report!</p>
            </div>
        `}

        <!-- Footer -->
        <div class="mt-16 text-center">
            <div class="glass-card p-8 rounded-2xl shadow-glow">
                <p class="text-gray-600 text-lg">Candidate Assessment System</p>
                <p class="text-gray-500 text-sm mt-2">Static HTML Report Generator</p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

export const generateHTMLReport = async (
  scorecardData: ScorecardData,
  answers: string[]
): Promise<string> => {
  const timestamp = new Date().toISOString();
  const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const reportData: AssessmentReportData = {
    ...scorecardData,
    answers,
    timestamp,
    reportId
  };

  const htmlContent = generateIndividualReportHTML(reportData);
  const filename = `assessment_${reportId}.html`;

  // Download the individual report
  downloadFile(htmlContent, filename);

  // Generate and download the updated index file
  await updateIndexPage({
    filename,
    timestamp,
    reportId,
    overallScore: getOverallScore(scorecardData).toFixed(1)
  });

  return filename;
};

export const regenerateIndexPage = (): void => {
  const reports = getStoredReports();
  const indexContent = generateIndexHTML(reports);
  downloadFile(indexContent, 'index.html');
};

export const clearAllReports = (): void => {
  storeReports([]);
  const indexContent = generateIndexHTML([]);
  downloadFile(indexContent, 'index.html');
};

export const getReportCount = (): number => {
  return getStoredReports().length;
};
