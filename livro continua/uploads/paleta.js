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
