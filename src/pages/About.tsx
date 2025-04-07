
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {language === 'en' ? 'About Eluvie' : 'Sobre a Eluvie'}
            </h1>
            
            <div className="prose prose-lg prose-invert">
              <p className="text-lg text-gray-300 mb-8">
                {language === 'en' 
                  ? 'Eluvie was born from a simple observation: creative professionals need financial tools that match their workflow, not the other way around.' 
                  : 'A Eluvie nasceu de uma observação simples: profissionais criativos precisam de ferramentas financeiras que se adaptem ao seu fluxo de trabalho, não o contrário.'}
              </p>
              
              <div className="aspect-video bg-[#202020] rounded-2xl overflow-hidden mb-8 border border-gray-700 shadow-lg">
                <img
                  src="/lovable-uploads/8b6cf37b-9352-4ffb-9d5f-7d50333791ee.png"
                  alt="Eluvie Team"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                {language === 'en' ? 'Our Mission' : 'Nossa Missão'}
              </h2>
              <p className="text-gray-300 mb-6">
                {language === 'en'
                  ? 'At Eluvie, our mission is to empower creative professionals by providing intuitive and visual financial tools that make managing money a seamless part of their creative process.'
                  : 'Na Eluvie, nossa missão é capacitar profissionais criativos fornecendo ferramentas financeiras intuitivas e visuais que tornam o gerenciamento de dinheiro uma parte integrada do seu processo criativo.'}
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                {language === 'en' ? 'Our Story' : 'Nossa História'}
              </h2>
              <p className="text-gray-300 mb-6">
                {language === 'en'
                  ? 'Founded in 2023 by a team of designers and developers who were frustrated with existing financial software, Eluvie is built by creatives, for creatives. We understand the unique challenges that design studios, freelancers, and digital agencies face when it comes to managing finances.'
                  : 'Fundada em 2023 por uma equipe de designers e desenvolvedores que estavam frustrados com os softwares financeiros existentes, a Eluvie é construída por criativos, para criativos. Entendemos os desafios únicos que estúdios de design, freelancers e agências digitais enfrentam quando se trata de gerenciar finanças.'}
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                {language === 'en' ? 'Our Values' : 'Nossos Valores'}
              </h2>
              <ul className="list-disc text-gray-300 ml-6 mb-6 space-y-2">
                <li>
                  <strong className="text-white">{language === 'en' ? 'Simplicity:' : 'Simplicidade:'}</strong>{' '}
                  {language === 'en'
                    ? 'We believe financial tools should be as simple and intuitive as the creative tools you already love.'
                    : 'Acreditamos que as ferramentas financeiras devem ser tão simples e intuitivas quanto as ferramentas criativas que você já ama.'}
                </li>
                <li>
                  <strong className="text-white">{language === 'en' ? 'Transparency:' : 'Transparência:'}</strong>{' '}
                  {language === 'en'
                    ? 'No hidden fees, no confusing terms—just clear, visual representations of your financial state.'
                    : 'Sem taxas ocultas, sem termos confusos—apenas representações claras e visuais do seu estado financeiro.'}
                </li>
                <li>
                  <strong className="text-white">{language === 'en' ? 'Empowerment:' : 'Capacitação:'}</strong>{' '}
                  {language === 'en'
                    ? 'We want to give creative professionals the confidence to make informed business decisions.'
                    : 'Queremos dar aos profissionais criativos a confiança para tomar decisões de negócios informadas.'}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
