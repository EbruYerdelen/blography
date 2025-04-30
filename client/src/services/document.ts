export interface Document {
  data: {
    _id: string;
    title: string;
    content?: string;
    createdAt?: string;
    userId: string;
  }[];
}

export async function fetchDocuments() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/documents`, {
    next: { tags: ["documents"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  return await response.json();
}

export async function createDocument(title: string) {
  const response = await fetch("/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to create document");
  }

  return await response.json();
}
