
import { useState, useEffect } from 'react';

export interface VideoUrls {
  homepage: string;
  comingSoon: string;
}

const DEFAULT_URLS: VideoUrls = {
  homepage: 'https://www.youtube.com/embed/M0Sp7ZP96Xo?autoplay=1&mute=1&loop=1&playlist=M0Sp7ZP96Xo',
  comingSoon: 'https://www.youtube.com/embed/M0Sp7ZP96Xo?autoplay=1&mute=1&loop=1&playlist=M0Sp7ZP96Xo',
};

export const useVideoUrls = () => {
  const [videoUrls, setVideoUrls] = useState<VideoUrls>(() => {
    const savedUrls = localStorage.getItem('eluvie_video_urls');
    return savedUrls ? JSON.parse(savedUrls) : DEFAULT_URLS;
  });
  
  const updateVideoUrl = (key: keyof VideoUrls, url: string) => {
    setVideoUrls(prev => {
      const newUrls = { ...prev, [key]: url };
      localStorage.setItem('eluvie_video_urls', JSON.stringify(newUrls));
      return newUrls;
    });
  };
  
  useEffect(() => {
    // Initialize if not already in localStorage
    if (!localStorage.getItem('eluvie_video_urls')) {
      localStorage.setItem('eluvie_video_urls', JSON.stringify(DEFAULT_URLS));
    }
  }, []);
  
  return { videoUrls, updateVideoUrl };
};
