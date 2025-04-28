import React, { useImperativeHandle, useState } from 'react';
import MenuBar from './MenuBar';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import './editor-styles.css';
import ResizableImage from './ResizableImage';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import 'highlight.js/styles/monokai.css';
import RichTextViewer from './RichTextViewer';
import Underline from '@tiptap/extension-underline';
import { Plugin, TextSelection } from 'prosemirror-state';
import { lowlight } from './codeblock_config';

type Props = {
  ref: any;
};

const RichTextEditor = (props: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      ResizableImage,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
      handleDOMEvents: {
        keydown: (view, event) => {
          const { state } = view;
          const { selection } = state;
          const { $from } = selection;
          const node = $from.node();
  
          console.log(event.key); // Debug: Log the pressed key
  
          // Handle Tab key
          if (event.key === 'Tab') {
            event.preventDefault();
            console.log('Tab key pressed');
            const { tr } = state;
            tr.insertText('    '); // Insert 4 spaces
            view.dispatch(tr);
            return true;
          }
  

  
          return false;
        },
      },
    
    },
  });

  useImperativeHandle(props.ref, () => editor, [editor]);
  const [content, setContent] = useState<string>('');
  const handleSave = () => {
    const html = editor?.getHTML() || '';
    console.log('Editor HTML:', html); // Debug: Log the HTML output
    setContent(html);
  };

  return (
    <div className="container w-full mx-auto">
      <div className="tiptap-container bg-slate-500 text-gray-100">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="border-2 border-slate-800 min-h-[400px] bg-white text-black p-2"
        />
      </div>

      <button onClick={handleSave} className="bg-slate-800 text-gray-100 p-2 my-6 mx-auto block">
        Save
      </button>

      <RichTextViewer content={content} />
    </div>
  );
};

export default RichTextEditor;
