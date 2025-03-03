import React, { useState } from 'react'
import MenuBar from './MenuBar';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from "@tiptap/extension-text-align";


import './styles.scss';
import './editor-styles.css';
import ResizableImage from './ResizableImage';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { CustomCodeBlock } from './CustomCodeBlock';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import {createLowlight} from 'lowlight';

import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import css from "highlight.js/lib/languages/css";

import "highlight.js/styles/monokai.css";
import RichTextViewer from './RichTextViewer';
import Underline from '@tiptap/extension-underline';

const lowlight=createLowlight({
  javascript:javascript,
  python:python,
  java:java,
  css:css
})
type Props = {}

const RichTextEditor = (props: Props) => {
  const editor=useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline:false,
        allowBase64:true
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
    // content,
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  })
  const [content, setContent] = useState<string>("");
  return (
    <div className='container w-full mx-auto '>
        
      <div className='tiptap bg-slate-500 text-gray-100'>
        <MenuBar editor={editor}/>
        <EditorContent 
          editor={editor} 
          className='border-2 border-slate-800 min-h-[400px] bg-white text-black'
          
        />
      </div>

      <button onClick={() => {setContent(editor?.getHTML()||"")}} className='bg-slate-800 text-gray-100 p-2 my-6 mx-auto block'>
        Save
      </button>

      <RichTextViewer content={content} />
    </div>
  )
}

export default RichTextEditor;
