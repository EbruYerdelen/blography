"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
import { EditorSkeleton } from "./editor-skeleton";
import axios from "axios";

const Editor = ({ id }: { id: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getBlogData = async (id: string) => {
    try {
      const res = await axios.get(`/api/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
        if (res.data.data.content) {
          return JSON.parse(res.data.data.content);
      }
      return null;
      }
      catch (error) {
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
      await axios.put(`http://localhost:3001/post/post/${id}`, {
        content: JSON.stringify(contentToSave),
      }, {
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="p-4">
      <BlockNoteView
        editor={editor}
        className="editor-container"
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
      </div>
    </div>
  );
};

export default Editor;

