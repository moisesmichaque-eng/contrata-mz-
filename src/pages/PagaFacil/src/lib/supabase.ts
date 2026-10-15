import { createClient } from "@supabase/supabase-js";

// Publishable anon key for the user's own project (safe in client code).
export const SUPABASE_URL = "https://njunkhilqangpmkitgbx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdW5raGlscWFuZ3Bta2l0Z2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MzM4ODcsImV4cCI6MjEwNjUwOTg4N30.cKebnDw_O9c6sPpXRZnLM0k5-3dqsebkkp_KE3k4uIA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: typeof window !== "undefined" },
});

export const BUCKET = "Documents";

export async function uploadFile(file: File, folder: string) {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
