import React, { useEffect, useRef, useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';

const DIFF_COLORS = {
  Easy:   'bg-green-500/20 text-green-300 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Hard:   'bg-red-500/20 text-red-300 border-red-500/30',
};

// Dedicated Pyodide runner for judging submissions
const JUDGE_RUNNER = `<!DOCTYPE html>
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
    window.parent.postMessage({ type: 'judge-ready' }, '*');
  } catch(e) {
    window.parent.postMessage({ type: 'judge-fatal', text: 'Failed to load Python runtime: ' + e.message }, '*');
  }
}

window.addEventListener('message', async (e) => {
  if (e.data.type !== 'judge-run') return;
  const output = [];
  pyodide.setStdout({ batched: (s) => output.push(s) });
  pyodide.setStderr({ batched: (s) => output.push(s) });
  try {
    await pyodide.runPythonAsync(e.data.code);
    window.parent.postMessage({ type: 'judge-output', text: output.join('\\n') }, '*');
  } catch(err) {
    window.parent.postMessage({ type: 'judge-output', text: output.join('\\n'), error: err.message }, '*');
  }
});

init();
</script>
</body>
</html>`;

function buildJudgeCode(userCode, functionName, tests) {
  const testsJson = JSON.stringify(tests);
  return (
    userCode +
    '\n\n# ────────── judge harness (auto-appended) ──────────\n' +
    'import json as __json\n' +
    'def __run_judge():\n' +
    '    __tests = __json.loads(' + JSON.stringify(testsJson) + ')\n' +
    '    __results = []\n' +
    '    __fn = globals().get(' + JSON.stringify(functionName) + ')\n' +
    '    if __fn is None:\n' +
    '        print("__JUDGE__" + __json.dumps({"fatal": "function ' + functionName + ' is not defined"}))\n' +
    '        return\n' +
    '    for __t in __tests:\n' +
    '        try:\n' +
    '            __got = __fn(*__t["args"])\n' +
    '            __results.append({"ok": bool(__got == __t["expected"]), "got": repr(__got)})\n' +
    '        except Exception as __e:\n' +
    '            __results.append({"ok": False, "error": type(__e).__name__ + ": " + str(__e)})\n' +
    '    print("__JUDGE__" + __json.dumps({"results": __results}))\n' +
    '__run_judge()\n'
  );
}

function pyLiteral(v) {
  // JSON → Python-ish literal for display (true→True, null→None)
  return JSON.stringify(v).replace(/\btrue\b/g, 'True').replace(/\bfalse\b/g, 'False').replace(/\bnull\b/g, 'None');
}

export default function ProblemView({ problem, isSolved, onSolved }) {
  const iframeRef = useRef(null);
  const [code, setCode] = useState(problem.starterCode);
  const [status, setStatus] = useState('loading');   // loading | ready | running
  const [verdict, setVerdict] = useState(null);      // null | {kind, results, mode, error}
  const [showSolution, setShowSolution] = useState(false);
  const [solutionArmed, setSolutionArmed] = useState(false);
  const pendingMode = useRef(null);

  // Reset editor + verdict when switching problems
  useEffect(() => {
    setCode(problem.starterCode);
    setVerdict(null);
    setShowSolution(false);
    setSolutionArmed(false);
  }, [problem.id]);

  useEffect(() => {
    const handler = (e) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (e.data.type === 'judge-ready') setStatus('ready');
      if (e.data.type === 'judge-fatal') {
        setStatus('ready');
        setVerdict({ kind: 'error', error: e.data.text });
      }
      if (e.data.type === 'judge-output') {
        setStatus('ready');
        const mode = pendingMode.current;
        const marker = (e.data.text || '').split('\n').find(l => l.startsWith('__JUDGE__'));
        if (!marker) {
          setVerdict({ kind: 'error', error: e.data.error || 'No judge output — your code may have crashed before the tests ran.', mode });
          return;
        }
        const payload = JSON.parse(marker.slice('__JUDGE__'.length));
        if (payload.fatal) {
          setVerdict({ kind: 'error', error: payload.fatal, mode });
          return;
        }
        const results = payload.results;
        const passed = results.filter(r => r.ok).length;
        const allPass = passed === results.length;
        setVerdict({
          kind: allPass ? (mode === 'submit' ? 'accepted' : 'samples-pass') : 'wrong',
          results, passed, total: results.length, mode,
        });
        if (allPass && mode === 'submit') onSolved(problem.id);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [problem.id, onSolved]);

  const run = useCallback((mode) => {
    if (status !== 'ready') return;
    const tests = mode === 'submit'
      ? [...problem.publicTests, ...problem.hiddenTests]
      : problem.publicTests;
    pendingMode.current = mode;
    setStatus('running');
    setVerdict(null);
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'judge-run', code: buildJudgeCode(code, problem.functionName, tests) }, '*'
    );
  }, [status, code, problem]);

  const diffColor = DIFF_COLORS[problem.difficulty] || DIFF_COLORS.Easy;
  const publicCount = problem.publicTests.length;

  return (
    <div className="flex flex-1 min-h-0 arena-bg">
      {/* ── Left: problem statement ── */}
      <div className="w-[45%] flex flex-col border-r border-white/10 overflow-y-auto bg-[#0d1117]/80 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${diffColor}`}>{problem.difficulty}</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">{problem.topic}</span>
            {isSolved && <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-1.5"><span>✓</span> Solved</span>}
          </div>
          <h1 className="text-xl font-extrabold text-white mb-5 tracking-tight">{problem.title}</h1>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">{problem.statement}</p>

          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Function Signature</h3>
          <pre className="text-sm font-mono text-blue-300 bg-[#0a0e14] border border-white/10 rounded-lg px-4 py-3 mb-6 overflow-x-auto shadow-inner">{problem.inputFormat}</pre>

          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sample Tests</h3>
          <div className="rounded-lg overflow-hidden border border-white/10 mb-6 shadow-lg">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="bg-gradient-to-r from-white/8 to-transparent border-b border-white/10 text-gray-400">
                  <th className="text-left px-4 py-3 font-bold">#</th>
                  <th className="text-left px-4 py-3 font-bold">Input (args)</th>
                  <th className="text-left px-4 py-3 font-bold">Expected</th>
                </tr>
              </thead>
              <tbody>
                {problem.publicTests.map((t, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 text-gray-500 align-top font-bold">{i + 1}</td>
                    <td className="px-4 py-3 text-gray-300 align-top break-all">{t.args.map(pyLiteral).join(', ')}</td>
                    <td className="px-4 py-3 text-emerald-300 align-top break-all font-semibold">{pyLiteral(t.expected)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            + {problem.hiddenTests.length} hidden tests judged on Submit
          </p>

          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Constraints</h3>
          <ul className="mb-8 space-y-2">
            {problem.constraints.map((c, i) => (
              <li key={i} className="text-xs text-gray-400 font-mono flex gap-2 items-center"><span className="text-cyan-500">▸</span>{c}</li>
            ))}
          </ul>

          {/* Hidden solution */}
          <div className="border-t border-white/10 pt-5">
            {!showSolution ? (
              <button
                onClick={() => solutionArmed ? setShowSolution(true) : setSolutionArmed(true)}
                className={`text-xs px-5 py-2.5 rounded-lg font-bold border transition-all ${
                  solutionArmed
                    ? 'bg-red-500/15 text-red-300 border-red-500/30 hover:bg-red-500/20'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-gray-200 hover:bg-white/10'
                }`}
              >
                {solutionArmed ? '⚠️ Really reveal? Click again to confirm' : '🔒 Show Solution'}
              </button>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Solution</h3>
                  <button onClick={() => { setShowSolution(false); setSolutionArmed(false); }} className="text-xs text-gray-500 hover:text-gray-300 font-medium">hide</button>
                </div>
                <pre className="text-xs font-mono text-gray-200 bg-[#0a0e14] border border-white/10 rounded-lg p-4 overflow-x-auto leading-relaxed shadow-inner">{problem.solution}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right: editor + verdict ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0f141f] flex-shrink-0">
          <span className="text-xs font-mono text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
            solution.py
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono mr-2 flex items-center gap-1.5 ${
              status === 'loading' ? 'text-yellow-400' :
              status === 'running' ? 'text-blue-400' : 'text-green-400'
            }`}>
              {status === 'loading' && <span className="w-2 h-2 border-2 border-yellow-400/50 border-t-yellow-400 rounded-full animate-spin" />}
              {status === 'running' && <span className="w-2 h-2 border-2 border-blue-400/50 border-t-blue-400 rounded-full animate-spin" />}
              {status === 'loading' ? 'Loading runtime...' : status === 'running' ? 'Judging...' : 'Ready'}
            </span>
            <button
              onClick={() => run('samples')}
              disabled={status !== 'ready'}
              className="text-xs px-4 py-2 rounded-lg font-bold bg-white/10 text-gray-200 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-white/10"
            >
              ▶ Run Samples
            </button>
            <button
              onClick={() => run('submit')}
              disabled={status !== 'ready'}
              className="text-xs px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-400 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/30"
            >
              {status === 'running' ? <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Judging</span> : '🚀 Submit'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            theme="vs-dark"
            language="python"
            value={code}
            onChange={(v) => setCode(v || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              wordWrap: 'on',
              padding: { top: 12 },
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures: true,
              scrollBeyondLastLine: false,
              bracketPairColorization: { enabled: true },
              smoothScrolling: true,
            }}
          />
        </div>

        {/* Verdict panel */}
        <div className="flex-shrink-0 border-t border-white/10 bg-[#0d1117] max-h-[40%] overflow-y-auto">
          {!verdict && (
            <div className="px-5 py-4 text-xs text-gray-500">
              {status === 'loading'
                ? 'Initializing Python runtime (~5 sec on first load)…'
                : 'Run Samples to test against the visible cases, or Submit to be judged on all ' + (publicCount + problem.hiddenTests.length) + ' tests.'}
            </div>
          )}

          {verdict?.kind === 'error' && (
            <div className="m-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-sm font-bold text-red-300 mb-2 flex items-center gap-2">
                <span>⚠️</span> Runtime / Compile Error
              </div>
              <pre className="text-xs font-mono text-red-300/80 whitespace-pre-wrap">{verdict.error}</pre>
            </div>
          )}

          {verdict?.results && (
            <div className="p-4">
              <div className={`px-5 py-3 rounded-lg font-bold text-sm mb-3 border ${
                verdict.kind === 'accepted' ? 'bg-green-500/15 text-green-300 border-green-500/30 shadow-lg shadow-green-500/20' :
                verdict.kind === 'samples-pass' ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' :
                'bg-red-500/15 text-red-300 border-red-500/30'
              }`}>
                {verdict.kind === 'accepted' && '✅ Accepted — all ' + verdict.total + ' tests passed!'}
                {verdict.kind === 'samples-pass' && '✓ Samples passed (' + verdict.passed + '/' + verdict.total + ') — now Submit to face the hidden tests'}
                {verdict.kind === 'wrong' && '❌ ' + (verdict.mode === 'submit' ? 'Wrong Answer' : 'Samples Failed') + ' — ' + verdict.passed + '/' + verdict.total + ' passed'}
              </div>
              <div className="space-y-1.5">
                {verdict.results.map((r, i) => {
                  const isHidden = verdict.mode === 'submit' && i >= publicCount;
                  const label = isHidden ? 'Hidden test ' + (i - publicCount + 1) : 'Sample ' + (i + 1);
                  const t = !isHidden ? problem.publicTests[i] : null;
                  return (
                    <div key={i} className={`flex items-start gap-3 px-4 py-2 rounded text-xs font-mono ${r.ok ? 'bg-green-500/5 text-green-300/90' : 'bg-red-500/5 text-red-300/90'}`}>
                      <span className="flex-shrink-0 font-bold text-base">{r.ok ? '✓' : '✗'}</span>
                      <span className="flex-shrink-0 text-gray-400 font-bold">{label}</span>
                      {!r.ok && !isHidden && t && (
                        <span className="break-all">
                          input: {t.args.map(pyLiteral).join(', ')} · expected {pyLiteral(t.expected)} · {r.error ? r.error : 'got ' + r.got}
                        </span>
                      )}
                      {!r.ok && isHidden && <span className="text-gray-500">{r.error ? 'runtime error' : 'wrong output'} (details hidden)</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Hidden judge iframe */}
        <iframe ref={iframeRef} srcDoc={JUDGE_RUNNER} sandbox="allow-scripts" className="hidden" title="judge-runner" />
      </div>
    </div>
  );
}
