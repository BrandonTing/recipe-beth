import { createClient } from "@supabase/supabase-js";
import { config } from "../config";

// Create Supabase client
const supabase = createClient(config.env.SUPABASE_URL, config.env.SUPABASE_KEY);

function getFilename(name: string): string {
    return `public/${name}`;
}

export async function upload(file: File) {
    return await supabase.storage
        .from(config.env.SUPABASE_BUCKET)
        .upload(getFilename(file.name), file, {
            cacheControl: "3600",
            upsert: true,
        });
}

export function getDownloadPath(name: string) {
    return supabase.storage
        .from(config.env.SUPABASE_BUCKET)
        .getPublicUrl(getFilename(name)).data.publicUrl;
}

export function deleteFile(name: string) {
    console.log(getFilename(name));
    return supabase.storage
        .from(config.env.SUPABASE_BUCKET)
        .remove([getFilename(name)]);
}
