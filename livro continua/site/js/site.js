// progresso
(function(){
  var b=document.querySelector('.prog'); if(!b) return;
  function up(){var h=document.documentElement;
    var m=(h.scrollTop)/(h.scrollHeight-h.clientHeight||1);
    b.style.width=(m*100)+'%';}
  document.addEventListener('scroll',up,{passive:true}); up();
})();
// setas teclado
(function(){
  var p=document.querySelector('.pag a.esq'), n=document.querySelector('.pag a.dir');
  document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT')return;
    if(e.key==='ArrowLeft'&&p)location.href=p.href;
    if(e.key==='ArrowRight'&&n)location.href=n.href;
  });
})();
// timeline
(function(){
  document.querySelectorAll('.tl li').forEach(function(li){
    li.addEventListener('click',function(){li.classList.toggle('aberto');});
  });
})();
// mapa
(function(){
  var info=document.getElementById('mapinfo'); if(!info) return;
  document.querySelectorAll('.pino').forEach(function(g){
    g.addEventListener('click',function(){
      info.innerHTML='<b>'+g.getAttribute('data-t')+'</b>'+g.getAttribute('data-d');
    });
    g.addEventListener('mouseenter',function(){
      info.innerHTML='<b>'+g.getAttribute('data-t')+'</b>'+g.getAttribute('data-d');
    });
  });
})();

/* ===== ATMOSFERA — geração enxuta e sem trabalho por quadro ===== */
(function(){
  if (document.querySelector('.atm-ceu')) return;

  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var estreito = window.innerWidth < 760;
  // respeita aparelhos fracos
  var fraco = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
           || (navigator.deviceMemory && navigator.deviceMemory <= 4);

  function el(cls, html){
    var d=document.createElement('div'); d.className=cls;
    if(html) d.innerHTML=html;
    d.setAttribute('aria-hidden','true');
    return d;
  }

  var frag=document.createDocumentFragment();
  frag.appendChild(el('atm-ceu'));
  frag.appendChild(el('atm-alma'));
  frag.appendChild(el('atm-nevoa','<i></i>'));

  if(!estreito){
    frag.appendChild(el('atm-correntes','<b></b><b></b><b></b>'));
    var p1=el('atm-pulso');
    p1.style.left=(10+Math.random()*20)+'vw';
    p1.style.top=(20+Math.random()*28)+'vh';
    frag.appendChild(p1);
  }

  // brasas: quantidade adaptada ao aparelho
  if(!reduz){
    var N = estreito ? 10 : (fraco ? 14 : 22);
    var brasas=el('atm-brasas');
    for(var i=0;i<N;i++){
      var s=document.createElement('s');
      if(Math.random()<0.22) s.className='fria';
      s.style.left=(Math.random()*100)+'vw';
      var dur=(11+Math.random()*15).toFixed(1);
      s.style.animationDuration=dur+'s';
      s.style.animationDelay=(-Math.random()*dur)+'s';
      s.style.setProperty('--dx',((Math.random()*100)-50).toFixed(0)+'px');
      var sz=(2+Math.random()*2.2).toFixed(1);
      s.style.width=sz+'px'; s.style.height=sz+'px';
      brasas.appendChild(s);
    }
    frag.appendChild(brasas);
  }

  frag.appendChild(el('atm-vinheta'));
  if(!estreito && !reduz) frag.appendChild(el('atm-flash'));

  document.body.insertBefore(frag, document.body.firstChild);

  /* Parallax: apenas na capa, e só enquanto ela está visível.
     Nada de recalcular camadas fixas a cada rolagem. */
  if(reduz) return;
  var arte=document.querySelector('.capa-arte'),
      cont=document.querySelector('.capa-conteudo'),
      capa=document.querySelector('.capa-hero'),
      faixa=document.querySelector('.faixa .im');
  if(!arte && !faixa) return;

  var visivel = true;
  if(capa && 'IntersectionObserver' in window){
    new IntersectionObserver(function(es){ visivel = es[0].isIntersecting; },
      {rootMargin:'80px'}).observe(capa);
  }

  var tick=false;
  function mover(){
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(visivel){
      if(arte) arte.style.transform='translate3d(0,'+(y*0.16)+'px,0)';
      if(cont){
        cont.style.transform='translate3d(0,'+(y*0.09)+'px,0)';
        cont.style.opacity=Math.max(0,1-y/520);
      }
    }
    if(faixa) faixa.style.transform='translate3d(0,'+(y*0.12)+'px,0)';
    tick=false;
  }
  document.addEventListener('scroll',function(){
    if(!tick){ tick=true; requestAnimationFrame(mover); }
  },{passive:true});
  mover();
})();

