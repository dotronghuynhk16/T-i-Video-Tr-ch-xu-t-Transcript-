import { VideoMetadata, TranscriptData } from "../types";
import { generateSimulatedTranscript } from "./geminiService";

/**
 * IMPORTANT NOTE FOR DEVELOPERS:
 * 
 * In a production environment, this file would be replaced by a call to a backend API (Node.js/Python).
 * Browsers block requests to TikTok/Facebook directly due to CORS (Cross-Origin Resource Sharing).
 * 
 * To solve the user's "Paste Link" requirement without client-side upload:
 * 1. Client sends URL to your Backend.
 * 2. Backend (e.g., using yt-dlp or puppeteer) downloads the video/extracts audio.
 * 3. Backend sends audio to Speech-to-Text API (or Gemini).
 * 4. Backend returns text to Client.
 * 
 * Since this is a frontend-only demo, we SIMULATE this process.
 */

const MOCK_DELAY = 2000; // 2 seconds to simulate network request

export const fetchVideoData = async (url: string): Promise<VideoMetadata> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!url.includes('http')) {
        reject(new Error("Invalid URL"));
        return;
      }

      // Detect platform based on URL
      let platform: VideoMetadata['platform'] = 'TikTok';
      if (url.includes('facebook') || url.includes('fb.watch')) platform = 'Facebook';
      if (url.includes('youtube') || url.includes('youtu.be')) platform = 'YouTube';
      if (url.includes('instagram')) platform = 'Instagram';

      resolve({
        id: Math.random().toString(36).substring(7),
        title: "Video Viral: Hướng dẫn nấu ăn ngon tại nhà #food #viral",
        thumbnail: "https://picsum.photos/600/400", // Placeholder
        duration: "01:30",
        author: "@content_creator_vn",
        platform: platform,
        downloadLinks: [
          { quality: "No Watermark (HD)", url: "#", size: "12.5 MB", type: "mp4" },
          { quality: "Watermark (Original)", url: "#", size: "12.8 MB", type: "mp4" },
          { quality: "Audio Only", url: "#", size: "1.2 MB", type: "mp3" },
        ]
      });
    }, MOCK_DELAY);
  });
};

export const fetchTranscript = async (url: string, videoTitle: string): Promise<TranscriptData> => {
    // Simulate fetching transcript from backend
    // In reality, we will use Gemini to generate a placeholder one based on the title
    // to demonstrate the UI flow.
    const simulatedText = await generateSimulatedTranscript(videoTitle);
    
    return {
        text: simulatedText,
        language: "vi-VN"
    };
};