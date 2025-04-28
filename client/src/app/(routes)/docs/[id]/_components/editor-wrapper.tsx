"use client";
import dynamic from "next/dynamic";
import { EditorSkeleton } from "./editor-skeleton";

const Editor = dynamic(() => import("./editor").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

type Props = {
  id: string;
  doc: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    updatedAt: string;
  };
};

const EditorWrapper = ({ id, doc }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (content: any) => {
    console.log("Debounced content:", content, id);
  };

  return <Editor onChange={handleContentChange} doc={doc} />;
};

export default EditorWrapper;