/* ===== almas da capa ===== */
(function(){
  var box=document.querySelector('.capa-almas');
  if(!box) return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var N = window.innerWidth<760 ? 8 : 16;
  for(var i=0;i<N;i++){
    var u=document.createElement('u');
    if(Math.random()<0.25) u.className='quente';
    u.style.left=(Math.random()*100)+'%';
    var d=(12+Math.random()*14).toFixed(1);
    u.style.animationDuration=d+'s';
    u.style.animationDelay=(-Math.random()*d)+'s';
    u.style.setProperty('--ax',((Math.random()*80)-40).toFixed(0)+'px');
    var z=(2.5+Math.random()*2.5).toFixed(1);
    u.style.width=z+'px'; u.style.height=z+'px';
    box.appendChild(u);
  }
})();

/* ============================================================
   MOTOR DE PALETA — interpolação contínua entre os três livros
   Gradientes CSS não animam com transition; então recalculamos
   as cores a cada quadro e reescrevemos as variáveis.
   ============================================================ */
(function(){
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 0 = Livro I (cinza frio) · 1 = Livro II (Vazio) · 2 = Livro III (âmbar)
  var P = [
    { oxido:[74,74,82],    ceu:[109,111,122], ceucl:[154,160,173], alma:[79,195,217],
      almacl:[191,240,251], tinta:[223,226,230], suave:[152,160,169],
      bgA:[16,19,24], bgB:[10,12,16], bgC:[8,9,12],
      brasa:[154,160,173], glow:[90,96,110], flash:[150,158,175] },
    { oxido:[91,58,134],   ceu:[124,79,190],  ceucl:[169,124,240], alma:[79,195,217],
      almacl:[201,179,255], tinta:[231,224,240], suave:[169,156,188],
      bgA:[19,15,28], bgB:[11,8,16], bgC:[8,6,12],
      brasa:[169,124,240], glow:[124,79,190], flash:[140,90,215] },
    { oxido:[122,74,30],   ceu:[184,114,44],  ceucl:[229,165,94],  alma:[95,208,226],
      almacl:[255,217,166], tinta:[242,230,214], suave:[187,165,140],
      bgA:[26,18,11], bgB:[14,9,6], bgC:[10,7,5],
      brasa:[240,180,106], glow:[214,132,54], flash:[214,132,54] }
  ];
  var CHAVES = Object.keys(P[0]);

  // mistura em espaço quadrático: evita meio-termo "sujo"
  function mix(a,b,t){
    return [
      Math.round(Math.sqrt(a[0]*a[0]*(1-t) + b[0]*b[0]*t)),
      Math.round(Math.sqrt(a[1]*a[1]*(1-t) + b[1]*b[1]*t)),
      Math.round(Math.sqrt(a[2]*a[2]*(1-t) + b[2]*b[2]*t))
    ];
  }
  function paleta(pos){
    pos = Math.max(0, Math.min(P.length-1, pos));
    var i = Math.floor(pos), t = pos - i;
    if(i >= P.length-1){ i = P.length-2; t = 1; }
    var out = {};
    for(var k=0;k<CHAVES.length;k++){
      var c = CHAVES[k];
      out[c] = mix(P[i][c], P[i+1][c], t);
    }
    return out;
  }
  function rgb(c){ return c[0]+','+c[1]+','+c[2]; }

  function aplicar(pos){
    var p = paleta(pos), r = document.documentElement.style;
    for(var k=0;k<CHAVES.length;k++){
      var c = CHAVES[k];
      r.setProperty('--c-'+c, rgb(p[c]));
    }
    // variáveis do tema apontam para as interpoladas
    r.setProperty('--oxido',      'rgb('+rgb(p.oxido)+')');
    r.setProperty('--ceu',        'rgb('+rgb(p.ceu)+')');
    r.setProperty('--ceu-cl',     'rgb('+rgb(p.ceucl)+')');
    r.setProperty('--alma',       'rgb('+rgb(p.alma)+')');
    r.setProperty('--alma-cl',    'rgb('+rgb(p.almacl)+')');
    r.setProperty('--tinta',      'rgb('+rgb(p.tinta)+')');
    r.setProperty('--tinta-suave','rgb('+rgb(p.suave)+')');
    r.setProperty('--linha',      'rgba('+rgb(p.ceucl)+',.26)');
    r.setProperty('--linha-forte','rgba('+rgb(p.ceucl)+',.50)');
  }

  // ---------- suavização ----------
  var alvo = 0, atual = null, rodando = false;
  function laco(){
    var d = alvo - atual;
    if(Math.abs(d) < 0.0015){ atual = alvo; aplicar(atual); rodando = false; return; }
    atual += d * 0.085;              // amortecimento: chega sem estalar
    aplicar(atual);
    requestAnimationFrame(laco);
  }
  function irPara(p, imediato){
    alvo = p;
    if(atual === null || imediato){ atual = p; aplicar(atual); return; }
    if(!rodando){ rodando = true; requestAnimationFrame(laco); }
  }

  // ---------- posição a partir da rolagem (arquivo único) ----------
  var caps = [].slice.call(document.querySelectorAll('.cap[data-livro]'));

  function suave(a,b,x){                       // smoothstep
    var t = Math.max(0, Math.min(1, (x-a)/(b-a)));
    return t*t*(3-2*t);
  }

  if(caps.length){
    var marcos = [];
    function medir(){
      marcos = caps.map(function(el){
        var r = el.getBoundingClientRect();
        return { y: r.top + window.pageYOffset, v: (+el.getAttribute('data-livro'))-1 };
      });
    }
    function calcular(){
      var y = window.pageYOffset + window.innerHeight*0.40;
      if(y < marcos[0].y) return marcos[0].v;
      for(var i=0;i<marcos.length;i++){
        var ini = marcos[i].y;
        var fim = (i+1 < marcos.length) ? marcos[i+1].y : ini + 4000;
        if(y >= ini && y < fim){
          var v = marcos[i].v;
          var prox = (i+1 < marcos.length) ? marcos[i+1].v : v;
          if(prox === v) return v;
          // vira devagar ao longo dos últimos 55% do capítulo
          var t = (y-ini)/(fim-ini);
          return v + (prox-v)*suave(0.45, 1.0, t);
        }
      }
      return marcos[marcos.length-1].v;
    }
    var trav=false;
    function aoRolar(){
      if(trav) return;
      trav=true;
      requestAnimationFrame(function(){ irPara(calcular()); trav=false; });
    }
    medir();
    irPara(calcular(), true);
    document.addEventListener('scroll', aoRolar, {passive:true});
    window.addEventListener('resize', function(){ medir(); aoRolar(); });
    if(document.readyState!=='complete'){
      window.addEventListener('load', function(){ medir(); aoRolar(); });
    }
  } else {
    // ---------- páginas soltas do site ----------
    var b = document.body.getAttribute('data-livro');
    var pos = b ? (+b)-1 : 0;
    aplicar(pos); atual = pos; alvo = pos;
    if(!reduz){
      // pequena entrada: a cor "acende" ao abrir a página
      atual = pos - 0.22;
      irPara(pos);
    }
  }
})();


