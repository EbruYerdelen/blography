"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { Block } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState, useCallback } from "react";
import { EditorSkeleton } from "./editor-skeleton";

export const Editor = ({
  onChange,
  doc,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (content: any) => void;
  doc: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    updatedAt: string;
  };
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to your Blography editor!",
      },
      {
        type: "paragraph",
      },
      {
        type: "heading",
        content: "Start writing here...",
        props: { level: 1 },
      },
      {
        type: "paragraph",
        content: "This is a custom editor with a clean, modern theme.",
      },
    ],
  });

  const debouncedOnChange = useCallback(
    (content: Block[]) => {
      setBlocks(content);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        onChange(content);
      }, 1000);

      setTimeoutId(newTimeoutId);
    },
    [onChange, timeoutId]
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  useEffect(() => {
    setIsMounted(true);
    return () => {};
  }, []);

  if (!isMounted) {
    return <EditorSkeleton />;
  }

  return (
    <div className="p-4">
      <BlockNoteView
        editor={editor}
        className="editor-container"
        onChange={() => {
          debouncedOnChange(editor.document);
        }}
        theme="dark"
      />
    </div>
  );
};
