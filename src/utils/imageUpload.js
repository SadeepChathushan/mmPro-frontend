import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zemZ1anNlY2VveHd5d2RmdWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0ODU3OTEsImV4cCI6MjA1MjA2MTc5MX0.QtDzZZvzfzDSpTDERfZzRCBXw5IcJibx7g0oVM-SQ3g`;

const url = "https://mszfujseceoxwywdfulj.supabase.co";

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;

    try {
      // Upload the file to Supabase storage bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        reject(`Upload failed: ${uploadError.message}`);
        return;
      }

      // Retrieve the public URL of the uploaded file
      const { data: publicData, error: publicUrlError } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      if (publicUrlError) {
        reject(`Failed to retrieve public URL: ${publicUrlError.message}`);
        return;
      }

      resolve(publicData.publicUrl);
    } catch (err) {
      reject(`Unexpected error: ${err.message}`);
    }
  });
}