/* ============================================================
   VISOR — galeria ampliada com navegação
   Substitui o lightbox simples: setas, teclado, toque e contador
   ============================================================ */
(function(){
  var lb = document.getElementById('lb');
  if(!lb) return;

  // reconstrói a estrutura do visor
  lb.innerHTML =
    '<button class="vs-fechar" aria-label="Fechar">&times;</button>' +
    '<button class="vs-nav vs-ant" aria-label="Anterior">&#10094;</button>' +
    '<figure class="vs-palco"><img alt=""><figcaption class="vs-legenda"></figcaption></figure>' +
    '<button class="vs-nav vs-prox" aria-label="Próxima">&#10095;</button>' +
    '<div class="vs-contador"></div>';

  var img   = lb.querySelector('img'),
      leg   = lb.querySelector('.vs-legenda'),
      cont  = lb.querySelector('.vs-contador'),
      bAnt  = lb.querySelector('.vs-ant'),
      bProx = lb.querySelector('.vs-prox'),
      bFech = lb.querySelector('.vs-fechar');

  // coleta todas as imagens visíveis da página, na ordem
  // .gcard img só entra no visor quando estamos na galeria (fora dela, são links de navegação)
  var pagina = window.location.pathname.split('/').pop() || 'index.html';
  var seletor = 'figure.ilus img, .ficha img';
  if(pagina === 'galeria.html') seletor += ', .gcard img';
  var alvos = [].slice.call(document.querySelectorAll(seletor));
  if(!alvos.length) return;

  var itens = alvos.map(function(el){
    var fc = el.closest('figure') && el.closest('figure').querySelector('figcaption');
    var cd = el.closest('.gcard') && el.closest('.gcard').querySelector('.cap b');
    return {
      src: el.getAttribute('data-full') || el.src,
      txt: (fc && fc.textContent.trim()) || (cd && cd.textContent.trim()) ||
           el.getAttribute('alt') || ''
    };
  });

  var i = 0, aberto = false;

  function mostrar(n){
    i = (n + itens.length) % itens.length;
    var it = itens[i];
    img.classList.remove('vs-entra');
    void img.offsetWidth;              // reinicia a animação
    img.src = it.src;
    img.alt = it.txt;
    img.classList.add('vs-entra');
    leg.textContent = it.txt;
    cont.textContent = (i+1) + ' / ' + itens.length;
    var só = itens.length < 2;
    bAnt.style.display = só ? 'none' : '';
    bProx.style.display = só ? 'none' : '';
  }

  function abrir(n){
    aberto = true;
    mostrar(n);
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function fechar(){
    aberto = false;
    lb.classList.remove('on');
    document.body.style.overflow = '';
  }

  alvos.forEach(function(el, n){
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', function(e){ e.preventDefault(); abrir(n); });
  });

  bAnt.addEventListener('click',  function(e){ e.stopPropagation(); mostrar(i-1); });
  bProx.addEventListener('click', function(e){ e.stopPropagation(); mostrar(i+1); });
  bFech.addEventListener('click', function(e){ e.stopPropagation(); fechar(); });
  lb.querySelector('.vs-palco').addEventListener('click', function(e){ e.stopPropagation(); });
  lb.addEventListener('click', fechar);

  document.addEventListener('keydown', function(e){
    if(!aberto) return;
    if(e.key === 'Escape')     fechar();
    if(e.key === 'ArrowLeft')  { e.preventDefault(); mostrar(i-1); }
    if(e.key === 'ArrowRight') { e.preventDefault(); mostrar(i+1); }
  });

  // arrastar no celular
  var x0 = null;
  lb.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, {passive:true});
  lb.addEventListener('touchend', function(e){
    if(x0 === null) return;
    var d = e.changedTouches[0].clientX - x0;
    if(Math.abs(d) > 45) mostrar(d > 0 ? i-1 : i+1);
    x0 = null;
  }, {passive:true});
})();


