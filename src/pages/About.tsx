
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/translations/about';

type AboutContent = {
  title: {
    en: string;
    'pt-BR': string;
  };
  subtitle: {
    en: string;
    'pt-BR': string;
  };
  description: {
    en: string;
    'pt-BR': string;
  };
  mission: {
    en: string;
    'pt-BR': string;
  };
  story: {
    en: string;
    'pt-BR': string;
  };
  values_title: {
    en: string;
    'pt-BR': string;
  };
  values_content: {
    en: string[];
    'pt-BR': string[];
  };
  values_headers: {
    en: string[];
    'pt-BR': string[];
  };
};

const defaultContent: AboutContent = {
  title: {
    en: 'About Eluvie',
    'pt-BR': 'Sobre a Eluvie',
  },
  subtitle: {
    en: 'Our story and mission',
    'pt-BR': 'Nossa história e missão',
  },
  description: {
    en: 'Eluvie is a financial platform designed specifically for creative professionals. We understand the unique challenges that designers, photographers, writers, and other creatives face when managing their finances.',
    'pt-BR': 'Eluvie é uma plataforma financeira projetada especificamente para profissionais criativos. Entendemos os desafios únicos que designers, fotógrafos, escritores e outros criativos enfrentam ao gerenciar suas finanças.'
  },
  mission: {
    en: 'Our mission is to empower creative professionals with financial tools that are as intuitive and beautiful as the work they produce. We believe that managing money should be simple, visual, and even enjoyable.',
    'pt-BR': 'Nossa missão é capacitar profissionais criativos com ferramentas financeiras tão intuitivas e bonitas quanto o trabalho que produzem. Acreditamos que gerenciar dinheiro deve ser simples, visual e até agradável.'
  },
  story: {
    en: "Founded in 2023 by a team of designers and developers who were frustrated with existing financial tools, Eluvie was born from the belief that creative professionals deserve better. We've combined our expertise in design and finance to create a platform that speaks your language.",
    'pt-BR': 'Fundada em 2023 por uma equipe de designers e desenvolvedores frustrados com as ferramentas financeiras existentes, a Eluvie nasceu da crença de que profissionais criativos merecem algo melhor. Combinamos nossa experiência em design e finanças para criar uma plataforma que fala a sua língua.'
  },
  values_title: {
    en: 'Our Values',
    'pt-BR': 'Nossos Valores'
  },
  values_headers: {
    en: ['Simplicity:', 'Transparency:', 'Empowerment:'],
    'pt-BR': ['Simplicidade:', 'Transparência:', 'Capacitação:']
  },
  values_content: {
    en: [
      'We believe financial tools should be as simple and intuitive as the creative tools you already love.',
      'No hidden fees, no confusing terms—just clear, visual representations of your financial state.',
      'We want to give creative professionals the confidence to make informed business decisions.'
    ],
    'pt-BR': [
      'Acreditamos que as ferramentas financeiras devem ser tão simples e intuitivas quanto as ferramentas criativas que você já ama.',
      'Sem taxas ocultas, sem termos confusos—apenas representações claras e visuais do seu estado financeiro.',
      'Queremos dar aos profissionais criativos a confiança para tomar decisões de negócios informadas.'
    ]
  }
};

const About = () => {
  const { language } = useLanguage();
  const [aboutContent, setAboutContent] = React.useState<AboutContent>(defaultContent);

  // Load saved content from localStorage on component mount
  React.useEffect(() => {
    try {
      const savedContent = localStorage.getItem('eluvie_about_content');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        setAboutContent({...defaultContent, ...parsedContent});
      }
    } catch (e) {
      console.error('Error loading saved content:', e);
    }
  }, []);

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
              
              <div className="aspect-video bg-[#202020] rounded-2xl overflow-hidden mb-8 border border-gray-700 shadow-lg">
                <img
                  src="/lovable-uploads/8b6cf37b-9352-4ffb-9d5f-7d50333791ee.png"
                  alt="Eluvie Team"
                  className="w-full h-full object-cover"
                />
              </div>
              
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
