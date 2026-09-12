/* ============================================================
   Leitor da HQ — páginas 1280x1920.
   POSICIONAMENTO DOS BALÕES: automático (layout.js) — analisa
   quadro a quadro, respeita margens, zonas de proteção de rostos,
   limites de palavras (com divisão automática) e área máxima.
   Rabichos são desenhados sobre os balões REAIS medidos no DOM.
   ============================================================ */
const PW = 1280, PH = 1920;
const VER = "20260911-21";
const NS = "http://www.w3.org/2000/svg";
const COM_RABICHO = ["fala","grito","rouca","sussurro"];

const $ = s => document.querySelector(s);
const stage = $("#palco");
const cover = $("#capa");
let atual = 0, escala = 1, bootFeito = false;

function escalar(){
  escala = Math.min(window.innerWidth / PW, (window.innerHeight - 6) / PH);
  stage.style.width = PW + "px";
  stage.style.height = PH + "px";
  stage.style.transform = `scale(${escala})`;
}

/* ---------------- construção da página a partir do layout ---------------- */
function construirPagina(idx, itens){
  const p = PAGINAS[idx];
  const pag = document.createElement("div");
  pag.className = "pagina";
  pag.dataset.idx = idx;
  pag.innerHTML = `<div class="arte">
      <img src="${p.img}?v=${VER}" alt="" draggable="false">
      <svg class="rabichos" viewBox="0 0 ${PW} ${PH}" preserveAspectRatio="none"></svg>
      <div class="carregando"></div>
    </div>`;
  const art = pag.querySelector(".arte");
  const imgEl = pag.querySelector("img");
  imgEl.addEventListener("load", () => art.classList.add("pronta"));
  imgEl.addEventListener("error", () => art.classList.add("erro-img"));
  if (imgEl.complete) art.classList.add("pronta");

  if(p.rascunho){
    const faixa = document.createElement("div");
    faixa.className = "faixa-rascunho";
    faixa.textContent = "ARTE EM PRODUÇÃO";
    art.appendChild(faixa);
  }

  itens.forEach((e, i) => {
    if(e.t === "sfx"){
      const b = document.createElement("div");
      b.className = `balao sfx${e.fogo ? " fogo" : ""}`;
      b.style.setProperty("--i", i);
      if(e.rot) b.style.setProperty("--rot", e.rot+"deg");
      const inner = document.createElement("div");
      inner.className = "tx";
      inner.style.fontSize = (e.tamanho||40)+"px";
      inner.textContent = e.texto;
      b.appendChild(inner);
      b.style.width = e.w+"px";
      b.style.left = (e.x + e.w/2)+"px";   // sfx: (x,y) é o CENTRO via translate(-50%,-50%)
      b.style.top  = e.y+"px";
      art.appendChild(b);
      return;
    }
    if(e.t === "letreiro"){
      const b = document.createElement("div");
      b.className = "balao letreiro";
      b.style.setProperty("--i", i);
      const inner = document.createElement("div");
      inner.className = "tx";
      inner.style.fontSize = "42px";
      inner.textContent = e.texto;
      b.appendChild(inner);
      b.style.left = e.x+"px"; b.style.top = e.y+"px"; b.style.width = e.w+"px";
      art.appendChild(b);
      return;
    }
    const b = document.createElement("div");
    let cls = `balao ${e.t}`;
    if(e.de==="sylvanas") cls += " syl";
    if(e.de==="nathan") cls += " nat";
    if(e.rouca) cls += " rouca";
    b.className = cls;
    b.dataset.tipo = e.t;
    if(e.ancora){ b.dataset.tx = e.ancora[0]; b.dataset.ty = e.ancora[1]; }
    b.style.setProperty("--i", i);
    const inner = document.createElement("div");
    inner.className = "tx";
    inner.style.fontSize = e.fs+"px";
    inner.textContent = e.texto;
    b.appendChild(inner);
    b.style.left = e.x+"px";
    b.style.top = e.y+"px";
    b.style.width = e.w+"px";
    art.appendChild(b);
  });
  stage.appendChild(pag);
}

