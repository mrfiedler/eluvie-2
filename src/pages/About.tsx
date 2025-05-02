
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/translations/about';

const About = () => {
  const { language } = useLanguage();

  // Check if there's saved about page content in localStorage
  const getSavedContent = (key: string) => {
    try {
      const savedContent = localStorage.getItem('eluvie_about_content');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        if (parsedContent && parsedContent[key] && parsedContent[key][language]) {
          return parsedContent[key][language];
        }
      }
    } catch (e) {
      console.error('Error getting saved content:', e);
    }
    
    // Fallback to the translations
    const translationKey = key === 'title' ? 'about-title' : 
                           key === 'subtitle' ? 'about-subtitle' :
                           key === 'description' ? 'about-desc' :
                           key === 'mission' ? 'our-mission-desc' :
                           key === 'story' ? 'our-story-desc' : '';
                           
    return translations[translationKey as keyof typeof translations][language];
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {getSavedContent('title')}
            </h1>
            
            <div className="prose prose-lg prose-invert">
              <p className="text-lg text-gray-300 mb-8">
                {getSavedContent('description')}
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
                {getSavedContent('mission')}
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">
                {translations['our-story'][language]}
              </h2>
              <p className="text-gray-300 mb-6">
                {getSavedContent('story')}
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
