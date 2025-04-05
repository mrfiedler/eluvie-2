
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">{t('about-title')}</h1>
            <p className="text-xl text-gray-400 mb-12">{t('about-subtitle')}</p>
            
            <div className="mb-12">
              <p className="text-lg mb-6 text-gray-300">
                {t('about-desc')}
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4">{t('our-mission')}</h2>
              <p className="text-gray-300">
                {t('our-mission-desc')}
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4">{t('our-story')}</h2>
              <p className="text-gray-300">
                {t('our-story-desc')}
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

export default About;
