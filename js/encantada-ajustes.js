/**
 * ENCANTADA — AJUSTES DE CONVERSÃO — JavaScript
 * Versão: 1.0 — Maio 2026
 *
 * Como aplicar:
 *   Opção A (recomendada): Cole o conteúdo deste arquivo em
 *     Aparência > Personalizar > CSS/JS Adicional
 *     ou em um plugin de Custom JS (ex: WPCode).
 *
 *   Opção B: Enfileire o arquivo via functions.php do tema filho:
 *     wp_enqueue_script('enc-ajustes', get_stylesheet_directory_uri()
 *       . '/js/encantada-ajustes.js', [], '1.0', true);
 *
 * Funções:
 *   1. updateCopy()         — Atualiza textos para versões de alta conversão
 *   2. initStepForm()       — Transforma o formulário em 2 etapas
 *   3. initTimeline()       — Timeline horizontal na seção Método (desktop)
 *   4. fixThumbnails()      — Corrige thumbnails pretas nos depoimentos
 *   5. addPainCTA()         — Adiciona CTA de saída após seção de dor
 *   6. addFaqQuestions()    — Insere 2 perguntas extras no FAQ
 *   7. moveEsquisitinho()   — Move seção manifesto para o rodapé
 */

(function () {
  'use strict';

  /* ─── 1. ATUALIZAÇÃO DE COPY ───────────────────────────────
     Substitui textos para versões de maior conversão.
     Apenas altera o innerHTML de nós de texto simples.
  ───────────────────────────────────────────────────────────── */
  function updateCopy() {
    // Hero sub: parágrafo longo → 1 linha qualificadora
    var heroSub = document.querySelector('.hero-sub');
    if (heroSub) {
      heroSub.textContent =
        'Para empresas que já investem em marketing e ainda não conseguem responder: quanto isso gerou de receita?';
    }

    // CTA band headline: mais específico → ROAS
    var ctaBandH = document.querySelector('.cta-band-inner h3, .cta-band h3, .cta-band h2');
    if (ctaBandH) {
      ctaBandH.textContent = 'Quer ver o que a gente pode fazer pelo seu ROAS?';
    }

    // CTA band — botão primário: texto 1ª pessoa
    var btnDark = document.querySelector('.cta-band .btn-dark');
    if (btnDark) {
      btnDark.textContent = 'Quero meu diagnóstico gratuito →';
    }

    // CTA band — botão WhatsApp: adicionar ícone SVG
    var btnWhatsApp = document.querySelector('.cta-band .btn-white-ghost');
    if (btnWhatsApp) {
      btnWhatsApp.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0">' +
        '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15' +
        '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475' +
        '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52' +
        '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207' +
        '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372' +
        '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2' +
        ' 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719' +
        ' 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
        '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.849L.057 23.985l6.304-1.654' +
        'A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.999a9.96 9.96 0 0 1' +
        '-5.115-1.409l-.367-.218-3.801.997 1.014-3.703-.239-.381A9.944 9.944 0 0 1 2 12c0-5.514' +
        ' 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>' +
        '</svg> Falar no WhatsApp';
    }

    // Hub h2 — forçar quebra de linha entre as duas frases
    // O h2 tem estrutura: "Menos gerenciamento. " + <em>Mais visão.</em>
    var hubH2 = document.querySelector('.hub-intel-title');
    if (hubH2) {
      var em = hubH2.querySelector('em');
      if (em && !hubH2.querySelector('br')) {
        var br = document.createElement('br');
        hubH2.insertBefore(br, em);
      }
    }

    // Form section — CTA button text: 1ª pessoa
    var formSubmit = document.querySelector('.form-section [type="submit"], .form-section button[type="submit"]');
    if (formSubmit) {
      formSubmit.textContent = 'Quero meu diagnóstico gratuito →';
    }

    // Form section — placeholder do campo contexto
    var ctxField = document.querySelector('.form-section textarea');
    if (ctxField) {
      ctxField.placeholder =
        'Ex: investimos R$15k/mês em tráfego, os leads caíram 30% em 3 meses e não sabemos por quê.';
    }

    // Hub card — benefícios de 1 linha (atualizar desc de cada módulo)
    var hubBenefits = {
      'Branding': 'Marca que o cliente reconhece e o concorrente teme',
      'Narrativa': 'Marca que o cliente reconhece e o concorrente teme',
      'CRM': 'Nunca mais perder lead quente por falta de follow-up',
      'Automação': 'Nunca mais perder lead quente por falta de follow-up',
      'Campanha': 'Performance com ROAS rastreado até a venda',
      'Tráfego': 'Performance com ROAS rastreado até a venda',
      'Audiovisual': 'Vídeos que constroem autoridade e geram lead',
      'Estratégia': 'Diagnóstico conectado a metas reais de faturamento',
      'Comercial': 'Diagnóstico conectado a metas reais de faturamento',
      'Presença': 'Consistência de marca em todos os canais digitais',
      'Digital': 'Consistência de marca em todos os canais digitais',
    };

    document.querySelectorAll('.hub-card').forEach(function (card) {
      var titleEl = card.querySelector('h3');
      var descEl = card.querySelector('p');
      if (!titleEl || !descEl) return;
      var titleText = titleEl.textContent || '';
      Object.keys(hubBenefits).forEach(function (key) {
        if (titleText.indexOf(key) !== -1 && descEl.textContent.trim().length < 40) {
          descEl.textContent = hubBenefits[key];
        }
      });
    });
  }

  /* ─── 2. STEP-FORM (2 ETAPAS) ─────────────────────────────
     Transforma o formulário de 10 campos em um
     wizard de 2 etapas (4 + 5 campos).
     Etapa 1: Nome, WhatsApp, Empresa, Faturamento
     Etapa 2: Cargo, E-mail, Setor, Gargalo, Contexto
  ───────────────────────────────────────────────────────────── */
  function initStepForm() {
    var formSection = document.querySelector('.form-section');
    if (!formSection) return;

    var form = formSection.querySelector('form');
    if (!form) return;

    var inputs = Array.from(form.querySelectorAll(
      'input:not([type=hidden]):not([type=checkbox]):not([type=submit]):not([type=button]), select, textarea'
    ));
    if (inputs.length < 6) return;

    // Identificar campos por placeholder/type
    var step1Fields = [], step2Fields = [];
    inputs.forEach(function (input) {
      var ph = (input.placeholder || '').toLowerCase();
      var name = (input.name || '').toLowerCase();
      var isStep1 =
        ph.indexOf('nome') !== -1 ||
        ph.indexOf('chama') !== -1 ||
        ph.indexOf('whatsapp') !== -1 ||
        ph.indexOf('empresa') !== -1 ||
        ph.indexOf('faturamento') !== -1 ||
        input.type === 'tel' ||
        name.indexOf('empresa') !== -1 ||
        name.indexOf('faturamento') !== -1;

      if (isStep1) {
        step1Fields.push(input);
      } else {
        step2Fields.push(input);
      }
    });

    // Fallback: dividir na metade se não conseguir identificar
    if (step1Fields.length === 0) {
      step1Fields = inputs.slice(0, 4);
      step2Fields = inputs.slice(4);
    }

    // Obter elementos pai (wrappers dos inputs)
    function getFieldWrapper(input) {
      var el = input;
      for (var i = 0; i < 4; i++) {
        if (el.parentElement === form || el.parentElement === form.querySelector('.form-inner')) {
          return el;
        }
        el = el.parentElement;
      }
      return input.parentElement;
    }

    var step1Wrappers = step1Fields.map(getFieldWrapper).filter(function (el, i, arr) {
      return arr.indexOf(el) === i;
    });
    var step2Wrappers = step2Fields.map(getFieldWrapper).filter(function (el, i, arr) {
      return arr.indexOf(el) === i;
    });

    // Criar containers de etapa
    var step1Div = document.createElement('div');
    step1Div.className = 'form-step active';

    var indic1 = document.createElement('p');
    indic1.className = 'form-step-indicator';
    indic1.textContent = 'Etapa 1 de 2 · 30 segundos';
    step1Div.appendChild(indic1);

    step1Wrappers.forEach(function (w) { step1Div.appendChild(w); });

    var nav1 = document.createElement('div');
    nav1.className = 'form-step-nav';
    var btnNext = document.createElement('button');
    btnNext.type = 'button';
    btnNext.className = 'btn-step-next';
    btnNext.textContent = 'Continuar →';
    nav1.appendChild(btnNext);
    step1Div.appendChild(nav1);

    var step2Div = document.createElement('div');
    step2Div.className = 'form-step';

    var indic2 = document.createElement('p');
    indic2.className = 'form-step-indicator';
    indic2.textContent = 'Etapa 2 de 2 · Mais 30 segundos';
    step2Div.appendChild(indic2);

    step2Wrappers.forEach(function (w) { step2Div.appendChild(w); });

    // Mover submit para etapa 2
    var submitBtn = form.querySelector('[type="submit"], button[type="submit"]');
    if (submitBtn) {
      step2Div.appendChild(submitBtn.closest('.form-field, .form-row, div') || submitBtn);
    }

    // Montar form
    var formInner = form.querySelector('.form-inner') || form;
    var oldChildren = Array.from(formInner.children);
    oldChildren.forEach(function (c) {
      if (!step1Div.contains(c) && !step2Div.contains(c)) {
        // Manter elementos que não são campos (trust text, etc.)
      }
    });

    formInner.insertBefore(step1Div, formInner.firstChild);
    formInner.insertBefore(step2Div, step1Div.nextSibling);

    // Navegação entre etapas
    btnNext.addEventListener('click', function () {
      // Validar campos da etapa 1
      var valid = true;
      step1Fields.forEach(function (input) {
        if (input.required && !input.value.trim()) {
          valid = false;
          input.style.borderColor = '#DA0881';
          input.addEventListener('input', function () {
            input.style.borderColor = '';
          }, { once: true });
        }
      });
      if (!valid) return;

      step1Div.classList.remove('active');
      step2Div.classList.add('active');
      step2Div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ─── 3. TIMELINE HORIZONTAL (MÉTODO) ─────────────────────
     Adiciona classe .timeline-horizontal ao .method-steps
     apenas em viewport ≥ 1024px.
  ───────────────────────────────────────────────────────────── */
  function initTimeline() {
    var steps = document.querySelector('.method-steps');
    if (!steps) return;

    function applyTimeline() {
      if (window.innerWidth >= 1024) {
        steps.classList.add('timeline-horizontal');
      } else {
        steps.classList.remove('timeline-horizontal');
      }
    }

    applyTimeline();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyTimeline, 150);
    });
  }

  /* ─── 4. FIX THUMBNAILS PRETAS (DEPOIMENTOS) ──────────────
     Detecta imagens com src quebrado e adiciona:
     - fundo escuro como placeholder
     - ícone de play centralizado
  ───────────────────────────────────────────────────────────── */
  function fixThumbnails() {
    var thumbs = document.querySelectorAll('.tc-thumb, .test-section img[class*="thumb"]');

    thumbs.forEach(function (thumb) {
      // Envolver em wrapper relativo se ainda não estiver
      var parent = thumb.parentElement;
      if (!parent.classList.contains('tc-thumb-wrap')) {
        var wrap = document.createElement('div');
        wrap.className = 'tc-thumb-wrap';
        parent.insertBefore(wrap, thumb);
        wrap.appendChild(thumb);
        parent = wrap;
      }

      // Ícone de play
      if (!parent.querySelector('.tc-play-icon')) {
        var play = document.createElement('div');
        play.className = 'tc-play-icon';
        play.innerHTML =
          '<svg width="44" height="44" viewBox="0 0 44 44" fill="none">' +
          '<circle cx="22" cy="22" r="22" fill="rgba(218,8,129,0.85)"/>' +
          '<polygon points="17,13 35,22 17,31" fill="#fff"/>' +
          '</svg>';
        parent.appendChild(play);
      }

      // Se imagem não carregar, exibir placeholder
      function handleError() {
        thumb.style.cssText =
          'background:#1A1225;min-height:160px;display:block;width:100%;object-fit:cover;';
      }

      if (!thumb.complete || thumb.naturalWidth === 0) {
        thumb.addEventListener('error', handleError);
        handleError();
      }
    });
  }

  /* ─── 5. CTA DE SAÍDA — SEÇÃO DOR ─────────────────────────
     Insere "Isso tem nome. E tem solução." + link para cases
     ao final da seção .pain-section.
  ───────────────────────────────────────────────────────────── */
  function addPainCTA() {
    var painSection = document.querySelector('.pain-section');
    if (!painSection) return;
    if (painSection.querySelector('.pain-cta-exit')) return;

    var cta = document.createElement('div');
    cta.className = 'pain-cta-exit';
    cta.innerHTML =
      '<span>Isso tem nome. E tem solução. </span>' +
      '<a href="#cases">Ver como resolvemos →</a>';
    painSection.appendChild(cta);
  }

  /* ─── 6. ADICIONAR PERGUNTAS AO FAQ ───────────────────────
     Insere 2 perguntas novas ao final do .faq-list.
  ───────────────────────────────────────────────────────────── */
  function addFaqQuestions() {
    var faqList = document.querySelector('.faq-list');
    if (!faqList) return;

    var newFAQs = [
      {
        q: 'Trabalham com exclusividade de segmento?',
        a: 'Avaliamos caso a caso. Em segmentos onde já atendemos clientes ativos, somos transparentes antes de fechar. Nosso interesse é que ambos os lados cresçam — conflito de interesse não serve a ninguém.'
      },
      {
        q: 'Quanto custa trabalhar com a Encantada?',
        a: 'Depende dos módulos ativados e do tamanho da operação. O diagnóstico é gratuito e, a partir dele, montamos uma proposta com escopo e valor fechado. Sem contrato de gaveta.'
      }
    ];

    newFAQs.forEach(function (faq) {
      var details = document.createElement('details');
      details.className = 'faq-item';

      var summary = document.createElement('summary');
      summary.textContent = faq.q;

      var p = document.createElement('p');
      p.textContent = faq.a;

      details.appendChild(summary);
      details.appendChild(p);
      faqList.appendChild(details);
    });
  }

  /* ─── 7. MOVER ESQUISITINHO PARA O RODAPÉ ─────────────────
     Move o conteúdo da seção #esquisitinho para o início
     do <footer>, encapsulado em .footer-esquisitinho.
  ───────────────────────────────────────────────────────────── */
  function moveEsquisitinho() {
    var section = document.querySelector('section#esquisitinho.mascote-section');
    var footer = document.querySelector('footer.footer, footer, .site-footer');
    if (!section || !footer) return;

    // Não duplicar se já foi movido
    if (footer.querySelector('.footer-esquisitinho')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'footer-esquisitinho';

    // Pegar o conteúdo interno (ignora glow/noise decorativos)
    var inner = section.querySelector('.mascote-inner, .container, .about-inner, .mascote-content');
    if (inner) {
      wrapper.innerHTML = inner.innerHTML;
    } else {
      // Fallback: copiar apenas textos relevantes
      var h2 = section.querySelector('h2');
      var p = section.querySelector('p');
      var tag = section.querySelector('.eyebrow, .label, [class*="tag"]');
      if (tag) wrapper.appendChild(tag.cloneNode(true));
      if (h2) wrapper.appendChild(h2.cloneNode(true));
      if (p) wrapper.appendChild(p.cloneNode(true));
    }

    footer.insertBefore(wrapper, footer.firstChild);
  }

  /* ─── 8. LAZY LOADING NAS IMAGENS ABAIXO DA DOBRA ────────────
     Adiciona loading="lazy" em imagens fora do viewport inicial.
     Preserva fetchpriority="high" no hero (LCP).
  ───────────────────────────────────────────────────────────── */
  function lazyLoadImages() {
    var heroImg = document.querySelector('.hero img, .hero-media img');
    if (heroImg) heroImg.fetchPriority = 'high';

    var foldThreshold = window.innerHeight * 1.2;
    document.querySelectorAll('img').forEach(function (img) {
      if (img === heroImg) return;
      var top = img.getBoundingClientRect().top;
      if (top > foldThreshold && img.loading !== 'lazy') {
        img.loading = 'lazy';
      }
    });
  }

  /* ─── INICIALIZAÇÃO ────────────────────────────────────────
     Executa todas as funções após o DOM estar pronto.
  ───────────────────────────────────────────────────────────── */
  function init() {
    updateCopy();
    initTimeline();
    fixThumbnails();
    addPainCTA();
    addFaqQuestions();
    moveEsquisitinho();
    initStepForm();
    lazyLoadImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
