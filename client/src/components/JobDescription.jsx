/**
 * JobDescription Component
 * Textarea input for pasting the target job requirements styled with Tailwind CSS.
 */
function JobDescription({ jobDescription, setJobDescription, disabled }) {
  const charCount = jobDescription.length;
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;

  const handleClear = () => {
    setJobDescription("");
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-black/30 hover:border-slate-700/80 transition duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            2
          </span>
          <h3 className="text-base font-semibold text-slate-100">Target Job Description</h3>
        </div>
        <div className="flex items-center gap-2.5">
          {jobDescription && !disabled && (
            <button
              type="button"
              className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer transition-colors duration-150"
              onClick={handleClear}
              title="Clear text"
            >
              Clear
            </button>
          )}
          <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
            Required
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <textarea
          className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-100 leading-relaxed resize-y min-h-[190px] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          rows={8}
          placeholder="Paste the target job description here... (e.g. required skills, qualifications, responsibilities, years of experience)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={disabled}
        />
        <div className="flex items-center justify-between mt-2.5 text-xs text-slate-400">
          <span className="font-mono bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60 text-slate-300">
            {charCount.toLocaleString()} characters • {wordCount.toLocaleString()} {wordCount === 1 ? "word" : "words"}
          </span>
          {charCount > 0 && charCount < 30 && (
            <span className="text-amber-400 font-medium">
              Job descriptions with 50+ characters yield the best AI insights.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
