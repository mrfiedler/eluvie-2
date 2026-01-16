
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const PricingSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <section id="pricing" className="section pt-24 pb-16 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('pricing-title')}</h2>
          <p className="text-lg text-gray-400">
            {t('pricing-subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Solo Plan */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">{t('solo-plan')}</h3>
              <div className="text-3xl font-bold mb-1">{t('solo-price')}</div>
              <p className="text-sm text-gray-400 mb-6">{t('solo-for')}</p>
              
              <Button 
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate("/coming-soon")}
              >
                {t('get-started-free')}
              </Button>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('solo-dashboard-limited')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('solo-clients')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('solo-revenue-entries')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('solo-expense-entries')}</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">{t('solo-no-contracts')}</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500">{t('solo-no-subscriptions')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('solo-users')}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Standard Plan */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-gray-700 overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">{t('standard-plan')}</h3>
              <div className="text-3xl font-bold mb-1">{t('standard-price')}</div>
              <p className="text-sm text-gray-400 mb-6">{t('standard-for')}</p>
              
              <Button 
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate("/coming-soon")}
              >
                {t('start-trial')}
              </Button>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-dashboard-complete')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-clients')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-revenue-entries')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-expense-entries')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-contracts')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-budget-invoice')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-subscriptions')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-indicators')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('standard-users')}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Studio Plan - Recommended */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-blue-500 overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-1 relative lg:scale-105 z-10">
            <div className="absolute top-0 right-0">
              <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                {t('popular')}
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">{t('studio-plan')}</h3>
              <div className="text-3xl font-bold mb-1">{t('studio-price')}</div>
              <p className="text-sm text-gray-400 mb-6">{t('studio-for')}</p>
              
              <Button 
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate("/coming-soon")}
              >
                {t('start-trial')}
              </Button>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-dashboard-complete')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-unlimited-entries')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-everything-standard')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-full-history')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-smart-status')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-conversion-rate')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-revenue-estimate')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-subscriptions')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{t('studio-users')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400">{t('all-plans-include')}</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
