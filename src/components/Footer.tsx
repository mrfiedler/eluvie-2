
import { Link } from 'react-router-dom';
import { Globe, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  
  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'pt-BR' : 'en');
  };
  
  return (
    <footer className="bg-[#1a1a1a] border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-medium text-white mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('about')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('blog')}
                </a>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">{t('product')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('how-it-works')}
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('features')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('pricing')}
                </a>
              </li>
              <li>
                <a href="#waitlist" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {language === 'en' ? 'Waitlist' : 'Lista de Espera'}
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-2">
            <div className="flex space-x-4 mb-4">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png"
                  alt="Eluvie Logo" 
                  className="h-8" 
                />
              </Link>
              <button
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                onClick={handleLanguageChange}
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs">{language === 'en' ? t('portuguese') : t('english')}</span>
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              {language === 'en' 
                ? 'Eluvie is a financial platform designed specifically for creative professionals and agencies. Manage finances, invoices, projects, and subscriptions, all in one place.' 
                : 'Eluvie é uma plataforma financeira projetada especificamente para profissionais e agências criativas. Gerencie finanças, faturas, projetos e assinaturas, tudo em um só lugar.'}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Eluvie. {t('copyright')}
          </p>
          
          <div className="flex items-center text-gray-400 text-sm">
            {t('made-with-love')} <Heart className="h-3 w-3 text-red-500 mx-1" /> {t('for-creative')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