/* ============================================================
   CONTROLES DE LEITURA — tamanho de fonte + salvar progresso
   ============================================================ */
(function(){
  // Só em páginas com .texto (capítulos)
  var texto = document.querySelector('.texto');
  if(!texto) return;
  document.body.classList.add('tem-leitura');
  
  var TAMANHOS = ['p', 'normal', 'g', 'gg'];
  var LABELS = { p: 'A−', normal: 'A', g: 'A+', gg: 'A++' };
  var key = 'fonte-tamanho';
  
  // Restore saved size
  var saved = localStorage.getItem(key) || 'normal';
  if(saved !== 'normal') document.body.classList.add('fonte-' + saved);
  
  // Create controls
  var box = document.createElement('div');
  box.className = 'controles-leitura';
  
  var menor = document.createElement('button');
  menor.textContent = 'A−';
  menor.setAttribute('aria-label', 'Diminuir fonte');
  
  var label = document.createElement('span');
  label.textContent = saved === 'normal' ? 'A' : LABELS[saved];
  
  var maior = document.createElement('button');
  maior.textContent = 'A+';
  maior.setAttribute('aria-label', 'Aumentar fonte');
  
  function atualizar(novo){
    TAMANHOS.forEach(function(t){ 
      if(t !== 'normal') document.body.classList.remove('fonte-' + t);
    });
    if(novo !== 'normal') document.body.classList.add('fonte-' + novo);
    label.textContent = LABELS[novo];
    localStorage.setItem(key, novo);
  }
  
  menor.addEventListener('click', function(){
    var idx = TAMANHOS.indexOf(saved);
    if(idx > 0){ saved = TAMANHOS[idx - 1]; atualizar(saved); }
  });
  
  maior.addEventListener('click', function(){
    var idx = TAMANHOS.indexOf(saved);
    if(idx < TAMANHOS.length - 1){ saved = TAMANHOS[idx + 1]; atualizar(saved); }
  });
  
  box.appendChild(menor);
  box.appendChild(label);
  box.appendChild(maior);
  document.body.appendChild(box);
  
  // Save reading progress
  var page = window.location.pathname.split('/').pop() || 'index.html';
  if(/^cap\d+\.html$/.test(page)){
    var titulo = document.querySelector('.cabec h1');
    var num = document.querySelector('.cabec .num');
    if(titulo){
      localStorage.setItem('ultimo-cap', JSON.stringify({
        href: page,
        titulo: titulo.textContent.trim(),
        num: num ? num.textContent.trim() : ''
      }));
    }
  }
})();

