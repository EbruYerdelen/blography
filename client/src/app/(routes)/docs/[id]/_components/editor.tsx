"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useEffect, useState, useCallback } from "react";
import { EditorSkeleton } from "./editor-skeleton";

export const Editor = ({
  onChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (content: any) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

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

  const handleEditorBlur = useCallback(() => {
    if (isMounted && onChange) {
      onChange(editor.document);
    }
  }, [isMounted, onChange, editor]);

  useEffect(() => {
    setIsMounted(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const editorInstance = editor._tiptapEditor;
    editorInstance.on("blur", handleEditorBlur);

    return () => {
      editorInstance.off("blur", handleEditorBlur);
    };
  }, [editor, handleEditorBlur, isMounted]);

  if (!isMounted) {
    return <EditorSkeleton />;
  }

  return (
    <div className="p-4">
      <BlockNoteView
        editor={editor}
        className="editor-container"
        onBlur={handleEditorBlur}
        theme="dark"
      />
    </div>
  );
};
