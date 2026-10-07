/**
 * Direct Client-Side Supabase Storage Uploader.
 * Uploads crystal-clear, full-resolution images directly from the browser
 * to Supabase Free Tier Storage via native REST API (zero npm dependencies).
 */

// Supabase project settings can be configured via environment variables
// or dynamically overridden.
export const SUPABASE_CONFIG = {
  url: (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SUPABASE_URL) || '',
  anonKey: (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SUPABASE_ANON_KEY) || '',
  bucket: 'gift-images',
};

export interface SupabaseUploadResult {
  id: string;   // Short file key e.g. "sb:17283-abc.jpg"
  url: string;  // Full public CDN URL
}

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
}

/**
 * Uploads image directly to Supabase Storage bucket.
 */
export async function uploadToSupabase(file: File): Promise<SupabaseUploadResult> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured yet');
  }

  const cleanExt = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const shortId = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}.${cleanExt}`;
  const uploadEndpoint = `${SUPABASE_CONFIG.url}/storage/v1/object/${SUPABASE_CONFIG.bucket}/${shortId}`;

  const response = await fetch(uploadEndpoint, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': file.type || 'image/jpeg',
      'x-upsert': 'true',
    },
    body: file,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Supabase upload failed (${response.status}): ${errorText}`);
  }

  const projectRefMatch = SUPABASE_CONFIG.url.match(/https?:\/\/([^.]+)\.supabase\.co/);
  const projectRef = projectRefMatch ? projectRefMatch[1] : '';
  const storedId = projectRef ? `sb:${projectRef}:${shortId}` : `sb:${shortId}`;

  const publicUrl = `${SUPABASE_CONFIG.url}/storage/v1/object/public/${SUPABASE_CONFIG.bucket}/${shortId}`;
  return {
    id: storedId,
    url: publicUrl,
  };
}

/**
 * Resolves a short "sb:<filename>" or "sb:<projectRef>:<filename>" ID back to its full public Supabase URL.
 */
export function resolveSupabaseUrl(id: string): string {
  if (!id.startsWith('sb:')) return id;
  const rest = id.replace('sb:', '');
  const colonIdx = rest.indexOf(':');

  if (colonIdx !== -1) {
    const projectRef = rest.substring(0, colonIdx);
    const fileName = rest.substring(colonIdx + 1);
    return `https://${projectRef}.supabase.co/storage/v1/object/public/${SUPABASE_CONFIG.bucket}/${fileName}`;
  }

  // Fallback if no projectRef was embedded
  if (SUPABASE_CONFIG.url) {
    return `${SUPABASE_CONFIG.url}/storage/v1/object/public/${SUPABASE_CONFIG.bucket}/${rest}`;
  }

  return id;
}
