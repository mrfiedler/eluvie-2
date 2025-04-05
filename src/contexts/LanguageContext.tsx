
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'pt-BR';

interface Translations {
  [key: string]: {
    en: string;
    'pt-BR': string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Navbar
  'sign-in': {
    en: 'Sign In',
    'pt-BR': 'Entrar'
  },
  'sign-up': {
    en: 'Sign Up Free',
    'pt-BR': 'Cadastre-se Grátis'
  },
  
  // Hero
  'hero-title': {
    en: 'A financial platform made for your creative flow',
    'pt-BR': 'Uma plataforma financeira feita para seu fluxo criativo'
  },
  'hero-subtitle': {
    en: 'Manage clients, finances, contracts and subscriptions – in minutes, not hours.',
    'pt-BR': 'Gerencie clientes, finanças, contratos e assinaturas – em minutos, não horas.'
  },
  'start-free': {
    en: 'Start for Free',
    'pt-BR': 'Comece Gratuitamente'
  },
  'how-works': {
    en: 'See How It Works',
    'pt-BR': 'Veja Como Funciona'
  },
  
  // How it works
  'how-it-works': {
    en: 'How Eluvie Works',
    'pt-BR': 'Como o Eluvie Funciona'
  },
  'how-it-works-subtitle': {
    en: 'Simplicity and power in four easy steps',
    'pt-BR': 'Simplicidade e poder em quatro passos fáceis'
  },
  'track-income': {
    en: 'Track income & expenses easily',
    'pt-BR': 'Acompanhe receitas e despesas facilmente'
  },
  'track-income-desc': {
    en: 'Simple visual interface to manage all your financial movements',
    'pt-BR': 'Interface visual simples para gerenciar todos os seus movimentos financeiros'
  },
  'create-budgets': {
    en: 'Create budgets and convert them into invoices',
    'pt-BR': 'Crie orçamentos e converta-os em faturas'
  },
  'create-budgets-desc': {
    en: 'Transform proposals into billable invoices with one click',
    'pt-BR': 'Transforme propostas em faturas cobráveis com um clique'
  },
  'monitor-subscriptions': {
    en: 'Monitor subscriptions',
    'pt-BR': 'Monitore assinaturas'
  },
  'monitor-subscriptions-desc': {
    en: 'Keep track of all your recurring services and expenses',
    'pt-BR': 'Acompanhe todos os seus serviços e despesas recorrentes'
  },
  'get-rewarded': {
    en: 'Get rewarded for staying organized',
    'pt-BR': 'Seja recompensado por manter-se organizado'
  },
  'get-rewarded-desc': {
    en: 'Our gamification system keeps you motivated and on track',
    'pt-BR': 'Nosso sistema de gamificação mantém você motivado e organizado'
  },

  // Who it's for
  'who-for': {
    en: 'Who It\'s For',
    'pt-BR': 'Para Quem É'
  },
  'who-for-subtitle': {
    en: 'Built specifically for creative professionals',
    'pt-BR': 'Criado especificamente para profissionais criativos'
  },
  'marketing-agencies': {
    en: 'Marketing Agencies',
    'pt-BR': 'Agências de Marketing'
  },
  'social-media': {
    en: 'Social Media Managers',
    'pt-BR': 'Gerentes de Mídias Sociais'
  },
  'design-studios': {
    en: 'Design Studios',
    'pt-BR': 'Estúdios de Design'
  },
  'freelancers': {
    en: 'Freelancers & Developers',
    'pt-BR': 'Freelancers & Desenvolvedores'
  },

  // Features
  'features': {
    en: 'Features',
    'pt-BR': 'Funcionalidades'
  },
  'features-subtitle': {
    en: 'Everything you need to manage your creative business',
    'pt-BR': 'Tudo que você precisa para gerenciar seu negócio criativo'
  },
  'visual-dashboards': {
    en: 'Visual Dashboards',
    'pt-BR': 'Painéis Visuais'
  },
  'visual-dashboards-desc': {
    en: 'See your finances by month, project, or client',
    'pt-BR': 'Veja suas finanças por mês, projeto ou cliente'
  },
  'simplified-reports': {
    en: 'Simplified Financial Reports',
    'pt-BR': 'Relatórios Financeiros Simplificados'
  },
  'simplified-reports-desc': {
    en: 'Clear financial insights without the accounting jargon',
    'pt-BR': 'Insights financeiros claros sem o jargão contábil'
  },
  'smart-alerts': {
    en: 'Smart Alerts',
    'pt-BR': 'Alertas Inteligentes'
  },
  'smart-alerts-desc': {
    en: 'Never miss overdue income or ending subscriptions',
    'pt-BR': 'Nunca perca receitas atrasadas ou assinaturas terminando'
  },
  'gamified-progress': {
    en: 'Gamified Progress',
    'pt-BR': 'Progresso Gamificado'
  },
  'gamified-progress-desc': {
    en: 'Earn badges and track improvements as you organize',
    'pt-BR': 'Ganhe medalhas e acompanhe melhorias enquanto se organiza'
  },
  'customizable': {
    en: 'Everything Customizable',
    'pt-BR': 'Tudo Personalizável'
  },
  'customizable-desc': {
    en: 'Adapt the platform to your creative workflow',
    'pt-BR': 'Adapte a plataforma ao seu fluxo de trabalho criativo'
  },

  // Pricing
  'pricing': {
    en: 'Pricing',
    'pt-BR': 'Preços'
  },
  'pricing-subtitle': {
    en: 'Simple plans for every creative professional',
    'pt-BR': 'Planos simples para cada profissional criativo'
  },
  'solo-plan': {
    en: 'Solo Criativo',
    'pt-BR': 'Solo Criativo'
  },
  'solo-price': {
    en: 'Free',
    'pt-BR': 'Grátis'
  },
  'solo-for': {
    en: 'For freelancers & starters',
    'pt-BR': 'Para freelancers e iniciantes'
  },
  'studio-plan': {
    en: 'Estúdio em Movimento',
    'pt-BR': 'Estúdio em Movimento'
  },
  'studio-price': {
    en: '$29/mo',
    'pt-BR': 'R$29/mês'
  },
  'studio-for': {
    en: 'For small studios & solo businesses',
    'pt-BR': 'Para pequenos estúdios e negócios individuais'
  },
  'agency-plan': {
    en: 'Agência Flow',
    'pt-BR': 'Agência Flow'
  },
  'agency-price': {
    en: '$89/mo',
    'pt-BR': 'R$89/mês'
  },
  'agency-for': {
    en: 'For agencies & teams',
    'pt-BR': 'Para agências e equipes'
  },
  'get-started': {
    en: 'Get Started',
    'pt-BR': 'Começar Agora'
  },
  'start-trial': {
    en: 'Start 14-day Trial',
    'pt-BR': 'Iniciar Avaliação de 14 dias'
  },
  'unlimited-clients': {
    en: 'Unlimited clients',
    'pt-BR': 'Clientes ilimitados'
  },
  'automated-tracking': {
    en: 'Automated subscription tracking',
    'pt-BR': 'Monitoramento automático de assinaturas'
  },
  'budget-invoice': {
    en: 'Budget > Invoice conversion',
    'pt-BR': 'Conversão de Orçamento > Fatura'
  },
  'multi-user': {
    en: 'Multi-user access',
    'pt-BR': 'Acesso multi-usuário'
  },
  'export-reports': {
    en: 'Exportable reports',
    'pt-BR': 'Relatórios exportáveis'
  },
  'priority-support': {
    en: 'Priority support',
    'pt-BR': 'Suporte prioritário'
  },

  // Comparison Table
  'competitor-table': {
    en: 'Why Choose Us?',
    'pt-BR': 'Por que Escolher-nos?'
  },
  'competitor-subtitle': {
    en: 'See how Eluvie compares to traditional financial tools',
    'pt-BR': 'Veja como o Eluvie se compara às ferramentas financeiras tradicionais'
  },
  'built-for-creatives': {
    en: 'Built for creatives',
    'pt-BR': 'Feito para criativos'
  },
  'simple-interface': {
    en: 'Simple visual interface',
    'pt-BR': 'Interface visual simples'
  },
  'sub-tracking': {
    en: 'Subscription tracking',
    'pt-BR': 'Rastreamento de assinaturas'
  },
  'affordable': {
    en: 'Affordable pricing',
    'pt-BR': 'Preço acessível'
  },
  'yes': {
    en: 'Yes',
    'pt-BR': 'Sim'
  },
  'no': {
    en: 'No',
    'pt-BR': 'Não'
  },
  'partial': {
    en: 'Partial',
    'pt-BR': 'Parcial'
  },

  // Testimonials
  'testimonials': {
    en: 'What Users Say',
    'pt-BR': 'O Que Dizem Os Usuários'
  },
  'testimonials-subtitle': {
    en: 'Don\'t just take our word for it',
    'pt-BR': 'Não apenas acredite em nós'
  },
  'testimonial-1': {
    en: '"Eluvie feels like a creative studio, not a bank app."',
    'pt-BR': '"O Eluvie parece um estúdio criativo, não um aplicativo bancário."'
  },
  'testimonial-1-author': {
    en: 'Marina Silva, Designer',
    'pt-BR': 'Marina Silva, Designer'
  },
  'testimonial-2': {
    en: '"Managing finances feels less painful – and even fun."',
    'pt-BR': '"Gerenciar finanças se tornou menos doloroso – e até divertido."'
  },
  'testimonial-2-author': {
    en: 'Rafael Costa, Marketing Agency',
    'pt-BR': 'Rafael Costa, Agência de Marketing'
  },
  'testimonial-3': {
    en: '"The best financial tool I\'ve used for my creative business."',
    'pt-BR': '"A melhor ferramenta financeira que já usei para meu negócio criativo."'
  },
  'testimonial-3-author': {
    en: 'Lucas Mendes, Frontend Developer',
    'pt-BR': 'Lucas Mendes, Desenvolvedor Frontend'
  },

  // CTA
  'final-cta': {
    en: 'Ready to simplify your financial chaos?',
    'pt-BR': 'Pronto para simplificar seu caos financeiro?'
  },
  'try-eluvie': {
    en: 'Try Eluvie for Free',
    'pt-BR': 'Experimente o Eluvie Gratuitamente'
  },

  // Footer
  'company': {
    en: 'Company',
    'pt-BR': 'Empresa'
  },
  'about': {
    en: 'About',
    'pt-BR': 'Sobre'
  },
  'blog': {
    en: 'Blog',
    'pt-BR': 'Blog'
  },
  'careers': {
    en: 'Careers',
    'pt-BR': 'Carreiras'
  },
  'contact': {
    en: 'Contact',
    'pt-BR': 'Contato'
  },
  'product': {
    en: 'Product',
    'pt-BR': 'Produto'
  },
  'language': {
    en: 'Language',
    'pt-BR': 'Idioma'
  },
  'copyright': {
    en: 'All rights reserved.',
    'pt-BR': 'Todos os direitos reservados.'
  },
  'made-with-love': {
    en: 'Made with',
    'pt-BR': 'Feito com'
  },
  'for-creative': {
    en: 'for creatives',
    'pt-BR': 'para criativos'
  },
  
  // About page
  'about-title': {
    en: 'About Eluvie',
    'pt-BR': 'Sobre o Eluvie'
  },
  'about-subtitle': {
    en: 'A financial platform created by creatives, for creatives',
    'pt-BR': 'Uma plataforma financeira criada por criativos, para criativos'
  },
  'about-desc': {
    en: 'Eluvie was born from a simple observation: creative professionals need financial tools that match their workflow. Traditional financial software is often built for accountants and large corporations, not for the unique needs of creative businesses. We set out to change that.',
    'pt-BR': 'O Eluvie nasceu de uma simples observação: profissionais criativos precisam de ferramentas financeiras que combinem com seu fluxo de trabalho. Softwares financeiros tradicionais são frequentemente desenvolvidos para contadores e grandes corporações, não para as necessidades únicas de negócios criativos. Decidimos mudar isso.'
  },
  'our-mission': {
    en: 'Our Mission',
    'pt-BR': 'Nossa Missão'
  },
  'our-mission-desc': {
    en: 'To create the most intuitive financial management platform for creative professionals, removing the technical barriers and making financial organization a seamless part of the creative workflow.',
    'pt-BR': 'Criar a plataforma de gerenciamento financeiro mais intuitiva para profissionais criativos, removendo as barreiras técnicas e tornando a organização financeira uma parte integrada do fluxo de trabalho criativo.'
  },
  'our-story': {
    en: 'Our Story',
    'pt-BR': 'Nossa História'
  },
  'our-story-desc': {
    en: 'Founded in 2023 by a team of designers, developers, and creative entrepreneurs who were frustrated with existing financial tools. We combined our expertise in user experience, software development, and financial management to build the tool we wished we had.',
    'pt-BR': 'Fundado em 2023 por uma equipe de designers, desenvolvedores e empreendedores criativos frustrados com as ferramentas financeiras existentes. Combinamos nossa experiência em experiência do usuário, desenvolvimento de software e gestão financeira para construir a ferramenta que gostaríamos de ter.'
  },
  'back-to-home': {
    en: 'Back to Home',
    'pt-BR': 'Voltar para Início'
  },
  
  // Careers page
  'careers-title': {
    en: 'Careers at Eluvie',
    'pt-BR': 'Carreiras no Eluvie'
  },
  'careers-subtitle': {
    en: 'Join our team and help shape the future of creative finance',
    'pt-BR': 'Junte-se à nossa equipe e ajude a moldar o futuro das finanças criativas'
  },
  'careers-desc': {
    en: 'At Eluvie, we're building a team of passionate individuals who understand both the creative and financial worlds. We value diversity, innovation, and a healthy work-life balance.',
    'pt-BR': 'No Eluvie, estamos construindo uma equipe de pessoas apaixonadas que entendem tanto o mundo criativo quanto o financeiro. Valorizamos diversidade, inovação e um equilíbrio saudável entre trabalho e vida pessoal.'
  },
  'no-positions': {
    en: 'No open positions at the moment',
    'pt-BR': 'Não há vagas abertas no momento'
  },
  'check-back': {
    en: 'Please check back later or email us at',
    'pt-BR': 'Por favor, volte mais tarde ou envie um email para'
  },
  'to-express': {
    en: 'to express your interest.',
    'pt-BR': 'para manifestar seu interesse.'
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');
  
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
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
