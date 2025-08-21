
import { GoogleGenAI, Type } from "@google/genai";
import { Question, ScorecardData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        scores: {
            type: Type.OBJECT,
            properties: {
                passion: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score for Passion from 1-10" },
                        reasoning: { type: Type.STRING, description: "Reasoning for the passion score." },
                    },
                    required: ["score", "reasoning"],
                },
                motivation: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score for Motivation from 1-10" },
                        reasoning: { type: Type.STRING, description: "Reasoning for the motivation score." },
                    },
                    required: ["score", "reasoning"],
                },
                skills: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score for Skills & Learning from 1-10" },
                        reasoning: { type: Type.STRING, description: "Reasoning for the skills score." },
                    },
                    required: ["score", "reasoning"],
                },
                behavior: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score for Behavior & Workstyle from 1-10" },
                        reasoning: { type: Type.STRING, description: "Reasoning for the behavior score." },
                    },
                    required: ["score", "reasoning"],
                },
            },
            required: ["passion", "motivation", "skills", "behavior"],
        },
        summary: { type: Type.STRING, description: "Overall summary of the candidate's profile." },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3-5 key strengths." },
        areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 potential areas for improvement." },
    },
    required: ["scores", "summary", "strengths", "areasForImprovement"],
};


const buildPrompt = (questions: Question[], answers: string[]): string => {
    const qaPairs = questions.map((q, i) => 
        `Category: ${q.category}\nQuestion: ${q.text}\nAnswer: ${answers[i] || 'No answer provided.'}`
    ).join('\n\n---\n\n');

    return `
        You are an expert HR analyst and talent acquisition specialist. Your task is to evaluate a candidate's written responses to a structured interview questionnaire. Analyze the answers for depth, clarity, and alignment with key professional attributes. Provide a quantitative and qualitative assessment based ONLY on the provided answers.

        Please evaluate the following candidate's answers. Score each of the four categories (Passion, Motivation, Skills, Behavior) on a scale from 1 to 10, where 1 is low and 10 is high. Provide a brief reasoning for each score. Also, provide an overall summary of the candidate's profile, a list of their key strengths, and a list of potential areas for improvement.

        **Assessment Questions and Candidate's Answers:**

        ${qaPairs}

        Based on your analysis, return the data in the specified JSON format. Do not include any text outside of the JSON object. Be concise and professional in your reasoning and summaries.
    `;
};

// Add timeout wrapper function to prevent indefinite hanging
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Request timed out after ${timeoutMs/1000} seconds`));
        }, timeoutMs);
        
        promise
            .then(resolve)
            .catch(reject)
            .finally(() => clearTimeout(timeout));
    });
};

export const evaluateAnswers = async (questions: Question[], answers: string[]): Promise<ScorecardData> => {
    try {
        const prompt = buildPrompt(questions, answers);
        
        // Create model with correct SDK usage
        const model = ai.getGenerativeModel({ 
            model: 'gemini-2.0-flash-exp',
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2,
            }
        });
        
        // Add 45-second timeout to prevent indefinite hanging
        const response = await withTimeout(
            model.generateContent(prompt),
            45000
        );

        const jsonText = response.response.text().trim();
        const parsedData = JSON.parse(jsonText);
        
        // Basic validation
        if (!parsedData.scores || !parsedData.summary) {
            throw new Error("Invalid data structure received from API.");
        }
        
        return parsedData as ScorecardData;

    } catch (error) {
        console.error("Error evaluating answers with Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate scorecard: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the scorecard.");
    }
};
