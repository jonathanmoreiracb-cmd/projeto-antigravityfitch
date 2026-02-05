import { supabase } from './supabaseClient';

const BUCKET = 'site-assets';

export function sanitizeFileName(name: string): string {
    // Remove special chars, replace spaces with dashes, generic normalization
    return name.toLowerCase()
        .replace(/[^a-z0-9.]/g, '-')
        .replace(/-+/g, '-');
}

export async function uploadImage(file: File, folder: string): Promise<string | null> {
    const timestamp = Date.now();
    const cleanName = sanitizeFileName(file.name);
    const path = `${folder}/${timestamp}-${cleanName}`;

    const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Upload error:', error);
        return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

    return publicUrl;
}
