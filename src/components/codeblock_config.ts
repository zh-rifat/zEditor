import { createLowlight } from "lowlight";

import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import plaintext from 'highlight.js/lib/languages/plaintext';
import typescript from 'highlight.js/lib/languages/typescript';
import sql from 'highlight.js/lib/languages/sql';

export const lowlight = createLowlight({
  plaintext,
  javascript,
  python,
  java,
  css,
});

export const languages = [
  "plaintext",
  "javascript",
  "python",
  "java",
  "css",
];


          // Handle Enter key in code blocks
          // if (event.key === 'Enter' && node.type.name === 'codeBlock') {
          //   event.preventDefault();
          //   console.log('Enter key pressed in code block');
    
          //   // Get the text content of the code block
          //   const codeBlockText = node.textContent;
            
          //   // Get the position of the cursor in the current block
          //   const cursorPosition = $from.parentOffset;

          //   // Get the current line before the cursor
          //   const beforeCursorText = codeBlockText.slice(0, cursorPosition);
            
          //   // Extract the indentation from the beginning of the line
          //   const lastNewLineIndex = beforeCursorText.lastIndexOf('\n');
          //   const currentLine = lastNewLineIndex !== -1 
          //     ? beforeCursorText.slice(lastNewLineIndex + 1) 
          //     : beforeCursorText;



          //   //

          //   const isCurrentLineEmpty = currentLine.trim() === '';

          //   // Get the text before the current line
          //   const textBeforeCurrentLine = lastNewLineIndex !== -1
          //     ? beforeCursorText.slice(0, lastNewLineIndex)
          //     : '';
          
          //   // Find the start of the previous line
          //   const previousNewLineIndex = textBeforeCurrentLine.lastIndexOf('\n');
          //   const previousLine = previousNewLineIndex !== -1
          //     ? textBeforeCurrentLine.slice(previousNewLineIndex + 1)
          //     : textBeforeCurrentLine;
          
          //   // Check if the previous line is empty
          //   const isPreviousLineEmpty = previousLine.trim() === '';
          //   const { tr } = state;
          //   // If both the current and previous lines are empty, exit the code block
          //   if (isCurrentLineEmpty && isPreviousLineEmpty) {
          //     console.log('Exiting code block...');
              
          //     // Remove trailing empty lines while keeping one
          //     let trimmedText = codeBlockText.replace(/\n\s*\n\s*$/, '\n');
          
          //     // Ensure valid position
          //     const startPos = Math.max(0, $from.before());
          //     const endPos = Math.min(tr.doc.content.size, $from.after());
          
          //     // Replace the code block with trimmed content
          //     tr.replaceWith(startPos, endPos, state.schema.nodes.codeBlock.create({}, state.schema.text(trimmedText)));
          
          //     // Move cursor outside the code block safely
          //     const safeExitPos = Math.min(tr.doc.content.size, endPos + 2);
          //     tr.insert(safeExitPos, state.schema.nodes.paragraph.create());
          
          //     // Move cursor outside the code block
          //     tr.setSelection(TextSelection.create(tr.doc, safeExitPos + 1));
              
          //     view.dispatch(tr);
          //     return true;
          //   }
          //   //
            
          //   const indentation = currentLine.match(/^\s*/)?.[0] || '';


          //   console.log(indentation)
          //   // Insert a new line with the same indentation
          //   tr.insertText(`\n${indentation}`);
          //   view.dispatch(tr);
  
          //   return true;
          // }
