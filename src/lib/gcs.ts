// lib/config.ts    ((need to know that your configuration is valid before any other part of your application starts using it.
//useEffect hooks, on the other hand, run asynchronously after the initial render of your component.))
export const config = {
  gcsBucketName: process.env.GCS_BUCKET_NAME,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
};

if (!config.gcsBucketName) {
  throw new Error("GCS_BUCKET_NAME is not defined.");
}

if (!config.googleApplicationCredentials) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not defined.");
}

// lib/gcs.ts
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const bucketName = process.env.GCS_BUCKET_NAME;

export async function getFileUrl(fileName: string): Promise<string | null> {
  if (!bucketName) {
    console.error("GCS_BUCKET_NAME is not defined.");
    return null;
  }
  try {
    const bucket = storage.bucket(bucketName);
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
  if (!bucketName) {
    console.error("GCS_BUCKET_NAME is not defined.");
    return [];
  }
  try {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles();
    const fileNames = files.map((file) => file.name);
    return fileNames;
  } catch (error) {
    console.error("Error listing files", error);
    return [];
  }
}
