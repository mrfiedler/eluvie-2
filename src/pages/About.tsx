
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/translations/about';

const About = () => {
  const { language } = useLanguage();
  
  // Content is now hardcoded instead of using localStorage
  const aboutContent = {
    title: {
      en: 'About Eluvie',
      'pt-BR': 'Sobre a Eluvie'
    },
    description: {
      en: 'Eluvie wasn\'t created to fix finances, but to reinvent your relationship with them. We don\'t want to compete with spreadsheets, dashboards, or old platforms disguised as modern ones. We started with a question: "What if taking care of money was as fluid as sketching or creating a new project?" Born from the minds of creatives who also run businesses, Eluvie transforms financial control into something visual, human, and surprisingly enjoyable. It\'s not about becoming a finance expert, it\'s about feeling in tune with your numbers without losing your rhythm. We are the result of when creativity finally meets clarity.',
      'pt-BR': 'A Eluvie não foi criada para consertar as finanças, mas para reinventar sua relação com elas. Não queremos competir com planilhas, dashboards ou plataformas antigas disfarçadas de modernas. Começamos com uma pergunta: "E se cuidar do dinheiro fosse tão fluido quanto rabiscar ou criar um novo projeto?" Nascida da cabeça de criativos que também tocam negócios, a Eluvie transforma o controle financeiro em algo visual, humano e, surpreendentemente, prazeroso. Não é sobre virar expert em finanças, é sobre se sentir em sintonia com os seus números sem perder o ritmo. Nós somos o resultado de quando a criatividade finalmente encontra a clareza.'
    },
    mission: {
      en: 'More Freedom, Fewer Problems. We believe that financial control should not stifle your creativity. Eluvie gives you the power to make smart decisions without relying on confusing spreadsheets. Freelancers, designers, marketers, content creators, Eluvie was made for those who think visually and work intuitively. It\'s not just about controlling money, it\'s about feeling good doing it.',
      'pt-BR': 'Mais Liberdade, Menos Problemas. Acreditamos que o controle financeiro não deve sufocar sua criatividade. A Eluvie dá o poder de tomar decisões inteligentes sem depender de planilhas confusas. Freelancers, designers, marketeiros, criadores de conteúdo, a Eluvie foi feita para quem pensa de forma visual e trabalha de forma intuitiva. Não é só sobre controlar dinheiro, é sobre se sentir bem fazendo isso.'
    },
    story: {
      en: 'Eluvie was created by a creative entrepreneur and agency owner tired of overly complicated and technical financial tools. The goal? A platform that would bring to finances the same fluidity and clarity that creatives expect from the tools they love.',
      'pt-BR': 'A Eluvie foi criada por um empreendedor criativo e dono de agência cansado de ferramentas financeiras complicadas e técnicas demais. O objetivo? Uma plataforma que trouxesse para as finanças a mesma fluidez e clareza que os criativos esperam das ferramentas que amam.'
    },
    values_title: {
      en: 'In summary, we are committed to:',
      'pt-BR': 'Em resumo, nos comprometemos com:'
    },
    values_headers: {
      en: ['Flow Clarity,', 'Attractive Visuals,', 'Creative Control,'],
      'pt-BR': ['Clareza de Fluxo,', 'Visual atrativo,', 'Controle Criativo,']
    },
    values_content: {
      en: [
        'because understanding your money should not interrupt your rhythm, but enhance it.',
        'because numbers should speak your language, with graphics, not fine print.',
        'because confidence is born when your finances are as intuitive as your art.'
      ],
      'pt-BR': [
        'porque entender seu dinheiro não deve interromper seu ritmo, mas sim aprimorá-lo.',
        'porque os números devem falar a sua língua, com gráficos, não com letras miúdas.',
        'porque a confiança nasce quando suas finanças são tão intuitivas quanto sua arte.'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {aboutContent.title[language]}
            </h1>
            
            <div className="prose prose-lg prose-invert">
              <p className="text-lg text-gray-300 mb-8">
                {aboutContent.description[language]}
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                {translations['our-mission'][language]}
              </h2>
              <p className="text-gray-300 mb-6">
                {aboutContent.mission[language]}
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                {translations['our-story'][language]}
              </h2>
              <p className="text-gray-300 mb-6">
                {aboutContent.story[language]}
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                {aboutContent.values_title[language]}
              </h2>
              <ul className="list-disc text-gray-300 ml-6 mb-6 space-y-2">
                {aboutContent.values_headers[language].map((header, index) => (
                  <li key={index}>
                    <strong className="text-white">{header}</strong>{' '}
                    {aboutContent.values_content[language][index]}
                  </li>
                ))}
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
