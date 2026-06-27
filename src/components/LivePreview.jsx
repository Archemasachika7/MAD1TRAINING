import React, { useEffect, useRef, useState, useCallback } from 'react';

// HTML/Bootstrap/Chart.js → live iframe
function HtmlPreview({ code }) {
  const srcDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { background: #fff; }
  </style>
</head>
<body>
  ${code}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>`;

  // If code already has <!DOCTYPE, use it directly
  const isFullPage = code.trim().toLowerCase().startsWith('<!doctype') || code.trim().toLowerCase().startsWith('<html');
  const finalDoc = isFullPage ? code : srcDoc;

  return (
    <div className="flex-1 flex flex-col bg-white relative">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border-b border-gray-200 flex-shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-500">Live Preview</span>
      </div>
      <iframe
        srcDoc={finalDoc}
        title="output"
        sandbox="allow-scripts allow-same-origin"
        className="flex-1 w-full border-none"
      />
    </div>
  );
}

// Python → Pyodide in iframe via postMessage
const PYODIDE_RUNNER = `<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js"></script>
</head>
<body>
<script>
let pyodide = null;

async function init() {
  try {
    pyodide = await loadPyodide();
    window.parent.postMessage({ type: 'ready' }, '*');
  } catch(e) {
    window.parent.postMessage({ type: 'error', text: 'Failed to load Pyodide: ' + e.message }, '*');
  }
}

window.addEventListener('message', async (e) => {
  if (e.data.type !== 'run') return;

  const output = [];
  pyodide.setStdout({ batched: (s) => output.push(s) });
  pyodide.setStderr({ batched: (s) => output.push('ERR: ' + s) });

  try {
    await pyodide.runPythonAsync(e.data.code);
    window.parent.postMessage({ type: 'output', text: output.join('\\n') }, '*');
  } catch(err) {
    window.parent.postMessage({ type: 'output', text: output.join('\\n') + '\\n' + err.message, isError: true }, '*');
  }
});

init();
</script>
</body>
</html>`;

function PythonPreview({ code, runSignal }) {
  const iframeRef = useRef(null);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('loading'); // loading | ready | running | done | error

  useEffect(() => {
    const handler = (e) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (e.data.type === 'ready') setStatus('ready');
      if (e.data.type === 'output') {
        setOutput(e.data.text || '(no output)');
        setStatus(e.data.isError ? 'error' : 'done');
      }
      if (e.data.type === 'error') {
        setOutput(e.data.text);
        setStatus('error');
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    if (runSignal === 0) return;
    if (status !== 'ready' && status !== 'done' && status !== 'error') return;
    setStatus('running');
    setOutput('');
    iframeRef.current?.contentWindow?.postMessage({ type: 'run', code }, '*');
  }, [runSignal]);

  const statusLabels = {
    loading: { text: 'Loading Python runtime (Pyodide)...', color: 'text-yellow-400' },
    ready:   { text: 'Ready — press Run ▶', color: 'text-green-400' },
    running: { text: 'Running...', color: 'text-blue-400' },
    done:    { text: 'Done', color: 'text-green-400' },
    error:   { text: 'Error', color: 'text-red-400' },
  };
  const s = statusLabels[status];

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] min-w-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 flex-shrink-0">
        <span className="text-xs font-mono text-gray-500">Terminal Output</span>
        <span className={`text-xs font-mono ${s.color} flex items-center gap-1.5`}>
          {status === 'loading' && <span className="w-2 h-2 border border-yellow-400/50 border-t-yellow-400 rounded-full animate-spin" />}
          {status === 'running' && <span className="w-2 h-2 border border-blue-400/50 border-t-blue-400 rounded-full animate-spin" />}
          {s.text}
        </span>
      </div>

      <div className="flex-1 p-4 font-mono text-sm text-green-300 overflow-y-auto leading-relaxed">
        {output ? (
          <pre className={`whitespace-pre-wrap ${status === 'error' ? 'text-red-400' : 'text-green-300'}`}>{output}</pre>
        ) : (
          <span className="text-gray-600">
            {status === 'loading' ? 'Initializing Pyodide (~5 sec on first load)...' : 'Output will appear here after Run.'}
          </span>
        )}
      </div>

      {/* Hidden Pyodide iframe */}
      <iframe
        ref={iframeRef}
        srcDoc={PYODIDE_RUNNER}
        sandbox="allow-scripts"
        className="hidden"
        title="pyodide-runner"
      />
    </div>
  );
}

// SQL → sql.js in iframe
const SQL_RUNNER = `<!DOCTYPE html>
<html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js"></script>
</head>
<body>
<script>
let SQL = null;
let db = null;

async function init() {
  try {
    SQL = await initSqlJs({
      locateFile: f => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/' + f
    });
    db = new SQL.Database();
    window.parent.postMessage({ type: 'ready' }, '*');
  } catch(e) {
    window.parent.postMessage({ type: 'error', text: 'Failed to load sql.js: ' + e.message }, '*');
  }
}

window.addEventListener('message', (e) => {
  if (e.data.type !== 'run') return;

  // Reset DB for each run
  if (db) db.close();
  db = new SQL.Database();

  try {
    const results = db.exec(e.data.code);
    window.parent.postMessage({ type: 'output', results }, '*');
  } catch(err) {
    window.parent.postMessage({ type: 'sqlerror', text: err.message }, '*');
  }
});

init();
</script>
</body>
</html>`;

function SqlPreview({ code, runSignal }) {
  const iframeRef = useRef(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const handler = (e) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (e.data.type === 'ready') setStatus('ready');
      if (e.data.type === 'output') {
        setResults(e.data.results);
        setError('');
        setStatus('done');
      }
      if (e.data.type === 'sqlerror') {
        setError(e.data.text);
        setResults(null);
        setStatus('error');
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    if (runSignal === 0) return;
    if (status !== 'ready' && status !== 'done' && status !== 'error') return;
    setStatus('running');
    setResults(null);
    setError('');
    iframeRef.current?.contentWindow?.postMessage({ type: 'run', code }, '*');
  }, [runSignal]);

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] min-w-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 flex-shrink-0">
        <span className="text-xs font-mono text-gray-500">Query Results</span>
        <span className={`text-xs font-mono ${
          status === 'loading' ? 'text-yellow-400' :
          status === 'ready' ? 'text-green-400' :
          status === 'running' ? 'text-blue-400' :
          status === 'error' ? 'text-red-400' : 'text-green-400'
        } flex items-center gap-1.5`}>
          {(status === 'loading' || status === 'running') &&
            <span className="w-2 h-2 border border-current/50 border-t-current rounded-full animate-spin" />}
          {status === 'loading' ? 'Loading sql.js...' :
           status === 'ready' ? 'Ready — press Run ▶' :
           status === 'running' ? 'Running query...' :
           status === 'error' ? 'SQL Error' : 'Done'}
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-red-400 font-mono text-xs">
            ❌ {error}
          </div>
        )}

        {results && results.length === 0 && (
          <p className="text-gray-500 text-sm">Query executed successfully. No rows returned.</p>
        )}

        {results && results.map((result, ri) => (
          <div key={ri} className="mb-4">
            <div className="text-xs text-gray-500 mb-1 font-mono">
              {result.values.length} row{result.values.length !== 1 ? 's' : ''}
            </div>
            <div className="overflow-x-auto rounded border border-white/10">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    {result.columns.map((col, i) => (
                      <th key={i} className="text-left px-3 py-2 text-blue-300 font-semibold uppercase tracking-wider whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.values.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? '' : 'bg-white/3'}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 text-gray-300 whitespace-nowrap">
                          {cell === null ? <span className="text-gray-600 italic">NULL</span> : String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {!error && !results && status !== 'loading' && (
          <span className="text-gray-600 text-sm">Query results will appear here after Run.</span>
        )}

        {status === 'loading' && (
          <span className="text-gray-600 text-sm">Initializing sql.js (~2 sec)...</span>
        )}
      </div>

      <iframe
        ref={iframeRef}
        srcDoc={SQL_RUNNER}
        sandbox="allow-scripts"
        className="hidden"
        title="sql-runner"
      />
    </div>
  );
}

export default function LivePreview({ code, language, runSignal }) {
  if (language === 'html') {
    return <HtmlPreview code={code} />;
  }
  if (language === 'python') {
    return <PythonPreview code={code} runSignal={runSignal} />;
  }
  if (language === 'sql') {
    return <SqlPreview code={code} runSignal={runSignal} />;
  }
  return (
    <div className="flex-1 bg-[#0d1117] flex items-center justify-center">
      <p className="text-gray-500">No preview available for this language.</p>
    </div>
  );
}
