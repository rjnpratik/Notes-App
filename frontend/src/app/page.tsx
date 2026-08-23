"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");
    setNotes("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to generate notes");
      }

      setNotes(data.notes);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            YouTube Notes Generator
          </h1>
          <p className="text-gray-600">
            Paste a YouTube URL below to instantly generate comprehensive, structured study notes.
          </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-900"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          >
            {loading ? "Generating..." : "Generate Notes"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-lg text-center font-medium border border-red-200">
            {error}
          </div>
        )}

        {/* Loading Skeleton/Spinner */}
        {loading && (
          <div className="animate-pulse space-y-4 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        )}

        {/* Notes Display Section */}
        {notes && !loading && (
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-200">
            {/* The 'prose' class from Tailwind Typography handles all the markdown styling automatically */}
            <article className="prose prose-slate prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-blue-600 hover:prose-a:text-blue-500">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {notes}
              </ReactMarkdown>
            </article>
          </div>
        )}

      </div>
    </main>
  );
}