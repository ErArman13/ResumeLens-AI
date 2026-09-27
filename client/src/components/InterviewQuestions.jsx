import { useState } from "react";

/**
 * InterviewQuestions Component
 * Displays targeted technical interview questions formulated by Gemini styled with Tailwind CSS.
 */
function InterviewQuestions({ interviewQuestions }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const hasQuestions = Array.isArray(interviewQuestions) && interviewQuestions.length > 0;

  const handleCopy = (text, index) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-black/30 hover:border-slate-700/80 transition duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Technical Interview Questions
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Targeted questions designed to evaluate candidate capabilities in key required areas.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 shrink-0 self-start">
          {hasQuestions ? `${interviewQuestions.length} Questions` : "0 Questions"}
        </span>
      </div>

      <div>
        {hasQuestions ? (
          <div className="flex flex-col gap-3.5">
            {interviewQuestions.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 hover:border-slate-600 rounded-xl p-4 sm:p-5 transition-all duration-150"
              >
                <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                  {item.topic && (
                    <span className="bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {item.topic}
                    </span>
                  )}
                  <button
                    type="button"
                    className="ml-auto text-xs text-slate-400 hover:text-slate-100 bg-slate-900/80 hover:bg-slate-700/80 border border-slate-700 px-2.5 py-1 rounded inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                    onClick={() => handleCopy(item.question, index)}
                    title="Copy question text"
                  >
                    {copiedIndex === index ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-100 leading-relaxed">
                  {item.question}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl text-center text-sm text-slate-400">
            No interview questions were generated.
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewQuestions;
