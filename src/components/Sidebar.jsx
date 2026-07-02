import React, { useState } from 'react';

const TRACK_COLORS = {
  orange: { active: 'bg-orange-500/15 text-orange-300 border-orange-500/40', dot: 'bg-orange-400', progress: 'from-orange-500 to-orange-400' },
  purple: { active: 'bg-purple-500/15 text-purple-300 border-purple-500/40', dot: 'bg-purple-400', progress: 'from-purple-500 to-purple-400' },
  green:  { active: 'bg-green-500/15 text-green-300 border-green-500/40',  dot: 'bg-green-400',  progress: 'from-green-500 to-green-400'  },
  yellow: { active: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40', dot: 'bg-yellow-400', progress: 'from-yellow-500 to-yellow-400' },
  blue:   { active: 'bg-blue-500/15 text-blue-300 border-blue-500/40',   dot: 'bg-blue-400',   progress: 'from-blue-500 to-blue-400'   },
  pink:   { active: 'bg-pink-500/15 text-pink-300 border-pink-500/40',   dot: 'bg-pink-400',   progress: 'from-pink-500 to-pink-400'   },
  teal:   { active: 'bg-teal-500/15 text-teal-300 border-teal-500/40',   dot: 'bg-teal-400',   progress: 'from-teal-500 to-teal-400'   },
};

const DIFF_DOT = { Easy: 'text-green-400', Medium: 'text-yellow-400', Hard: 'text-red-400' };

function TrackList({ tracks, currentLesson, onSelectLesson, completedLessons, expandedTrack, setExpandedTrack }) {
  return (
    <>
      {tracks.map(track => {
        const colors = TRACK_COLORS[track.color] || TRACK_COLORS.blue;
        const trackLessons = track.chapters.flatMap(c => c.lessons);
        const trackCompleted = trackLessons.filter(l => completedLessons.has(l.id)).length;
        const trackProgress = trackLessons.length > 0 ? Math.round((trackCompleted / trackLessons.length) * 100) : 0;
        const isExpanded = expandedTrack === track.id;

        return (
          <div key={track.id}>
            <button
              onClick={() => setExpandedTrack(isExpanded ? null : track.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors group border-b border-white/3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl flex-shrink-0 filter drop-shadow-lg">{track.icon}</span>
                <span className="text-sm font-bold text-gray-100 tracking-wide">{track.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">{trackCompleted}/{trackLessons.length}</span>
                <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>›</span>
              </div>
            </button>

            <div className="px-4 pb-2 pt-1">
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${colors.progress} rounded-full transition-all duration-500 shadow-lg`} style={{ width: `${trackProgress}%` }} />
              </div>
            </div>

            {isExpanded && (
              <div className="pb-2">
                {track.chapters.map(chapter => (
                  <div key={chapter.id}>
                    <div className="px-4 py-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{chapter.title}</span>
                    </div>
                    {chapter.lessons.map(lesson => {
                      const isActive = currentLesson?.id === lesson.id;
                      const isDone = completedLessons.has(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson, track.id)}
                          className={`w-full text-left flex items-center gap-3 pl-6 pr-4 py-2.5 text-sm transition-all border-l-2 ${
                            isActive
                              ? `${colors.active} border-current bg-gradient-to-r from-white/5 to-transparent`
                              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/3 hover:border-white/10'
                          }`}
                        >
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            {isDone ? (
                              <span className="text-green-400 text-sm font-bold drop-shadow">✓</span>
                            ) : (
                              <span className={`w-2 h-2 rounded-full ${isActive ? colors.dot : 'bg-gray-600'} shadow-sm`} />
                            )}
                          </span>
                          <span className="truncate font-medium">{lesson.title}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function ProblemList({ problems, currentProblem, onSelectProblem, solvedProblems }) {
  const topics = [...new Set(problems.map(p => p.topic))];
  return (
    <div className="pb-2">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between border-t border-white/5">
        <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Practice Arena
        </span>
        <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">{solvedProblems.size}/{problems.length}</span>
      </div>
      <div className="px-4 pb-3">
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500 shadow-lg"
               style={{ width: `${problems.length ? Math.round(solvedProblems.size / problems.length * 100) : 0}%` }} />
        </div>
      </div>
      {topics.map(topic => (
        <div key={topic}>
          <div className="px-4 py-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{topic}</span>
          </div>
          {problems.filter(p => p.topic === topic).map(problem => {
            const isActive = currentProblem?.id === problem.id;
            const isSolved = solvedProblems.has(problem.id);
            return (
              <button
                key={problem.id}
                onClick={() => onSelectProblem(problem)}
                className={`w-full text-left flex items-center gap-3 pl-6 pr-3 py-2.5 text-sm transition-all border-l-2 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400 bg-gradient-to-r from-cyan-500/10 to-transparent'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/3 hover:border-white/10'
                }`}
              >
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {isSolved
                    ? <span className="text-green-400 text-sm font-bold">✓</span>
                    : <span className={`text-xs font-bold ${DIFF_DOT[problem.difficulty]}`}>●</span>}
                </span>
                <span className="truncate flex-1 font-medium">{problem.title}</span>
                <span className={`text-xs font-bold flex-shrink-0 px-1.5 py-0.5 rounded ${
                  problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {problem.difficulty[0]}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Sidebar({
  section, onSectionChange,
  tracks, currentLesson, onSelectLesson, completedLessons,
  problems, currentProblem, onSelectProblem, solvedProblems,
}) {
  const [expandedTrack, setExpandedTrack] = useState(tracks[0]?.id);

  const totalLessons = tracks.reduce((sum, t) => sum + t.chapters.reduce((s, c) => s + c.lessons.length, 0), 0);
  const completedCount = tracks.reduce((sum, t) =>
    sum + t.chapters.reduce((s, c) => s + c.lessons.filter(l => completedLessons.has(l.id)).length, 0), 0);
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <aside className="w-72 bg-[#0f141f] border-r border-white/10 flex flex-col overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-5 pb-4 border-b border-white/10 bg-gradient-to-b from-white/3 to-transparent">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{section === 'dsa' ? '🧠' : '💻'}</span>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight">{section === 'dsa' ? 'DSA Arena' : 'WebDev Academy'}</h1>
            <p className="text-xs text-gray-500 font-mono">CODEARENA PLATFORM</p>
          </div>
        </div>

        {/* Section switcher - Codeforces style */}
        <div className="flex bg-[#0a0c10] rounded-lg p-1 mb-4 border border-white/10 shadow-inner">
          <button
            onClick={() => onSectionChange('webdev')}
            className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${
              section === 'webdev' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            🌐 Web Dev
          </button>
          <button
            onClick={() => onSectionChange('dsa')}
            className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${
              section === 'dsa' ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            🧠 DSA
          </button>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
          <span className="uppercase tracking-wider">Progress</span>
          <span className="text-cyan-400 font-bold">{completedCount}/{totalLessons}</span>
        </div>
        <div className="h-2 bg-[#0a0c10] rounded-full overflow-hidden border border-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
              section === 'dsa' ? 'from-cyan-500 via-teal-500 to-emerald-500' : 'from-blue-500 via-purple-500 to-pink-500'
            } shadow-lg`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <nav className="flex-1 overflow-y-auto py-2">
        <TrackList
          tracks={tracks}
          currentLesson={currentLesson}
          onSelectLesson={onSelectLesson}
          completedLessons={completedLessons}
          expandedTrack={expandedTrack}
          setExpandedTrack={setExpandedTrack}
        />
        {section === 'dsa' && (
          <div className="mt-2 border-t border-white/10">
            <ProblemList
              problems={problems}
              currentProblem={currentProblem}
              onSelectProblem={onSelectProblem}
              solvedProblems={solvedProblems}
            />
          </div>
        )}
      </nav>
      
      {/* Footer stats */}
      <div className="p-4 border-t border-white/10 bg-[#0a0c10]/50">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-white/3 rounded-lg p-2 border border-white/5">
            <div className="text-lg font-bold text-cyan-400">{completedCount}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Completed</div>
          </div>
          <div className="bg-white/3 rounded-lg p-2 border border-white/5">
            <div className="text-lg font-bold text-purple-400">{solvedProblems.size}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Solved</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
