
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png"
              alt="Eluvie Logo" 
              className="h-8" 
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <a href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
            <div className="relative group">
              <button className="flex items-center text-sm text-gray-300 hover:text-white transition-colors">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-700">
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Blog</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Help Center</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">Templates</a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-sm bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
              Sign In
            </Button>
            <Button className="text-sm bg-blue-600 hover:bg-blue-700">
              Sign Up Free
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg pt-4 pb-6 px-4 border-t border-gray-700">
          <div className="flex flex-col space-y-3">
            <a 
              href="#how-it-works" 
              className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            
            <div className="border-t border-gray-700 my-2"></div>
            
            <a href="#" className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700">
              Blog
            </a>
            <a href="#" className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700">
              Help Center
            </a>
            <a href="#" className="text-base text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700">
              Templates
            </a>
            
            <div className="border-t border-gray-700 my-2"></div>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" className="w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                Sign In
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Sign Up Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
