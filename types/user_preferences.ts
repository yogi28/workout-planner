import { Database } from "./supabase";

export type UserPreferences = Database["public"]["Tables"]["user_preferences"]["Row"]