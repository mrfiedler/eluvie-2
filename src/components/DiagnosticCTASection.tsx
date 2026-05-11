import { ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const DiagnosticCTASection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isPt = language === 'pt-BR';

  return (
    <section className="py-20 md:py-28 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ac2ee8]/10 blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center max-w-5xl mx-auto">
          {/* W animado — âncora visual */}
          <div className="flex justify-center md:justify-start">
            <div className="relative inline-flex">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#ac2ee8] opacity-40 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ac2ee8] to-[#5f8eea] blur-2xl opacity-60" />
              <span className="relative inline-flex w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#ac2ee8] via-[#8e60e5] to-[#5f8eea] items-center justify-center text-white font-bold text-5xl md:text-6xl shadow-2xl ring-4 ring-[#ac2ee8]/20">
                W
              </span>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ac2ee8]/15 border border-[#ac2ee8]/30 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#d64ec2]" />
              <span className="text-xs font-medium text-[#d64ec2] tracking-wide uppercase">
                {isPt ? 'Diagnóstico grátis com Wolly' : 'Free diagnostic with Wolly'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {isPt
                ? 'Descubra em 2 minutos se a Eluvie é para você'
                : 'Find out in 2 minutes if Eluvie is right for you'}
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-7 max-w-xl mx-auto md:mx-0">
              {isPt
                ? 'O Wolly conversa com você, entende o seu negócio criativo e indica o plano ideal — sem formulário, sem compromisso.'
                : 'Wolly chats with you, understands your creative business and recommends the ideal plan — no forms, no commitment.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start sm:justify-center md:justify-start">
              <Button
                onClick={() => navigate('/diagnostic')}
                size="lg"
                className="text-base py-6 px-8 bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] hover:opacity-90 border-none shadow-lg shadow-[#ac2ee8]/30"
              >
                {isPt ? 'Fazer diagnóstico grátis' : 'Get free diagnostic'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {isPt ? '< 2 min' : '< 2 min'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {isPt ? 'Sem cadastro' : 'No sign-up'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticCTASection;