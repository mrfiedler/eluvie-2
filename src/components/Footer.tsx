
import { Instagram, Twitter, Facebook, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-10 md:mb-0">
            <a href="#" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eluvie-gold via-eluvie-teal to-eluvie-blue">
                eluvie
              </span>
            </a>
            <p className="text-gray-600 mb-6 max-w-xs">
              A financial platform built by creatives, for creatives. Simplify your money management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Integrations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Changelog</a></li>
            </ul>
          </div>
          
          <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Community</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Webinars</a></li>
            </ul>
          </div>
          
          <div className="w-1/2 md:w-1/6">
            <h3 className="text-sm font-semibold mb-4 text-gray-900">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Cookies</a></li>
              <li>
                <button className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
                  <Globe className="h-4 w-4 mr-1" />
                  English
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="section-divider my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Eluvie. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <span>Made with</span>
            <span className="text-red-500">❤</span>
            <span>for creative professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
