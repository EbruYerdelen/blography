"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
import { EditorSkeleton } from "./editor-skeleton";
import { formatDate } from "@/helpers/formatDate";

const Editor = ({
  id,
  document,
}: {
  id: string;
  document: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    createdAt: string;
  };
}) => {
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
  }, [id]);

  if (!isMounted) {
    return <EditorSkeleton />;
  }

  return (
    <div className="px-4 pt-2 pb-4">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 mb-4">
        <p className="pl-[53px] text-neutral-400 text-sm">
          {document?.createdAt
            ? `Created at : ${formatDate(document?.createdAt)}`
            : ""}
        </p>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[rgb(14,14,14)] sm:bg-[rgb(7,7,7)] hover:bg-[rgb(36,36,36)] active:bg-[rgb(50,50,50)] disabled:bg-[rgb(60,60,60)] shadow-md hover:shadow-lg active:shadow-sm ml-[69px] sm:ml-0 px-4 py-2 rounded-md w-36 sm:w-auto text-white transition-all translate-y-[-40px] duration-200 disabled:cursor-not-allowed"
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
