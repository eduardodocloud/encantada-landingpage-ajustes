# Encantada — Ajustes de Layout e Conversão

Reestruturação e otimização de conversão da landing page [comunicacaoencantada.com.br](https://comunicacaoencantada.com.br).

**Meta:** Comprimir de ~20.9 dobras → ~12.3 dobras (−41% de scroll), mantendo 100% da identidade visual.

---

## Arquivos

| Arquivo | O que faz |
|---|---|
| `css/encantada-ajustes.css` | Todos os ajustes de layout, espaçamento, tipografia e grid |
| `js/encantada-ajustes.js` | Step-form, timeline horizontal, copy atualizado, FAQ extra, fix thumbnails, move Esquisitinho |

---

## Como aplicar no WordPress

### CSS

1. Acesse **Aparência > Personalizar > CSS Adicional**
2. Cole o conteúdo de `css/encantada-ajustes.css`
3. Clique em **Publicar**

### JavaScript

**Opção A — Plugin WPCode (recomendada, sem tocar no tema):**
1. Instale o plugin **WPCode** (gratuito)
2. Vá em **Code Snippets > Add Snippet**
3. Escolha **JavaScript**
4. Cole o conteúdo de `js/encantada-ajustes.js`
5. Posição: **Footer**
6. Ative e salve

**Opção B — functions.php (tema filho):**
```php
function encantada_ajustes_js() {
    wp_enqueue_script(
        'enc-ajustes',
        get_stylesheet_directory_uri() . '/js/encantada-ajustes.js',
        [],
        '1.0',
        true // carrega no footer
    );
}
add_action('wp_enqueue_scripts', 'encantada_ajustes_js');
```

---

## Resumo das mudanças por seção

| # | Seção | Altura antes | Altura meta | O que muda |
|---|---|---|---|---|
| 1 | Hero | 757px | ≤ 680px | h1 83px→52px, hero-sub 1 linha c/ borda rosa, CTAs em destaque |
| 2 | Social proof | — | manter | Filter branco nos logos invisíveis |
| 3 | Quem somos | 646px | ≤ 640px | Padding 80→48px, h2 57→38px, tags compactas |
| 4 | Formulário | 1025px | ≤ 680px | Step-form 2 etapas (JS), padding comprimido |
| 5 | Problema/Dor | 1205px | ≤ 680px | Padding 140→56px, h2 57→40px, cards em grid 2 col |
| 6 | Cases | 1187px | ≤ 680px | Padding comprimido, grid 3 col, cards compactos |
| 7 | CTA Intermediário | 433px | manter | Botão preto → rosa, texto 1ª pessoa, ícone WhatsApp |
| 8 | Depoimentos | 826px | ≤ 620px | Thumbnails pretas corrigidas (JS), heading comprimido |
| 9 | Módulos Hub | 1706px | ≤ 640px | Hub-wheel 880px → grid 3×2, cards 160px max |
| 10 | Esquisitinho | 666px | no rodapé | Seção ocultada e movida para footer (JS) |
| 11 | Portfólio | 1429px | ≤ 640px | Imagens ocultadas, grid 3×2 compacto |
| 12 | Método | 963px | ≤ 640px | Timeline horizontal desktop (JS), padding comprimido |
| 13 | FAQ | 1119px | ≤ 640px | Padding 120→48px, 2 perguntas extras (JS) |

---

## Identidade visual preservada

- Fontes: Sofia Sans / Manrope / Fraunces — **não alteradas**
- Paleta: `#DA0881` / `#0F0A18` / `#1A1225` — **mantida**
- Logo e mascote Esquisitinho — **mantidos**
- Border-radius 10–14px — **mantido**
- Tom do copy: direto, sem superlativo, ICP-aware — **mantido e reforçado**

---

## Breakpoints

| Viewport | Comportamento |
|---|---|
| ≥ 1024px | Desktop: timeline horizontal, grid 3 col |
| 768–1023px | Tablet: grid 2 col, timeline vertical |
| < 768px | Mobile: 1 col, CTAs em coluna, padding 40px |

---

## Changelog

Ver [CHANGELOG.md](CHANGELOG.md)
