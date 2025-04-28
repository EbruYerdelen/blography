"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
import { EditorSkeleton } from "./editor-skeleton";

const Editor = ({ id }: { id: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getBlogData = async (id: string) => {
    try {
      const res = await fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        const data = await res.json();
        if (data.data.content) {
          return JSON.parse(data.data.content);
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      return null;
    }
  };

  const getSavedContent = () => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(`editor-content-${id}`);
      return savedData ? JSON.parse(savedData) : null;
    }
    return null;
  };
  const initialContent = getSavedContent() || [
    {
      type: "paragraph",
      content: "Welcome to your Blography editor!",
    },
    {
      type: "paragraph",
    },
  ];

  const editor = useCreateBlockNote({
    initialContent: initialContent,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const contentToSave = editor.document;
      await fetch(`http://localhost:3001/post/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: JSON.stringify(contentToSave),
        }),
      });
    } catch (error) {
      console.error("Failed to save content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const loadData = async () => {
      const blogData = await getBlogData(id);
      if (blogData) {
        editor.replaceBlocks(editor.document, blogData);
      }
    };
    // Load saved content when component mounts
    loadData();
  }, []);

  if (!isMounted) {
    return <EditorSkeleton />;
  }

  return (
    <div className="pt-2 px-4 pb-4">
      <div className="flex sm:flex-row sm:justify-between sm:items-center mb-4 flex-col gap-2">
        <p className="text-neutral-400 text-sm pl-[69px]">
          Updated at: 27/04/2025
        </p>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="sm:bg-[rgb(7,7,7)] bg-[rgb(14,14,14)] hover:bg-[rgb(36,36,36)] active:bg-[rgb(50,50,50)] disabled:bg-[rgb(60,60,60)] px-4 py-2 rounded-md text-white transition-all duration-200 disabled:cursor-not-allowed w-36 sm:w-auto sm:ml-0 ml-[69px] shadow-md hover:shadow-lg active:shadow-sm"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <BlockNoteView
        editor={editor}
        className="editor-container"
        theme="dark"
      />
    </div>
  );
};

export default Editor;

