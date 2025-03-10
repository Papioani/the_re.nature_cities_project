// src/app/api/drive/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getFileUrl, listFiles } from "../../../lib/gcs";
import path from "path";

// Resolve the credentials path
const credentialsPath = path.resolve(
  "./config/renaturecities-cfc73252a887.json"
);
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

export async function GET(request: NextRequest) {
  console.log("GCS_BUCKET_NAME:", process.env.GCS_BUCKET_NAME);
  console.log(
    "GOOGLE_APPLICATION_CREDENTIALS:",
    process.env.GOOGLE_APPLICATION_CREDENTIALS
  );

  const fetchAll = request.nextUrl.searchParams.get("fetchAll") === "true";

  if (fetchAll) {
    try {
      const files = await listFiles();
      console.log("Files from listFiles():", files);
      const fileUrls = await Promise.all(
        files.map(async (fileName) => {
          const url = await getFileUrl(fileName);
          console.log("url from urls():", url);
          return { name: fileName, url: url };
        })
      );
      return NextResponse.json({ fileUrls });
    } catch (error) {
      console.error("Error fetching file URLs:", error);
      return NextResponse.json(
        { error: "Failed to fetch file URLs" },
        { status: 500 }
      );
    }
  } else {
    try {
      const fileName = request.nextUrl.searchParams.get("fileId");
      if (!fileName) {
        return NextResponse.json(
          { error: "Missing fileId parameter" },
          { status: 400 }
        );
      }
      const url = await getFileUrl(fileName); // for mobile
      if (!url) {
        return NextResponse.json(
          { error: "File not found or URL generation failed" },
          { status: 404 }
        );
      }
      return NextResponse.json({ url });
    } catch (error) {
      console.error("Error fetching file URL:", error);
      return NextResponse.json(
        { error: "Failed to fetch file URL" },
        { status: 500 }
      );
    }
  }
}
