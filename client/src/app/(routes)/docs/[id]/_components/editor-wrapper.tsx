"use client";

import dynamic from "next/dynamic";
import { EditorSkeleton } from "./editor-skeleton";
const Editor = dynamic(() => import("./editor").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

const EditorWrapper = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (content: any) => {
    console.log("Debounced content:", content);
  };
  return <Editor onDebouncedChange={handleContentChange} />;
};

export default EditorWrapper;
