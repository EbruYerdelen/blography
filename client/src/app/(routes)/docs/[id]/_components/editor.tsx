/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { Block } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState, useCallback } from "react";
import { EditorSkeleton } from "./editor-skeleton";

const Editor = ({
  onChange,
  doc,
  id, // Added id prop
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (content: any) => void;
  doc: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    updatedAt: string;
  };
  id: string; // Document identifier
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Get saved content from localStorage
  const getSavedContent = () => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(`editor-content-${id}`);
      return savedData ? JSON.parse(savedData) : null;
    }
    return null;
  };

  // Initial content with fallback to default content
  const initialContent = getSavedContent() || [
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
  ];

  const editor = useCreateBlockNote({
    initialContent: initialContent,
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

  const handleSave = () => {
    setIsSaving(true);
    try {
      const contentToSave = editor.document;
      localStorage.setItem(
        `editor-content-${id}`,
        JSON.stringify(contentToSave)
      );
      console.log("Content saved to localStorage:", contentToSave);
      // Also update the last saved timestamp
      localStorage.setItem(`editor-last-saved-${id}`, new Date().toISOString());
    } catch (error) {
      console.error("Failed to save content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  useEffect(() => {
    setIsMounted(true);
    // Load saved content when component mounts
    const savedContent = getSavedContent();
    if (savedContent) {
      editor.replaceBlocks(editor.document, savedContent);
    }
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-4 py-2 rounded text-white transition-colors disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <span className="text-gray-400 text-sm">
          Last saved:{" "}
          {new Date(
            localStorage.getItem(`editor-last-saved-${id}`) || ""
          ).toLocaleString() || "Never"}
        </span>
      </div>
    </div>
  );
};

export default Editor;
