import React, { useState } from 'react';

export default function AssignmentPanel({ assignment, onUseStarterCode }) {
  const [openHint, setOpenHint] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!assignment) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0d1117] text-gray-500 text-sm">
        No assignment for this lesson yet.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] overflow-y-auto min-h-0">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📝</span>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Assignment</span>
        </div>
        <h2 className="text-lg font-bold text-white leading-snug">{assignment.title}</h2>
      </div>

      <div className="px-5 py-4 flex flex-col gap-5 flex-shrink-0">
        {/* Task description */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Task</p>
          <p className="text-sm text-gray-300 leading-relaxed">{assignment.task}</p>
        </div>

        {/* Requirements checklist */}
        {assignment.requirements && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Requirements</p>
            <ul className="space-y-1.5">
              {assignment.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-purple-400 mt-0.5 flex-shrink-0">◻</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expected output description */}
        {assignment.expectedOutput && (
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Expected Result</p>
            <p className="text-xs text-green-200/70 leading-relaxed">{assignment.expectedOutput}</p>
          </div>
        )}

        {/* Hints accordion */}
        {assignment.hints && assignment.hints.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Hints</p>
            <div className="space-y-1.5">
              {assignment.hints.map((hint, i) => (
                <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenHint(openHint === i ? null : i)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-xs text-yellow-400 font-semibold">Hint {i + 1}</span>
                    <span className="text-gray-500 text-xs">{openHint === i ? '▲' : '▼'}</span>
                  </button>
                  {openHint === i && (
                    <div className="px-3 pb-3">
                      <p className="text-xs text-gray-300 leading-relaxed">{hint}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use starter code button */}
        <button
          onClick={() => { onUseStarterCode(assignment.starterCode); setSubmitted(false); }}
          className="flex items-center justify-center gap-2 text-xs px-4 py-2.5 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all"
        >
          ↺ Load starter code into editor
        </button>

        {/* Self-check */}
        <div className={`rounded-lg p-3 border transition-all ${submitted ? 'bg-green-500/10 border-green-500/30' : 'bg-white/3 border-white/10'}`}>
          <p className="text-xs text-gray-400 mb-2">Done? Check your output against the expected result, then mark it complete.</p>
          <button
            onClick={() => setSubmitted(s => !s)}
            className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
              submitted ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {submitted ? '✓ Submitted!' : 'Mark as done'}
          </button>
        </div>
      </div>
    </div>
  );
}