/* ============================================================
   "CONTINUE LENDO" — link na capa para o último capítulo
   ============================================================ */
(function(){
  var el = document.querySelector('.continuar-lendo');
  if(!el) return;
  
  var data = localStorage.getItem('ultimo-cap');
  if(!data) return;
  
  try {
    var cap = JSON.parse(data);
    el.href = cap.href;
    el.querySelector('.rot').textContent = '📖 Continue lendo';
    el.querySelector('.tt').textContent = cap.num + ' — ' + cap.titulo;
    el.style.display = '';
    el.classList.add('visivel');
  } catch(e){}
})();


/* ============================================================
   SCROLL AUTOMÁTICO — rolagem automática com velocidade ajustável
   ============================================================ */
(function(){
  var texto = document.querySelector('.texto');
  if(!texto) return;
  
  var velocidades = { 1: 1.5, 2: 3, 3: 5.5 };
  var velocidadeAtual = 2;
  var rolando = false;
  var animId = null;
  
  var box = document.createElement('div');
  box.className = 'auto-scroll-box';
  
  // Ícones SVG temáticos (runas de velocidade)
  var icons = {
    1: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h8"/><path d="M9 8l4 4-4 4"/></svg>',
    2: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h12"/><path d="M13 8l4 4-4 4"/><path d="M5 8l4 4-4 4"/></svg>',
    3: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="M15 8l4 4-4 4"/><path d="M9 8l4 4-4 4"/><path d="M5 8l4 4-4 4"/></svg>'
  };
  
  // Seletor de velocidade
  var velBox = document.createElement('div');
  velBox.className = 'auto-scroll-vel';
  
  [1, 2, 3].forEach(function(v){
    var btn = document.createElement('button');
    btn.innerHTML = icons[v];
    btn.setAttribute('aria-label', 'Velocidade ' + v);
    if(v === velocidadeAtual) btn.classList.add('ativo');
    btn.addEventListener('click', function(){
      velocidadeAtual = v;
      velBox.querySelectorAll('button').forEach(function(b){ b.classList.remove('ativo'); });
      btn.classList.add('ativo');
    });
    velBox.appendChild(btn);
  });
  
  // Botão principal
  var playIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var pauseIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  
  var mainBtn = document.createElement('button');
  mainBtn.className = 'auto-scroll-btn';
  mainBtn.innerHTML = playIcon;
  mainBtn.setAttribute('aria-label', 'Iniciar scroll automático');
  
  function scroll(){
    if(!rolando) return;
    window.scrollBy(0, velocidades[velocidadeAtual]);
    if((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 10){
      parar();
      return;
    }
    animId = requestAnimationFrame(scroll);
  }
  
  function iniciar(){
    rolando = true;
    mainBtn.classList.add('ativo');
    mainBtn.innerHTML = pauseIcon;
    scroll();
  }
  
  function parar(){
    rolando = false;
    mainBtn.classList.remove('ativo');
    mainBtn.innerHTML = playIcon;
    if(animId) cancelAnimationFrame(animId);
  }
  
  mainBtn.addEventListener('click', function(){
    if(rolando) parar(); else iniciar();
  });
  
  window.addEventListener('wheel', function(){ if(rolando) parar(); }, {passive: true});
  window.addEventListener('touchstart', function(){ if(rolando) parar(); }, {passive: true});
  
  document.addEventListener('keydown', function(e){
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if(e.code === 'Space' && e.shiftKey){
      e.preventDefault();
      if(rolando) parar(); else iniciar();
    }
  });
  
  box.appendChild(velBox);
  box.appendChild(mainBtn);
  document.body.appendChild(box);
})();


/* ============================================================
   TEMPO DE LEITURA — estimativa baseada em palavras/minuto
   ============================================================ */
(function(){
  var texto = document.querySelector('.texto');
  if(!texto) return;
  
  // Contar palavras
  var palavras = texto.textContent.trim().split(/\s+/).length;
  
  // Velocidade média: 220 palavras/minuto (português)
  var minutos = Math.ceil(palavras / 220);
  
  // Criar indicador
  var indicador = document.createElement('div');
  indicador.className = 'tempo-leitura';
  
  var icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  
  var tempoTexto = minutos === 1 ? '1 min de leitura' : minutos + ' min de leitura';
  
  indicador.innerHTML = icon + '<span>' + tempoTexto + ' • ' + palavras.toLocaleString('pt-BR') + ' palavras</span>';
  
  // Inserir após o ornamento
  var ornamento = document.querySelector('.ornamento');
  if(ornamento){
    ornamento.parentNode.insertBefore(indicador, ornamento.nextSibling);
  }
})();



/* ============================================================
   MELHORIAS VISUAIS — parallax, cards 3D, partículas, badges
   ============================================================ */

// ===== 2. PARALLAX SUTIL =====
(function(){
  var faixa = document.querySelector('.faixa .im');
  if(!faixa) return;
  var ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      requestAnimationFrame(function(){
        var scroll = window.scrollY;
        faixa.style.transform = 'translateY(' + (scroll * 0.15) + 'px)';
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
})();

// ===== 4. CARDS 3D TILT =====
(function(){
  var cards = document.querySelectorAll('.gcard');
  if(!cards.length) return;
  
  cards.forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -5;
      var rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
    });
  });
})();

