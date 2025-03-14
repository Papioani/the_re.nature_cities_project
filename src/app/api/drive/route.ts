// src/app/api/drive/route.ts  // allows you to create server-side API endpoints within your Next.js application
import { NextResponse, NextRequest } from "next/server";
import { getFileUrl, listFiles } from "../../../lib/gcs";

export async function GET(request: NextRequest) {
  const fetchAll = request.nextUrl.searchParams.get("fetchAll") === "true";
  const isMobile = request.nextUrl.searchParams.get("isMobile") === "true"; // Get isMobile

  if (fetchAll) {
    try {
      const files = await listFiles();
      const fileUrls = await Promise.all(
        files.map(async (fileName) => {
          let url;
          if (isMobile && fileName.endsWith(".pdf")) {
            // Google Drive /view URLs for mobile PDFs
            const fileIdMap: { [key: string]: string } = {
              "Microclimate_evaluation_for_current_and_future_conditions.pdf":
                "1vMgajDuBjWnoUVVDVh7XebpVfH_2FJek",
              "Evaluation_of_climate_change_effect_on_the_built_environment.pdf":
                "1xi3RCLIqwWL5yTjPiUHiLoFeql9Aja0M",
              "Selection_of_urban_street_tree_types.pdf":
                "1pTdys-Z7qRrmG-XvQXwdLwBSOIsWnQu5",
              "LAI_LAD_and_albedo_database.pdf":
                "1L39hJMJPHgcm1wRM7CsEwxfeXLxMOyyu",
            };
            const fileId = fileIdMap[fileName];
            if (fileId) {
              url = `https://drive.google.com/file/d/${fileId}/view`;
            } else {
              url = ""; // Handle error if needed
            }
          } else {
            // GCS signed URLs for desktop/laptop and non-PDFs on mobile
            url = await getFileUrl(fileName);
          }
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
