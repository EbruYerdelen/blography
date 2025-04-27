"use client";

import React from "react";
import dynamic from "next/dynamic";
import { EditorSkeleton } from "./_components/editor-skeleton";

const Editor = dynamic(
  () => import("./_components/editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <EditorSkeleton />,
  }
);

const Docs = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (content: any) => {
    console.log("Debounced content:", content);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col gap-1 pl-[69px]">
        <h1 className="font-semibold text-white text-3xl">New Document</h1>
        <p className="text-neutral-400 text-sm">Updated at: 27/04/2025</p>
      </div>
      <Editor onDebouncedChange={handleContentChange} />
    </div>
  );
};

export default Docs;
