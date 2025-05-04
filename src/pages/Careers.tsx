
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Careers = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                {language === 'en' ? 'Join Our Team' : 'Junte-se à Nossa Equipe'}
              </h1>
              <p className="text-lg text-gray-300">
                {language === 'en'
                  ? 'Help us build the future of financial tools for creative professionals. We\'re a remote-first team with a passion for design and technology.'
                  : 'Ajude-nos a construir o futuro das ferramentas financeiras para profissionais criativos. Somos uma equipe remote-first com paixão por design e tecnologia.'}
              </p>
            </div>
            
            <div className="mt-16 p-8 rounded-xl bg-[#202020] border border-gray-700 shadow-md text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'en' ? 'No Open Positions' : 'Sem Vagas Abertas'}
              </h2>
              <p className="text-gray-300">
                {language === 'en'
                  ? 'We currently don\'t have any open positions, but we\'re always looking for talented people to join our team. If you\'re passionate about revolutionizing financial tools for creative professionals, keep an eye on this page for future opportunities.'
                  : 'Atualmente não temos nenhuma vaga aberta, mas estamos sempre em busca de pessoas talentosas para se juntar à nossa equipe. Se você é apaixonado por revolucionar ferramentas financeiras para profissionais criativos, fique de olho nesta página para futuras oportunidades.'}
              </p>
            </div>
            
            <div className="mt-16 p-8 rounded-xl bg-[#202020] border border-gray-700 shadow-md">
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'en' ? 'Our Culture' : 'Nossa Cultura'}
              </h2>
              <p className="text-gray-300 mb-6">
                {language === 'en'
                  ? 'At Eluvie, we believe in creating a work environment where creativity thrives. We value diverse perspectives, work-life balance, and continuous learning.'
                  : 'Na Eluvie, acreditamos em criar um ambiente de trabalho onde a criatividade prospera. Valorizamos diversas perspectivas, equilíbrio entre trabalho e vida pessoal e aprendizado contínuo.'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-[#1a1a1a] rounded-lg py-2 px-4 text-sm text-gray-300 border border-gray-700">
                  {language === 'en' ? 'Remote-first' : 'Remoto primeiro'}
                </div>
                <div className="bg-[#1a1a1a] rounded-lg py-2 px-4 text-sm text-gray-300 border border-gray-700">
                  {language === 'en' ? 'Flexible hours' : 'Horários flexíveis'}
                </div>
                <div className="bg-[#1a1a1a] rounded-lg py-2 px-4 text-sm text-gray-300 border border-gray-700">
                  {language === 'en' ? 'Competitive compensation' : 'Remuneração competitiva'}
                </div>
                <div className="bg-[#1a1a1a] rounded-lg py-2 px-4 text-sm text-gray-300 border border-gray-700">
                  {language === 'en' ? 'Learning budget' : 'Orçamento para aprendizado'}
                </div>
                <div className="bg-[#1a1a1a] rounded-lg py-2 px-4 text-sm text-gray-300 border border-gray-700">
                  {language === 'en' ? 'Team retreats' : 'Retiros de equipe'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
