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
  var alvos = [].slice.call(document.querySelectorAll(
    'figure.ilus img, .gcard img, .ficha img'));
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
