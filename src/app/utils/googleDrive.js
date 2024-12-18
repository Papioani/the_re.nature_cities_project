export const fetchGoogleDriveData = async () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const folderId = "your-folder-id-here"; // Replace with your Google Drive folder ID
  const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data.files;
  } catch (error) {
    console.error("Error fetching data from Google Drive:", error);
    return [];
  }
};
