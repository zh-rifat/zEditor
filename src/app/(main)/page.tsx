'use client';
import RichTextEditor from "@/components/RichTextEditor";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const editorRef=useRef<any>(null);
  return (
    <div >
      <RichTextEditor ref={editorRef}/>
    </div>
  );
}
