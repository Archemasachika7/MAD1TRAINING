import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LessonTheory from './components/LessonTheory';
import CodeEditor from './components/CodeEditor';
import LivePreview from './components/LivePreview';
import { lessons } from './data/curriculum';

export default function App() {
  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [code, setCode] = useState(currentLesson.defaultCode);

  // Handle lesson switching
  const handleLessonChange = (lesson) => {
    setCurrentLesson(lesson);
    setCode(lesson.defaultCode);
  };

  return (
    <div className="flex h-screen bg-dark-bg text-gray-200 font-sans overflow-hidden">
      <Sidebar 
        lessons={lessons} 
        currentLesson={currentLesson} 
        onSelectLesson={handleLessonChange} 
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <LessonTheory lesson={currentLesson} />
        
        <section className="flex-1 flex min-h-0 border-t border-dark-border">
          <CodeEditor 
            code={code} 
            setCode={setCode} 
            language={currentLesson.language} 
          />
          <LivePreview 
            code={code} 
            language={currentLesson.language} 
          />
        </section>
      </main>
    </div>
  );
}
