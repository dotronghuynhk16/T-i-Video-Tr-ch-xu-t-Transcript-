export enum AppMode {
  TRANSCRIPT = 'TRANSCRIPT',
  DOWNLOAD = 'DOWNLOAD'
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: 'TikTok' | 'Facebook' | 'YouTube' | 'Instagram';
  downloadLinks?: {
    quality: string;
    url: string;
    size: string;
    type: 'mp4' | 'mp3';
  }[];
}

export interface TranscriptData {
  text: string;
  language: string;
  segments?: {
    startTime: string;
    endTime: string;
    text: string;
  }[];
}

export interface ApiError {
  message: string;
  code?: string;
}