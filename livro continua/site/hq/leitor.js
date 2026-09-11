/* ============================================================
   Leitor da HQ — páginas 1280x1920, balões em overlay nítido.
   Os rabichos são desenhados APÓS medir os balões reais
   (offsetWidth/offsetHeight), então ancoram exatamente na borda.
   ============================================================ */
const PW = 1280, PH = 1920;
const VER = "20260911-5";
const TIPOS = {
  fala:27, rouca:29, grito:42, sussurro:25, narra:24, sfx:48, letreiro:46
};
const NS = "http://www.w3.org/2000/svg";
const COM_RABICHO = ["fala","grito","rouca","sussurro"];

const $ = s => document.querySelector(s);
const stage = $("#palco");
const cover = $("#capa");
let atual = 0, escala = 1;

function escalar(){
  escala = Math.min(window.innerWidth / PW, (window.innerHeight - 6) / PH);
  stage.style.width = PW + "px";
  stage.style.height = PH + "px";
  stage.style.transform = `scale(${escala})`;
}

/* estimativa de altura (usada só no 1º traço; depois medimos de verdade) */
function estimarH(e){
  const fs = e.tamanho || TIPOS[e.t] || 27;
  const pad = (e.t==="narra") ? 36 : (e.t==="grito" ? 38 : 46);
  const maxw = (e.w||400) - pad;
  const fch = (e.t==="grito"||e.t==="letreiro") ? 0.5 : 0.55;
  const cpL = Math.max(8, Math.floor(maxw / (fs*fch)));
  const linhas = Math.max(1, String(e.texto).split("\n").reduce(
    (a,l)=>a+Math.max(1, Math.ceil(l.length/cpL)), 0));
  const lh = (e.t==="narra") ? 1.42 : (e.t==="grito" ? 1.1 : 1.22);
  const pv = (e.t==="narra") ? 32 : (e.t==="grito" ? 36 : 34);
  return fs*lh*linhas + pv;
}

/* interseção da linha centro→ponta com a elipse do balão */
function bordaDoBolha(cx, cy, w, h, tip){
  const dx = tip.x-cx, dy = tip.y-cy;
  if(dx===0&&dy===0) return {x:cx,y:cy+h/2};
  const t = 1/Math.max(Math.abs(dx/(w/2)), Math.abs(dy/(h/2)));
  return {x:cx+dx*t, y:cy+dy*t};
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

function construirPagina(idx){
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

  (p.elementos||[]).forEach((e,i)=>{
    const tipo = e.t;
    const w = e.w || 400;
    const fs = e.tamanho || TIPOS[tipo] || 27;
    const h = estimarH(e);

    const b = document.createElement("div");
    let cls = `balao ${tipo}`;
    if(e.de==="sylvanas") cls += " syl";
    if(e.rouca) cls += " rouca";
    b.className = cls;
    b.dataset.tipo = tipo;
    if(e.tx!=null) b.dataset.tx = e.tx;
    if(e.ty!=null) b.dataset.ty = e.ty;
    b.style.setProperty("--bw", w+"px");
    b.style.setProperty("--i", i);
    const inner = document.createElement("div");
    inner.className = "tx";
    inner.style.fontSize = fs+"px";
    inner.textContent = e.texto;
    b.appendChild(inner);
    b.style.width = w + "px";
    if(tipo === "sfx"){
      b.style.left = (e.x + w/2) + "px";  // sfx: (x,y) vira o CENTRO via translate(-50%,-50%)
      b.style.top  = e.y + "px";
    } else {
      b.style.left = e.x + "px";          // caixas ancoradas pelo canto superior esquerdo
      b.style.top  = e.y + "px";
    }
    if(e.rot) b.style.setProperty("--rot", e.rot+"deg");
    art.appendChild(b);

    /* rabicho inicial (estimado) — será refinado ao medir o balão real */
    desenharRabicho(b, w, h);
  });
  stage.appendChild(pag);
}

/* cores dos rabichos — sincronizadas com hq.css */
function coresRabicho(b){
  if(b.classList.contains("syl"))
    return {col:"#241a2e", fill:"#f1ecf7"};
  if(b.classList.contains("sussurro"))
    return {col:"#55505c", fill:"#ecebe7"};
  if(b.classList.contains("grito"))
    return {col:"#17141c", fill:"#f6f1e6"};
  return {col:"#17141c", fill:"#fbf8f0"};
}

function desenharRabicho(b, bw, bh){
  if(!COM_RABICHO.includes(b.dataset.tipo)) return;
  const tx = parseFloat(b.dataset.tx), ty = parseFloat(b.dataset.ty);
  if(!isFinite(tx) || !isFinite(ty)) return;
  const pag = b.closest(".pagina");
  const svg = pag.querySelector("svg.rabichos");

  const bx = b.offsetLeft, by = b.offsetTop;
  if(tx>bx && tx<bx+bw && ty>by && ty<by+bh) return; // ponta cairia dentro do próprio balão

  const cx = bx + bw/2, cy = by + bh/2;
  let edge = bordaDoBolha(cx, cy, bw, bh, {x:tx, y:ty});
  const dx = cx-edge.x, dy = cy-edge.y, l = Math.hypot(dx,dy)||1;
  edge = {x:edge.x - dx/l*5, y:edge.y - dy/l*5};      // embute 5px sob o balão

  const {col, fill} = coresRabicho(b);
  const path = document.createElementNS(NS,"path");
  path.setAttribute("class","rabicho");
  path.setAttribute("d", rabichoPath(edge, {x:tx,y:ty}));
  path.setAttribute("fill", fill);
  path.setAttribute("stroke", col);
  path.setAttribute("stroke-width","3");
  path.setAttribute("stroke-linejoin","round");
  svg.appendChild(path);
}

/* re-medir todos os balões de uma página e redesenhar os rabichos */
function medirPagina(pag){
  const svg = pag.querySelector("svg.rabichos");
  svg.querySelectorAll("path.rabicho").forEach(p=>p.remove());
  pag.querySelectorAll(".balao").forEach(b=>{
    desenharRabicho(b, b.offsetWidth, b.offsetHeight);
  });
}
function medirTodos(){
  document.querySelectorAll(".pagina").forEach(medirPagina);
}

function mostrar(i){
  atual = Math.max(0, Math.min(PAGINAS.length-1, i));
  document.querySelectorAll(".pagina").forEach(p=>
    p.classList.toggle("ativa", +p.dataset.idx===atual));
  document.querySelectorAll(".dots i").forEach((d,k)=>
    d.classList.toggle("on",k===atual));
  $("#ind").innerHTML = `PÁGINA <b>${atual+1}</b> / ${PAGINAS.length} <span class="ver">· ${VER}</span>`;
  try { history.replaceState(null,"",`#p${atual+1}`); } catch(e) {}
  const prox = $("#prox"), ant = $("#ant");
  prox.style.visibility = atual === PAGINAS.length-1 ? "hidden" : "visible";
  ant.style.visibility  = atual === 0 ? "hidden" : "visible";
}

/* ---------------- bootstrap ---------------- */
for(let i=0;i<PAGINAS.length;i++) construirPagina(i);
escalar();

/* rabichos precisos: após o layout e após as fontes carregarem */
requestAnimationFrame(medirTodos);
if(document.fonts && document.fonts.ready)
  document.fonts.ready.then(()=>requestAnimationFrame(medirTodos));

window.addEventListener("resize", escalar);

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
$("#iniciar").addEventListener("click",()=>{
  cover.classList.add("oculta");
  const m=location.hash.match(/#p(\d+)/);
  mostrar(m?+m[1]-1:0);
});
