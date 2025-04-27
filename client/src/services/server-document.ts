import { cookies } from "next/headers";
import "server-only";

export async function getDocuments() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  try {
    const response = await fetch("http://localhost:3001/post/my", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["documents"],
        revalidate: 60,
      },
    });
    const res = await response.json();
    console.log("Response:", res?.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { documents: [] };
  }
}
