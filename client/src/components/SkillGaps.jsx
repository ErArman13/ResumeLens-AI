/**
 * SkillGaps Component
 * Displays technical skill gaps identified by the AI recruiter styled with Tailwind CSS.
 */
function SkillGaps({ skillGaps }) {
  const hasGaps = Array.isArray(skillGaps) && skillGaps.length > 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-black/30 hover:border-slate-700/80 transition duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Missing & Insufficient Technical Skills
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Skills requested in the job description that were absent or insufficiently demonstrated in the resume.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap bg-amber-500/10 text-amber-300 border border-amber-500/25 shrink-0 self-start">
          {hasGaps ? `${skillGaps.length} ${skillGaps.length === 1 ? "Skill" : "Skills"}` : "0 Skills"}
        </span>
      </div>

      <div>
        {hasGaps ? (
          <div className="flex flex-wrap gap-2.5">
            {skillGaps.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/40 text-amber-100 px-3.5 py-1.5 rounded-full text-sm font-medium transition duration-150"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl text-sm">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>No technical skill gaps detected! The candidate profile matches the core requirements.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillGaps;