// ===== 6. PARTÍCULAS DE FUNDO (brasas da Gorja) =====
(function(){
  // Only on main pages, not inside .texto
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.4';
  document.body.appendChild(canvas);
  
  var ctx = canvas.getContext('2d');
  var particles = [];
  var numParticles = 25;
  
  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  // Create particles
  for(var i = 0; i < numParticles; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '79,195,217' : '184,100,42',
      pulse: Math.random() * Math.PI * 2
    });
  }
  
  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(function(p){
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.02;
      
      // Wrap around
      if(p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if(p.x < -10) p.x = canvas.width + 10;
      if(p.x > canvas.width + 10) p.x = -10;
      
      var currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + currentOpacity + ')';
      ctx.fill();
      
      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + (currentOpacity * 0.15) + ')';
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  animate();
})();

// ===== 7. SUMÁRIO LATERAL (mini-TOC por seções ✦) =====
(function(){
  var texto = document.querySelector('.texto');
  if(!texto) return;
  
  // Find all section breaks (✦)
  var pausas = texto.querySelectorAll('.pausa');
  if(pausas.length < 3) return; // Not enough sections
  
  var toc = document.createElement('nav');
  toc.className = 'mini-toc';
  toc.innerHTML = '<div class="mini-toc-label">Seções</div>';
  
  pausas.forEach(function(p, i){
    var dot = document.createElement('a');
    dot.className = 'mini-toc-dot';
    dot.href = '#secao-' + i;
    dot.title = 'Seção ' + (i + 1);
    p.id = 'secao-' + i;
    toc.appendChild(dot);
  });
  
  document.body.appendChild(toc);
  
  // Add mini-toc styles
  var style = document.createElement('style');
  style.textContent = '.mini-toc{position:fixed;right:12px;top:50%;transform:translateY(-50%);z-index:40;display:flex;flex-direction:column;gap:8px;align-items:center;padding:8px 4px;background:rgba(11,7,6,.6);border-radius:12px;backdrop-filter:blur(8px);border:1px solid rgba(79,195,217,.15)}.mini-toc-label{font-family:var(--font-ui);font-size:.5rem;letter-spacing:.15em;text-transform:uppercase;color:var(--tinta-suave);opacity:.5;writing-mode:vertical-rl;margin-bottom:4px}.mini-toc-dot{width:6px;height:6px;border-radius:50%;background:var(--ferro-cl);transition:all .3s;display:block}.mini-toc-dot:hover,.mini-toc-dot.ativo{background:var(--alma);box-shadow:0 0 8px var(--glow-alma);transform:scale(1.5)}@media(max-width:720px){.mini-toc{display:none}}';
  document.head.appendChild(style);
  
  // Highlight current section on scroll
  var dots = toc.querySelectorAll('.mini-toc-dot');
  window.addEventListener('scroll', function(){
    var scrollPos = window.scrollY + window.innerHeight / 2;
    pausas.forEach(function(p, i){
      if(p.offsetTop <= scrollPos && (!pausas[i+1] || pausas[i+1].offsetTop > scrollPos)){
        dots.forEach(function(d){ d.classList.remove('ativo'); });
        if(dots[i]) dots[i].classList.add('ativo');
      }
    });
  }, {passive:true});
})();

// ===== 9. MENU HAMBURGER MOBILE =====
(function(){
  var nav = document.querySelector('.topbar nav');
  if(!nav) return;
  
  // Remove any existing hamburger to prevent duplicates
  var existing = document.querySelectorAll('.hamburger');
  existing.forEach(function(el){ el.remove(); });
  var existingOverlay = document.querySelectorAll('.nav-overlay');
  existingOverlay.forEach(function(el){ el.remove(); });
  
  // Create hamburger button (only visible on mobile via CSS)
  var btn = document.createElement('button');
  btn.className = 'hamburger';
  btn.setAttribute('aria-label', 'Menu de navegação');
  btn.innerHTML = '<span></span><span></span><span></span>';
  
  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  
  nav.parentNode.insertBefore(btn, nav);
  document.body.appendChild(overlay);
  
  function toggleMenu(){
    var isOpen = nav.classList.toggle('aberto');
    btn.classList.toggle('ativo', isOpen);
    overlay.classList.toggle('visivel', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  
  btn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  
  // Close on nav link click
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      if(nav.classList.contains('aberto')) toggleMenu();
    });
  });
})();

