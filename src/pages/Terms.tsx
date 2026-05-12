import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const IDS = [
  'the-service',
  'your-account',
  'subscription-and-payment',
  'cancellation',
  'acceptable-use',
  'your-data',
  'availability',
  'limitation-of-liability',
  'changes-to-the-terms',
  'contact',
] as const;

const SECTIONS_PT = [
  { id: IDS[0], title: '1. O serviço', body: 'A Eluvie é uma plataforma de gestão financeira para profissionais criativos. Oferecemos ferramentas para controle de clientes, contratos, recebimentos e assinaturas recorrentes.' },
  { id: IDS[1], title: '2. Sua conta', body: 'Você é responsável por manter a segurança da sua conta e senha. Não compartilhe suas credenciais com terceiros. Em caso de acesso não autorizado, notifique-nos imediatamente em suporte@eluvie.com.' },
  { id: IDS[2], title: '3. Assinatura e pagamento', body: 'Os planos da Eluvie são cobrados anualmente. O valor é debitado no momento da contratação e renovado automaticamente a cada 12 meses.\n\nVocê receberá um aviso antes da renovação com as instruções para cancelamento, caso não deseje renovar.\n\nNão há reembolso proporcional por período não utilizado após a cobrança do ciclo anual.' },
  { id: IDS[3], title: '4. Cancelamento', body: 'Você pode cancelar sua assinatura a qualquer momento diretamente pela sua conta. O cancelamento interrompe a renovação automática. O acesso à plataforma permanece ativo até o fim do período já pago.' },
  { id: IDS[4], title: '5. Uso aceitável', body: 'Você concorda em usar a Eluvie apenas para fins legítimos de gestão do seu negócio. É proibido usar a plataforma para atividades ilegais, fraudulentas ou que violem direitos de terceiros.' },
  { id: IDS[5], title: '6. Seus dados', body: 'Você é dono dos dados que cadastra na Eluvie. Não utilizamos seus dados de negócio para fins comerciais próprios. Consulte nossa Política de Privacidade para mais detalhes.' },
  { id: IDS[6], title: '7. Disponibilidade', body: 'Trabalhamos para manter a Eluvie disponível o máximo possível. Em caso de manutenção programada ou indisponibilidade, nos comprometemos a comunicar com antecedência quando possível.' },
  { id: IDS[7], title: '8. Limitação de responsabilidade', body: 'A Eluvie é uma ferramenta de organização e controle. Não nos responsabilizamos por decisões financeiras tomadas com base nas informações exibidas na plataforma. Recomendamos sempre consultar um contador ou assessor financeiro para decisões importantes.' },
  { id: IDS[8], title: '9. Alterações nos termos', body: 'Quando fizermos alterações relevantes, você será notificado por e-mail com antecedência mínima de 15 dias. O uso continuado da plataforma após esse prazo implica aceite das novas condições.' },
  { id: IDS[9], title: '10. Contato', body: 'Dúvidas sobre os termos: suporte@eluvie.com' },
];

const SECTIONS_EN = [
  { id: IDS[0], title: '1. The service', body: 'Eluvie is a financial management platform for creative professionals. We offer tools to manage clients, contracts, payments and recurring subscriptions.' },
  { id: IDS[1], title: '2. Your account', body: 'You are responsible for keeping your account and password secure. Do not share your credentials. In case of unauthorized access, notify us immediately at suporte@eluvie.com.' },
  { id: IDS[2], title: '3. Subscription and payment', body: 'Eluvie plans are billed annually. The amount is charged at signup and renews automatically every 12 months.\n\nYou will receive a notice before renewal with cancellation instructions if you do not wish to renew.\n\nThere is no prorated refund for unused time after the annual billing cycle is charged.' },
  { id: IDS[3], title: '4. Cancellation', body: 'You can cancel your subscription anytime directly from your account. Cancellation stops automatic renewal. Access to the platform remains active until the end of the paid period.' },
  { id: IDS[4], title: '5. Acceptable use', body: 'You agree to use Eluvie only for legitimate business management purposes. It is forbidden to use the platform for illegal, fraudulent, or rights-violating activities.' },
  { id: IDS[5], title: '6. Your data', body: 'You own the data you store in Eluvie. We do not use your business data for our own commercial purposes. See our Privacy Policy for details.' },
  { id: IDS[6], title: '7. Availability', body: 'We strive to keep Eluvie available as much as possible. In case of scheduled maintenance or downtime, we commit to communicate in advance when possible.' },
  { id: IDS[7], title: '8. Limitation of liability', body: 'Eluvie is an organization and control tool. We are not responsible for financial decisions made based on the information shown on the platform. Always consult an accountant or financial advisor for important decisions.' },
  { id: IDS[8], title: '9. Changes to the terms', body: 'When we make material changes, you will be notified by email at least 15 days in advance. Continued use of the platform after this period implies acceptance of the new terms.' },
  { id: IDS[9], title: '10. Contact', body: 'Questions about the terms: suporte@eluvie.com' },
];

const Terms = () => {
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
            {isPt ? 'Termos de Uso: Eluvie' : 'Terms of Service: Eluvie'}
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            {isPt ? `Última atualização: ${today}` : `Last updated: ${today}`}
          </p>
          <p className="text-base text-gray-300 leading-relaxed mb-10">
            {isPt
              ? 'Ao criar uma conta na Eluvie, você concorda com os termos abaixo. Leia com atenção antes de usar a plataforma.'
              : 'By creating an Eluvie account, you agree to the terms below. Please read them carefully before using the platform.'}
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

export default Terms;