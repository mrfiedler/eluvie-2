
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt-BR' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'pt-BR': {
    // Navbar
    'how-it-works': 'Como Funciona',
    'features': 'Recursos',
    'pricing': 'Preços',
    'sign-in': 'Entrar',
    'sign-up-free': 'Cadastre-se Grátis',
    
    // Hero
    'hero-title': 'Uma plataforma financeira feita para seu fluxo criativo.',
    'hero-subtitle': 'Gerencie clientes, finanças, contratos e assinaturas – em minutos, não horas.',
    'start-for-free': 'Começar Grátis',
    'see-how-it-works': 'Ver Como Funciona',
    'trusted-by': 'Confiado por 2.000+ profissionais criativos',
    
    // How it works
    'how-eluvie-works': 'Como o Eluvie Funciona',
    'how-it-works-desc': 'Uma plataforma financeira que entende fluxos de trabalho criativos, tornando a gestão financeira incrivelmente simples.',
    'track-income': 'Acompanhe receitas e despesas',
    'track-income-desc': 'Acompanhe facilmente o dinheiro que entra e sai, categorize despesas e mantenha-se em dia com as finanças do seu negócio criativo.',
    'budgets-invoices': 'Orçamentos para faturas',
    'budgets-invoices-desc': 'Crie orçamentos de projetos e converta-os automaticamente em faturas para clientes com apenas alguns cliques.',
    'monitor-subscriptions': 'Monitore assinaturas',
    'monitor-subscriptions-desc': 'Nunca perca o controle de renovações de assinaturas, testes gratuitos ou custos recorrentes de software para suas ferramentas criativas.',
    'get-rewarded': 'Seja recompensado',
    'get-rewarded-desc': 'Ganhe distintivos, sequências e recompensas por manter-se financeiramente organizado e manter práticas comerciais saudáveis.',
    'simplified-workflows': 'Fluxos de trabalho simplificados para mentes criativas',
    'simplified-workflows-desc': 'Projetamos cada recurso para se encaixar perfeitamente em seu processo criativo, não para interrompê-lo. As tarefas financeiras se tornam intuitivas e rápidas.',
    'team-collaboration': 'Colaboração em equipe',
    'client-management': 'Gestão de clientes',
    'visual-reporting': 'Relatórios visuais',
    
    // Testimonials
    'what-creatives-saying': 'O Que Os Criativos Estão Dizendo',
    'testimonials-desc': 'Não apenas acredite em nossa palavra. Veja o que profissionais criativos como você pensam sobre o Eluvie.',
    'read-more': 'Leia mais depoimentos',
    
    // CTA
    'ready-to-simplify': 'Pronto para simplificar seu caos financeiro?',
    'join-thousands': 'Junte-se a milhares de profissionais criativos que transformaram a forma como gerenciam suas finanças.',
    'try-eluvie-free': 'Experimente o Eluvie Grátis',
    'schedule-demo': 'Agende uma Demonstração',
    'no-credit-card': 'Não é necessário cartão de crédito. Plano gratuito disponível para sempre.',
    
    // Footer
    'company': 'Empresa',
    'about': 'Sobre',
    'blog': 'Blog',
    'careers': 'Carreiras',
    'contact': 'Contato',
    'product': 'Produto',
    'pricing': 'Preços',
    'terms': 'Termos',
    'privacy': 'Privacidade',
    'cookies': 'Cookies',
    'language': 'Idioma',
    'english': 'English',
    'portuguese': 'Português',
    'made-with-love': 'Feito com',
    'for-creative': 'para profissionais criativos',
    'copyright': 'Todos os direitos reservados.',
    
    // About page
    'about-title': 'Sobre o Eluvie',
    'about-subtitle': 'Simplificando finanças para mentes criativas',
    'about-desc': 'O Eluvie foi criado por uma equipe de profissionais criativos frustrados com ferramentas financeiras genéricas e complicadas. Nossa missão é simplificar o gerenciamento financeiro para agências, estúdios e freelancers criativos.',
    'our-mission': 'Nossa Missão',
    'our-mission-desc': 'Transformar a maneira como os criativos lidam com finanças, tornando-a simples, visual e até mesmo divertida.',
    'our-story': 'Nossa História',
    'our-story-desc': 'Fundada em 2023 no Brasil, a equipe do Eluvie combina experiência em design, desenvolvimento e finanças para criar a ferramenta financeira que sempre desejamos ter.',
    'meet-team': 'Conheça o Time',
    'back-to-home': 'Voltar para a página inicial',
    
    // Careers page
    'careers-title': 'Carreiras no Eluvie',
    'careers-subtitle': 'Junte-se à nossa equipe',
    'careers-desc': 'Estamos construindo uma plataforma financeira que entende e valoriza a criatividade. Embora não tenhamos vagas abertas no momento, estamos sempre de olho em talentos excepcionais.',
    'no-positions': 'Não há posições disponíveis no momento',
    'check-back': 'Volte em breve ou entre em contato conosco em',
    'to-express': 'para expressar seu interesse.'
  },
  'en': {
    // Navbar
    'how-it-works': 'How It Works',
    'features': 'Features',
    'pricing': 'Pricing',
    'sign-in': 'Sign In',
    'sign-up-free': 'Sign Up Free',
    
    // Hero
    'hero-title': 'A financial platform made for your creative flow.',
    'hero-subtitle': 'Manage clients, finances, contracts and subscriptions – in minutes, not hours.',
    'start-for-free': 'Start for Free',
    'see-how-it-works': 'See How It Works',
    'trusted-by': 'Trusted by 2,000+ creative professionals',
    
    // How it works
    'how-eluvie-works': 'How Eluvie Works',
    'how-it-works-desc': 'A financial platform that understands creative workflows, making money management delightfully simple.',
    'track-income': 'Track income & expenses',
    'track-income-desc': 'Easily track money flowing in and out, categorize expenses, and stay on top of your creative business finances.',
    'budgets-invoices': 'Budgets to invoices',
    'budgets-invoices-desc': 'Create project budgets and automatically convert them into client invoices with just a few clicks.',
    'monitor-subscriptions': 'Monitor subscriptions',
    'monitor-subscriptions-desc': 'Never lose track of subscription renewals, free trials, or recurring software costs for your creative tools.',
    'get-rewarded': 'Get rewarded',
    'get-rewarded-desc': 'Earn badges, streaks, and rewards for staying financially organized and maintaining healthy business practices.',
    'simplified-workflows': 'Simplified workflows for creative minds',
    'simplified-workflows-desc': "We've designed every feature to fit seamlessly into your creative process, not disrupt it. Financial tasks become intuitive and quick.",
    'team-collaboration': 'Team collaboration',
    'client-management': 'Client management',
    'visual-reporting': 'Visual reporting',
    
    // Testimonials
    'what-creatives-saying': 'What Creatives Are Saying',
    'testimonials-desc': "Don't just take our word for it. Here's what creative professionals like you think about Eluvie.",
    'read-more': 'Read more testimonials',
    
    // CTA
    'ready-to-simplify': 'Ready to simplify your financial chaos?',
    'join-thousands': "Join thousands of creative professionals who've transformed how they manage their finances.",
    'try-eluvie-free': 'Try Eluvie for Free',
    'schedule-demo': 'Schedule a Demo',
    'no-credit-card': 'No credit card required. Free plan available forever.',
    
    // Footer
    'company': 'Company',
    'about': 'About',
    'blog': 'Blog',
    'careers': 'Careers',
    'contact': 'Contact',
    'product': 'Product',
    'pricing': 'Pricing',
    'terms': 'Terms',
    'privacy': 'Privacy',
    'cookies': 'Cookies',
    'language': 'Language',
    'english': 'English',
    'portuguese': 'Português',
    'made-with-love': 'Made with',
    'for-creative': 'for creative professionals',
    'copyright': 'All rights reserved.',
    
    // About page
    'about-title': 'About Eluvie',
    'about-subtitle': 'Simplifying finances for creative minds',
    'about-desc': 'Eluvie was created by a team of creative professionals frustrated with generic, complicated financial tools. Our mission is to simplify financial management for creative agencies, studios, and freelancers.',
    'our-mission': 'Our Mission',
    'our-mission-desc': 'To transform how creatives deal with finances, making it simple, visual, and even fun.',
    'our-story': 'Our Story',
    'our-story-desc': 'Founded in 2023 in Brazil, the Eluvie team combines expertise in design, development, and finance to create the financial tool we always wished we had.',
    'meet-team': 'Meet the Team',
    'back-to-home': 'Back to home',
    
    // Careers page
    'careers-title': 'Careers at Eluvie',
    'careers-subtitle': 'Join our team',
    'careers-desc': "We're building a financial platform that understands and values creativity. While we don't have open positions right now, we're always on the lookout for exceptional talent.",
    'no-positions': 'No positions available at the moment',
    'check-back': 'Check back soon or contact us at',
    'to-express': 'to express your interest.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
