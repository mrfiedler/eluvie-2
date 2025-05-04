
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import WaitlistForm from './WaitlistForm';
import SuccessMessage from './SuccessMessage';
import { useIsMobile } from '@/hooks/use-mobile';

const WaitlistSection = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section id="waitlist" className="section bg-[#202020] relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="max-w-lg mx-auto md:mr-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {t('join-waitlist')}
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {t('be-first')}
              </p>
              
              {isSubmitted ? (
                <SuccessMessage />
              ) : (
                <WaitlistForm onSuccess={() => setIsSubmitted(true)} />
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <img 
                  src="/lovable-uploads/fee0e698-51e9-462e-99b1-b5156482c06b.png" 
                  alt="Eluvie Dashboard Preview" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              
              {/* Floating notification card - updated for better mobile display */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-[#1a1a1a] rounded-xl shadow-lg p-3 sm:p-4 max-w-[12rem] sm:max-w-[15rem] border border-gray-700 animate-float">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <div className="h-2 w-2 sm:h-3 sm:w-3 bg-green-500 rounded-full"></div>
                  <p className="text-xs font-medium text-gray-200">{t('payment-received')}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">{t('payment-info')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
