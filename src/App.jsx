import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import LessonTheory from './components/LessonTheory';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import AssignmentPanel from './components/AssignmentPanel';
import { tracks } from './data/curriculum';
import { assignments } from './data/assignments';

const firstTrack = tracks[0];
const firstLesson = firstTrack.chapters[0].lessons[0];

// bottom panel mode: null (hidden) | 'playground' | 'assignment'
export default function App() {
  const [currentLesson, setCurrentLesson] = useState(firstLesson);
  const [currentTrackId, setCurrentTrackId] = useState(firstTrack.id);
  const [code, setCode] = useState(firstLesson.defaultCode);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [runSignal, setRunSignal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [panelMode, setPanelMode] = useState(null); // null | 'playground' | 'assignment'

  const handleLessonChange = useCallback((lesson, trackId) => {
    setCurrentLesson(lesson);
    setCurrentTrackId(trackId);
    setCode(lesson.defaultCode);
    setRunSignal(0);
    setPanelMode(null);
  }, []);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setRunSignal(s => s + 1);
    setTimeout(() => setIsRunning(false), 600);
  }, []);

  const handleMarkComplete = useCallback(() => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(currentLesson.id)) next.delete(currentLesson.id);
      else next.add(currentLesson.id);
      return next;
    });
  }, [currentLesson.id]);

  const togglePanel = useCallback((mode) => {
    setPanelMode(prev => prev === mode ? null : mode);
  }, []);

  const handleUseStarterCode = useCallback((starterCode) => {
    if (starterCode) {
      setCode(starterCode);
      setPanelMode('playground');
    }
  }, []);

  const allLessons = tracks.flatMap(t =>
    t.chapters.flatMap(c => c.lessons.map(l => ({ ...l, trackId: t.id })))
  );
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const currentAssignment = assignments[currentLesson.id] || null;

  const panelOpen = panelMode !== null;

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-200 font-sans overflow-hidden">
      <Sidebar
        tracks={tracks}
        currentLesson={currentLesson}
        onSelectLesson={handleLessonChange}
        completedLessons={completedLessons}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Theory panel — full width, takes remaining height when panel closed */}
        <div className={`flex flex-col min-h-0 transition-all duration-300 ${panelOpen ? 'flex-[0_0_45%]' : 'flex-1'}`}>
          <LessonTheory
            lesson={currentLesson}
            trackId={currentTrackId}
            onMarkComplete={handleMarkComplete}
            isCompleted={completedLessons.has(currentLesson.id)}
            panelMode={panelMode}
            onTogglePlayground={() => togglePanel('playground')}
            onToggleAssignment={() => togglePanel('assignment')}
            hasAssignment={!!currentAssignment}
          />
        </div>

        {/* Bottom panel — editor + preview OR assignment */}
        {panelOpen && (
          <div className="flex flex-col flex-1 min-h-0 border-t border-white/10">
            {/* Tab bar */}
            <div className="flex items-center bg-[#161b22] border-b border-white/10 flex-shrink-0">
              <button
                onClick={() => setPanelMode('playground')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  panelMode === 'playground'
                    ? 'border-blue-400 text-blue-300'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                ⚡ Playground
              </button>
              {currentAssignment && (
                <button
                  onClick={() => setPanelMode('assignment')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                    panelMode === 'assignment'
                      ? 'border-purple-400 text-purple-300'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  📝 Assignment
                </button>
              )}
              <div className="flex-1" />
              {panelMode === 'playground' && currentLesson.language !== 'html' && (
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className={`flex items-center gap-1.5 text-xs mr-3 px-3 py-1.5 rounded-md font-semibold transition-all ${
                    isRunning
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isRunning
                    ? <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Running...</>
                    : '▶ Run'}
                </button>
              )}
              {panelMode === 'playground' && currentLesson.language === 'html' && (
                <span className="text-xs text-gray-600 mr-3">⚡ live</span>
              )}
              <button
                onClick={() => setPanelMode(null)}
                className="text-gray-500 hover:text-white text-lg px-3 transition-colors"
                title="Close panel"
              >
                ×
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 flex min-h-0">
              {panelMode === 'playground' && (
                <>
                  <CodeEditor
                    code={code}
                    setCode={setCode}
                    language={currentLesson.language}
                    onRun={handleRun}
                    isRunning={isRunning}
                    hideRunButton  // run button is in tab bar now
                  />
                  <LivePreview
                    code={code}
                    language={currentLesson.language}
                    runSignal={runSignal}
                  />
                </>
              )}
              {panelMode === 'assignment' && (
                <>
                  <AssignmentPanel
                    assignment={currentAssignment}
                    onUseStarterCode={handleUseStarterCode}
                  />
                  <div className="flex flex-col flex-1 min-w-0 border-l border-white/10">
                    <CodeEditor
                      code={code}
                      setCode={setCode}
                      language={currentLesson.language}
                      onRun={handleRun}
                      isRunning={isRunning}
                      hideRunButton
                    />
                    <div className="flex-1 border-t border-white/10">
                      <LivePreview
                        code={code}
                        language={currentLesson.language}
                        runSignal={runSignal}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-[#161b22] flex-shrink-0">
          <button
            onClick={() => prevLesson && handleLessonChange(prevLesson, prevLesson.trackId)}
            disabled={!prevLesson}
            className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← {prevLesson?.title || 'Start'}
          </button>
          <span className="text-xs text-gray-600">{currentIndex + 1} / {allLessons.length}</span>
          <button
            onClick={() => nextLesson && handleLessonChange(nextLesson, nextLesson.trackId)}
            disabled={!nextLesson}
            className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {nextLesson?.title || 'End'} →
          </button>
        </div>
      </main>
    </div>
  );
}
