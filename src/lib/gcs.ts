// lib/gcs.ts
import { Storage } from "@google-cloud/storage";

// Decode base64 string from environment variable to JSON
const base64Credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!base64Credentials) {
  console.error(
    "GOOGLE_APPLICATION_CREDENTIALS environment variable is not set."
  );
  process.exit(1); // Exit if credentials are missing
}

const credentials = JSON.parse(
  Buffer.from(base64Credentials, "base64").toString("utf-8")
);

// Instantiate Google Cloud Storage with credentials
const storage = new Storage({ credentials });

export async function getFileUrl(fileName: string): Promise<string | null> {
  if (!process.env.GCS_BUCKET_NAME) {
    console.error("GCS_BUCKET_NAME is not defined.");
    return null;
  }

  try {
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    const file = bucket.file(fileName);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
    });
    return url;
  } catch (error) {
    console.error("Error getting file URL:", error);
    return null;
  }
}

export async function listFiles(): Promise<string[]> {
  if (!process.env.GCS_BUCKET_NAME) {
    console.error("GCS_BUCKET_NAME is not defined.");
    return [];
  }

  try {
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    const [files] = await bucket.getFiles();
    const fileNames = files.map((file) => file.name);
    return fileNames;
  } catch (error) {
    console.error("Error listing files", error);
    return [];
  }
}
