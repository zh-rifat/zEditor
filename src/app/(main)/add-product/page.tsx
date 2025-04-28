'use client';

import Image from "next/image";
import RichTextEditor from "@/components/RichTextEditor";
import { useRef, useState } from "react";
export default function Home() {


  const editorRef=useRef<any>(null);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [short_description, setShort_description] = useState<string>('');
  // const [description, setDescription] = useState<string>(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const description=editorRef.current?.getHTML() || '';

    console.log(description);
    const res = await fetch('http://localhost:8000/api/product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        price,
        short_description,
        description,
      }),
    });
    if (res.ok) {
      alert('Product created successfully');
    } else {
      alert('Failed to create product');
    }

  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            // required
          />
        </div>
        <div>
          <label htmlFor="short_description" className="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea name="short_description" id=""
            value={short_description}
            onChange={(e)=>setShort_description(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            // required
            
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            // required
          />
        </div>
        <RichTextEditor ref={editorRef}/>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
