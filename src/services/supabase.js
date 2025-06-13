import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mmxpwidggqxudejlgpxh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1teHB3aWRnZ3F4dWRlamxncHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NjE5ODgsImV4cCI6MjA2NDMzNzk4OH0.FugNgdi5yfJ4B2TmH8i12yerdR020VRoXKZKezMnQJU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
