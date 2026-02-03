import { useState } from "react";

// Toast Alert Component
function ToastAlert({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 transform transition-all duration-500 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-[2px] shadow-2xl shadow-emerald-500/40">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-900/95 px-5 py-4 backdrop-blur-xl">
          {/* Animated checkmark circle */}
          <div className="relative">
            <div className={`absolute inset-0 rounded-full bg-emerald-500/30 ${isVisible ? 'animate-ping' : ''}`}></div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/50">
              <svg
                className={`h-5 w-5 text-white transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  className={isVisible ? 'animate-draw-check' : ''}
                />
              </svg>
            </div>
          </div>
          
          {/* Message */}
          <div>
            <p className="font-semibold text-white">{message}</p>
            <p className="text-sm text-slate-400">Ready to paste anywhere</p>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="ml-2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Animated progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className={`h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 ${
              isVisible ? 'animate-shrink-bar' : 'w-0'
            }`}
          ></div>
        </div>
      </div>
      
      {/* Sparkle effects */}
      {isVisible && (
        <>
          <div className="absolute -top-1 -left-1 h-2 w-2 animate-sparkle rounded-full bg-emerald-400"></div>
          <div className="absolute -top-2 right-8 h-1.5 w-1.5 animate-sparkle-delayed rounded-full bg-teal-400"></div>
          <div className="absolute -bottom-1 left-8 h-1.5 w-1.5 animate-sparkle-delayed-more rounded-full bg-cyan-400"></div>
        </>
      )}
    </div>
  );
}

export function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const cleanHtml = (html: string): string => {
    // Remove DOCTYPE
    let cleaned = html.replace(/<!DOCTYPE[^>]*>/gi, "");
    
    // Remove head tag and its content
    cleaned = cleaned.replace(/<head[\s\S]*?<\/head>/gi, "");
    
    // Remove script tags and their content
    cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, "");
    
    // Remove style tags and their content
    cleaned = cleaned.replace(/<style[\s\S]*?<\/style>/gi, "");
    
    // Remove noscript tags and their content
    cleaned = cleaned.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
    
    // Remove link tags (stylesheet links, etc.)
    cleaned = cleaned.replace(/<link[^>]*>/gi, "");
    
    // Remove meta tags
    cleaned = cleaned.replace(/<meta[^>]*>/gi, "");
    
    // Clean up excessive whitespace and empty lines
    cleaned = cleaned
      .split("\n")
      .map(line => line.trimEnd())
      .filter(line => line.trim() !== "")
      .join("\n");
    
    return cleaned.trim();
  };

  const handleClean = () => {
    const cleaned = cleanHtml(input);
    setOutput(cleaned);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setToastMessage("Copied to clipboard!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      {/* Toast Alert */}
      <ToastAlert
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            HTML Cleaner
          </h1>
          <p className="mt-2 text-slate-400">
            Paste your HTML source and get clean body content — no head, script, or style tags
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={handleClean}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/40"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clean HTML
          </button>
          <button
            onClick={handleCopy}
            disabled={!output}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy Output
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear
          </button>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Panel */}
          <div className="flex flex-col rounded-2xl bg-slate-800/50 p-4 shadow-xl backdrop-blur-sm border border-slate-700/50">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/20 text-xs text-blue-400">
                  1
                </span>
                Input HTML Source
              </h2>
              <span className="text-xs text-slate-500">
                {input.length.toLocaleString()} chars
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML page source here..."
              className="flex-1 min-h-[400px] w-full resize-none rounded-xl bg-slate-900/70 p-4 font-mono text-sm text-slate-300 placeholder-slate-600 outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-emerald-500/50 transition-all"
              spellCheck={false}
            />
          </div>

          {/* Output Panel */}
          <div className="flex flex-col rounded-2xl bg-slate-800/50 p-4 shadow-xl backdrop-blur-sm border border-slate-700/50">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-xs text-emerald-400">
                  2
                </span>
                Cleaned Output
              </h2>
              <span className="text-xs text-slate-500">
                {output.length.toLocaleString()} chars
              </span>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Cleaned HTML will appear here..."
              className="flex-1 min-h-[400px] w-full resize-none rounded-xl bg-slate-900/70 p-4 font-mono text-sm text-emerald-300 placeholder-slate-600 outline-none ring-1 ring-slate-700"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 rounded-xl bg-slate-800/30 p-4 border border-slate-700/30">
          <h3 className="mb-2 font-semibold text-white">What gets removed:</h3>
          <div className="flex flex-wrap gap-2">
            {["<head>", "<script>", "<style>", "<noscript>", "<link>", "<meta>", "<!DOCTYPE>"].map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-mono text-red-400 border border-red-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
