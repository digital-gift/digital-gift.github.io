/**
 * HTML5 Canvas Image Downscaler & Compressor.
 * Downscales uploaded photos to max 160x160px WebP to ensure tiny URL payload size.
 */

export interface CompressedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
}

const MAX_DIMENSION = 160;
const COMPRESSION_QUALITY = 0.7;

export async function compressImageFile(file: File): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file'));

    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) {
        reject(new Error('Empty image result'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for processing'));

      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale while preserving aspect ratio
          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas 2D context'));
            return;
          }

          // High quality downsampling
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(img, 0, 0, width, height);

          // Try exporting to WebP first
          let dataUrl = canvas.toDataURL('image/webp', COMPRESSION_QUALITY);

          // If browser doesn't support WebP export (returns PNG header), fallback to JPEG
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
          }

          // Calculate approximate byte size of base64
          const base64Content = dataUrl.split(',')[1] || '';
          const sizeBytes = Math.round((base64Content.length * 3) / 4);

          resolve({
            dataUrl,
            width,
            height,
            sizeBytes,
          });
        } catch (err) {
          reject(err);
        }
      };

      img.src = src;
    };

    reader.readAsDataURL(file);
  });
}
