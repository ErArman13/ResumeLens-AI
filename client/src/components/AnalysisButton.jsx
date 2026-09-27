/**
 * AnalysisButton Component
 * Action controls for submitting the analysis request and resetting the dashboard styled with Tailwind CSS.
 */
function AnalysisButton({ onAnalyze, loading, disabled, hasResults, onReset }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 my-8">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:opacity-95 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        onClick={onAnalyze}
        disabled={disabled || loading}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Analyzing Resume with Gemini...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              <circle cx="10" cy="10" r="3" />
            </svg>
            <span>Analyze Resume</span>
          </>
        )}
      </button>

      {hasResults && (
        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:text-white hover:border-slate-700 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onReset}
          disabled={loading}
          title="Reset inputs and clear analysis"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Start New Analysis</span>
        </button>
      )}
    </div>
  );
}

export default AnalysisButton;
