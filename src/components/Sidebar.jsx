import React, { useState } from 'react';

const TRACK_COLORS = {
  orange: { active: 'bg-orange-500/20 text-orange-300 border-orange-500/30', dot: 'bg-orange-400', progress: 'bg-orange-400' },
  purple: { active: 'bg-purple-500/20 text-purple-300 border-purple-500/30', dot: 'bg-purple-400', progress: 'bg-purple-400' },
  green:  { active: 'bg-green-500/20 text-green-300 border-green-500/30',  dot: 'bg-green-400',  progress: 'bg-green-400'  },
  yellow: { active: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', dot: 'bg-yellow-400', progress: 'bg-yellow-400' },
  blue:   { active: 'bg-blue-500/20 text-blue-300 border-blue-500/30',   dot: 'bg-blue-400',   progress: 'bg-blue-400'   },
  pink:   { active: 'bg-pink-500/20 text-pink-300 border-pink-500/30',   dot: 'bg-pink-400',   progress: 'bg-pink-400'   },
  teal:   { active: 'bg-teal-500/20 text-teal-300 border-teal-500/30',   dot: 'bg-teal-400',   progress: 'bg-teal-400'   },
};

export default function Sidebar({ tracks, currentLesson, onSelectLesson, completedLessons }) {
  const [expandedTrack, setExpandedTrack] = useState(currentLesson?.trackId || tracks[0]?.id);

  const totalLessons = tracks.reduce((sum, t) =>
    sum + t.chapters.reduce((s, c) => s + c.lessons.length, 0), 0);
  const completedCount = completedLessons.size;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <aside className="w-64 bg-[#161b22] border-r border-white/10 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📚</span>
          <h1 className="text-base font-bold text-white">WebDev Academy</h1>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Overall Progress</span>
          <span className="font-mono">{completedCount}/{totalLessons}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Track list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {tracks.map(track => {
          const colors = TRACK_COLORS[track.color] || TRACK_COLORS.blue;
          const trackLessons = track.chapters.flatMap(c => c.lessons);
          const trackCompleted = trackLessons.filter(l => completedLessons.has(l.id)).length;
          const trackProgress = trackLessons.length > 0 ? Math.round((trackCompleted / trackLessons.length) * 100) : 0;
          const isExpanded = expandedTrack === track.id;

          return (
            <div key={track.id}>
              {/* Track header */}
              <button
                onClick={() => setExpandedTrack(isExpanded ? null : track.id)}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base flex-shrink-0">{track.icon}</span>
                  <span className="text-sm font-semibold text-gray-200 truncate">{track.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500">{trackCompleted}/{trackLessons.length}</span>
                  <span className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>›</span>
                </div>
              </button>

              {/* Track progress bar */}
              <div className="px-4 pb-1">
                <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors.progress} rounded-full transition-all duration-500`}
                    style={{ width: `${trackProgress}%` }}
                  />
                </div>
              </div>

              {/* Chapters + lessons */}
              {isExpanded && (
                <div className="pb-1">
                  {track.chapters.map(chapter => (
                    <div key={chapter.id}>
                      <div className="px-4 py-1.5">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {chapter.title}
                        </span>
                      </div>
                      {chapter.lessons.map((lesson, idx) => {
                        const isActive = currentLesson?.id === lesson.id;
                        const isDone = completedLessons.has(lesson.id);
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onSelectLesson(lesson, track.id)}
                            className={`w-full text-left flex items-center gap-2.5 pl-6 pr-4 py-2 text-sm transition-all border-l-2 ${
                              isActive
                                ? `${colors.active} border-current`
                                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
                            }`}
                          >
                            <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                              {isDone ? (
                                <span className="text-green-400 text-xs">✓</span>
                              ) : (
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? colors.dot : 'bg-gray-600'}`} />
                              )}
                            </span>
                            <span className="truncate">{lesson.title}</span>
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
      </nav>
    </aside>
  );
}
