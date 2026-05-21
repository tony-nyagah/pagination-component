import { useState } from "react";

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white overflow-hidden my-8">
      {/* Brutalist Header Bar */}
      <div className="bg-purple-300 border-b-4 border-black px-4 py-3 flex justify-between items-center">
        <span className="font-black uppercase tracking-widest text-sm">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-white border-2 border-black font-bold text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
        >
          {copied ? "COPIED!" : "COPY"}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
