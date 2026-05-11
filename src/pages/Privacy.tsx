import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const IDS = [
  'data-we-collect',
  'how-we-use-your-data',
  'data-sharing',
  'your-rights',
  'security',
  'cookies',
  'changes-to-this-policy',
  'contact',
] as const;

const SECTIONS_PT = [
  { id: IDS[0], title: '1. Dados que coletamos', body: `Coletamos apenas os dados necessários para operar a plataforma:\n• Nome, e-mail e informações de contato fornecidas no cadastro\n• Dados de uso da plataforma para melhorar a experiência\n• Informações de pagamento processadas por terceiros seguros (não armazenamos dados de cartão diretamente)\n• Dados de navegação via cookies para análise de tráfego` },
  { id: IDS[1], title: '2. Como usamos seus dados', body: `Seus dados são usados para:\n• Criar e gerenciar sua conta na Eluvie\n• Processar pagamentos e renovações da assinatura\n• Enviar comunicações relacionadas ao serviço\n• Melhorar a plataforma com base no uso agregado e anônimo\n\nNunca vendemos seus dados a terceiros.` },
  { id: IDS[2], title: '3. Compartilhamento de dados', body: `Compartilhamos dados apenas com:\n• Processadores de pagamento para cobranças da assinatura\n• Ferramentas de análise para entender o uso da plataforma (dados anonimizados)\n• Autoridades, quando exigido por lei` },
  { id: IDS[3], title: '4. Seus direitos', body: `Você pode a qualquer momento:\n• Acessar os dados que temos sobre você\n• Corrigir informações incorretas\n• Solicitar a exclusão da sua conta e dados\n• Exportar seus dados\n\nPara exercer qualquer um desses direitos, entre em contato pelo e-mail: suporte@eluvie.com` },
  { id: IDS[4], title: '5. Segurança', body: 'Seus dados são armazenados com criptografia e protegidos por práticas modernas de segurança. Em caso de incidente de segurança, você será notificado conforme exigido por lei.' },
  { id: IDS[5], title: '6. Cookies', body: 'Usamos cookies essenciais para o funcionamento da plataforma e cookies analíticos para entender como o site é usado. Você pode desativar cookies analíticos nas configurações do seu navegador.' },
  { id: IDS[6], title: '7. Alterações nesta política', body: 'Quando fizermos alterações relevantes, você será notificado por e-mail com antecedência. O uso continuado da plataforma após a notificação implica aceite das novas condições.' },
  { id: IDS[7], title: '8. Contato', body: 'Dúvidas sobre privacidade: suporte@eluvie.com' },
];

const SECTIONS_EN = [
  { id: IDS[0], title: '1. Data we collect', body: `We collect only what's necessary to operate the platform:\n• Name, email and contact information provided at signup\n• Platform usage data to improve the experience\n• Payment information processed by secure third parties (we do not store card data directly)\n• Browsing data via cookies for traffic analysis` },
  { id: IDS[1], title: '2. How we use your data', body: `Your data is used to:\n• Create and manage your Eluvie account\n• Process payments and subscription renewals\n• Send service-related communications\n• Improve the platform based on aggregated, anonymous usage\n\nWe never sell your data to third parties.` },
  { id: IDS[2], title: '3. Data sharing', body: `We share data only with:\n• Payment processors for subscription billing\n• Analytics tools to understand platform usage (anonymized data)\n• Authorities, when required by law` },
  { id: IDS[3], title: '4. Your rights', body: `You may at any time:\n• Access the data we have about you\n• Correct inaccurate information\n• Request deletion of your account and data\n• Export your data\n\nTo exercise any of these rights, contact: suporte@eluvie.com` },
  { id: IDS[4], title: '5. Security', body: 'Your data is stored with encryption and protected by modern security practices. In the event of a security incident, you will be notified as required by law.' },
  { id: IDS[5], title: '6. Cookies', body: 'We use essential cookies for the platform to function and analytics cookies to understand how the site is used. You can disable analytics cookies in your browser settings.' },
  { id: IDS[6], title: '7. Changes to this policy', body: 'When we make material changes, you will be notified by email in advance. Continued use of the platform after the notice implies acceptance of the new terms.' },
  { id: IDS[7], title: '8. Contact', body: 'Privacy questions: suporte@eluvie.com' },
];

const Privacy = () => {
  const { language } = useLanguage();
  const isPt = language === 'pt-BR';
  const sections = isPt ? SECTIONS_PT : SECTIONS_EN;
  const today = new Date().toLocaleDateString(isPt ? 'pt-BR' : 'en-US');

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            {isPt ? 'Política de Privacidade — Eluvie' : 'Privacy Policy — Eluvie'}
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            {isPt ? `Última atualização: ${today}` : `Last updated: ${today}`}
          </p>
          <p className="text-base text-gray-300 leading-relaxed mb-10">
            {isPt
              ? 'A Eluvie leva a privacidade dos seus dados a sério. Esta política explica de forma clara quais dados coletamos, como os usamos e quais são os seus direitos.'
              : 'Eluvie takes the privacy of your data seriously. This policy explains in plain language what data we collect, how we use it, and what your rights are.'}
          </p>

          <nav className="mb-12 p-5 bg-[#202020] border border-gray-800 rounded-xl">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {isPt ? 'Índice' : 'Table of contents'}
            </h2>
            <ul className="space-y-1.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={(e) => handleAnchor(e, s.id)} className="text-[#d64ec2] hover:text-[#ac2ee8] text-sm">{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">{s.title}</h2>
                <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;