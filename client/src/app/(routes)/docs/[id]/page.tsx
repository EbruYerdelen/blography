"use client";

import React from "react";
import dynamic from "next/dynamic";
import { EditorSkeleton } from "./_components/editor-skeleton";
import Image from "next/image";

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
    <div className="relative py-6">
      <Image
        src="/assets/images/light.webp"
        alt="Light"
        height={2048}
        width={2048}
        className="hidden md:block -top-20 right-0 left-0 z-0 absolute mx-auto w-screen max-w-screen h-screen max-h-screen pointer-events-none select-none"
      />
      <div className="flex flex-col gap-1 pl-[69px]">
        <h1 className="font-semibold text-white text-3xl">New Document</h1>
        <p className="text-neutral-400 text-sm">Updated at: 27/04/2025</p>
      </div>
      <Editor onDebouncedChange={handleContentChange} />
    </div>
  );
};

export default Docs;
