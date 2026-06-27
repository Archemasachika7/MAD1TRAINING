import React from 'react';

export default function LessonTheory({ lesson }) {
  return (
    <section className="h-[30%] p-8 overflow-y-auto bg-dark-bg">
      <h1 className="text-3xl font-semibold mb-3 tracking-tight">{lesson.title}</h1>
      <p className="text-gray-400 leading-relaxed max-w-4xl text-lg">
        {/* In a full app, you would pass this through a Markdown parser like react-markdown */}
        {lesson.theory}
      </p>
    </section>
  );
}
