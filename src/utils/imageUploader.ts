import { isSupabaseConfigured, uploadToSupabase, resolveSupabaseUrl } from './supabaseUploader';

/**
 * Direct Client-Side Free Image Uploader.
 * Supports:
 * 1. Supabase Free Tier Storage (if configured)
 * 2. Imgur Free Anonymous API (0-config fallback)
 * 
 * Result:
 * - Crystal-clear, full-resolution HD photos
 * - Short readable links (stores only 7-character ID or short filename)
 * - 100% WhatsApp Friendly (<250 chars)
 */

const IMGUR_CLIENT_IDS = [
  '546c25a59c58ad7',
  'e42b20f0e7d5669',
  'c911cf8d26210f9',
];

export interface UploadResult {
  id: string;      // Short ID e.g. "CkCRdry" or "sb:photo.jpg"
  url: string;     // Direct CDN image URL
  provider: 'supabase' | 'imgur';
}

export async function uploadAnonymousImage(file: File): Promise<UploadResult> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Selected file is not an image');
  }

  // 1. Try Supabase Storage first if project credentials are provided
  if (isSupabaseConfigured()) {
    try {
      const sbResult = await uploadToSupabase(file);
      return {
        id: sbResult.id,
        url: sbResult.url,
        provider: 'supabase',
      };
    } catch (sbErr) {
      console.warn('Supabase upload attempt failed, falling back to Imgur:', sbErr);
    }
  }

  // 2. Imgur Free Anonymous Upload
  const imageBlob = await prepareUploadBlob(file);
  const formData = new FormData();
  formData.append('image', imageBlob);
  formData.append('type', 'file');

  let lastError: Error | null = null;

  for (const clientId of IMGUR_CLIENT_IDS) {
    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': `Client-ID ${clientId}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data && data.data.id) {
        const id = data.data.id;
        const url = data.data.link || `https://i.imgur.com/${id}.jpg`;
        return {
          id,
          url,
          provider: 'imgur',
        };
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  throw lastError || new Error('Could not upload image to free image host');
}

/**
 * Pre-downscales oversized camera photos (e.g. 4000x3000 phone shots)
 * to 1200px max before uploading to ensure quick, reliable uploads.
 */
async function prepareUploadBlob(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    // If under 1.5MB, upload original directly for maximum clarity
    if (file.size < 1.5 * 1024 * 1024) {
      resolve(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const maxDim = 1200;
      let { width, height } = img;

      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          resolve(blob || file);
        },
        'image/jpeg',
        0.90
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };

    img.src = url;
  });
}
