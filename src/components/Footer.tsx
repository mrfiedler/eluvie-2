
import { Instagram, Linkedin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt-BR' : 'en');
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-10 md:mb-0">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png" 
                alt="Eluvie Logo" 
                className="h-8 w-auto" 
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              {language === 'pt-BR' 
                ? 'Uma plataforma financeira construída por criativos, para criativos. Simplifique sua gestão financeira.' 
                : 'A financial platform built by creatives, for creatives. Simplify your money management.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold mb-4 text-white">{t('company')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm">{t('about')}</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm">{t('blog')}</a></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-blue-400 text-sm">{t('careers')}</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm">{t('contact')}</a></li>
            </ul>
          </div>
          
          <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold mb-4 text-white">{t('product')}</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-blue-400 text-sm">{t('features')}</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-blue-400 text-sm">{t('pricing')}</a></li>
            </ul>
          </div>
          
          <div className="w-1/2 md:w-1/6">
            <h3 className="text-sm font-semibold mb-4 text-white">{t('language')}</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  className="flex items-center text-gray-400 hover:text-blue-400 text-sm"
                  onClick={toggleLanguage}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'English' : 'Português'}
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="section-divider my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Eluvie. {t('copyright')}
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <span>{t('made-with-love')}</span>
            <span className="text-red-500">❤</span>
            <span>{t('for-creative')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
