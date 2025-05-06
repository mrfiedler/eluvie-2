
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie_consent');
    if (!consentGiven) {
      // Show the cookie banner after a small delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-700 p-4 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-medium mb-1">
                {language === 'en' ? 'Cookie & Privacy Notice' : 'Aviso de Cookies e Privacidade'}
              </h3>
              <p className="text-sm text-gray-300">
                {language === 'en' 
                  ? 'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.'
                  : 'Utilizamos cookies para melhorar sua experiência de navegação, exibir anúncios ou conteúdo personalizados e analisar nosso tráfego. Ao clicar em "Aceitar", você consente com o uso de cookies.'}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="whitespace-nowrap border-gray-700 hover:bg-gray-800" onClick={() => setIsVisible(false)}>
              {language === 'en' ? 'Decline' : 'Recusar'}
            </Button>
            <Button className="whitespace-nowrap bg-blue-600 hover:bg-blue-700" onClick={acceptCookies}>
              {language === 'en' ? 'Accept' : 'Aceitar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
