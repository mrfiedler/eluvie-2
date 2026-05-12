import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/diagnostic')) return null;
  const phoneNumber = '5554991411584';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const check = () => setBannerVisible(document.body.hasAttribute('data-cookie-banner'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-cookie-banner'] });
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${bannerVisible ? 'bottom-40 md:bottom-28' : 'bottom-6'}`}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </a>
  );
};

export default WhatsAppButton;
