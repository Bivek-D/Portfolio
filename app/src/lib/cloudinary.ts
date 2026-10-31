/** Helpers for the videos hosted on Cloudinary (cloud `jp56lzmk`). */

export const CLOUD = 'jp56lzmk';

/** The Cloudinary public id inside a player embed URL. */
export function publicId(embedUrl?: string): string | undefined {
  if (!embedUrl) return undefined;
  try {
    return new URL(embedUrl).searchParams.get('public_id') ?? undefined;
  } catch {
    return undefined;
  }
}

/** A still frame of the video (2s in), as a lightweight thumbnail. */
export function thumbUrl(id: string, width = 800, height?: number): string {
  const size = height ? `w_${width},h_${height},c_fill,g_auto` : `w_${width}`;
  return `https://res.cloudinary.com/${CLOUD}/video/upload/so_2,${size},q_auto,f_auto/${id}.jpg`;
}

/** The player embed, optionally starting playback straight away (after a click). */
export function playerUrl(embedUrl: string, autoplay = false): string {
  if (!autoplay) return embedUrl;
  const u = new URL(embedUrl);
  u.searchParams.set('autoplay', 'true');
  return u.toString();
}
