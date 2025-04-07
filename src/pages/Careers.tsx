
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Careers = () => {
  const { language } = useLanguage();

  const positions = [
    {
      title: language === 'en' ? 'UX/UI Designer' : 'Designer UX/UI',
      type: language === 'en' ? 'Full-time / Remote' : 'Tempo integral / Remoto',
      description: language === 'en' 
        ? 'Help us create intuitive, beautiful interfaces that make financial management a joy for creative professionals.'
        : 'Ajude-nos a criar interfaces intuitivas e bonitas que tornem a gestão financeira um prazer para profissionais criativos.'
    },
    {
      title: language === 'en' ? 'Frontend Developer' : 'Desenvolvedor Frontend',
      type: language === 'en' ? 'Full-time / Remote' : 'Tempo integral / Remoto',
      description: language === 'en'
        ? 'Build the next generation of finance tools using React, TypeScript, and modern web technologies.'
        : 'Construa a próxima geração de ferramentas financeiras usando React, TypeScript e tecnologias web modernas.'
    },
    {
      title: language === 'en' ? 'Backend Developer' : 'Desenvolvedor Backend',
      type: language === 'en' ? 'Full-time / Remote' : 'Tempo integral / Remoto',
      description: language === 'en'
        ? 'Design and develop scalable APIs and services that power our financial platform.'
        : 'Projete e desenvolva APIs e serviços escaláveis que alimentam nossa plataforma financeira.'
    },
    {
      title: language === 'en' ? 'Customer Success Specialist' : 'Especialista em Sucesso do Cliente',
      type: language === 'en' ? 'Full-time / Remote' : 'Tempo integral / Remoto',
      description: language === 'en'
        ? 'Help creative professionals succeed with Eluvie through expert onboarding and ongoing support.'
        : 'Ajude profissionais criativos a ter sucesso com a Eluvie por meio de integração especializada e suporte contínuo.'
    }
  ];

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
            
            <div className="grid gap-8">
              {positions.map((position, index) => (
                <div key={index} className="bg-[#202020] rounded-xl p-6 border border-gray-700 shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{position.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{position.type}</p>
                    </div>
                    <Button 
                      className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => window.location.href = "/coming-soon"}
                    >
                      {language === 'en' ? 'Apply Now' : 'Inscrever-se'}
                    </Button>
                  </div>
                  <p className="text-gray-300">{position.description}</p>
                </div>
              ))}
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
              <div className="flex flex-wrap gap-4">
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
            
            <div className="mt-12 text-center">
              <p className="text-lg text-gray-300 mb-6">
                {language === 'en'
                  ? 'Don\'t see a position that fits your skills?'
                  : 'Não vê uma posição que se adapte às suas habilidades?'}
              </p>
              <Button 
                variant="outline"
                className="inline-flex items-center gap-2 border-gray-700 hover:bg-gray-800"
                onClick={() => window.location.href = "/coming-soon"}
              >
                {language === 'en' ? 'Send us your CV' : 'Envie-nos seu currículo'}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