/* ---------------- rabichos (medidos nos balões reais) ---------------- */
function coresRabicho(b){
  if(b.classList.contains("nat"))      return {col:"#17141c", fill:"#ffdf4f"};
  if(b.classList.contains("syl"))      return {col:"#241a2e", fill:"#ffffff"};
  if(b.classList.contains("sussurro")) return {col:"#55505c", fill:"#ecebe7"};
  if(b.classList.contains("grito"))    return {col:"#17141c", fill:"#f6f1e6"};
  return {col:"#17141c", fill:"#fbf8f0"};
}
function rabichoPath(edge, tip){
  const dx = tip.x-edge.x, dy = tip.y-edge.y;
  const len = Math.hypot(dx,dy)||1;
  const ux = dx/len, uy = dy/len, px = -uy, py = ux;
  const half = Math.min(14, len*0.24);
  const p1 = {x:edge.x+px*half, y:edge.y+py*half};
  const p2 = {x:edge.x-px*half, y:edge.y-py*half};
  const cx = edge.x + ux*len*0.45, cy = edge.y + uy*len*0.45 - 4;
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}
          Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${tip.x} ${tip.y}
          L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}
          Q ${edge.x} ${edge.y} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`;
}
function desenharRabicho(b){
  const tx = parseFloat(b.dataset.tx), ty = parseFloat(b.dataset.ty);
  if(!isFinite(tx) || !isFinite(ty)) return;
  const pag = b.closest(".pagina");
  const svg = pag.querySelector("svg.rabichos");
  const r = {x:b.offsetLeft, y:b.offsetTop, w:b.offsetWidth, h:b.offsetHeight};
  if(tx>r.x && tx<r.x+r.w && ty>r.y && ty<r.y+r.h) return;
  const ancora = {x:tx, y:ty};
  let pe = LayoutHQ.pontoBorda(r, ancora);
  const c = {x:r.x+r.w/2, y:r.y+r.h/2};
  const dx = c.x-pe.x, dy = c.y-pe.y, l = Math.hypot(dx,dy)||1;
  pe = {x:pe.x - dx/l*5, y:pe.y - dy/l*5};  // embute a base sob o balão
  const {col, fill} = coresRabicho(b);
  const path = document.createElementNS(NS,"path");
  path.setAttribute("class","rabicho");
  path.setAttribute("d", rabichoPath(pe, ancora));
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", col);
  path.setAttribute("stroke-width","3");
  path.setAttribute("stroke-linejoin","round");
  svg.appendChild(path);
}
function medirPagina(pag){
  const svg = pag.querySelector("svg.rabichos");
  svg.querySelectorAll("path.rabicho").forEach(p=>p.remove());
  pag.querySelectorAll(".balao").forEach(b=>{
    if(COM_RABICHO.includes(b.dataset.tipo)) desenharRabicho(b);
  });
}
function medirTodos(){
  document.querySelectorAll(".pagina").forEach(medirPagina);
}

/* ---------------- navegação ---------------- */
function mostrar(i){
  const pags = document.querySelectorAll(".pagina");
  if(!pags.length) return;
  atual = Math.max(0, Math.min(PAGINAS.length-1, i));
  pags.forEach(p=>p.classList.toggle("ativa", +p.dataset.idx===atual));
  document.querySelectorAll(".dots i").forEach((d,k)=>d.classList.toggle("on",k===atual));
  $("#ind").innerHTML = `PÁGINA <b>${atual+1}</b> / ${PAGINAS.length} <span class="ver">· ${VER}</span>`;
  try { history.replaceState(null,"",`#p${atual+1}`); } catch(e) {}
  $("#prox").style.visibility = atual === PAGINAS.length-1 ? "hidden" : "visible";
  $("#ant").style.visibility  = atual === 0 ? "hidden" : "visible";
}


/* ---------------- editor de balões (mover / redimensionar) ---------------- */
const EDIT = { on:false, alvo:null, modo:null, sx:0, sy:0, x0:0, y0:0, w0:0, h0:0 };
const LS_KEY = "hq_baloes_v1";

