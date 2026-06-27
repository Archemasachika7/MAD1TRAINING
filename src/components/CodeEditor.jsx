import React from 'react';
import Editor from '@monaco-editor/react';

const LANG_LABELS = {
  html: 'index.html',
  python: 'main.py',
  sql: 'query.sql',
};

export default function CodeEditor({ code, setCode, language, onRun, isRunning }) {
  return (
    <div className="flex-1 border-r border-white/10 flex flex-col bg-[#161b22] min-w-0">
      {/* Toolbar */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-mono text-gray-500 ml-1">
            {LANG_LABELS[language] || 'main.txt'}
          </span>
        </div>
        {language !== 'html' && (
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`flex items-center gap-2 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-all shadow-lg ${
              isRunning
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-emerald-500/20'
            }`}
          >
            {isRunning ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Running...
              </>
            ) : (
              <>▶ Run</>
            )}
          </button>
        )}
        {language === 'html' && (
          <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
            ⚡ Live preview
          </span>
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          language={language === 'sql' ? 'sql' : language}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            wordWrap: 'on',
            padding: { top: 12 },
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontLigatures: true,
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            bracketPairColorization: { enabled: true },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
          }}
        />
      </div>
    </div>
  );
}
