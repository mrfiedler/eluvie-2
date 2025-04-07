import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
const HeroSection = () => {
  const {
    t
  } = useLanguage();
  const scrollToVideo = () => {
    const videoSection = document.getElementById('eluvie-video-section');
    if (videoSection) {
      videoSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="pt-32 pb-24 relative overflow-hidden bg-[#1a1a1a]">
      {/* Subtle gradient background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              <span>{t('hero-title').split(' ').slice(0, -1).join(' ')}</span>
              <span className="text-blue-400"> {t('hero-title').split(' ').slice(-1)}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg">
              {t('hero-subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center gap-2 text-base py-6 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none" onClick={() => window.location.href = "/coming-soon"}>
                {t('start-free')}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="flex items-center gap-2 text-base py-6 px-8 border-gray-700 bg-gray-800/80 text-gray-300 hover:bg-gray-700" onClick={scrollToVideo}>
                <Play className="h-5 w-5 text-gray-400" />
                {t('how-works')}
              </Button>
            </div>
            <div className="mt-8 flex items-center text-sm text-gray-400">
              <div className="flex -space-x-2 mr-3">
                <img className="h-8 w-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/women/11.jpg" alt="User" />
                <img className="h-8 w-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <img className="h-8 w-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              </div>
              {t('trusted-by')}
            </div>
          </div>

          <div className="w-full lg:w-1/2 animate-fade-in animation-delay-300 lg:pl-10">
            <div className="relative">
              {/* Dashboard mockup */}
              <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-700 animate-float">
                <img src="/lovable-uploads/0da950c7-6e18-4083-8c37-72fc551f9225.png" alt="Eluvie Dashboard" className="w-full object-cover" />
              </div>
              
              {/* Floating notification card - styled like your dashboard */}
              <div className="absolute -bottom-10 -left-10 bg-gray-800 rounded-xl shadow-lg p-4 max-w-[15rem] border border-gray-700 animate-float" style={{
              animationDelay: '0.3s'
            }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <p className="text-xs font-medium text-gray-200">{t('payment-received') || 'Pagamento Recebido'}</p>
                </div>
                <p className="text-sm text-gray-400">{t('payment-info') || 'Cliente Acme Inc. pagou R$2.400,00'}</p>
              </div>
              
              {/* Gamification badge - styled like your dashboard */}
              <div className="absolute top-8 -right-4 bg-gray-800 rounded-full shadow-lg p-3 animate-float" style={{
              animationDelay: '0.6s'
            }}>
                <div className="h-12 w-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;