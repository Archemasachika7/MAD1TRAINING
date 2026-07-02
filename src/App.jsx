import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import LessonTheory from './components/LessonTheory';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import AssignmentPanel from './components/AssignmentPanel';
import ProblemView from './components/ProblemView';
import { tracks as baseTracks } from './data/curriculum';
import { extraChapters } from './data/curriculumExtra';
import { pdsaExtraChapters } from './data/pdsaExtra';
import { pdsaAdvancedChapters } from './data/pdsaAdvanced';
import { dsaProblems } from './data/dsaProblems';
import { assignments } from './data/assignments';

// Chapters whose lessons are interactive demos, not coding exercises:
// they render the visualizer directly with no playground/assignment.
const VIZ_CHAPTER_IDS = new Set(['pdsa-viz', 'pdsa-adv-viz', 'pdsa-theory']);
// The old solved-example problem chapter is superseded by the Practice Arena.
const RETIRED_CHAPTER_IDS = new Set(['pdsa-coding']);

const markViz = (chapters) => chapters
  .filter(c => !RETIRED_CHAPTER_IDS.has(c.id))
  .map(c => VIZ_CHAPTER_IDS.has(c.id)
    ? { ...c, lessons: c.lessons.map(l => ({ ...l, viz: true })) }
    : c);

// Merge extra chapters into base tracks
const tracks = baseTracks.map(track => {
  const extra = extraChapters[track.id] || [];
  const pdsa = track.id === 'pdsa' ? markViz([...pdsaExtraChapters, ...pdsaAdvancedChapters]) : [];
  const added = [...extra, ...pdsa];
  return added.length ? { ...track, chapters: [...track.chapters, ...added] } : track;
});

const webdevTracks = tracks.filter(t => t.id !== 'pdsa');
const dsaTracks = tracks.filter(t => t.id === 'pdsa');
const SECTION_TRACKS = { webdev: webdevTracks, dsa: dsaTracks };

const firstLessonOf = (sectionTracks) => {
  const t = sectionTracks[0];
  return { lesson: t.chapters[0].lessons[0], trackId: t.id };
};

