
import { Link } from 'react-router-dom';
import { Globe, Instagram, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  
  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'pt-BR' : 'en');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/eluvie.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  {t('contact')}
                  <Instagram className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">{t('product')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#how-it-works" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('how-it-works');
                  }}
                >
                  {language === 'en' ? 'How Eluvie Works' : 'Como a Eluvie Funciona'}
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                >
                  {t('features')}
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                >
                  {t('pricing')}
                </a>
              </li>
              <li>
                <a 
                  href="#waitlist" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('waitlist');
                  }}
                >
                  {language === 'en' ? 'Waitlist' : 'Lista de Espera'}
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-2">
            <div className="flex space-x-4 mb-4">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/16dc7938-88ea-46da-9ce5-56e9b9900220.png"
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
                : 'A Eluvie é uma plataforma financeira projetada especificamente para profissionais e agências criativas. Gerencie finanças, faturas, projetos e assinaturas, tudo em um só lugar.'}
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
