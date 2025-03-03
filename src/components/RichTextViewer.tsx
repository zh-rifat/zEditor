"use client";

import React, { useEffect } from "react";
import "highlight.js/styles/github.css"; // Light theme
// import "highlight.js/styles/monokai.css"; // Dark theme
import hljs from "highlight.js";

interface Props {
  content: string; // HTML content from the editor
}

const RichTextViewer: React.FC<Props> = ({ content }) => {
  useEffect(() => {
    // Apply syntax highlighting after rendering
    hljs.highlightAll();
  }, [content]);

  return (
    <div className="prose max-w-none p-4 bg-black text-white border border-gray-300 rounded-lg shadow tiptap">
      {/* Renders editor HTML safely */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default RichTextViewer;
