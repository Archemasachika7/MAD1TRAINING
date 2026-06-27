import React, { useState } from 'react';

const TRACK_BADGE_COLORS = {
  html5:     'bg-orange-500/20 text-orange-300',
  bootstrap: 'bg-purple-500/20 text-purple-300',
  chartjs:   'bg-green-500/20 text-green-300',
  flask:     'bg-yellow-500/20 text-yellow-300',
  sqlite:    'bg-blue-500/20 text-blue-300',
  projects:  'bg-pink-500/20 text-pink-300',
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
      <pre className="p-4 text-sm font-mono text-gray-200 overflow-x-auto bg-[#0d1117] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function BreakdownTable({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/5 border-b border-white/10">
            <th className="text-left px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider w-2/5">Code</th>
            <th className="text-left px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Explanation</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/2'}>
              <td className="px-3 py-2.5 align-top">
                <code className="text-xs font-mono text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded">
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

export default function LessonTheory({ lesson, trackId, onMarkComplete, isCompleted }) {
  if (!lesson) return null;

  const { theory } = lesson;
  const badgeColor = TRACK_BADGE_COLORS[trackId] || 'bg-gray-500/20 text-gray-300';

  return (
    <section className="border-b border-white/10 bg-[#0d1117] overflow-y-auto" style={{ maxHeight: '45%', minHeight: '200px' }}>
      <div className="p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
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
        <p className="text-gray-300 leading-relaxed mb-5 text-sm">{theory.intro}</p>

        {/* Sections */}
        {theory.sections.map((section, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-white/10 text-xs flex items-center justify-center text-gray-400">{i + 1}</span>
              {section.heading}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">{section.content}</p>
            {section.code && <CodeBlock code={section.code} />}
            {section.breakdown?.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Code Breakdown</p>
                <BreakdownTable items={section.breakdown} />
              </div>
            )}
          </div>
        ))}

        {/* Tip */}
        {theory.tip && (
          <div className="flex gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg mt-4">
            <span className="text-lg flex-shrink-0">💡</span>
            <p className="text-yellow-200/80 text-xs leading-relaxed">{theory.tip}</p>
          </div>
        )}
      </div>
    </section>
  );
}
