# Changelog - Comunicação Encantada

Registro de todos os ajustes realizados no site https://comunicacaoencantada.com.br/

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
