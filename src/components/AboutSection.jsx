import { useState } from "react";

export default function AboutSection({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-sm py-2 px-4 bg-gradient-to-t from-purple-500 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
      >
        <span>{isExpanded ? "Hide Details" : "About This Project"}</span>
        <span className="text-lg">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="mt-4 border border-gray-700 rounded-lg p-4 bg-gray-800/50">
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
