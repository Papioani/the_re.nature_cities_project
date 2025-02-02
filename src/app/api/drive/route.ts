// src/app/api/drive/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("API route hit"); // <-- This should always log when the function runs
  } catch (error) {
    console.error("Error before reaching logic:", error);
  }
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  console.log("Received request for fileId:", fileId);

  if (!fileId) {
    return NextResponse.json({ error: "File ID is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_BACKEND_API_KEY; // Use backend API key
    console.log("USING API Key:", apiKey);
    if (!apiKey) {
      console.error("GOOGLE_BACKEND_API_KEY is not set.");
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`; ///////
    console.log("API URL:", url); ////////
    const response = await fetch(url);
    console.log("Response status:", response.status); // Log the status code
    console.log("Content-Type:", response.headers.get("Content-Type"));

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text(); // Capture the error details from Google API
      console.error("Failed to fetch file:", errorText);
      throw new Error(`Failed to fetch file: ${errorText}`);
    }

    // *** Add the Content-Type check here ***
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/pdf")) {
      const errorText = await response.text(); // Capture the error details from Google API
      console.error(
        "Unexpected Content-Type from Google Drive API:",
        contentType,
        errorText
      );
      return NextResponse.json({ error: "Invalid file type" }, { status: 500 });
    }

    const data = await response.blob();
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
