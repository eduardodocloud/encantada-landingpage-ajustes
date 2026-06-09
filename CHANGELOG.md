# Changelog - Comunicação Encantada

Registro de todos os ajustes realizados no site https://comunicacaoencantada.com.br/

---

## [2026-06-09] — v2.4 — Leads migrados para functions.php (permanente)

> Código movido de WPCode (plugin desinstalado, frágil) para `functions.php` do tema Hello Elementor.
> Arquivo local: `php/encantada-leads.php`

### Por que mudou
O WPCode foi desinstalado e os leads pararam instantaneamente. Qualquer solução baseada em plugin é frágil.

### Solução definitiva
Código adicionado diretamente em `wp-content/themes/hello-elementor/functions.php` (linhas 303–436).
Carrega junto com o WordPress, independente de qualquer plugin instalado ou tema filho.

### Como reaplicar (se o tema for atualizado)
Cole o conteúdo de `php/encantada-leads.php` ao final do novo `functions.php`.

---

## [2026-06-09] — v2.3 — Leads direto no WordPress

### Problema identificado
O formulário enviava dados para um **Google Apps Script** (Google Sheets) via `fetch` com `mode: 'no-cors'`. Esse modo faz o fetch **sempre resolver com sucesso** — mesmo que o script estivesse morto. Resultado: usuário via a tela de sucesso, Google Ads disparava conversão, mas nenhum dado chegava a lugar nenhum.

### Solução implementada

**1. PHP — WPCode snippet (snippet_id: 954)**
- Registra CPT `encantada_lead` visível no menu WP Admin > Leads
- Endpoint REST `POST /wp-json/encantada/v1/lead` — sem autenticação (público)
- Salva todos os campos como post meta com sanitização
- Envia e-mail de notificação para o admin do site a cada novo lead
- Meta box no admin exibe todos os dados do lead formatados
- Colunas customizadas na listagem: Nome/Empresa, E-mail, WhatsApp, Gargalo, Data

**2. JS — Elementor widget `59af0b9`**
- Substituída função `enviarFormulario()` + `SCRIPT_URL` do Google Apps Script
- Novo `fetch POST /wp-json/encantada/v1/lead` com `Content-Type: application/json`
- Erro real tratado: se API retornar `success: false` ou cair no `.catch`, mostra alerta e reabilita botão
- Tela de sucesso só aparece quando `data.success === true`

### Testado
- Endpoint respondeu `{ success: true, id: 958 }` no primeiro teste
- Lead de teste aparece em WP Admin > Leads com todos os campos

---

## [2026-06-09] — v2.2 — Fix CTA Band (botões desalinhados)

> Aplicado via `css/encantada-ajustes.css` → WordPress CSS Adicional.

| Problema | Fix |
|---|---|
| Desktop: botões quebravam para 2ª linha (flex-wrap) | `flex-wrap: nowrap` no `.cta-band-inner` |
| Mobile: botões cortados e desalinhados | `flex-direction: column` + botões `width: 100%` |

---

## [2026-05-18] — v2.1 — Correções mobile

> Aplicadas via `css/encantada-ajustes.css` → WordPress CSS Adicional (Aparência > Personalizar).

### Mobile Fixes (`@media ≤767px / ≤640px`)

| Fix | Problema | Solução |
|---|---|---|
| Dashboard hero | `scale(0.85) top right` ficava desalinhado em coluna única | `transform: none` no mobile — tamanho natural |
| CC3 Carousel | Cards `position:absolute + flex-direction:row` colapsavam o stage e empilhavam side-by-side em 360px | Card ativo vira `position:static + flex-direction:column`; prev/next/far ocultos |
| Depoimentos landscape | Largura 480px em 360px = overflow | `width: 85vw !important` |
| Hero stats | Sobreposição com botão WhatsApp | `padding-right: 72px` |
| Cases padding | Muito espaçamento em telas pequenas | `padding: 32px 0` |

### Resultado das alturas no mobile (360px)
- Cases section: 840px (era 258px quebrado antes do fix)
- Test section: 850px ✓
- Todas as seções dentro de bounds corretos

---

## [2026-05-18] — v2.0 — Carrossel 3D, count-up, gradientes e depoimentos

> Todas as alterações abaixo foram aplicadas diretamente no widget HTML do Elementor (widget ID `59af0b9`, post 636). A source page de referência está em `elementor/page-source.html`.

### Cases — Carrossel 3D (cc3)
- Substituído carrossel flat por carrossel 3D com efeito perspectiva (`perspective: 1400px`)
- Cards laterais aparecem em `translateX(±58%) translateZ(-220px) rotateY(±38deg) scale(0.82)`
- Navegação por setas, dots, clique nos cards laterais e swipe touch
- Auto-init via IIFE com fallback `DOMContentLoaded`
- Cards compactados: `display:flex; flex-direction:row` com gaps e paddings reduzidos
- Seção ajustada para caber acima da dobra (`padding: 20px 0`)

