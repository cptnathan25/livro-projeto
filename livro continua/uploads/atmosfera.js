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
