// index.ts
import { google } from "googleapis";
import { Storage as GCSStorage } from "@google-cloud/storage";
import { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

// Initialize Google Drive API Client
const drive = google.drive("v3");

// Initialize Google Cloud GCSStorage Client
const storage = new GCSStorage();
const bucketName =
  process.env.GCS_BUCKET_NAME ||
  "gcf-v2-uploads-599364547661.us-central1.cloudfunctions.appspot.com";
const bucket = storage.bucket(bucketName);

/**
 * Cloud Function to upload a file from Google Drive to Google Cloud Storage.
 * It expects a JSON payload with a property "fileId".
 */
export const uploadToCloudStorage = async (req: Request, res: Response) => {
  // For HTTP trigger, only allow POST
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed. Use POST.");
  }

  // Get fileId from the POST body
  const { fileId } = req.body;
  if (!fileId) {
    return res
      .status(400)
      .json({ error: "fileId is required in the request body" });
  }

  // Authenticate using the service account JSON key
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || undefined,
      scopes: [
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/devstorage.read_write",
      ],
    });

    // Fetch the file from Google Drive as a stream
    const driveResponse = await drive.files.get(
      {
        fileId,
        alt: "media",
        auth,
      },
      { responseType: "stream" }
    );

    // Define the destination file name in Cloud Storage
    const destFileName = `drive_uploads/${fileId}.pdf`; //  the new name for the file once it's uploaded to Cloud Storage.
    const cloudFile = bucket.file(destFileName); //  the new name for the file in Cloud Storage

    // Create a write stream for Cloud Storage
    const writeStream = cloudFile.createWriteStream({
      metadata: {
        contentType: "application/pdf",
      },
      resumable: false,
    });

    // Pipe the data from Google Drive to Cloud Storage
    driveResponse.data
      .pipe(writeStream)
      .on("finish", () => {
        console.log(`File ${destFileName} uploaded to Cloud Storage`);
        // Generate a public URL (if the bucket is public or you set ACLs accordingly)
        const fileUrl = `https://storage.googleapis.com/${bucketName}/${destFileName}`;
        res.status(200).json({ fileUrl });
      })
      .on("error", (err: Error) => {
        console.error("Error uploading file:", err);
        res.status(500).json({ error: err.message });
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in uploadToCloudStorage:", error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
