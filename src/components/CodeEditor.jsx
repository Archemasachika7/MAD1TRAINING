import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ code, setCode, language }) {
  return (
    <div className="flex-1 border-r border-dark-border flex flex-col bg-dark-surface">
      <div className="flex justify-between items-center px-4 py-2 border-b border-dark-border">
        <span className="text-xs font-mono text-gray-400">
          main.{language === 'python' ? 'py' : 'html'}
        </span>
        <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white px-5 py-1.5 rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          Run Code
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            padding: { top: 16 },
            fontFamily: 'Fira Code, monospace',
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}
