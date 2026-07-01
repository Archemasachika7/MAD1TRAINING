import React, { useState } from 'react';

const TRACK_BADGE_COLORS = {
  html5:     'bg-orange-500/20 text-orange-300',
  bootstrap: 'bg-purple-500/20 text-purple-300',
  chartjs:   'bg-green-500/20 text-green-300',
  flask:     'bg-yellow-500/20 text-yellow-300',
  sqlite:    'bg-blue-500/20 text-blue-300',
  projects:  'bg-pink-500/20 text-pink-300',
  pdsa:      'bg-teal-500/20 text-teal-300',
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative mt-3 rounded-lg overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10">
        <span className="text-xs text-gray-500 font-mono">example</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-0.5 rounded hover:bg-white/10"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono text-gray-200 overflow-x-auto bg-[#0a0e14] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function BreakdownTable({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
      <div className="px-3 py-1.5 bg-white/5 border-b border-white/10">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Code Breakdown</span>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className={`border-b border-white/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/2'}`}>
              <td className="px-3 py-2.5 align-top w-2/5">
                <code className="text-xs font-mono text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded whitespace-nowrap">
                  {item.line}
                </code>
              </td>
              <td className="px-3 py-2.5 text-gray-300 leading-relaxed text-xs">{item.explanation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LessonTheory({
  lesson, trackId, onMarkComplete, isCompleted,
  panelMode, onTogglePlayground, onToggleAssignment, hasAssignment
}) {
  if (!lesson) return null;
  const { theory } = lesson;
  const badgeColor = TRACK_BADGE_COLORS[trackId] || 'bg-gray-500/20 text-gray-300';

  return (
    <div className="flex flex-col h-full bg-[#0d1117] overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-4xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor} mb-2 inline-block`}>
                {lesson.language?.toUpperCase()}
              </span>
              <h1 className="text-2xl font-bold text-white leading-tight">{lesson.title}</h1>
            </div>
            <button
              onClick={onMarkComplete}
              className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                isCompleted
                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                  : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
              }`}
            >
              {isCompleted ? '✓ Complete' : 'Mark Complete'}
            </button>
          </div>

          {/* Intro */}
          <p className="text-gray-300 leading-relaxed mb-6 text-sm border-l-2 border-white/10 pl-4">{theory.intro}</p>

          {/* Sections */}
          {theory.sections.map((section, i) => (
            <div key={i} className="mb-7">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-white/10 text-xs flex items-center justify-center text-gray-400 flex-shrink-0">
                  {i + 1}
                </span>
                {section.heading}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
              {section.code && <CodeBlock code={section.code} />}
              {section.breakdown?.length > 0 && <BreakdownTable items={section.breakdown} />}
            </div>
          ))}

          {/* Tip */}
          {theory.tip && (
            <div className="flex gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg mt-2 mb-4">
              <span className="text-base flex-shrink-0">💡</span>
              <p className="text-yellow-200/80 text-xs leading-relaxed">{theory.tip}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action bar — always at the bottom of theory */}
      <div className="flex-shrink-0 border-t border-white/10 bg-[#161b22] px-4 py-2.5 flex items-center gap-2">
        <span className="text-xs text-gray-600 mr-auto">Ready to practice?</span>

        <button
          onClick={onTogglePlayground}
          className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg font-semibold transition-all ${
            panelMode === 'playground'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              : 'bg-white/8 text-gray-300 hover:bg-white/15 border border-white/10'
          }`}
        >
          ⚡ {panelMode === 'playground' ? 'Close Playground' : 'Open Playground'}
        </button>

        {hasAssignment && (
          <button
            onClick={onToggleAssignment}
            className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg font-semibold transition-all ${
              panelMode === 'assignment'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-white/8 text-gray-300 hover:bg-white/15 border border-white/10'
            }`}
          >
            📝 {panelMode === 'assignment' ? 'Close Assignment' : 'Try Assignment'}
          </button>
        )}
      </div>
    </div>
  );
}
