
import { useState, useEffect } from 'react';

export interface VideoUrls {
  homepage: string;
  comingSoon: string;
}

const DEFAULT_URLS: VideoUrls = {
  homepage: 'https://www.youtube.com/embed/c3m8qhBUaDE?autoplay=1&mute=1&loop=1&playlist=c3m8qhBUaDE',
  comingSoon: 'https://www.youtube.com/embed/c3m8qhBUaDE?autoplay=1&mute=1&loop=1&playlist=c3m8qhBUaDE',
};

// Function to convert regular YouTube URL to embed URL
export const convertToEmbedUrl = (url: string): string => {
  // If it's already an embed URL, return it as is
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  // Extract video ID from various YouTube URL formats
  let videoId = '';
  
  // Match standard watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }
  
  // Match shortened URLs: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }
  
  if (videoId) {
    // Create embed URL with autoplay, mute, and loop parameters
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  }
  
  // If no match found or invalid URL, return the original URL
  return url;
};

export const useVideoUrls = () => {
  const [videoUrls, setVideoUrls] = useState<VideoUrls>(DEFAULT_URLS);
  
  const updateVideoUrl = (key: keyof VideoUrls, url: string) => {
    const embedUrl = convertToEmbedUrl(url);
    setVideoUrls(prev => {
      const newUrls = { ...prev, [key]: embedUrl };
      return newUrls;
    });
  };
  
  return { videoUrls, updateVideoUrl, convertToEmbedUrl };
};
