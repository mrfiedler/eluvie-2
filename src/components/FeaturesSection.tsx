
import { Shield, Sparkles, BarChart3, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-400" />,
      title: t('feature-1-title'),
      description: t('feature-1-desc')
    },
    {
      icon: <Clock className="h-10 w-10 text-indigo-400" />,
      title: t('feature-2-title'),
      description: t('feature-2-desc')
    },
    {
      icon: <Sparkles className="h-10 w-10 text-purple-400" />,
      title: t('feature-3-title'),
      description: t('feature-3-desc')
    },
    {
      icon: <Shield className="h-10 w-10 text-teal-400" />,
      title: t('feature-4-title'),
      description: t('feature-4-desc')
    }
  ];
  
  return (
    <section id="features" className="section bg-[#202020] relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('features-title')}</h2>
          <p className="text-lg text-gray-400">
            {t('features-subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
              <img 
                src="/lovable-uploads/0da950c7-6e18-4083-8c37-72fc551f9225.png" 
                alt="Eluvie Dashboard" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-20"></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">{t('creative-freedom')}</h3>
            <p className="text-gray-300 mb-8">{t('creative-freedom-desc')}</p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-[#1a1a1a] rounded-lg p-3 h-fit border border-gray-700">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-white">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
