import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import LessonTheory from './components/LessonTheory';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import { tracks } from './data/curriculum';

const firstTrack = tracks[0];
const firstLesson = firstTrack.chapters[0].lessons[0];

export default function App() {
  const [currentLesson, setCurrentLesson] = useState(firstLesson);
  const [currentTrackId, setCurrentTrackId] = useState(firstTrack.id);
  const [code, setCode] = useState(firstLesson.defaultCode);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [runSignal, setRunSignal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleLessonChange = useCallback((lesson, trackId) => {
    setCurrentLesson(lesson);
    setCurrentTrackId(trackId);
    setCode(lesson.defaultCode);
    setRunSignal(0);
  }, []);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setRunSignal(s => s + 1);
    setTimeout(() => setIsRunning(false), 600);
  }, []);

  const handleMarkComplete = useCallback(() => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(currentLesson.id)) {
        next.delete(currentLesson.id);
      } else {
        next.add(currentLesson.id);
      }
      return next;
    });
  }, [currentLesson.id]);

  const allLessons = tracks.flatMap(t =>
    t.chapters.flatMap(c => c.lessons.map(l => ({ ...l, trackId: t.id })))
  );
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-200 font-sans overflow-hidden">
      <Sidebar
        tracks={tracks}
        currentLesson={currentLesson}
        onSelectLesson={handleLessonChange}
        completedLessons={completedLessons}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <LessonTheory
          lesson={currentLesson}
          trackId={currentTrackId}
          onMarkComplete={handleMarkComplete}
          isCompleted={completedLessons.has(currentLesson.id)}
        />

        <section className="flex-1 flex min-h-0">
          <CodeEditor
            code={code}
            setCode={setCode}
            language={currentLesson.language}
            onRun={handleRun}
            isRunning={isRunning}
          />
          <LivePreview
            code={code}
            language={currentLesson.language}
            runSignal={runSignal}
          />
        </section>

        <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-[#161b22] flex-shrink-0">
          <button
            onClick={() => prevLesson && handleLessonChange(prevLesson, prevLesson.trackId)}
            disabled={!prevLesson}
            className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            ← {prevLesson?.title || 'First lesson'}
          </button>
          <span className="text-xs text-gray-600">
            {currentIndex + 1} / {allLessons.length} lessons
          </span>
          <button
            onClick={() => nextLesson && handleLessonChange(nextLesson, nextLesson.trackId)}
            disabled={!nextLesson}
            className="text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            {nextLesson?.title || 'Last lesson'} →
          </button>
        </div>
      </main>
    </div>
  );
}
