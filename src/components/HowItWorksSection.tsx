
import { LineChart, CreditCard, BadgeCheck, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <LineChart className="h-10 w-10 text-blue-400" />,
      title: t('track-income'),
      description: t('track-income-desc')
    },
    {
      icon: <CreditCard className="h-10 w-10 text-purple-400" />,
      title: t('budgets-invoices'),
      description: t('budgets-invoices-desc')
    },
    {
      icon: <Calendar className="h-10 w-10 text-cyan-400" />,
      title: t('monitor-subscriptions'),
      description: t('monitor-subscriptions-desc')
    },
    {
      icon: <BadgeCheck className="h-10 w-10 text-indigo-400" />,
      title: t('get-rewarded'),
      description: t('get-rewarded-desc')
    }
  ];

  return (
    <section id="how-it-works" className="section relative overflow-hidden bg-gray-900 py-24">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('how-eluvie-works')}</h2>
          <p className="text-lg text-gray-400">
            {t('how-it-works-desc')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex flex-col items-center text-center">
              <div className="mb-5 rounded-full bg-gray-800 p-3 shadow-sm border border-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-bl-[100px]"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-semibold mb-4 text-white">{t('simplified-workflows')}</h3>
                <p className="text-gray-400 mb-6">
                  {t('simplified-workflows-desc')}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-sm text-gray-300">{t('team-collaboration')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                    <span className="text-sm text-gray-300">{t('client-management')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 mr-2"></div>
                    <span className="text-sm text-gray-300">{t('visual-reporting')}</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Creative workspace" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