// bottom panel mode: null (hidden) | 'playground' | 'assignment'
export default function App() {
  const [section, setSection] = useState('webdev');
  const initial = firstLessonOf(webdevTracks);
  const [currentLesson, setCurrentLesson] = useState(initial.lesson);
  const [currentTrackId, setCurrentTrackId] = useState(initial.trackId);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [code, setCode] = useState(initial.lesson.defaultCode);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [runSignal, setRunSignal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [panelMode, setPanelMode] = useState(null); // null | 'playground' | 'assignment'

  const sectionTracks = SECTION_TRACKS[section];

  const handleLessonChange = useCallback((lesson, trackId) => {
    setCurrentLesson(lesson);
    setCurrentTrackId(trackId);
    setCurrentProblem(null);
    setCode(lesson.defaultCode);
    setRunSignal(0);
    setPanelMode(null);
  }, []);

  const handleSectionChange = useCallback((next) => {
    if (next === section) return;
    setSection(next);
    const { lesson, trackId } = firstLessonOf(SECTION_TRACKS[next]);
    setCurrentLesson(lesson);
    setCurrentTrackId(trackId);
    setCurrentProblem(null);
    setCode(lesson.defaultCode);
    setRunSignal(0);
    setPanelMode(null);
  }, [section]);

  const handleSelectProblem = useCallback((problem) => {
    setCurrentProblem(problem);
    setPanelMode(null);
  }, []);

  const handleProblemSolved = useCallback((problemId) => {
    setSolvedProblems(prev => {
      if (prev.has(problemId)) return prev;
      const next = new Set(prev);
      next.add(problemId);
      return next;
    });
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

  const allLessons = sectionTracks.flatMap(t =>
    t.chapters.flatMap(c => c.lessons.map(l => ({ ...l, trackId: t.id })))
  );
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isVizLesson = !!currentLesson.viz;
  const currentAssignment = !isVizLesson ? (assignments[currentLesson.id] || null) : null;

  const panelOpen = panelMode !== null;

  return (
    <div className="flex h-screen arena-bg text-gray-200 font-sans overflow-hidden">
      <Sidebar
        section={section}
        onSectionChange={handleSectionChange}
        tracks={sectionTracks}
        currentLesson={currentProblem ? null : currentLesson}
        onSelectLesson={handleLessonChange}
        completedLessons={completedLessons}
        problems={dsaProblems}
        currentProblem={currentProblem}
        onSelectProblem={handleSelectProblem}
        solvedProblems={solvedProblems}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Practice Arena problem view ── */}
        {currentProblem && (
          <ProblemView
            problem={currentProblem}
            isSolved={solvedProblems.has(currentProblem.id)}
            onSolved={handleProblemSolved}
          />
        )}

        {/* ── Visualizer lesson: theory + always-on interactive demo ── */}
        {!currentProblem && isVizLesson && (
          <>
            <div className="flex flex-col min-h-0 flex-[0_0_35%]">
              <LessonTheory
                lesson={currentLesson}
                trackId={currentTrackId}
                onMarkComplete={handleMarkComplete}
                isCompleted={completedLessons.has(currentLesson.id)}
                vizMode
              />
            </div>
            <div className="flex flex-1 min-h-0 border-t border-white/10 relative">
              <div className="absolute top-3 left-4 z-10">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  🎮 Interactive Visualizer — Experiment Freely
                </span>
              </div>
              <LivePreview code={currentLesson.defaultCode} language="html" runSignal={0} />
            </div>
          </>
        )}

        {/* ── Regular lesson view ── */}
        {!currentProblem && !isVizLesson && (
          <>
            <div className={`flex flex-col min-h-0 transition-all duration-300 ${panelOpen ? 'flex-[0_0_42%]' : 'flex-1'}`}>
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
              <div className="flex flex-col flex-1 min-h-0 border-t border-white/10 editor-glow">
                {/* Tab bar */}
                <div className="flex items-center bg-[#0f141f] border-b border-white/10 flex-shrink-0 px-2">
                  <button
                    onClick={() => setPanelMode('playground')}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all ${
                      panelMode === 'playground'
                        ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/3'
                    }`}
                  >
                    <span>⚡ Playground</span>
                  </button>
                  {currentAssignment && (
                    <button
                      onClick={() => setPanelMode('assignment')}
                      className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all ${
                        panelMode === 'assignment'
                          ? 'border-purple-400 text-purple-300 bg-purple-500/10'
                          : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/3'
                      }`}
                    >
                      <span>📝 Assignment</span>
                    </button>
                  )}
                  <div className="flex-1" />
                  {panelMode === 'playground' && currentLesson.language !== 'html' && (
                    <button
                      onClick={handleRun}
                      disabled={isRunning}
                      className={`flex items-center gap-2 text-xs mr-2 px-4 py-2 rounded-lg font-bold transition-all ${
                        isRunning
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-lg shadow-emerald-500/30'
                      }`}
                    >
                      {isRunning
                        ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Running...</>
                        : <><span>▶</span> Run Code</>}
                    </button>
                  )}
                  {panelMode === 'playground' && currentLesson.language === 'html' && (
                    <span className="text-xs font-bold text-emerald-400 mr-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Live Preview Active
                    </span>
                  )}
                  <button
                    onClick={() => setPanelMode(null)}
                    className="text-gray-500 hover:text-white text-xl px-3 transition-colors"
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
                        hideRunButton
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
          </>
        )}

        {/* Bottom nav (lessons only) */}
        {!currentProblem && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-[#0f141f] flex-shrink-0">
            <button
              onClick={() => prevLesson && handleLessonChange(prevLesson, prevLesson.trackId)}
              disabled={!prevLesson}
              className="text-xs font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span className="text-lg">←</span> {prevLesson?.title || 'Start'}
            </button>
            <span className="text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded">{currentIndex + 1} / {allLessons.length}</span>
            <button
              onClick={() => nextLesson && handleLessonChange(nextLesson, nextLesson.trackId)}
              disabled={!nextLesson}
              className="text-xs font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {nextLesson?.title || 'End'} <span className="text-lg">→</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
