"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useDebounce } from "use-debounce";
import { useEffect, useState, useCallback } from "react";
import { EditorSkeleton } from "./editor-skeleton";

export const Editor = ({
  onDebouncedChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDebouncedChange?: (content: any) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [hasUserTyped, setHasUserTyped] = useState(false);

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

  const [debouncedContent] = useDebounce(
    isMounted ? editor.document : null,
    1000
  );

  const handleEditorUpdate = useCallback(() => {
    if (isMounted) {
      setHasUserTyped(true);
    }
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const editorInstance = editor._tiptapEditor;
    editorInstance.on("update", handleEditorUpdate);

    return () => {
      editorInstance.off("update", handleEditorUpdate);
    };
  }, [editor, handleEditorUpdate, isMounted]);

  useEffect(() => {
    if (isMounted && hasUserTyped && onDebouncedChange && debouncedContent) {
      onDebouncedChange(debouncedContent);
    }
  }, [debouncedContent, onDebouncedChange, hasUserTyped, isMounted]);

  if (!isMounted) {
    return <EditorSkeleton />;
  }

  return (
    <div className="p-4">
      <BlockNoteView
        editor={editor}
        className="editor-container"
        theme="dark"
      />
    </div>
  );
};
