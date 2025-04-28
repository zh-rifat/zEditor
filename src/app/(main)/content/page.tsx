
'use client';

import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";
import { useRef, useState } from "react";
import RichTextViewer from "@/components/RichTextViewer";
export default function Home() {

  const [content, setContent] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    

  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea name="content" id=""
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            // required
            
          ></textarea>
        </div>
        <RichTextViewer content={content} />
    </div>
  );
}
