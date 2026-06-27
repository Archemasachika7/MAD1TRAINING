import React from 'react';

export default function Sidebar({ lessons, currentLesson, onSelectLesson }) {
  return (
    <aside className="w-64 bg-white/5 border-r border-dark-border p-4 flex flex-col gap-4 backdrop-blur-md z-10">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Tracks
      </h2>
      <nav className="flex flex-col gap-2">
        {lessons.map((lesson, idx) => {
          const isActive = currentLesson.id === lesson.id;
          return (
            <button 
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className={`text-left px-3 py-2 rounded-lg transition-all border ${
                isActive 
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
                  : 'border-transparent hover:bg-white/10 text-gray-400'
              }`}
            >
              {idx + 1}. {lesson.track}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
