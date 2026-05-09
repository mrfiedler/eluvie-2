import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Send, Sparkles } from 'lucide-react';
import SEO from '@/components/SEO';

type Lang = 'en' | 'pt-BR';

interface ChatMessage {
  id: string;
  from: 'wolly' | 'user';
  text: string;
}

type StepId =
  | 'intro1' | 'intro2' | 'consent'
  | 'q1' | 'q2_clients' | 'q2_projects'
  | 'q3' | 'q3_count'
  | 'q4' | 'q5' | 'q6' | 'q6_other'
  | 'analyzing' | 'diagnosis'
  | 'leadAsk' | 'leadName' | 'leadEmail' | 'leadWhats'
  | 'final' | 'declined';

interface LeadData {
  idioma: Lang;
  tipo_negocio: string;
  clientes_ativos: string;
  projetos_por_mes: string;
  contratos_recorrentes: string;
  faturamento: string;
  dores: string[];
  controle_atual: string;
  ferramenta_atual: string;
  nome: string;
  email: string;
  whatsapp: string;
  timestamp: string;
}

const tx = (lang: Lang, pt: string, en: string) => (lang === 'pt-BR' ? pt : en);

// Total steps for progress bar (intro + 6 questions + diagnosis + lead)
const TOTAL_PROGRESS_STEPS = 9;

const stepProgress: Partial<Record<StepId, number>> = {
  intro1: 1, intro2: 1, consent: 1,
  q1: 2,
  q2_clients: 3, q2_projects: 3,
  q3: 4, q3_count: 4,
  q4: 5,
  q5: 6,
  q6: 7, q6_other: 7,
  analyzing: 8, diagnosis: 8,
  leadAsk: 9, leadName: 9, leadEmail: 9, leadWhats: 9, final: 9, declined: 9,
};

