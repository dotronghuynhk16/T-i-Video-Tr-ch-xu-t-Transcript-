import { VideoMetadata, TranscriptData } from "../types";
import { generateSimulatedTranscript } from "./geminiService";

/**
 * Parses the URL to identify the platform and video ID.
 * Returns a deterministic result based on the input URL.
 */

const MOCK_DELAY = 1500;

// Helper to extract ID from URL
const extractVideoId = (url: string): { platform: VideoMetadata['platform'], id: string } | null => {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch) return { platform: 'YouTube', id: ytMatch[1] };

  // Facebook (Reels, Watch, Standard)
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    // Attempt to find a numeric ID or the reel ID
    const fbMatch = url.match(/(?:videos\/|reel\/|r\/|watch\/v=)(\d+|[a-zA-Z0-9]+)/);
    const id = fbMatch ? fbMatch[1] : 'fb_' + Math.random().toString(36).substr(2, 9);
    return { platform: 'Facebook', id: id };
  }

  // TikTok
  if (url.includes('tiktok.com')) {
    const ttMatch = url.match(/video\/(\d+)/);
    const id = ttMatch ? ttMatch[1] : 'tt_' + Math.random().toString(36).substr(2, 9);
    return { platform: 'TikTok', id: id };
  }

  // Instagram
  if (url.includes('instagram.com')) {
    const igMatch = url.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
    const id = igMatch ? igMatch[1] : 'ig_' + Math.random().toString(36).substr(2, 9);
    return { platform: 'Instagram', id: id };
  }

  return null;
};

const getThumbnail = (platform: VideoMetadata['platform'], id: string): string => {
  switch (platform) {
    case 'YouTube':
      return `https://img.youtube.com/vi/${id}/mqdefault.jpg`; // REAL YouTube Thumbnail
    case 'Facebook':
      // Return a generic Facebook placeholder since we can't scrape FB client-side without CORS proxy
      return `https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop&text=Facebook+Video`;
    case 'TikTok':
      return `https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1000&auto=format&fit=crop&text=TikTok+Video`;
    case 'Instagram':
      return `https://images.unsplash.com/photo-1611262588024-d12430b9816a?q=80&w=1000&auto=format&fit=crop`;
    default:
      return "https://picsum.photos/600/400";
  }
};

const getTitle = (platform: VideoMetadata['platform'], id: string): string => {
    // In a real backend app, we would scrape the page title.
    // Client-side, we return a clear identifier so the user knows we processed *their* link.
    if (platform === 'YouTube') return `YouTube Video (ID: ${id})`;
    if (platform === 'Facebook') return `Facebook Video/Reel (ID: ${id})`;
    if (platform === 'TikTok') return `TikTok Video (ID: ${id})`;
    return `Video Content (ID: ${id})`;
};

export const fetchVideoData = async (url: string): Promise<VideoMetadata> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = extractVideoId(url);

      if (!data) {
        reject(new Error("Không hỗ trợ định dạng liên kết này. Vui lòng thử link TikTok, Facebook, YouTube hoặc Instagram hợp lệ."));
        return;
      }

      resolve({
        id: data.id,
        title: getTitle(data.platform, data.id),
        thumbnail: getThumbnail(data.platform, data.id),
        duration: "00:XX", // Duration unknown without backend
        author: "Unknown User", // Author unknown without backend
        platform: data.platform,
        downloadLinks: [
          { quality: "HD (No Watermark)", url: url, size: "~ MB", type: "mp4" },
          { quality: "Original", url: url, size: "~ MB", type: "mp4" },
          { quality: "Audio Only", url: url, size: "~ MB", type: "mp3" },
        ]
      });
    }, MOCK_DELAY);
  });
};

export const fetchTranscript = async (url: string, videoTitle: string): Promise<TranscriptData> => {
    // In a real app, we would download the audio and send to STT API.
    // Here we use Gemini to explain that we are in simulation mode.
    const simulatedText = await generateSimulatedTranscript(videoTitle);
    
    return {
        text: simulatedText,
        language: "vi-VN"
    };
};