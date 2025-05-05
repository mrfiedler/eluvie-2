
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import WaitlistForm from '@/components/WaitlistForm';
import SuccessMessage from '@/components/SuccessMessage';
import { useVideoUrls, convertToEmbedUrl } from '@/hooks/useVideoUrls';

const ComingSoon = () => {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/M0Sp7ZP96Xo?autoplay=1&mute=1&loop=1&playlist=M0Sp7ZP96Xo');
  
  useEffect(() => {
    // Get stored video URL if available
    try {
      const savedUrls = localStorage.getItem('eluvie_video_urls');
      if (savedUrls) {
        const urls = JSON.parse(savedUrls);
        if (urls.comingSoon) {
          setVideoUrl(urls.comingSoon);
        }
      }
    } catch (error) {
      console.error("Error loading video URL:", error);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png"
            alt="Eluvie Logo" 
            className="h-8" 
          />
        </Link>
        <Link 
          to="/" 
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          {language === 'en' ? 'Back to Home' : 'Voltar para Início'}
        </Link>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('join-waitlist')}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {t('be-first')}
            </p>
            
            {isSubmitted ? (
              <SuccessMessage className="bg-[#202020]/70" />
            ) : (
              <WaitlistForm 
                onSuccess={() => setIsSubmitted(true)}
                buttonClassName="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              />
            )}
          </div>
        </div>
        
        <div className="md:w-1/2 bg-gradient-to-br from-[#202020] to-[#1a1a1a] p-6 md:p-0 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-lg p-6">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <iframe 
                className="w-full h-full"
                src={convertToEmbedUrl(videoUrl)} 
                title="Eluvie demonstration video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Get a sneak peek' : 'Veja uma prévia'}
              </h3>
              <p className="text-gray-300">
                {language === 'en' 
                  ? 'Watch our demo video to see what Eluvie has to offer.' 
                  : 'Assista ao nosso vídeo de demonstração para ver o que a Eluvie tem a oferecer.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
