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
    console.log("Blob size:", data.size); // Check the size
    console.log("Blob type:", data.type); // Should be "application/pdf"
    if (data.type !== "application/pdf") {
      console.error("Downloaded data is NOT a PDF!");
      return NextResponse.json(
        { error: "Invalid file type (not PDF)" },
        { status: 500 }
      );
    }
    const fileUrl = URL.createObjectURL(data); // Create URL after checks
    console.log("File URL:", fileUrl); // Log the URL
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "no-cache",
        "Content-Disposition": "inline", // Crucial for displaying in iframe
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching file:", error);
    let errorMessage = "An unknown error occurred."; // Default message

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return NextResponse.json(
      { error: `Error fetching file: ${errorMessage}` },
      { status: 500 }
    );
  }
}
