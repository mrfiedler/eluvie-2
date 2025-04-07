
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const PricingSection = () => {
  const { t } = useLanguage();
  
  const plans = [
    {
      name: t('solo-plan'),
      price: t('solo-price'),
      description: t('solo-for'),
      features: [
        t('unlimited-clients'),
        t('basic-invoicing'),
        t('simple-expense'),
        t('manual-tracking'),
        t('limited-reports')
      ],
      notIncluded: [
        t('budget-invoice'),
        t('gamification-features'),
        t('multi-user'),
        t('priority-support')
      ],
      buttonText: t('get-started'),
      buttonVariant: "outline"
    },
    {
      name: t('studio-plan'),
      price: t('studio-price'),
      description: t('studio-for'),
      features: [
        t('unlimited-clients'),
        t('advanced-invoicing'),
        t('automated-expense'),
        t('automated-tracking'),
        t('budget-invoice'),
        t('basic-gamification'),
        t('export-reports')
      ],
      notIncluded: [
        t('multi-user'),
        t('priority-support')
      ],
      buttonText: t('start-trial'),
      buttonVariant: "default",
      popular: true
    },
    {
      name: t('agency-plan'),
      price: t('agency-price'),
      description: t('agency-for'),
      features: [
        t('everything-studio'),
        t('multi-user-access'),
        t('team-performance'),
        t('client-portal'),
        t('full-gamification'),
        t('custom-branding'),
        t('priority-support'),
        t('api-access')
      ],
      notIncluded: [],
      buttonText: t('start-trial'),
      buttonVariant: "outline"
    }
  ];

  return (
    <section id="pricing" className="section bg-[#202020] relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('pricing-title')}</h2>
          <p className="text-lg text-gray-400">
            {t('pricing-subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-[#1a1a1a] rounded-xl p-8 border border-gray-700 relative ${
                plan.popular ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {t('popular')}
                </div>
              )}
              
              <div className="mb-5">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.price !== t('solo-price') && <span className="ml-1 text-gray-400">/month</span>}
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
              </div>
              
              <div className="border-t border-gray-700 my-6"></div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
                
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start opacity-50">
                    <X className="h-5 w-5 text-gray-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.buttonVariant === "default" ? "default" : "outline"} 
                className={`w-full ${
                  plan.buttonVariant === "default" 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-gray-700 text-white bg-transparent hover:bg-gray-800"
                }`}
                onClick={() => window.location.href = "/coming-soon"}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            {t('all-plans-include')}<br />
            {t('need-custom')} <a href="#" className="text-blue-400 hover:underline">{t('contact-sales')}</a> {t('for-enterprise')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