function carregarOverrides(){
  try{
    const dados = JSON.parse(localStorage.getItem(LS_KEY)||"{}");
    document.querySelectorAll(".pagina").forEach(pag=>{
      const idx = pag.dataset.idx;
      (dados[idx]||[]).forEach(o=>{
        const b = [...pag.querySelectorAll(".balao")].find(x=>
          x.dataset.tipo!=="sfx" && x.querySelector(".tx") &&
          x.querySelector(".tx").textContent.trim()===o.tx);
        if(!b) return;
        b.style.left=o.x+"px"; b.style.top=o.y+"px";
        b.style.width=o.w+"px";
        if(o.h) b.style.height=o.h+"px"; else b.style.height="";
      });
    });
  }catch(e){ console.warn("HQ: overrides de balões ignorados", e); }
}
function salvarOverrides(){
  try{
    const dados = {};
    document.querySelectorAll(".pagina").forEach(pag=>{
      const idx = pag.dataset.idx; const lista=[];
      pag.querySelectorAll(".balao").forEach(b=>{
        if(b.dataset.tipo==="sfx"||!b.dataset.ed) return;
        lista.push({ tx:b.querySelector(".tx").textContent.trim(),
          x:Math.round(parseFloat(b.style.left)||0),
          y:Math.round(parseFloat(b.style.top)||0),
          w:Math.round(parseFloat(b.style.width)||0),
          h:b.style.height?Math.round(parseFloat(b.style.height)):null });
      });
      if(lista.length) dados[idx]=lista;
    });
    localStorage.setItem(LS_KEY, JSON.stringify(dados));
  }catch(e){ console.warn("HQ: falha ao salvar overrides", e); }
}
function prepararEdicao(b){
  if(b.dataset.ed) return;
  b.dataset.ed="1";
  const rx=document.createElement("div");  rx.className="rng rng-x";  rx.title="Largura";
  const rxy=document.createElement("div"); rxy.className="rng rng-xy"; rxy.title="Altura e largura";
  b.appendChild(rx); b.appendChild(rxy);
}
function iniciarArrasto(b, modo, ev){
  EDIT.alvo=b; EDIT.modo=modo;
  EDIT.sx=ev.clientX; EDIT.sy=ev.clientY;
  EDIT.x0=parseFloat(b.style.left)||b.offsetLeft;
  EDIT.y0=parseFloat(b.style.top)||b.offsetTop;
  EDIT.w0=parseFloat(b.style.width)||b.offsetWidth;
  EDIT.h0=b.offsetHeight;
  b.setPointerCapture && b.setPointerCapture(ev.pointerId);
  ev.preventDefault(); ev.stopPropagation();
}
function ativarEditor(){
  document.querySelectorAll(".pagina .balao").forEach(b=>{
    if(b.dataset.tipo==="sfx") return;
    prepararEdicao(b);
    if(b.dataset.evt) return;
    b.dataset.evt="1";
    b.addEventListener("pointerdown", ev=>{
      if(!EDIT.on) return;
      const modo = ev.target.classList.contains("rng-xy") ? "xy"
                 : ev.target.classList.contains("rng-x") ? "x" : "mover";
      iniciarArrasto(b, modo, ev);
    });
    b.addEventListener("pointermove", ev=>{
      if(!EDIT.on || EDIT.alvo!==b) return;
      const dx=(ev.clientX-EDIT.sx)/escala, dy=(ev.clientY-EDIT.sy)/escala;
      if(EDIT.modo==="mover"){
        b.style.left = Math.max(2, Math.min(PW-EDIT.w0-2, EDIT.x0+dx))+"px";
        b.style.top  = Math.max(2, Math.min(PH-EDIT.h0-2, EDIT.y0+dy))+"px";
      }else{
        const w = Math.max(110, Math.min(PW-10, EDIT.w0+dx));
        b.style.width = w+"px";
        if(EDIT.modo==="xy"){
          const h = Math.max(40, EDIT.h0+dy);
          b.style.height = h+"px";
        }
      }
      clearTimeout(b._t); b._t=setTimeout(()=>{ medirPagina(b.closest(".pagina")); }, 120);
    });
    b.addEventListener("pointerup", ev=>{
      if(EDIT.alvo===b){ EDIT.alvo=null; medirPagina(b.closest(".pagina")); salvarOverrides(); }
    });
    b.addEventListener("pointercancel", ()=>{ if(EDIT.alvo===b){ EDIT.alvo=null; medirPagina(b.closest(".pagina")); } });
  });
}
function construirBarraEdit(){
  if(document.getElementById("barra-edit")) return;
  const bar=document.createElement("div"); bar.id="barra-edit";
  bar.innerHTML = `<button id="ed-toggle" type="button">✎ Editar balões</button>
    <button id="ed-export" type="button" style="display:none">⤓ Exportar JSON</button>
    <button id="ed-reset" type="button" style="display:none">↺ Restaurar página</button>`;
  document.body.appendChild(bar);
  $("#ed-toggle").addEventListener("click", ()=>{
    EDIT.on=!EDIT.on;
    document.body.classList.toggle("editando", EDIT.on);
    $("#ed-toggle").textContent = EDIT.on ? "✓ Concluir" : "✎ Editar balões";
    $("#ed-export").style.display = EDIT.on?"":"none";
    $("#ed-reset").style.display  = EDIT.on?"":"none";
    if(EDIT.on) ativarEditor();
    else medirTodos();
  });
  $("#ed-export").addEventListener("click", ()=>{
    const dados = localStorage.getItem(LS_KEY)||"{}";
    console.log("=== BALÕES EDITADOS (cole de volta com localStorage.setItem('hq_baloes_v1', ...)) ===");
    console.log(dados);
    try{ navigator.clipboard.writeText(dados); $("#ed-export").textContent="✓ Copiado!"; 
      setTimeout(()=>$("#ed-export").textContent="⤓ Exportar JSON",1500); }catch(e){}
  });
  $("#ed-reset").addEventListener("click", ()=>{
    try{
      const dados = JSON.parse(localStorage.getItem(LS_KEY)||"{}");
      delete dados[String(atual)];
      localStorage.setItem(LS_KEY, JSON.stringify(dados));
    }catch(e){}
    location.reload();
  });
}