const Diagnostico = () => {
  const { language } = useLanguage();
  const lang = language as Lang;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<StepId>('intro1');
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [secondaryInput, setSecondaryInput] = useState('');
  const [selectedPains, setSelectedPains] = useState<string[]>([]);

  const [data, setData] = useState<LeadData>({
    idioma: lang,
    tipo_negocio: '',
    clientes_ativos: '',
    projetos_por_mes: '',
    contratos_recorrentes: '',
    faturamento: '',
    dores: [],
    controle_atual: '',
    ferramenta_atual: '',
    nome: '',
    email: '',
    whatsapp: '',
    timestamp: '',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const pushWolly = async (text: string, delay = 1100) => {
    setTyping(true);
    await wait(delay);
    setTyping(false);
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: 'wolly', text }]);
  };

  const pushUser = (text: string) => {
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: 'user', text }]);
  };

  // Bootstrap: intro messages
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    (async () => {
      await pushWolly(
        tx(lang,
          'Oi! Eu sou o Wolly, agente da Eluvie 👋 Vou te ajudar a entender como a Eluvie pode se encaixar no seu negócio criativo.',
          "Hey! I'm Wolly, Eluvie's agent 👋 I'm here to help you understand how Eluvie fits your creative business."
        ), 600
      );
      await pushWolly(
        tx(lang, 'São só 2 minutinhos. Pode ser? 😊', "It'll take just 2 minutes. Ready? 😊"),
        1200
      );
      setStep('consent');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Step handlers ----------

  const handleConsent = async (yes: boolean) => {
    pushUser(yes ? tx(lang, 'Vamos lá!', "Let's go!") : tx(lang, 'Agora não', 'Maybe later'));
    if (!yes) {
      await pushWolly(tx(lang,
        'Sem problema! Quando quiser, é só voltar aqui. 👋',
        "No worries! Come back whenever you'd like. 👋"
      ));
      setStep('declined');
      return;
    }
    await pushWolly(tx(lang, 'Primeiro: como você se descreve?', "First things first — how would you describe yourself?"));
    setStep('q1');
  };

  const handleQ1 = async (value: string, label: string) => {
    pushUser(label);
    setData((d) => ({ ...d, tipo_negocio: value }));
    await pushWolly(tx(lang,
      'Quantos clientes ativos você tem hoje?',
      'How many active clients do you have right now?'
    ));
    setStep('q2_clients');
  };

  const handleQ2Clients = async () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    pushUser(v);
    setData((d) => ({ ...d, clientes_ativos: v }));
    setInputValue('');
    await pushWolly(tx(lang,
      'E em média, quantos projetos você fecha por mês?',
      'And roughly how many projects do you close per month?'
    ));
    setStep('q2_projects');
  };

  const handleQ2Projects = async () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    pushUser(v);
    setData((d) => ({ ...d, projetos_por_mes: v }));
    setInputValue('');
    await pushWolly(tx(lang,
      'Você tem contratos recorrentes ou de longo prazo? Tipo social media, retainer mensal, pacotes de 12 meses?',
      'Do you have any recurring or long-term contracts? Like social media management, monthly retainers, or 12-month packages?'
    ));
    setStep('q3');
  };

  const handleQ3 = async (yes: boolean) => {
    if (yes) {
      pushUser(tx(lang, 'Sim, tenho!', 'Yes!'));
      await pushWolly(tx(lang, 'Quantos?', 'How many?'));
      setStep('q3_count');
    } else {
      pushUser(tx(lang, 'Não tenho', 'Not really'));
      setData((d) => ({ ...d, contratos_recorrentes: '0' }));
      await goToQ4();
    }
  };

  const handleQ3Count = async () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    pushUser(v);
    setData((d) => ({ ...d, contratos_recorrentes: v }));
    setInputValue('');
    await goToQ4();
  };

  const goToQ4 = async () => {
    await pushWolly(tx(lang,
      'E o seu faturamento mensal aproximado fica em qual faixa?',
      "What's your approximate monthly revenue?"
    ));
    setStep('q4');
  };

  const handleQ4 = async (value: string, label: string) => {
    pushUser(label);
    setData((d) => ({ ...d, faturamento: value }));
    await pushWolly(tx(lang,
      'Qual é sua maior dor hoje na gestão do negócio? (pode marcar mais de uma)',
      "What's your biggest pain point managing your business? (you can pick more than one)"
    ));
    setStep('q5');
  };

  const togglePain = (value: string) => {
    setSelectedPains((s) => s.includes(value) ? s.filter((x) => x !== value) : [...s, value]);
  };

  const handleQ5Submit = async () => {
    if (selectedPains.length === 0) return;
    const labels = selectedPains.map((v) => painOptions(lang).find((p) => p.value === v)?.label || v);
    pushUser(labels.join(', '));
    setData((d) => ({ ...d, dores: selectedPains }));
    await pushWolly(tx(lang, 'Como você controla isso hoje?', 'How do you currently manage all of this?'));
    setStep('q6');
  };

  const handleQ6 = async (value: string, label: string) => {
    pushUser(label);
    setData((d) => ({ ...d, controle_atual: value }));
    if (value === 'other_app') {
      await pushWolly(tx(lang, 'Qual?', 'Which one?'));
      setStep('q6_other');
    } else {
      await runDiagnosis({ ...data, controle_atual: value, dores: selectedPains });
    }
  };

  const handleQ6Other = async () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    pushUser(v);
    const next = { ...data, ferramenta_atual: v, controle_atual: 'other_app', dores: selectedPains };
    setData(next);
    setInputValue('');
    await runDiagnosis(next);
  };

  const runDiagnosis = async (d: LeadData) => {
    setStep('analyzing');
    await pushWolly(tx(lang,
      'Perfeito! Deixa eu analisar o que você me contou... 🧠',
      'Got it! Let me put this together for you... 🧠'
    ));
    await wait(2000);
    setStep('diagnosis');
  };

  const handleLeadAsk = async (yes: boolean) => {
    if (!yes) {
      pushUser(tx(lang, 'Agora não', 'No thanks'));
      await pushWolly(tx(lang,
        'Tudo bem! Quando quiser, é só falar com a gente. 💜',
        "All good! Whenever you're ready, we're here. 💜"
      ));
      const final = { ...data, dores: selectedPains, timestamp: new Date().toISOString() };
      setData(final);
      console.log('ELUVIE_LEAD', final);
      setStep('final');
      return;
    }
    pushUser(tx(lang, 'Sim, quero!', 'Yes, please!'));
    await pushWolly(tx(lang, 'Qual o seu nome?', "What's your name?"));
    setStep('leadName');
  };

  const handleLeadName = async () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    pushUser(v);
    setData((d) => ({ ...d, nome: v }));
    setInputValue('');
    await pushWolly(tx(lang, 'Seu melhor e-mail?', 'Your best email?'));
    setStep('leadEmail');
  };

  const handleLeadEmail = async () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    pushUser(v);
    setData((d) => ({ ...d, email: v }));
    setInputValue('');
    await pushWolly(tx(lang, 'WhatsApp com DDD?', 'Your WhatsApp number?'));
    setStep('leadWhats');
  };

  const handleLeadWhats = async () => {
    if (!inputValue.trim()) return;
    const v = inputValue.trim();
    pushUser(v);
    const final: LeadData = {
      ...data,
      whatsapp: v,
      dores: selectedPains,
      timestamp: new Date().toISOString(),
    };
    setData(final);
    setInputValue('');
    console.log('ELUVIE_LEAD', final);
    await pushWolly(tx(lang,
      `Tudo certo, ${final.nome}! Um especialista vai entrar em contato em até 1 dia útil. Enquanto isso, que tal explorar a Eluvie? 🚀`,
      `You're all set, ${final.nome}! A specialist will reach out within 1 business day. In the meantime, feel free to explore Eluvie! 🚀`
    ));
    setStep('final');
  };

  // ---------- Diagnosis card ----------

  const buildDiagnosis = () => {
    const isFreelancer = data.tipo_negocio === 'freelancer';
    const isSmallAgency = data.tipo_negocio === 'small_agency';
    const recur = parseInt(data.contratos_recorrentes || '0', 10) || 0;
    const ctrl = data.controle_atual;

    // Profile
    const profile = tx(lang,
      `Você toca um ${isFreelancer ? 'negócio solo' : isSmallAgency ? 'time enxuto' : 'estúdio em crescimento'} com ${data.clientes_ativos} clientes ativos e cerca de ${data.projetos_por_mes} projetos por mês${recur > 0 ? `, sustentado por ${recur} contrato(s) recorrente(s)` : ''}. É a operação clássica de quem entrega valor criativo de verdade — e por isso não cabe em ferramenta genérica.`,
      `You're running a ${isFreelancer ? 'solo business' : isSmallAgency ? 'lean team' : 'growing studio'} with ${data.clientes_ativos} active clients and around ${data.projetos_por_mes} projects per month${recur > 0 ? `, sustained by ${recur} recurring contract(s)` : ''}. This is the classic shape of a real creative operation — and it never fits inside a generic tool.`
    );

    // Risks
    let risks: string[] = [];
    if (ctrl === 'notes' || ctrl === 'none') {
      risks = [
        tx(lang,
          `Com ${recur || 'os'} contrato(s) recorrente(s) sem sistema formal, prazos de renovação e cobrança escapam fácil — em média 15–20% do faturamento somem sem você perceber.`,
          `With ${recur || 'your'} recurring contract(s) and no formal system, renewals and invoices slip through — on average 15–20% of revenue quietly disappears.`),
        tx(lang,
          'Sem histórico estruturado por cliente, cada negociação recomeça do zero — e isso desgasta confiança e margem.',
          "Without structured history per client, every negotiation starts from scratch — wearing down trust and margin."),
      ];
    } else if (ctrl === 'spreadsheet') {
      risks = [
        tx(lang,
          'Planilhas exigem que VOCÊ lembre de olhar. Com esse volume, o erro humano é só questão de tempo.',
          'Spreadsheets rely on YOU remembering to check. At this volume, human error is just a matter of time.'),
        tx(lang,
          'Não há lembretes automáticos de cobrança nem alerta de contrato vencendo — você sempre joga no defensivo.',
          'There are no automatic billing reminders or contract-expiry alerts — you always play defense.'),
      ];
    } else if (ctrl === 'other_app') {
      risks = [
        tx(lang,
          `Você já tem maturidade de gestão usando ${data.ferramenta_atual || 'outra ferramenta'} — ótimo. Mas ferramentas genéricas falam de SKUs e estoques, não de briefings e recorrência criativa.`,
          `You already have management maturity with ${data.ferramenta_atual || 'another tool'} — great. But generic tools speak SKUs and inventory, not briefings and creative recurrence.`),
        tx(lang,
          'Quanto mais o time cresce, mais tempo se gasta adaptando uma ferramenta que não foi desenhada pra você.',
          'The bigger your team gets, the more time you spend bending a tool that was never designed for you.'),
      ];
    } else {
      risks = [tx(lang, 'Você merece uma ferramenta feita para o jeito criativo de operar — não uma adaptação.', 'You deserve a tool built for the creative way of working — not a workaround.')];
    }

    // Plan recommendation
    const fat = data.faturamento;
    let plan = 'Solo';
    let planReason = '';
    if (fat === 'over30k' || data.tipo_negocio === 'mid_studio') {
      plan = 'Studio';
      planReason = tx(lang,
        'Time maior, múltiplos clientes e contratos recorrentes pedem visão consolidada e permissões por papel — exatamente o que o Studio entrega.',
        'A larger team, multiple clients and recurring contracts call for consolidated visibility and role-based permissions — exactly what Studio delivers.'
      );
    } else if (fat === '15to30k' || isSmallAgency || recur >= 3) {
      plan = 'Standard';
      planReason = tx(lang,
        'Volume bom de clientes e recorrência ativa: o Standard cobre cobranças automáticas, contratos e fluxo financeiro sem te sobrecarregar.',
        'Healthy client volume and active recurrence: Standard covers automated billing, contracts and cash flow without overwhelming you.'
      );
    } else {
      plan = 'Solo';
      planReason = tx(lang,
        'Pra começar com o pé direito e organizar o essencial, o Solo já te dá o básico bem feito — sem custo no primeiro momento.',
        'To start the right way and organize the essentials, Solo gives you a solid foundation — at no cost to begin with.'
      );
    }

    const nextStep = tx(lang,
      'Liste agora seus 3 contratos mais importantes em um só lugar (clientes, valor mensal, próxima cobrança). É o primeiro passo pra parar de carregar tudo na cabeça.',
      'Right now, list your 3 most important contracts in one place (clients, monthly value, next invoice). It’s the first step to stop carrying everything in your head.'
    );

    return { profile, risks, plan, planReason, nextStep };
  };

  // ---------- UI parts ----------

  const progressValue = (stepProgress[step] || 1) / TOTAL_PROGRESS_STEPS * 100;

  return (
    <div className="min-h-screen bg-[#151515] text-gray-100 flex flex-col">
      <SEO
        title={tx(lang, 'Diagnóstico Eluvie | Wolly', 'Eluvie Diagnosis | Wolly')}
        description={tx(lang,
          'Converse com o Wolly e descubra como a Eluvie pode se encaixar no seu negócio criativo.',
          'Chat with Wolly and discover how Eluvie fits your creative business.'
        )}
      />

      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800 bg-[#1a1a1a]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/16dc7938-88ea-46da-9ce5-56e9b9900220.png" alt="Eluvie" className="h-7" />
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Sparkles className="h-4 w-4 text-[#d64ec2]" />
          <span className="font-medium">Wolly</span>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 md:px-6 pt-3 bg-[#1a1a1a]">
        <Progress value={progressValue} className="h-1 bg-gray-800" />
      </div>

      {/* Chat area */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl flex flex-col">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-3"
            style={{ minHeight: 'calc(100vh - 220px)' }}
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} from={m.from} text={m.text} />
            ))}
            {typing && <TypingBubble />}

            {step === 'diagnosis' && <DiagnosisCard data={buildDiagnosis()} lang={lang} onContinue={async () => {
              await pushWolly(tx(lang,
                'Quer que um especialista da Eluvie entre em contato para te ajudar a configurar tudo do jeito certo pro seu negócio? 🙌',
                'Want one of our specialists to reach out and help you get set up the right way? 🙌'
              ));
              setStep('leadAsk');
            }} />}
          </div>

          {/* Input / actions footer */}
          <div className="border-t border-gray-800 bg-[#1a1a1a] p-3 md:p-4 sticky bottom-0">
            {renderActions()}
          </div>
        </div>
      </main>
    </div>
  );

  // ---------- Renderers ----------

  function renderActions() {
    if (typing) return <div className="text-xs text-gray-500 text-center">Wolly {tx(lang, 'está digitando...', 'is typing...')}</div>;

    switch (step) {
      case 'consent':
        return (
          <ButtonRow>
            <ChoiceButton onClick={() => handleConsent(true)}>{tx(lang, 'Vamos lá!', "Let's go!")}</ChoiceButton>
            <ChoiceButton variant="ghost" onClick={() => handleConsent(false)}>{tx(lang, 'Agora não', 'Maybe later')}</ChoiceButton>
          </ButtonRow>
        );
      case 'declined':
        return (
          <Link to="/" className="block">
            <Button className="w-full bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] hover:opacity-90">{tx(lang, 'Voltar para o início', 'Back to home')}</Button>
          </Link>
        );
      case 'q1':
        return (
          <ButtonRow>
            <ChoiceButton onClick={() => handleQ1('freelancer', tx(lang, 'Freelancer solo', 'Solo freelancer'))}>{tx(lang, 'Freelancer solo', 'Solo freelancer')}</ChoiceButton>
            <ChoiceButton onClick={() => handleQ1('small_agency', tx(lang, 'Agência pequena (1–5 pessoas)', 'Small agency (1–5 people)'))}>{tx(lang, 'Agência pequena (1–5)', 'Small agency (1–5)')}</ChoiceButton>
            <ChoiceButton onClick={() => handleQ1('mid_studio', tx(lang, 'Estúdio médio (6–20 pessoas)', 'Mid-size studio (6–20 people)'))}>{tx(lang, 'Estúdio médio (6–20)', 'Mid-size studio (6–20)')}</ChoiceButton>
          </ButtonRow>
        );
      case 'q2_clients':
        return <TextInputRow placeholder={tx(lang, 'Ex: 5', 'e.g. 5')} onSubmit={handleQ2Clients} />;
      case 'q2_projects':
        return <TextInputRow placeholder={tx(lang, 'Ex: 3 por mês', 'e.g. 3 per month')} onSubmit={handleQ2Projects} />;
      case 'q3':
        return (
          <ButtonRow>
            <ChoiceButton onClick={() => handleQ3(true)}>{tx(lang, 'Sim, tenho!', 'Yes!')}</ChoiceButton>
            <ChoiceButton variant="ghost" onClick={() => handleQ3(false)}>{tx(lang, 'Não tenho', 'Not really')}</ChoiceButton>
          </ButtonRow>
        );
      case 'q3_count':
        return <TextInputRow type="number" placeholder={tx(lang, 'Quantos contratos?', 'How many contracts?')} onSubmit={handleQ3Count} />;
      case 'q4':
        return (
          <ButtonRow>
            {revenueOptions(lang).map((o) => (
              <ChoiceButton key={o.value} onClick={() => handleQ4(o.value, o.label)}>{o.label}</ChoiceButton>
            ))}
          </ButtonRow>
        );
      case 'q5':
        return (
          <div className="space-y-3">
            <ButtonRow>
              {painOptions(lang).map((o) => {
                const active = selectedPains.includes(o.value);
                return (
                  <ChoiceButton key={o.value} active={active} onClick={() => togglePain(o.value)}>
                    {active ? '✓ ' : ''}{o.label}
                  </ChoiceButton>
                );
              })}
            </ButtonRow>
            <Button
              disabled={selectedPains.length === 0}
              onClick={handleQ5Submit}
              className="w-full bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] hover:opacity-90 disabled:opacity-40"
            >
              {tx(lang, 'Continuar', 'Continue')}
            </Button>
          </div>
        );
      case 'q6':
        return (
          <ButtonRow>
            <ChoiceButton onClick={() => handleQ6('spreadsheet', tx(lang, 'Planilha (Excel ou Google Sheets)', 'Spreadsheet (Excel or Google Sheets)'))}>{tx(lang, 'Planilha', 'Spreadsheet')}</ChoiceButton>
            <ChoiceButton onClick={() => handleQ6('other_app', tx(lang, 'Outro aplicativo', 'Another app'))}>{tx(lang, 'Outro aplicativo', 'Another app')}</ChoiceButton>
            <ChoiceButton onClick={() => handleQ6('notes', tx(lang, 'Anotações / memória', 'Notes / memory'))}>{tx(lang, 'Anotações', 'Notes / memory')}</ChoiceButton>
            <ChoiceButton onClick={() => handleQ6('none', tx(lang, 'Não controlo ainda', "I don't really track it"))}>{tx(lang, 'Não controlo', "Don't track")}</ChoiceButton>
          </ButtonRow>
        );
      case 'q6_other':
        return <TextInputRow placeholder={tx(lang, 'Qual ferramenta?', 'Which one?')} onSubmit={handleQ6Other} />;
      case 'leadAsk':
        return (
          <ButtonRow>
            <ChoiceButton onClick={() => handleLeadAsk(true)}>{tx(lang, 'Sim, quero!', 'Yes, please!')}</ChoiceButton>
            <ChoiceButton variant="ghost" onClick={() => handleLeadAsk(false)}>{tx(lang, 'Agora não', 'No thanks')}</ChoiceButton>
          </ButtonRow>
        );
      case 'leadName':
        return <TextInputRow placeholder={tx(lang, 'Seu nome', 'Your name')} onSubmit={handleLeadName} />;
      case 'leadEmail':
        return <TextInputRow type="email" placeholder={tx(lang, 'voce@email.com', 'you@email.com')} onSubmit={handleLeadEmail} />;
      case 'leadWhats':
        return <TextInputRow placeholder={tx(lang, '(11) 99999-9999', '+1 555 555 5555')} onSubmit={handleLeadWhats} />;
      case 'final':
        return (
          <Link to="/" className="block">
            <Button className="w-full bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] hover:opacity-90">{tx(lang, 'Conhecer a Eluvie', 'Explore Eluvie')}</Button>
          </Link>
        );
      default:
        return null;
    }
  }

  function TextInputRow({ placeholder, type = 'text', onSubmit }: { placeholder: string; type?: string; onSubmit: () => void }) {
    return (
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        className="flex gap-2"
      >
        <Input
          autoFocus
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="bg-[#202020] border-gray-700 text-gray-100 placeholder:text-gray-500"
        />
        <Button type="submit" className="bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] hover:opacity-90 px-4">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    );
  }
};

