
CREATE TABLE public.diagnostic_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  empresa TEXT,
  whatsapp TEXT NOT NULL,
  email TEXT,
  tipo_negocio TEXT,
  clientes_ativos TEXT,
  projetos_mes TEXT,
  contratos_recorrentes TEXT,
  faturamento TEXT,
  dores TEXT[],
  controle_atual TEXT,
  ferramenta_atual TEXT,
  plano_recomendado TEXT,
  idioma TEXT NOT NULL DEFAULT 'pt-BR',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.diagnostic_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit diagnostic leads"
  ON public.diagnostic_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read diagnostic leads"
  ON public.diagnostic_leads
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_diagnostic_leads_created_at ON public.diagnostic_leads (created_at DESC);
