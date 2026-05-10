Esta é uma entrega grande (9 blocos, ~19 itens). Abaixo está o plano completo. Confirme para eu executar tudo de uma vez, ou me diga se prefere fatiar em entregas menores.

## BLOCO 1 — Página /diagnostic (refatoração completa)

Criar nova `src/pages/Diagnostic.tsx` substituindo `Diagnostico.tsx`:

1. **Idioma**: ler `useLanguage()` no topo do componente, usar em todas as strings (incluindo CTAs iniciais "Vamos lá!" / "Agora não") via dicionário PT/EN.
2. **Opção "Não sei / Nenhum"**: adicionar em todas as perguntas de múltipla escolha. Wolly responde com mensagem empática genérica e segue.
3. **Preço dinâmico**: criar `src/hooks/usePricing.ts` extraindo a lógica de `PricingSection.tsx` (geolocalização + moeda) para um hook reutilizável. Wolly lê preço do plano recomendado por esse hook.
4. **Header padrão**: incluir `<Navbar />` no topo da página.
5. **Captura de leads**: novos campos (Nome obrigatório, Empresa opcional, WhatsApp obrigatório, Email opcional). Persistir na nova tabela `diagnostic_leads`.
6. **Redesign do layout**:
   - Faixa de progresso (bolinhas) abaixo do header
   - Chat centralizado max-width 680px, scroll interno
   - Bolhas Wolly à esquerda com avatar "W"; usuário à direita
   - Botões de resposta com altura mínima 44px
   - Animação "digitando" + delay 1s
   - Auto-scroll suave
   - Card de diagnóstico final com seções (Perfil, Atenção, Plano, Próximo Passo) + ícones
   - Mobile: botões largura total <768px, avatar 32px, padding 16px
7. **Interpretação numérica**: parser que extrai dígitos OU números por extenso (PT: um..dez, EN: one..ten). 1ª resposta inválida → reaskr; 2ª → "não informado" e segue.
8. **Sumário de confirmação**: antes do diagnóstico, listar respostas com botões "Sim, está certo" / "Quero corrigir algo". Se corrigir, mostrar itens clicáveis e refazer só a pergunta selecionada.

## BLOCO 2 — Correções gerais

9. **/admin-login**: remover rota; mover formulário de login para dentro de `Admin.tsx` (mostra login se não autenticado, painel se autenticado). Atualizar `ProtectedAdminRoute` em `App.tsx`.
10. **About**: remover ícone de coração de `About.tsx`.
11. **Footer**: remover bloco "Made with ♥ for creatives" inteiro.
12. **Renomear**: `/diagnostico` → `/diagnostic` (sem redirect).

## BLOCO 3 — Header e Footer

13. Adicionar link "Diagnóstico Grátis" / "Free Diagnostic" → `/diagnostic` em `Navbar.tsx` (desktop + mobile) e `Footer.tsx`.

## BLOCO 4 — Home: nova seção CTA Diagnóstico

14. Criar `src/components/DiagnosticCTASection.tsx` entre `HeroSection` e a próxima seção em `Index.tsx`. Avatar Wolly com ping animation, título/subtítulo/CTA conforme spec.

## BLOCO 5 — Seletor de idioma

15. Refatorar seletor no `Navbar.tsx`: dropdown compacto (bandeira + sigla, ex: 🇧🇷 PT ▾) usando `DropdownMenu` shadcn. Aplicar no desktop e mobile.

## BLOCO 6 — Menu mobile redesign

16. Refazer menu mobile em `Navbar.tsx`:
   - Hamburguer→X animado
   - Painel slide-in da direita, full-screen, fundo opaco da marca
   - Logo no topo, links grandes (≥22px), separador, CTAs largura total, seletor idioma na base
   - Links: Como Funciona, Funcionalidades, Preços, Waitlist, Diagnóstico Grátis
   - Animações 200-300ms ease-in-out, fade-in escalonado dos links
   - Fecha ao navegar, área de toque ≥48px

## BLOCO 7 — FAQ na home

