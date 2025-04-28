// import React, { useEffect, useRef } from "react";
// import Prism from "prismjs";
// import "prismjs/components/prism-javascript"; // Add more languages as needed
// import { NodeViewProps } from "@tiptap/core";

// const CodeBlockComponent: React.FC<NodeViewProps> = ({ node, updateAttributes }) => {
//   const codeRef = useRef<HTMLElement>(null);
//   const language = node.attrs.language;

//   useEffect(() => {
//     if (codeRef.current) {
//       Prism.highlightElement(codeRef.current);
//     }
//   }, [node.content]);

//   return (
//     <pre>
//       <code ref={codeRef} className={`language-${language}`}>
//         {node.content.content[0].text}
//       </code>
//       <select
//         value={language}
//         onChange={(e) => updateAttributes({ language: e.target.value })}
//       >
//         <option value="javascript">JavaScript</option>
//         <option value="html">HTML</option>
//         <option value="css">CSS</option>
//         <option value="python">Python</option>
//         {/* Add more languages as needed */}
//       </select>
//     </pre>
//   );
// };

// export default CodeBlockComponent;
