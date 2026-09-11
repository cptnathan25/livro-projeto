/* ============================================================
   Leitor da HQ — páginas 1280x1920, balões em overlay nítido.
   ============================================================ */
const PW = 1280, PH = 1920;
const VER = "20260911-4";
const TIPOS = {
  fala:    {fs:27},
  rouca:   {fs:29},
  grite:   {fs:42},
  sussurro:{fs:25},
  narra:   {fs:24},
  sfx:     {fs:48},
  letreiro:{fs:46}
};

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

function autoH(e){
  const fs = e.tamanho || TIPOS[e.t]?.fs || 27;
  const maxw = (e.w||400) - 44;
  const cpL = Math.max(10, Math.floor(maxw / (fs*0.55)));
  const linhas = Math.max(1, String(e.texto).split("\n").reduce(
    (a,l)=>a+Math.max(1, Math.ceil(l.length/cpL)), 0));
  const lh = (e.t==="narra") ? 1.42 : 1.26;
  return fs*lh*linhas + 28;
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
  const svg = pag.querySelector("svg");
  const NS = "http://www.w3.org/2000/svg";

  if(p.rascunho){
    const faixa = document.createElement("div");
    faixa.className = "faixa-rascunho";
    faixa.textContent = "ARTE EM PRODUÇÃO";
    art.appendChild(faixa);
  }

  (p.elementos||[]).forEach((e)=>{
    const tipo = e.t;
    const w = e.w || 400;
    const fs = e.tamanho || TIPOS[tipo]?.fs || 27;
    const h = autoH(e);

    const b = document.createElement("div");
    let cls = `balao ${tipo}`;
    if(e.de==="sylvanas") cls += " syl";
    if(e.rouca) cls += " rouca";
    b.className = cls;
    b.style.setProperty("--bw", w+"px");
    const inner = document.createElement("div");
    inner.className = "tx";
    inner.style.fontSize = fs+"px";
    inner.textContent = e.texto;
    b.appendChild(inner);
    b.style.width = w + "px";
    if(tipo === "sfx"){
      b.style.left = (e.x + w/2) + "px";
      b.style.top  = e.y + "px";
    } else {
      b.style.left = e.x + "px";   // caixas ancoradas pelo canto superior esquerdo
      b.style.top  = e.y + "px";
    }
    if(e.rot) b.style.setProperty("--rot", e.rot+"deg");
    art.appendChild(b);

    /* rabicho (ponta do balão de fala/grito) */
    if(["fala","grito","rouca","sussurro"].includes(tipo) && e.tx!=null){
      const cx = e.x + w/2, cy = e.y + h/2;
      const edge = bordaDoBolha(cx, cy, w, h, {x:e.tx,y:e.ty});
      const col  = e.de==="sylvanas" ? "#2a1d33" : "#15131a";
      const fill = e.de==="sylvanas" ? "#f3eff6" : "#fbfaf6";
      const path = document.createElementNS(NS,"path");
      path.setAttribute("d", rabichoPath(edge, {x:e.tx,y:e.ty}));
      path.setAttribute("fill", fill);
      path.setAttribute("stroke", col);
      path.setAttribute("stroke-width","3");
      path.setAttribute("stroke-linejoin","round");
      svg.appendChild(path);
    }
  });
  stage.appendChild(pag);
}

function rabichoPath(edge, tip){
  const dx = tip.x-edge.x, dy = tip.y-edge.y;
  const len = Math.hypot(dx,dy)||1;
  const ux = dx/len, uy = dy/len, px = -uy, py = ux;
  const half = Math.min(13, len*0.22);
  const p1 = {x:edge.x+px*half, y:edge.y+py*half};
  const p2 = {x:edge.x-px*half, y:edge.y-py*half};
  const cx = edge.x + ux*len*0.45, cy = edge.y + uy*len*0.45 - 4;
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}
          Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${tip.x} ${tip.y}
          L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}
          Q ${edge.x} ${edge.y} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`;
}

function bordaDoBolha(cx, cy, w, h, tip){
  const dx = tip.x-cx, dy = tip.y-cy;
  if(dx===0&&dy===0) return {x:cx,y:cy+h/2};
  const t = 1/Math.max(Math.abs(dx/(w/2)), Math.abs(dy/(h/2)));
  return {x:cx+dx*t, y:cy+dy*t};
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