// ===== 10. BADGES DE PROGRESSO =====
(function(){
  var capsLinks = document.querySelectorAll('.capcard');
  if(!capsLinks.length) return;
  
  // Get last read chapter
  var lastCap = null;
  try {
    var data = localStorage.getItem('ultimo-cap');
    if(data) lastCap = JSON.parse(data).href;
  } catch(e){}
  
  // Get all read chapters (we track visits)
  var readCaps = [];
  try {
    var stored = localStorage.getItem('caps-lidos');
    if(stored) readCaps = JSON.parse(stored);
  } catch(e){}
  
  capsLinks.forEach(function(link){
    var href = link.getAttribute('href');
    var badge = document.createElement('span');
    badge.className = 'badge';
    
    if(href === lastCap){
      badge.textContent = 'Atual';
      badge.classList.add('visivel');
    } else if(readCaps.indexOf(href) >= 0){
      badge.textContent = '✓ Lido';
      badge.classList.add('visivel', 'lido');
    }
    
    link.appendChild(badge);
  });
  
  // Track chapter visits
  var page = window.location.pathname.split('/').pop() || '';
  if(/^cap\d+\.html$/.test(page)){
    if(readCaps.indexOf(page) < 0){
      readCaps.push(page);
      localStorage.setItem('caps-lidos', JSON.stringify(readCaps));
    }
  }
})();


