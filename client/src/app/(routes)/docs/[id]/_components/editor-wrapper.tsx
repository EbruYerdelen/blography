"use client";
import dynamic from "next/dynamic";
import { EditorSkeleton } from "./editor-skeleton";

const Editor = dynamic(() => import("./editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

type Props = {
  id: string;
  doc: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    createdAt: string;
  };
};

const EditorWrapper = ({ id, doc }: Props) => {
  return <Editor id={id} document={doc} />;
};

export default EditorWrapper;
