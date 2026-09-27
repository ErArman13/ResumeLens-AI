import { useState, useRef } from "react";
import axios from "axios";
import ResumeUpload from "./components/ResumeUpload";
import JobDescription from "./components/JobDescription";
import AnalysisButton from "./components/AnalysisButton";
import SkillGaps from "./components/SkillGaps";
import InterviewQuestions from "./components/InterviewQuestions";

// Backend API endpoint
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api/analyze";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [fileError, setFileError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const resultsRef = useRef(null);

  const isFormIncomplete = !resumeFile || !jobDescription.trim();

  const handleAnalyze = async () => {
    if (!resumeFile) {
      setGeneralError("Please upload a PDF resume before analyzing.");
      return;
    }

    if (!jobDescription.trim()) {
      setGeneralError("Please paste a target job description before analyzing.");
      return;
    }

    setGeneralError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescriptionText", jobDescription.trim());

      const response = await axios.post(API_URL, formData);
      setAnalysisResults(response.data);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error("Analysis request error:", err);

      if (err.response) {
        const backendMessage = err.response.data?.error;
        setGeneralError(
          backendMessage || `Server returned an error (${err.response.status}). Please check your inputs.`
        );
      } else if (err.request) {
        setGeneralError(
          "Unable to connect to the backend server. Please verify the backend server is running on http://localhost:5001."
        );
      } else {
        setGeneralError(err.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription("");
    setFileError("");
    setGeneralError("");
    setAnalysisResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 flex flex-col">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300 tracking-wide uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
            <span>AI Recruiter Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent mb-2">
            ResumeLens AI
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-300 mb-3">
            AI-powered resume & job description analyzer
          </p>
          <p className="max-w-2xl mx-auto text-sm text-slate-400 leading-relaxed">
            Upload your candidate's PDF resume and paste the target job requirements to identify technical skill gaps and generate targeted interview questions with Google Gemini.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Error Notification Banner */}
          {generalError && (
            <div className="bg-red-500/10 border border-red-500/30 text-slate-100 p-4 rounded-xl flex items-start gap-3.5 mb-6 shadow-sm" role="alert">
              <div className="text-red-400 shrink-0 mt-0.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="flex-1 text-sm leading-relaxed">
                <strong className="text-red-300">Action Required:</strong> {generalError}
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-white p-1 text-sm cursor-pointer transition-colors duration-150"
                onClick={() => setGeneralError("")}
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2">
            <ResumeUpload
              file={resumeFile}
              setFile={setResumeFile}
              error={fileError}
              setError={setFileError}
              disabled={loading}
            />

            <JobDescription
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              disabled={loading}
            />
          </div>

          {/* Action Button */}
          <AnalysisButton
            onAnalyze={handleAnalyze}
            loading={loading}
            disabled={isFormIncomplete}
            hasResults={!!analysisResults}
            onReset={handleReset}
          />

          {/* Loading Progress State */}
          {loading && (
            <div className="text-center p-10 sm:p-12 my-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/5 to-slate-900/60 shadow-lg shadow-indigo-500/5">
              <div className="relative w-12 h-12 mx-auto mb-4">
                <span className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-75" />
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-500 text-indigo-300">
                  <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </span>
              </div>
              <h4 className="text-lg font-semibold text-slate-100 mb-1">Analyzing Candidate Profile</h4>
              <p className="text-sm text-slate-400">
                Extracting PDF text content & evaluating technical alignment with Google Gemini...
              </p>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResults && !loading && (
            <section ref={resultsRef} className="mt-8 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    AI Evaluation Complete
                  </span>
                  <h2 className="text-2xl font-bold text-white">Candidate Assessment Summary</h2>
                </div>
                <div className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg self-start sm:self-auto">
                  File: <strong className="text-slate-100">{resumeFile?.name}</strong>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <SkillGaps skillGaps={analysisResults.skillGaps || []} />
                <InterviewQuestions interviewQuestions={analysisResults.interviewQuestions || []} />
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-12 pb-4 text-center text-xs text-slate-400 border-t border-slate-800/80">
          <p>ResumeLens AI • Built with React, Tailwind CSS, Express, Multer, unpdf & Google Gemini</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
