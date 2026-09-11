/* ============================================================
   layout.js — NÚCLEO DE AUTO-LAYOUT DOS BALÕES (puro, sem DOM)
   ------------------------------------------------------------
   Regras implementadas (prioridade CENA > PERSONAGENS >
   LEGIBILIDADE > POSICIONAMENTO > TAMANHO):
   • Margem fixa de 5% das bordas de cada QUADRO — nenhum balão
     toca ou ultrapassa a borda do quadro.
   • Zona de proteção de rostos: 5% da largura do quadro.
   • Zona de proteção de mãos/armas/objetos: 3% da largura.
   • Máx. 25 palavras por balão de fala / 30 por narração —
     textos maiores são DIVIDIDOS automaticamente em pontos
     naturais (frase/vírgula), sem alterar o conteúdo.
   • Área máx. do balão: 25% do quadro; se não couber, a fonte
     é reduzida em degraus até o piso de legibilidade.
   • Cauda nunca atravessa rostos (exceto o do próprio falante).
   • Ordem de leitura preservada (ordem do array de elementos).
   Usado pelo leitor no navegador (medidor <canvas>) e por
   validação/preview em Node (medidor estimado).
   ============================================================ */
(function(raiz){
"use strict";

const LIMITES = { fala:25, rouca:25, sussurro:25, grito:25, narra:30 };
const FS_BASE = { fala:24, rouca:26, sussurro:21, grito:38, narra:19 };
const FS_MIN  = { fala:16, rouca:16, sussurro:15, grito:24, narra:15 };
const PADX    = { fala:38, rouca:38, sussurro:36, grito:46, narra:34 };
const PADV    = { fala:34, rouca:34, sussurro:32, grito:44, narra:32 };
const LH      = { fala:1.22, rouca:1.22, sussurro:1.22, grito:1.10, narra:1.42 };

const MARG = 0.05;        // margem das bordas do quadro (5%)
const PROT_ROSTO = 0.05;  // distância segura de rostos (5% da largura)
const PROT_ZONA = 0.03;   // distância de mãos/armas/objetos (3%)
const AREA_MAX = 0.25;    // balão ≤ 25% da área do quadro
const GAP = 14;           // respiro mínimo entre balões

/* ---------- divisão de texto em pontos naturais ---------- */
function dividirTexto(texto, max){
  const pal = String(texto).trim().split(/\s+/);
  if(pal.length <= max) return [texto];
  const pontua = w => /[.!?…]["»]?$/.test(w) ? 3 : (/[,;:—–]$/.test(w) ? 2 : 0);
  const partes = [];
  let resto = pal;
  while(resto.length > max){
    const min = Math.ceil(max*0.5);
    let idx = -1, melhor = 0;
    for(let i=min; i<=max; i++){
      const s = pontua(resto[i-1]);
      if(s > melhor){ melhor = s; idx = i; }   // empate → fica o mais tarde
    }
    if(idx < 0) idx = max;
    partes.push(resto.slice(0, idx).join(" "));
    resto = resto.slice(idx);
  }
  if(resto.length) partes.push(resto.join(" "));
  return partes;
}

/* ---------- geometria ---------- */
function inter(a,b){ return a.x < b.x+b.w && b.x < a.x+a.w && a.y < b.y+b.h && b.y < a.y+a.h; }
function inflar(r,m){ return {x:r.x-m, y:r.y-m, w:r.w+2*m, h:r.h+2*m}; }
function centro(r){ return {x:r.x+r.w/2, y:r.y+r.h/2}; }
function distPontoRet(p,r){
  const dx = Math.max(r.x-p.x, 0, p.x-(r.x+r.w));
  const dy = Math.max(r.y-p.y, 0, p.y-(r.y+r.h));
  return Math.hypot(dx,dy);
}
function pontoBorda(r,alvo){
  const cx=r.x+r.w/2, cy=r.y+r.h/2, dx=alvo.x-cx, dy=alvo.y-cy;
  if(!dx && !dy) return {x:cx, y:r.y+r.h};
  const tx = dx ? (r.w/2)/Math.abs(dx) : 1e9;
  const ty = dy ? (r.h/2)/Math.abs(dy) : 1e9;
  const t = Math.min(tx,ty);
  return {x:cx+dx*t, y:cy+dy*t};
}
function segRet(a,b,r){ // segmento ab intersecta o retângulo r? (Liang-Barsky)
  let t0=0, t1=1;
  const dx=b.x-a.x, dy=b.y-a.y;
  const p=[-dx,dx,-dy,dy], q=[a.x-r.x, r.x+r.w-a.x, a.y-r.y, r.y+r.h-a.y];
  for(let i=0;i<4;i++){
    if(p[i]===0){ if(q[i]<0) return false; }
    else{
      const t=q[i]/p[i];
      if(p[i]<0){ if(t>t1) return false; if(t>t0) t0=t; }
      else      { if(t<t0) return false; if(t<t1) t1=t; }
    }
  }
  return true;
}

/* ---------- motor principal ---------- */
function computarLayout(PAGINAS, medir){
  const resultado = [];
  PAGINAS.forEach(pag => {
    const itens = [];
    const porPainel = (pag.paineis||[]).map(()=>[]);
    const pendentes = [];
    /* narras primeiro dentro do painel (exigem mais espaço); falas depois;
       SFX/letreiro são manuais. A SAÍDA é reordenada pela ordem de leitura. */
    const fila = [];
    (pag.elementos||[]).forEach((e, ordem) => { if(e.t==="narra") fila.push([e, ordem]); });
    (pag.elementos||[]).forEach((e, ordem) => { if(e.t!=="narra" && e.t!=="sfx" && e.t!=="letreiro") fila.push([e, ordem]); });
    (pag.elementos||[]).forEach((e, ordem) => { if(e.t==="sfx" || e.t==="letreiro") fila.push([e, ordem]); });
    fila.forEach(([e, ordem]) => {
      if(e.t==="sfx" || e.t==="letreiro"){ pendentes.push({ordem, item:Object.assign({ordem}, e)}); return; }
      const P = pag.paineis[e.p||0];
      if(!P) return;
      const R  = {x:P.r[0], y:P.r[1], w:P.r[2], h:P.r[3]};
      const ux = R.x + R.w*MARG, uy = R.y + R.h*MARG;
      const uw = R.w*(1-2*MARG), uh = R.h*(1-2*MARG);
      const rostos   = (P.rostos||[]).map(z=>({x:z[0],y:z[1],w:z[2],h:z[3]}));
      const zonas    = (P.zonas||[]).map(z=>({x:z[0],y:z[1],w:z[2],h:z[3]}));
      const amax = Math.max(AREA_MAX*R.w*R.h, 27000); // piso absoluto: painéis pequenos precisam de orçamento mínimo p/ balão legível
      const rostosInf = rostos.map(q=>inflar(q, R.w*PROT_ROSTO));
      const zonasInf  = zonas.map(q=>inflar(q, R.w*PROT_ZONA));
      const ancora = e.ancora ? {x:e.ancora[0], y:e.ancora[1]} : null;
      const partes = dividirTexto(e.texto, LIMITES[e.t]||25);
      let anterior = null;

      partes.forEach((parte, ki) => {
        const fsBase = Math.min(e.tamanho || FS_BASE[e.t] || 24, FS_BASE[e.t] || 24);
        let colocado = null;
        const tentativas = [[1,false,GAP],[0.92,false,10],[0.84,true,10],[0.76,true,8],[0.66,false,8]];

        for(const [mul, ignZ, gap] of tentativas){
          const fs = Math.max(FS_MIN[e.t]||16, fsBase*mul);
          // largura ideal: texto em ~1 linha, sem exagero; alternativas menores
          const m1 = medir(parte, fs, e.t, 5000);
          const wIdeal = Math.max(150, Math.min(Math.ceil(m1.w1)+PADX[e.t], Math.round(uw*0.62)));
          const larguras = [...new Set([wIdeal, Math.round(wIdeal*0.82), Math.round(wIdeal*0.66),
            Math.round(uw*0.62), Math.round(uw*0.40), Math.round(uw*0.30),
            Math.round(uw*0.24), Math.round(uw*0.19), Math.round(uw*0.15), 110])].filter(x=>x>=110);
          const filaW = e.xpref==='dir' ? larguras.slice().reverse() : larguras;
          for(const w of filaW){
            const m = medir(parte, fs, e.t, Math.max(60, w-PADX[e.t]));
            const h = m.h;
            if(w*h > amax) continue;                      // ≤ 25% do quadro (com piso absoluto)
            if(h > uh*0.80) continue;                     // não dominar o quadro
            let melhor = null;

            const xsDir = e.xpref==='dir';
            const xs=[];
            if(xsDir){ for(let x=R.x+R.w-R.w*MARG-w; x>=ux; x-=9) xs.push(x); }
            else{ for(let x=ux; x+w <= R.x+R.w-R.w*MARG+0.5; x+=9) xs.push(x); }
            for(let y=uy; y+h <= R.y+R.h-R.h*MARG+0.5; y+=9){
              for(const x of xs){
                const r = {x:Math.round(x), y:Math.round(y), w, h};
                let ruim = false;
                for(const q of porPainel[e.p||0]) if(inter(inflar(r,gap), q)){ ruim=true; break; }
                if(!ruim) for(const q of rostosInf)  if(inter(r,q)){ ruim=true; break; }
                if(!ruim && !ignZ) for(const q of zonasInf) if(inter(r,q)){ ruim=true; break; }
                if(!ruim && ancora && distPontoRet(ancora, r) < 6) ruim = true;
                if(!ruim && ancora){
                  const pe = pontoBorda(r, ancora);
                  for(const q of rostos){
                    const cont = ancora.x>=q.x && ancora.x<=q.x+q.w && ancora.y>=q.y && ancora.y<=q.y+q.h;
                    if(!cont && segRet(pe, ancora, q)){ ruim=true; break; }
                  }
                }
                if(ruim) continue;
                let custo;
                if(ancora) custo = distPontoRet(ancora, r);          // perto de quem fala
                else       custo = (r.x-ux)*0.10 + (r.y-uy)*0.16;    // narração: canto sup. esq.
                custo += (xsDir ? (R.x+R.w-R.w*MARG-(r.x+r.w))*0.04 : (r.x-ux)*0.04) + (r.y-uy)*0.06; // ordem de leitura
                if(anterior)                                         // partes divididas: empilhar
                  custo = custo*0.45 + Math.abs(centro(r).x-centro(anterior).x)*0.5
                        + Math.abs(r.y-(anterior.y+anterior.h))*0.8;
                if(!melhor || custo < melhor.custo) melhor = {custo, r};
              }
            }
            if(melhor){
              colocado = {x:melhor.r.x, y:melhor.r.y, w:melhor.r.w, h:melhor.r.h, fs:Math.round(fs)};
              break;
            }
          }
          if(colocado) break;
        }
        if(!colocado){ // último recurso (deve ser raro): canto do quadro, fonte mínima
          const fs = FS_MIN[e.t]||16;
          const m = medir(parte, fs, e.t, Math.max(60, Math.round(uw*0.5)-PADX[e.t]));
          colocado = {x:Math.round(ux), y:Math.round(uy), w:Math.round(uw*0.5), h:m.h, fs, fora:true};
        }
        porPainel[e.p||0].push(colocado);
        anterior = colocado;
        pendentes.push({ordem, ki, item:{t:e.t, p:e.p||0, de:e.de, rouca:e.rouca, texto:parte,
          x:colocado.x, y:colocado.y, w:colocado.w, h:colocado.h, fs:colocado.fs,
          ancora:e.ancora||null, parte:ki, fora:!!colocado.fora}});
      });
    });
    pendentes.sort((a,b)=> a.ordem-b.ordem || (a.ki||0)-(b.ki||0));
    pendentes.forEach(p=>itens.push(p.item));
    resultado.push(itens);
  });
  return resultado;
}

/* ---------- medidores de texto ---------- */
function criarMedidorEstimado(){ // Node / validação (fatores médios por fonte)
  const F = {fala:.545, rouca:.545, sussurro:.545, grito:.46, narra:.50};
  return (texto, fs, tipo, wTx) => {
    const t = String(texto);
    const cpL = Math.max(6, Math.floor(wTx/(fs*F[tipo])));
    const linhas = Math.max(1, Math.ceil(t.length/cpL));
    return {linhas, w1: t.length*fs*F[tipo], h: Math.round(fs*LH[tipo]*linhas + PADV[tipo])};
  };
}
function criarMedidorCanvas(){ // navegador — medição real das fontes
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");
  const FAM = {fala:'"Oswald","Saira Condensed",sans-serif', rouca:'"Oswald","Saira Condensed",sans-serif',
               sussurro:'"Oswald","Saira Condensed",sans-serif', grito:'"Bangers",cursive',
               narra:'"Spectral",Georgia,serif'};
  const EST = {fala:"500", rouca:"500", sussurro:"500", grito:"400", narra:"italic 500"};
  return (texto, fs, tipo, wTx) => {
    ctx.font = (EST[tipo]||"500") + " " + fs + "px " + (FAM[tipo]||FAM.fala);
    const pal = String(texto).split(/\s+/);
    let linhas = 1, atual = "";
    for(const p of pal){
      const t = atual ? atual+" "+p : p;
      if(ctx.measureText(t).width > wTx && atual){ linhas++; atual = p; }
      else atual = t;
    }
    return {linhas, w1: ctx.measureText(String(texto)).width, h: Math.round(fs*LH[tipo]*linhas + PADV[tipo])};
  };
}

const API = {computarLayout, dividirTexto, criarMedidorEstimado, criarMedidorCanvas,
             pontoBorda, inter, inflar, segRet, distPontoRet,
             LIMITES, FS_BASE, FS_MIN, MARG, PROT_ROSTO, PROT_ZONA, AREA_MAX};
if(typeof module!=="undefined" && module.exports) module.exports = API;
raiz.LayoutHQ = API;
})(typeof window!=="undefined" ? window : globalThis);
