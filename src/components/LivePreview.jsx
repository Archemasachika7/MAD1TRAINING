import React from 'react';

export default function LivePreview({ code, language }) {
  // If Python, we simulate a terminal output for now. 
  // (In production, this is where Pyodide integration goes)
  if (language === 'python') {
    return (
      <div className="flex-1 bg-black p-4 font-mono text-green-400 overflow-y-auto">
        <div className="text-gray-500 mb-2"># Terminal Output</div>
        <pre>{`$ python main.py\n> Execution simulated for UI preview.`}</pre>
      </div>
    );
  }

  // HTML/Bootstrap Execution
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { background-color: #121212; color: #ffffff; padding: 1.5rem; font-family: system-ui, sans-serif; }
        </style>
      </head>
      <body>
        ${code}
      </body>
    </html>
  `;

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute top-0 left-0 w-full bg-gray-100 border-b border-gray-300 px-3 py-1 text-xs text-gray-500 flex gap-2 items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        <span className="ml-2">Live Render</span>
      </div>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        className="w-full h-full border-none pt-7"
      />
    </div>
  );
}
