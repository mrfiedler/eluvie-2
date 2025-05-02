import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'pt-BR' : 'en');
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png"
              alt="Eluvie Logo" 
              className="h-8" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a 
              href="#how-it-works" 
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
            >{t('how-it-works')}</a>
            <a 
              href="#features" 
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >{t('features')}</a>
            <a 
              href="#pricing" 
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('pricing');
              }}
            >{t('pricing')}</a>
            <a 
              href="#waitlist" 
              className="text-sm text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('waitlist');
              }}
            >{language === 'en' ? 'Waitlist' : 'Lista de Espera'}</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="text-sm bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => navigateTo('/coming-soon')}
            >
              {t('sign-in')}
            </Button>
            <Button 
              className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
              onClick={() => navigateTo('/coming-soon')}
            >
              {t('sign-up')}
            </Button>
            <button
              className="flex items-center gap-1 text-gray-300 hover:text-white"
              onClick={handleLanguageChange}
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs">{language === 'en' ? t('portuguese') : t('english')}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            className="flex items-center gap-1 text-gray-300 hover:text-white"
            onClick={handleLanguageChange}
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs">{language === 'en' ? t('portuguese') : t('english')}</span>
          </button>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#202020] shadow-lg pt-4 pb-6 px-4 border-t border-gray-700">
          <div className="flex flex-col space-y-3">
            <a 
              href="#how-it-works" 
              className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-[#2a2a2a]"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
                setMobileMenuOpen(false);
              }}
            >
              {t('how-it-works')}
            </a>
            <a 
              href="#features" 
              className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-[#2a2a2a]"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
                setMobileMenuOpen(false);
              }}
            >
              {t('features')}
            </a>
            <a 
              href="#pricing" 
              className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-[#2a2a2a]"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('pricing');
                setMobileMenuOpen(false);
              }}
            >
              {t('pricing')}
            </a>
            <a 
              href="#waitlist" 
              className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-[#2a2a2a]"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('waitlist');
                setMobileMenuOpen(false);
              }}
            >
              {language === 'en' ? 'Waitlist' : 'Lista de Espera'}
            </a>
            
            <div className="border-t border-gray-700 my-2"></div>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  navigateTo('/coming-soon');
                  setMobileMenuOpen(false);
                }}
              >
                {t('sign-in')}
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
                onClick={() => {
                  navigateTo('/coming-soon');
                  setMobileMenuOpen(false);
                }}
              >
                {t('sign-up-free')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
