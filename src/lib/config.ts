// src/lib/config.ts
export const config = {
  gcsBucketName: process.env.GCS_BUCKET_NAME,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
};
console.log("GCS_BUCKET_NAME:", process.env.GCS_BUCKET_NAME);
console.log(
  "GOOGLE_APPLICATION_CREDENTIALS:",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

if (!config.gcsBucketName) {
  throw new Error("GCS_BUCKET_NAME is not defined.");
}

if (!config.googleApplicationCredentials) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not defined.");
}
