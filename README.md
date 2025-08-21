<div align="center">
  <h1 align="center">Interactive Candidate Assessment & Scorecard</h1>
  <p align="center">
    An AI-powered tool for recruiters to conduct structured interviews and generate detailed candidate scorecards.
  </p>
</div>

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## ✨ Features

- **Structured Assessments:** Guide candidates through a predefined set of questions.
- **AI-Powered Evaluation:** Uses Google's Gemini API to analyze candidate responses across four key areas: Passion, Motivation, Skills, and Behavior.
- **Interactive Scorecard:** Visualize assessment results with a comprehensive and easy-to-understand scorecard.
- **In-depth Analysis:** Get an overall score, AI-generated summary, key strengths, and areas for improvement.
- **Visual Feedback:** A radar chart provides a quick overview of the candidate's profile.
- **Downloadable Reports:** Generate an HTML report of the assessment for offline viewing and sharing.
- **Responsive Design:** A clean, modern, and responsive user interface built with React and Tailwind CSS.

## 🚀 How it Works

1.  **Start Assessment:** The candidate is presented with a series of questions.
2.  **Submit Answers:** The candidate answers each question and submits them for evaluation.
3.  **AI Analysis:** The application sends the answers to the Gemini API for analysis.
4.  **View Scorecard:** The results are displayed on a detailed, interactive scorecard.
5.  **New Assessment:** Recruiters can reset the application to start a new assessment.

## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI:** [Google Gemini API](https://ai.google.dev/)
- **Charts:** [Recharts](https://recharts.org/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your local machine.
- A [Google Gemini API key](https://ai.google.dev/).

### Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd interactive-candidate-assessment-scorecard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    - Create a file named `.env.local` in the root of the project.
    - Add your Gemini API key to the file:
      ```
      VITE_GEMINI_API_KEY=your-api-key-here
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

## 📸 Screenshots

*Coming soon...*

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
