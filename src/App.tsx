import { useState } from "react";

// Toast Alert Component
function ToastAlert({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="relative overflow-hidden rounded-lg border border-slate-700/50 bg-[#161b22] shadow-xl">
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#6366f1]/10">
            <svg
              className="h-5 w-5 text-[#6366f1]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#c9d1d9]">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 rounded p-1 text-slate-500 transition-colors hover:text-slate-300"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
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
    <div className="min-h-screen bg-[#0d1117] p-6 md:p-8">
      {/* Toast Alert */}
      <ToastAlert
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-[#ffffff] md:text-4xl">
            CleanIt
          </h1>
          <p className="mt-2 text-sm text-[#8b949e]">
            Professional HTML cleaning tool for developers
          </p>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-[#30363d] bg-[#161b22] p-4">
          <button
            onClick={handleClean}
            className="inline-flex items-center gap-2 rounded-md bg-[#6366f1] px-5 py-2.5 text-sm font-medium text-[#ffffff] transition-all hover:bg-[#5558e6]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Clean HTML
          </button>
          <button
            onClick={handleCopy}
            disabled={!output}
            className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-transparent px-5 py-2.5 text-sm font-medium text-[#c9d1d9] transition-all hover:border-[#6366f1] hover:text-[#ffffff] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Output
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-md border border-[#30363d] bg-transparent px-5 py-2.5 text-sm font-medium text-[#c9d1d9] transition-all hover:border-[#6366f1] hover:text-[#ffffff]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Panel */}
          <div className="flex flex-col rounded-lg border border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-3">
              <h2 className="text-sm font-medium text-[#c9d1d9]">Input Source</h2>
              <span className="text-xs text-[#8b949e]">
                {input.length.toLocaleString()} characters
              </span>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste HTML source code..."
                className="h-[400px] w-full resize-none rounded-md border border-[#30363d] bg-[#0d1117] p-4 font-mono text-sm text-[#c9d1d9] placeholder-[#484f58] outline-none focus:border-[#6366f1] transition-colors"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col rounded-lg border border-[#30363d] bg-[#0d1117]">
            <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-3">
              <h2 className="text-sm font-medium text-[#c9d1d9]">Cleaned Output</h2>
              <span className="text-xs text-[#8b949e]">
                {output.length.toLocaleString()} characters
              </span>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={output}
                readOnly
                placeholder="Cleaned HTML output..."
                className="h-[400px] w-full resize-none rounded-md border border-[#30363d] bg-[#0d1117] p-4 font-mono text-sm text-[#c9d1d9] placeholder-[#484f58] outline-none"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 rounded-lg border border-[#30363d] bg-[#161b22] p-5">
          <h3 className="mb-3 text-sm font-medium text-[#c9d1d9]">Removed Elements</h3>
          <div className="flex flex-wrap gap-2">
            {["<head>", "<script>", "<style>", "<noscript>", "<link>", "<meta>", "<!DOCTYPE>"].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-xs font-mono text-[#8b949e]"
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