/* ============================================================
   EASTER EGG — Konami Code
   ============================================================ */
(function(){
  var konami = [38,38,40,40,37,39,37,39,66,65]; // ↑↑↓↓←→←→BA
  var pos = 0;
  
  document.addEventListener('keydown', function(e){
    if(e.keyCode === konami[pos]){
      pos++;
      if(pos === konami.length){
        pos = 0;
        activateEasterEgg();
      }
    } else {
      pos = 0;
    }
  });
  
  function activateEasterEgg(){
    // Make all text glow
    var style = document.createElement('style');
    style.textContent = 'body{animation:easterGlow 3s ease-in-out infinite}@keyframes easterGlow{0%,100%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(30deg)}}.texto p{text-shadow:0 0 8px rgba(79,195,217,.3)}';
    document.head.appendChild(style);
    
    // Show secret message
    var msg = document.createElement('div');
    msg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999;background:rgba(11,7,6,.95);border:2px solid var(--alma);border-radius:16px;padding:30px 40px;text-align:center;color:var(--alma);font-family:var(--font-display);font-size:1.2rem;box-shadow:0 0 60px rgba(79,195,217,.4);backdrop-filter:blur(20px);animation:heroFadeIn .5s ease both';
    msg.innerHTML = '✦<br><br><em>"Conhecer a história de alguém<br>não significa conhecer a pessoa."</em><br><br><span style="font-size:.7rem;opacity:.5;font-family:var(--font-ui)">— O Peso da Gorja</span>';
    document.body.appendChild(msg);
    
    setTimeout(function(){
      msg.style.transition = 'opacity 1s';
      msg.style.opacity = '0';
      setTimeout(function(){ msg.remove(); style.remove(); }, 1000);
    }, 4000);
  }
})();

/* ============================================================
   MODO ESCURO/CLARO — toggle
   ============================================================ */
(function(){
  // Create toggle button
  var btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Alternar tema claro/escuro');
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  document.body.appendChild(btn);
  
  // Restore saved preference
  var saved = localStorage.getItem('tema');
  if(saved === 'claro') document.body.classList.add('tema-claro');
  
  btn.addEventListener('click', function(){
    document.body.classList.toggle('tema-claro');
    var isClaro = document.body.classList.contains('tema-claro');
    localStorage.setItem('tema', isClaro ? 'claro' : 'escuro');
    btn.innerHTML = isClaro 
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  });
})();

/* ============================================================
   TRANSIÇÃO DE PÁGINA — fade suave
   ============================================================ */
(function(){
  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .4s ease';
  requestAnimationFrame(function(){
    document.body.style.opacity = '1';
  });
  
  // Fade out on internal navigation
  document.addEventListener('click', function(e){
    var link = e.target.closest('a');
    if(!link) return;
    var href = link.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    
    e.preventDefault();
    document.body.style.opacity = '0';
    setTimeout(function(){
      window.location.href = href;
    }, 350);
  });
})();
