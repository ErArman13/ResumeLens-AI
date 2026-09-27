import { useState, useRef } from "react";

/**
 * ResumeUpload Component
 * Handles PDF resume file selection and drag-and-drop validation styled with Tailwind CSS.
 */
function ResumeUpload({ file, setFile, error, setError, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    const isPdfType = selectedFile.type === "application/pdf";
    const isPdfExt = selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdfType && !isPdfExt) {
      setError("Only PDF files are allowed. Please upload a valid .pdf resume.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      validateAndSetFile(selected);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Determine dropzone state classes
  const getDropzoneClasses = () => {
    const base = "border-2 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 min-h-[210px] flex items-center justify-center";
    if (disabled) return `${base} border-slate-700 bg-slate-900/40 opacity-60 cursor-not-allowed`;
    if (error) return `${base} border-dashed border-red-500/50 bg-red-500/5`;
    if (isDragging) return `${base} border-dashed border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.25)]`;
    if (file) return `${base} border-solid border-emerald-500/40 bg-emerald-500/5`;
    return `${base} border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/60 hover:bg-indigo-500/5`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-black/30 hover:border-slate-700/80 transition duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            1
          </span>
          <h3 className="text-base font-semibold text-slate-100">Upload Resume (PDF)</h3>
        </div>
        <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
          Required • PDF only
        </span>
      </div>

      <div
        className={getDropzoneClasses()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        {file ? (
          <div className="flex items-center gap-3.5 w-full text-left">
            <div className="w-11 h-11 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-slate-100 truncate block" title={file.name}>
                {file.name}
              </span>
              <span className="text-xs text-emerald-400 mt-0.5 block font-medium">
                {formatFileSize(file.size)} • Ready for analysis
              </span>
            </div>
            {!disabled && (
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 hover:border-red-600 flex items-center justify-center text-xs shrink-0 transition-all duration-200 cursor-pointer"
                onClick={handleRemove}
                title="Remove selected file"
              >
                ✕
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3 border border-indigo-500/20">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-sm text-slate-200 mb-1">
              <strong className="text-indigo-400 font-semibold">Click to upload</strong> or drag and drop your PDF resume
            </p>
            <p className="text-xs text-slate-400">Supports PDF format (Max 10MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs mt-3 p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
