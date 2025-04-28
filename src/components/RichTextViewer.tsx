"use client";

import React, { useEffect } from "react";
// import "highlight.js/styles/github.css"; // Light theme
import "highlight.js/styles/monokai.css"; // Dark theme
import hljs from "highlight.js";
import './viewer-styles.css';
interface Props {
  content: string;
  className?:string;
}

const RichTextViewer: React.FC<Props> = ({ content,className }) => {
  useEffect(() => {
    // Apply syntax highlighting after rendering
    hljs.highlightAll();
  }, [content]);

  return (
    <div 
      className={`zrichtext-viewer p-4 bg-white text-black border border-gray-700 rounded-lg shadow ${className||''}`}>
      {/* Renders editor HTML safely */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default RichTextViewer;
