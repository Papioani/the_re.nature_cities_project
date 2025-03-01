"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudStorage = void 0;
// index.ts
const googleapis_1 = require("googleapis");
const storage_1 = require("@google-cloud/storage");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Initialize Google Drive API Client
const drive = googleapis_1.google.drive("v3");
// Initialize Google Cloud GCSStorage Client
const storage = new storage_1.Storage();
const bucketName = process.env.GCS_BUCKET_NAME ||
    "gcf-v2-uploads-599364547661.us-central1.cloudfunctions.appspot.com";
const bucket = storage.bucket(bucketName);
/**
 * Cloud Function to upload a file from Google Drive to Google Cloud Storage.
 * It expects a JSON payload with a property "fileId".
 */
const uploadToCloudStorage = async (req, res) => {
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
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || undefined,
            scopes: [
                "https://www.googleapis.com/auth/drive.readonly",
                "https://www.googleapis.com/auth/devstorage.read_write",
            ],
        });
        // Fetch the file from Google Drive as a stream
        const driveResponse = await drive.files.get({
            fileId,
            alt: "media",
            auth,
        }, { responseType: "stream" });
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
            .on("error", (err) => {
            console.error("Error uploading file:", err);
            res.status(500).json({ error: err.message });
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in uploadToCloudStorage:", error);
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
exports.uploadToCloudStorage = uploadToCloudStorage;
