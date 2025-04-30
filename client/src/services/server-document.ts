import { cookies } from "next/headers";
import "server-only";

export async function getDocuments() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ULR}/post/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["documents"],
        revalidate: 0,
      },
    });
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { documents: [] };
  }
}

export async function getDocumentById(id: string) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ULR}/post/my/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        cache: "no-store",
      },
      next: {
        tags: [`documents:${id}`],
        revalidate: 0,
      },
    });
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { documents: null };
  }
}
