import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code, language = "php", title }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-sm py-2 px-4 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
      >
        <span>{isExpanded ? "Hide Code" : "View Code"}</span>
        <span className="text-lg">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="mt-4 border border-gray-700 rounded-lg overflow-hidden">
          {title && (
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-sm text-gray-300 font-mono">{title}</span>
            </div>
          )}
          <div className="max-h-96 overflow-y-auto">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              showLineNumbers={true}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "0.875rem",
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}