17. Criar `src/components/FAQSection.tsx` antes do footer em `Index.tsx`:
   - Accordion shadcn com 8 perguntas PT/EN (texto exato fornecido)
   - JSON-LD `FAQPage` injetado via `<script type="application/ld+json">`
   - Criar `src/translations/faq.ts`

## BLOCO 8 — Páginas legais

18. Criar `src/pages/Privacy.tsx` (`/privacy`) com conteúdo PT/EN, índice clicável, layout limpo (sem hero).
19. Criar `src/pages/Terms.tsx` (`/terms`) idem.
- Adicionar links "Privacidade"/"Privacy Policy" e "Termos de Uso"/"Terms of Service" no footer.
- Criar `src/translations/legal.ts`.

## BLOCO 9 — Sitemap

- Criar edge function `generate-sitemap` que monta XML dinâmico:
  - Páginas estáticas: /, /about, /pricing(/#), /blog, /diagnostic, /terms, /privacy, /coming-soon, /careers
  - Posts publicados de `blog_posts` (ambos idiomas, /blog/:slug)
  - Excluir /admin
- Configurar a função como pública (verify_jwt=false) em `supabase/config.toml`
- Atualizar `public/robots.txt` com `Sitemap: https://www.eluvie.com/sitemap.xml`
- Nota: como Lovable hospeda SPA, o sitemap "real" será a URL pública da edge function. Vou documentar essa URL no robots.txt apontando para ela (alternativa: gerar `public/sitemap.xml` estático no build, mas não pega blog dinâmico — edge function é a opção certa).

## Mudanças de banco (Supabase)

Nova tabela `diagnostic_leads`:
- Colunas: id, nome, empresa, whatsapp, email, tipo_negocio, clientes_ativos, projetos_mes, contratos_recorrentes, faturamento, dores (text[]), controle_atual, ferramenta_atual, plano_recomendado, idioma, created_at
- RLS: anyone (anon) pode INSERT; apenas admin (`has_role`) pode SELECT.
- Adicionar visualização no `Admin.tsx` com tabela e filtro por intervalo de datas.

## Detalhes técnicos

- Todo conteúdo PT/EN via `useLanguage()` + arquivos em `src/translations/`.
- Cores via tokens semânticos do design system (sem hex hardcoded em componentes).
- `usePricing` hook compartilhado entre `PricingSection` e `Diagnostic` para garantir paridade de preços.
- Sitemap edge function retorna `Content-Type: application/xml`.

## Arquivos a criar
- `src/pages/Diagnostic.tsx` (substitui Diagnostico.tsx)
- `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`
- `src/components/DiagnosticCTASection.tsx`, `src/components/FAQSection.tsx`
- `src/components/admin/DiagnosticLeadsAdmin.tsx`
- `src/hooks/usePricing.ts`
- `src/translations/diagnostic.ts`, `faq.ts`, `legal.ts`
- `supabase/functions/generate-sitemap/index.ts`
- Migration: `diagnostic_leads`

## Arquivos a editar
- `src/App.tsx` (rotas: remove /admin-login e /diagnostico, adiciona /diagnostic, /privacy, /terms)
- `src/components/Navbar.tsx` (link diagnóstico, seletor idioma, menu mobile)
- `src/components/Footer.tsx` (link diagnóstico, privacy, terms; remove "Made with ♥")
- `src/components/PricingSection.tsx` (extrai lógica para usePricing)
- `src/components/SEO.tsx` (se necessário)
- `src/pages/About.tsx` (remove coração)
- `src/pages/Admin.tsx` (login embutido + aba diagnostic leads)
- `src/pages/Index.tsx` (adiciona DiagnosticCTASection + FAQSection)
- `src/translations/footer.ts`, `navbar.ts`
- `public/robots.txt`
- `supabase/config.toml`

## Arquivos a deletar
- `src/pages/AdminLogin.tsx`
- `src/pages/Diagnostico.tsx`

---

**Confirma que posso executar tudo?** Se preferir dividir, sugiro a ordem: (a) Blocos 2+3+5+6 (correções rápidas + nav), (b) Bloco 1 + tabela diagnostic_leads, (c) Blocos 4+7 (home), (d) Bloco 8 (legais), (e) Bloco 9 (sitemap).
