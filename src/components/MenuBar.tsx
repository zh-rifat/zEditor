'use client'
import React, { useEffect } from 'react'
import { useEditor } from '@tiptap/react';
type Props = {
  editor: any
}

import { 
  FaBold, 
  FaItalic, 
  FaStrikethrough, 
  FaCode,  
  FaParagraph,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUnderline,
  FaImage,
  FaRemoveFormat
  


} from 'react-icons/fa';

import {
  GoListUnordered,
  GoListOrdered,
} from 'react-icons/go';

import {
  RiCodeBlock,
} from 'react-icons/ri'
import { 
  BsBlockquoteLeft,
  BsFillFileBreakFill

} from "react-icons/bs";
import { LuSeparatorHorizontal, LuRemoveFormatting } from "react-icons/lu";
import { languages } from './codeblock_config';

const MenuBar = ({editor}: Props) => {
  if(!editor) return null;


  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event:any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e:any) => {
          const base64 = e.target.result;
          // editor.chain().focus().setImage({ src: base64 }).run();
          editor
          .chain()
          .focus()
          .insertContent([
            {
              type: "resizableImage",
              attrs: { src: base64 },
            },
            {
              type: "paragraph",
              content: [], // Empty paragraph after the image
            },
          ])
          .run();
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };


  const handleHeadingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(event.target.value, 10);
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
      return;
    }
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const setLanguage = (language: string) => {
    editor.chain().updateAttributes("codeBlock", { language }).run();
  };

  // useEffect(() => {
  //   setLanguage("plaintext");
  // }, []);
  

  return (
    <div className="menubar flex flex-row flex-wrap justify-center w-full">
      <div className="button-group">
        <br />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold/>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FaItalic/>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <FaUnderline/>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FaStrikethrough/>
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <LuRemoveFormatting/>
        </button>

        <input
        type="color"
        onInput={(e:any) =>     editor.chain().focus().setColor(e.target.value).run() }
          value={editor.getAttributes("textStyle").color || "#000000"}
        />

      </div>

      <div className='button-group'>

        <select onChange={handleHeadingChange} value={editor.isActive('heading') ? editor.getAttributes('heading').level : ''}>
          <option value="0">Paragraph</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <FaCode/>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <GoListUnordered/>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <GoListOrdered/>
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run()
            if(!editor.getAttributes("codeBlock").language) {
              setLanguage("plaintext")
            }
          }}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <RiCodeBlock/>
        </button>
        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={editor.getAttributes("codeBlock").language || "plaintext"}
        >
          {
            languages.map((language) => (
              <option key={language} value={language}>
                {language.toUpperCase()}
              </option>
            ))
          }
          {/* Add more languages as needed */}
        </select>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <BsBlockquoteLeft/>
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          <FaRemoveFormat/>
        </button>
      </div>
        
      <div className="button-group">
        
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <FaAlignLeft/>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        >
          <FaAlignCenter/>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <FaAlignRight/>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
        >
          <FaAlignJustify/>
        </button>
      </div>
      <div className="button-group">
        <button 
          type="button"
          onClick={addImage}
        >
          <FaImage/>
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <LuSeparatorHorizontal/>
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <BsFillFileBreakFill/>
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FaUndo/>
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FaRedo/>
        </button>
        
      </div>

    </div>
  )
}

export default MenuBar
