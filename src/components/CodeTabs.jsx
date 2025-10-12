import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeTabs({ codeBlocks, language = "php" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
          {/* Tab Headers */}
          <div className="bg-gray-800 border-b border-gray-700 flex overflow-x-auto">
            {codeBlocks.map((block, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-mono whitespace-nowrap transition-colors ${
                  activeTab === index
                    ? "bg-gray-900 text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {block.title}
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="max-h-96 overflow-y-auto">
            <SyntaxHighlighter
              language={codeBlocks[activeTab].language || language}
              style={vscDarkPlus}
              showLineNumbers={true}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: "0.875rem",
              }}
            >
              {codeBlocks[activeTab].code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}