// ---------- Subcomponents ----------

const MessageBubble = ({ from, text }: { from: 'wolly' | 'user'; text: string }) => {
  const isWolly = from === 'wolly';
  return (
    <div className={`flex items-end gap-2 animate-fade-in ${isWolly ? 'justify-start' : 'justify-end'}`}>
      {isWolly && <Avatar />}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm md:text-[15px] leading-relaxed shadow ${
          isWolly
            ? 'bg-[#202020] border border-gray-800 text-gray-100 rounded-bl-sm'
            : 'bg-gradient-to-br from-[#ac2ee8] to-[#8e60e5] text-white rounded-br-sm'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

const TypingBubble = () => (
  <div className="flex items-end gap-2 animate-fade-in">
    <Avatar />
    <div className="bg-[#202020] border border-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const Avatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ac2ee8] to-[#5f8eea] flex items-center justify-center text-white text-xs font-semibold shrink-0 shadow">
    W
  </div>
);

const ButtonRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap gap-2">{children}</div>
);

const ChoiceButton = ({
  children, onClick, variant = 'default', active = false,
}: { children: React.ReactNode; onClick: () => void; variant?: 'default' | 'ghost'; active?: boolean }) => {
  const base = 'px-4 py-2 rounded-full text-sm font-medium transition-all border';
  const styles = active
    ? 'bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] text-white border-transparent'
    : variant === 'ghost'
      ? 'bg-transparent text-gray-300 border-gray-700 hover:bg-gray-800'
      : 'bg-[#202020] text-gray-100 border-gray-700 hover:border-[#ac2ee8] hover:text-white';
  return <button type="button" onClick={onClick} className={`${base} ${styles}`}>{children}</button>;
};

const DiagnosisCard = ({ data, lang, onContinue }: { data: ReturnType<any>; lang: Lang; onContinue: () => void }) => (
  <div className="animate-fade-in mt-2 ml-10 max-w-[85%] bg-[#202020] border border-gray-800 rounded-2xl rounded-bl-sm p-5 md:p-6 space-y-5 shadow-lg">
    <Section title={tx(lang, 'Perfil do negócio', 'Business profile')}>
      <p className="text-gray-300 text-sm leading-relaxed">{data.profile}</p>
    </Section>
    <Section title={tx(lang, 'Pontos de atenção', 'Watch-outs')}>
      <ul className="space-y-2">
        {data.risks.map((r: string, i: number) => (
          <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-2">
            <span className="text-[#d64ec2]">•</span><span>{r}</span>
          </li>
        ))}
      </ul>
    </Section>
    <Section title={tx(lang, 'Plano recomendado', 'Recommended plan')}>
      <div className="flex items-center gap-3 mb-2">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] text-white">{data.plan}</span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{data.planReason}</p>
    </Section>
    <Section title={tx(lang, 'Próximo passo', 'Next step')}>
      <p className="text-gray-300 text-sm leading-relaxed">{data.nextStep}</p>
    </Section>
    <Button onClick={onContinue} className="w-full bg-gradient-to-r from-[#ac2ee8] to-[#d64ec2] hover:opacity-90">
      {tx(lang, 'Continuar', 'Continue')}
    </Button>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-xs uppercase tracking-wider text-[#d64ec2] font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

// ---------- Options ----------

const revenueOptions = (lang: Lang) => lang === 'pt-BR' ? [
  { value: 'under5k', label: 'Até R$5 mil' },
  { value: '5to15k', label: 'R$5k – R$15k' },
  { value: '15to30k', label: 'R$15k – R$30k' },
  { value: 'over30k', label: 'Acima de R$30k' },
] : [
  { value: 'under5k', label: 'Under $1,000' },
  { value: '5to15k', label: '$1,000 – $3,000' },
  { value: '15to30k', label: '$3,000 – $6,000' },
  { value: 'over30k', label: 'Above $6,000' },
];

const painOptions = (lang: Lang) => lang === 'pt-BR' ? [
  { value: 'contracts', label: 'Organizar contratos' },
  { value: 'payments', label: 'Controlar recebimentos' },
  { value: 'clients', label: 'Gestão de clientes' },
  { value: 'invoices', label: 'Emitir cobranças' },
  { value: 'all', label: 'Tudo junto 😅' },
] : [
  { value: 'contracts', label: 'Managing contracts' },
  { value: 'payments', label: 'Tracking payments' },
  { value: 'clients', label: 'Client management' },
  { value: 'invoices', label: 'Sending invoices' },
  { value: 'all', label: 'All of the above 😅' },
];

export default Diagnostico;