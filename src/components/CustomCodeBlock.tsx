// import { Node } from "@tiptap/core";
// import { ReactNodeViewRenderer } from "@tiptap/react";
// import CodeBlockComponent from "./CodeBlockComponent"; // We'll create this next

// export const CustomCodeBlock = Node.create({
//   name: "customCodeBlock",
//   content: "text*",
//   marks: "",
//   group: "block",
//   code: true,
//   defining: true,
//   addAttributes() {
//     return {
//       language: {
//         default: "javascript", // Default language
//       },
//     };
//   },
//   parseHTML() {
//     return [
//       {
//         tag: "pre",
//         preserveWhitespace: "full",
//       },
//     ];
//   },
//   renderHTML({ node, HTMLAttributes }) {
//     return ["pre", HTMLAttributes, ["code", { class: `language-${node.attrs.language}` }, 0]];
//   },
//   addNodeView() {
//     return ReactNodeViewRenderer(CodeBlockComponent);
//   },
// });
