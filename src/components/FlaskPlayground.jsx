import { useState } from "react";
import Editor from "@monaco-editor/react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export default function FlaskPlayground() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    setExplanation("Analyzing relationships...");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        You are an expert database architect helping a student understand Flask-SQLAlchemy.
        Analyze the following SQLAlchemy model code.
        Identify any tables, ForeignKeys, and relationships.
        Explain the relationships (One-to-Many, Many-to-One, Many-to-Many) in plain, simple English.
        Do not explain basic columns (like String or Integer). Focus strictly on how tables connect.
        Keep the output concise and format it with clear bullet points.

        Code to analyze:
        ${code}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      setExplanation(responseText);
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setExplanation("An error occurred while analyzing the code.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white font-sans">
      {/* Editor Area */}
      <div className="flex-1 flex flex-col border-r border-gray-700">
        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
          <span className="font-mono text-sm text-gray-300">models.py</span>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-sm font-semibold rounded transition-colors"
          >
            {isAnalyzing ? "Analyzing..." : "Explain Relationships"}
          </button>
        </div>

        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{ minimap: { enabled: false }, fontSize: 14 }}
          />
        </div>
      </div>

      {/* Explanation Output Area */}
      <div className="w-1/3 bg-[#252526] p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-200">AI Explanation</h2>

        <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
          {explanation ||
            "Paste your SQLAlchemy models and click 'Explain Relationships' to see how your tables connect."}
        </div>
      </div>
    </div>
  );
}
