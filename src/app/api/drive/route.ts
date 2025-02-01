// src/app/api/drive/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return NextResponse.json({ error: "File ID is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_BACKEND_API_KEY; // Use backend API key
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const data = await response.blob();
    return new NextResponse(data, {
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
