import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const DiagnosticCTASection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ac2ee8]/10 via-[#1a1a1a] to-[#5f8eea]/10" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center bg-[#202020]/70 backdrop-blur border border-[#8e60e5]/30 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="relative inline-flex mx-auto mb-6">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#ac2ee8] opacity-50 animate-ping" />
            <span className="relative inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-[#ac2ee8] to-[#5f8eea] items-center justify-center text-white font-bold text-2xl shadow-lg">
              W
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {language === 'pt-BR'
              ? 'Descubra em 2 minutos se a Eluvie é para você'
              : 'Find out in 2 minutes if Eluvie is right for you'}
          </h2>
          <p className="text-gray-300 md:text-lg mb-8 max-w-xl mx-auto">
            {language === 'pt-BR'
              ? 'O Wolly analisa seu negócio e te mostra o plano ideal, de graça.'
              : 'Wolly analyzes your business and shows you the perfect plan, for free.'}
          </p>
          <Button
            onClick={() => navigate('/diagnostic')}
            className="text-base py-6 px-8 bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] hover:opacity-90 border-none"
          >
            {language === 'pt-BR' ? 'Fazer diagnóstico grátis' : 'Get free diagnostic'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-xs text-gray-400 mt-4">
            {language === 'pt-BR'
              ? 'Leva menos de 2 minutos. Sem cadastro prévio.'
              : 'Takes less than 2 minutes. No sign-up required.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticCTASection;