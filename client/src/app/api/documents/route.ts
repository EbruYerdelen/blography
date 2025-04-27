import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token found" },
        { status: 401 }
      );
    }

    const { title } = await request.json();

    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const newDocument = await response.json();

    // Revalidate the documents cache
    const revalidateResponse = await fetch(
      "http://localhost:3000/api/revalidate?tag=documents",
      {
        method: "GET",
      }
    );

    if (!revalidateResponse.ok) {
      console.error("Failed to revalidate documents cache");
    }

    return NextResponse.json(newDocument);
  } catch (error) {
    console.error("Failed to create document:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token found" },
        { status: 401 }
      );
    }

    const response = await fetch("http://localhost:3001/post/my", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["documents"],
      },
    });

    console.log("Response status:", response);

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const documents = await response.json();

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Failed to fetch documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
