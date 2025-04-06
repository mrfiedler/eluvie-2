
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const CTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gray-900/50 opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl p-8 md:p-12 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('ready-to-simplify')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('join-thousands')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="flex items-center gap-2 text-base py-6 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
              onClick={() => window.location.href = "/coming-soon"}
            >
              {t('try-eluvie-free')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-base py-6 px-8 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
              onClick={() => window.location.href = "/coming-soon"}
            >
              {t('schedule-demo')}
            </Button>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            {t('no-credit-card')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
