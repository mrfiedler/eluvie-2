
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const Careers = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{t('careers-title')}</h1>
            <p className="text-xl text-gray-400 mb-12">{t('careers-subtitle')}</p>
            
            <div className="mb-12">
              <p className="text-lg mb-6 text-gray-300">
                {t('careers-desc')}
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-4">{t('no-positions')}</h2>
              <p className="text-gray-300 mb-2">
                {t('check-back')} <span className="text-blue-400">careers@eluvie.app</span> {t('to-express')}
              </p>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild>
                <Link to="/">{t('back-to-home')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
