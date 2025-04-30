"use client";

import { FileSpreadsheet } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const NewDoc = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createNewDocument = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "New Document" }),
      });

      if (!response.ok) {
        throw new Error("Failed to create document");
      }
      const { data } = await response.json();
      console.log("Document created:", data);
      router.push(`/docs/${data?._id}`);
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="flex flex-col gap-2 bg-[#262626] hover:bg-[#333] p-4 border border-[#404040] rounded-md w-[160px] md:w-[280px] transition-colors cursor-pointer"
      onClick={createNewDocument}
      role="button"
    >
      <FileSpreadsheet className="max-md:size-4 text-white" />
      <p className="text-neutral-200 text-sm">
        {loading ? "Creating..." : "New Document"}
      </p>
    </div>
  );
};