/* ---------------- bootstrap: fontes → layout → páginas ---------------- */
function boot(){
  if(bootFeito) return;
  const itensPorPagina = LayoutHQ.computarLayout(PAGINAS, LayoutHQ.criarMedidorCanvas());
  for(let i=0;i<PAGINAS.length;i++) construirPagina(i, itensPorPagina[i]);
  bootFeito = true;                     // só marca sucesso após construir
  construirBarraEdit(); carregarOverrides();
  escalar();
  requestAnimationFrame(medirTodos);
  if(document.fonts && document.fonts.ready)
    document.fonts.ready.then(()=>requestAnimationFrame(medirTodos));

  $("#ant").addEventListener("click", ()=>mostrar(atual-1));
  $("#prox").addEventListener("click", ()=>mostrar(atual+1));
  document.addEventListener("keydown", e=>{
    if(cover.classList.contains("oculta")){
      if(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" ") {e.preventDefault();mostrar(atual+1);}
      if(e.key==="ArrowLeft"||e.key==="PageUp") mostrar(atual-1);
      if(e.key==="Escape") mostrar(0);
    }
  });
  let tx0=null;
  stage.addEventListener("touchstart",e=>{tx0=e.touches[0].clientX},{passive:true});
  stage.addEventListener("touchend",e=>{
    if(tx0==null)return;
    const dx=e.changedTouches[0].clientX-tx0;
    if(Math.abs(dx)>50) mostrar(atual+(dx<0?1:-1));
    tx0=null;
  },{passive:true});
  $("#zonaE").addEventListener("click",()=>mostrar(atual-1));
  $("#zonaD").addEventListener("click",()=>mostrar(atual+1));

  const dots=$("#dots");
  for(let i=0;i<PAGINAS.length;i++){
    const d=document.createElement("i");
    d.addEventListener("click",()=>mostrar(i));
    dots.appendChild(d);
  }
  const m=location.hash.match(/#p(\d+)/);
  if(!cover.classList.contains("oculta") && m) mostrar(+m[1]-1);
}
window.addEventListener("resize", escalar);

/* botão LER O CAPÍTULO (existe no HTML estático — vincula no carregamento) */
$("#iniciar").addEventListener("click", ()=>{
  if(!bootFeito){ try{ boot(); }catch(e){ console.error("HQ: boot no clique falhou", e); } }
  cover.classList.add("oculta");
  const m=location.hash.match(/#p(\d+)/);
  mostrar(m?+m[1]-1:0);
});

/* construção imediata — fontes depois apenas refinam rabichos */
try { boot(); }
catch(e){ console.error("HQ: falha no boot, tentando novamente", e); bootFeito=false; setTimeout(()=>{ try{boot();}catch(e2){console.error(e2);} }, 800); }
if(document.fonts && document.fonts.ready) document.fonts.ready.then(()=>{ try{ medirTodos(); }catch(e){} });
