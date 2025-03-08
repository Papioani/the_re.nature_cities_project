// lib/gcs.ts
import { Storage } from "@google-cloud/storage";
import { config } from "./config";

const storage = new Storage({
  keyFilename: config.googleApplicationCredentials,
});

export async function getFileUrl(fileName: string): Promise<string | null> {
  if (!config.gcsBucketName) {
    console.error("GCS_BUCKET_NAME is not defined.");
    return null;
  }
  try {
    const bucket = storage.bucket(config.gcsBucketName);
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
  if (!config.gcsBucketName) {
    console.error("GCS_BUCKET_NAME is not defined.");
    return [];
  }
  try {
    const bucket = storage.bucket(config.gcsBucketName);
    const [files] = await bucket.getFiles();
    const fileNames = files.map((file) => file.name);
    return fileNames;
  } catch (error) {
    console.error("Error listing files", error);
    return [];
  }
}