### Cases — Visual do card
- Painel de métricas (`case-right`) com gradiente quente: `linear-gradient(145deg, #F9AF3C 0%, #F06040 32%, #DA0881 68%, #8B1464 100%)`
- Número principal (`case-metric`) em branco `#fff`
- Sub-métricas (`.case-sub .v`) em preto `#0F0A18`
- Labels e descrições em `rgba(0,0,0,0.65–0.75)`

### Count-up animado (scroll-triggered)
- **Seção Cases**: anima `.case-metric` e `.case-sub .v` de 0 ao valor ao entrar na viewport; reseta ao sair; re-anima por troca de card no carrossel
- **Dashboard hero** (`.dash-card .dval`): anima todos os números principais; preserva spans `.dup` (▲ +11.700%, ▲ 3x) fixos
- Parser suporta: inteiros, decimais com vírgula (pt-BR), separador de milhar com ponto, prefixos `R$`, sinais `+/-`, sufixos `k`, `%`, `x`
- `font-variant-numeric: tabular-nums` + `min-height` nos containers para evitar tremido de layout
- Cache via `localStorage` para o dashboard

### Depoimentos — Aspect ratio dinâmico
- Detecta orientação real de cada vídeo via **Vimeo oEmbed API** (`vimeo.com/api/oembed.json`)
- Cache em `localStorage` (chave `tc_aspect_v1`) — API chamada apenas uma vez por browser
- Cards portrait (reels 9:16): `width: 200px`, `aspect-ratio: 9/16`
- Cards landscape (YouTube 16:9): `width: 480px`, `aspect-ratio: 16/9`
- Fallback para dimensões naturais do thumbnail quando API indisponível

---

## [2026-05-14] — v1.0 — Reestruturação de layout e conversão

### Adicionado
- `css/encantada-ajustes.css` — CSS completo com ajustes das 13 seções
- `js/encantada-ajustes.js` — JS: step-form, timeline, copy, thumbnails, FAQ, Esquisitinho no footer

### CSS — Resumo de mudanças

| Seção | Antes | Depois | Ação principal |
|---|---|---|---|
| Hero | h1 83px | h1 52px | Compressão tipográfica, hero-sub 1 linha c/ borda rosa |
| Logos | invisíveis | visíveis | `filter: brightness(0) invert(1)` |
| Quem somos | padding 80px | padding 48px | h2 57→38px, tags compactas |
| Formulário | padding 80px | padding 56px | CSS de suporte para step-form JS |
| Dor/Problema | padding 140px | padding 56px | h2 57→40px, grid 2 col nos cards |
| Cases | padding 80px | padding 48px | h2 61→36px, grid 3 col |
| CTA intermediário | botão preto | botão rosa | `.btn-dark` → `#DA0881` |
| Depoimentos | thumbnails pretas | placeholder c/ play | `.tc-thumb` fallback + overlay |
| Módulos Hub | hub-wheel 880px | grid 3×2 | `position:static` nos cards, grid replace |
| Esquisitinho | inline | footer | `display:none`, mostrado via JS no footer |
| Portfólio | imagens grandes | sem imagem | `.portfolio-img-wrap { display:none }` |
| Método | empilhado | timeline | `.timeline-horizontal` via JS |
| FAQ | padding 120px | padding 48px | tipografia 15px/13px, 2 perguntas extras |

### JS — Funções

| Função | O que faz |
|---|---|
| `updateCopy()` | hero-sub 1 linha, CTA band → ROAS, botão WhatsApp c/ SVG, placeholder textarea, benefícios hub |
| `initStepForm()` | formulário 10 campos → 2 etapas (4+5), validação inline, botão "Continuar →" |
| `initTimeline()` | `.timeline-horizontal` no `.method-steps` só em ≥1024px |
| `fixThumbnails()` | wrapper relativo, ícone play SVG, fallback para thumb quebrada |
| `addPainCTA()` | "Isso tem nome. E tem solução." + link para #cases |
| `addFaqQuestions()` | 2 novos `<details>`: exclusividade de segmento + custo |
| `moveEsquisitinho()` | move `section#esquisitinho` para `footer` em `.footer-esquisitinho` |

---

## [2025-05-13]

### Ajustes realizados

1. **Ajuste de bordas laterais** - Correção das bordas laterais da página para melhor alinhamento visual.
2. **Correção do botão do WhatsApp** - O ícone do botão de WhatsApp estava duplicado. O problema foi corrigido, mantendo apenas um ícone.
