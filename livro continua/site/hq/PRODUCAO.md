# Produção da HQ — manifesto técnico

Leitor: `index.html` (capa) → 9 páginas em 1280×1920, lettering em overlay (`data.js`).
Prévia local do lettering: `python3 preview.py [nº página]` (usa fontes DejaVu; o site usa Bangers/Oswald/Spectral do Google Fonts).
Montagem das páginas em painéis: `python3 build.py`.

## Estado

| Página | Arte | Lettering |
|---|---|---|
| 1 — O despertar | ✅ `img/p01.jpg` → `page01.jpg` | ✅ |
| 2 — A caçada (6 quadros) | ⛔ gerar `p02_1..6.jpg` (3 faixas de 2 quadros cada) | ✅ posições data.js |
| 3 — As três flechas (7 quadros) | ⛔ gerar `p03_1..7.jpg` (3 faixas) | ✅ |
| 4 — Sylvanas | ⛔ gerar `p04_full.jpg` (página completa) | ✅ |
| 5 — O jogo | ⛔ `p05_full.jpg` | ✅ |
| 6 — A tatuagem | ⛔ `p06_full.jpg` | ✅ |
| 7 — A história e a pessoa | ⛔ `p07_full.jpg` | ✅ |
| 8 — A caminhada/regras | ⛔ `p08_full.jpg` | ✅ |
| 9 — Fechamento ("Hm.") | ⛔ `p09_full.jpg` | ✅ |

## Âncoras de personagem (obrigatórias em TODO prompt)
- Nathan (Cap.1): `uploads/ficha_nathan.jpg` (rosto) + `site/img/hq1_1.jpg` (versão pijama). Cabelo preto bagunçado, barba curta, moletom cinza, pijama xadrez, **pé esquerdo de meia / direito descalço**. SEM chifres/prótese/asas.
- Sylvanas: `uploads/ficha_sylvanas.jpg` e `uploads/ficha_sylvanas_capuz.jpg` (capuz ocre erguido na chegada).
- Gorja: `site/img/world-of-warcraft-the-maw-shadowlands-zo-*.jpg`, `shadowlands-maw-mawsworn-architecture-*.webp`.
- Regra de moderação: NADA de sangue/violência direta. A criatura deve ser descrita como **"stone guardian / enchanted stone golem, faceless helmeted construct, mist from vents"**; ação como esquiva/leverage, sem golpes em pessoas. Máx. ~3 quadros de ação por geração (páginas densas de luta em uma só imagem são bloqueadas).
- SEMPRE: "no words, no letters, no speech bubbles, no captions, no sound-effect text, no logos, no watermarks".

## Receita comprovada
- Página completa (5-7 quadros não-violentos), retrato: 1 chamada com referências → passa.
- Página de ação: gerar FAIXAS HORIZONTAIS de 2-3 quadros (landscape 4:3), depois `build.py` recorta/cola na grade 1280×1920 com gutters pretos.
- Verificar cada página com `python3 preview.py N` e ler o resultado; ajustar coordenadas em `data.js`.

## Próximas chamadas (retomar aqui)

### Pág. 2 — faixas (p02a/p02b já descritas; dividir em 3 chamadas de 2 quadros se necessário)
Ver prompts completos no histórico; arquivos-alvo: p02_1..p02_6.jpg conforme células em `build.py` (`p2`):
- 1 wide top (1244×560): guardião surge da fenda; Nathan em guarda.
- 2 (744×600): esquiva baixa, braço passa por cima, lascas.
- 3 (486×600): jab no flanco de pedra, ele balança a mão.
- 4 (420×340): ele rola na poeira, varredura passa no vazio.
- 5 (810×340): corre com barra de ferro para a fenda.
- 6 wide (1244×?): dutch angle, encaixa a barra na dobradiça como alavanca.

### Pág. 3 — faixas
- p03_1 (744×660): laje racha/desaba, ele rola para fora.
- p03_2 vertical (486×1214): guardião ergue o braço sobre ele; barra inútil.
- p03_3/4/5 (≈236×600 cada): flecha 1 na dobradiça; flecha 2 mesmo ponto, braço solta; flecha 3 na fenda do elmo, névoa explode.
- p03_6 (615×?): corpo dissolve em névoa; ele aos cotovelos ofegante.
- p03_7: OTS por trás dele: Sylvanas encapuzada no alto da laje, arco erguido, dois pontos vermelhos.

### Págs. 4–9 — uma chamada full-page cada, portrait, ~5-7 quadros, ver ROTEIRO-HQ.md.
Deixar áreas escuras/negativas nas posições dos balões (coordenadas em `data.js`).

---

## AUTO-LAYOUT DOS BALÕES (2026-09-11)

O posicionamento de fala/narração agora é **automático** (`layout.js` + `data.js`):

- Cada página declara `paineis` — um retângulo `r:[x,y,w,h]` por quadro, mais
  `rostos:[[x,y,w,h],...]` e `zonas:[[...],...]` (mãos, armas, elementos-chave).
- Cada balão declara apenas `p` (painel), `ancora:[x,y]` (boca do falante) e `texto`.
- O motor garante: margem de **5%** das bordas do quadro, proteção de rostos de
  **5%** e de zonas de **3%**, máx. **25 palavras** por fala / **30** por narração
  (textos maiores são **divididos** em pontos naturais), área máx. **25%** do quadro,
  fonte mínima por tipo, sem sobreposição e sem cauda cruzando rosto alheio.
- Narras são posicionadas antes das falas; a renderização segue a ordem de leitura.
- SFX e letreiro continuam manuais (efeitos pintados na ação).

### Quando novas artes chegarem (páginas 5–10)
1. Ajustar os retângulos `paineis` da página ao grid real da arte.
2. Mapear `rostos` e `zonas` de cada quadro (usar as previews de validação).
3. Conferir com o validador (Node): rodar `layout.computarLayout` com
   `criarMedidorEstimado` e auditar margens/rostos/zonas/área/sobreposição.

## Cânone de aparência — Sylvanas (decisões do autor, v27/v28)

- **Capa**: marrom-rust ESCURO, mesma cor do capuz (nunca preta). Corrigido em
  v28 nos quadros P4q0, P5q0, P5q3, P6q0 e P6q1.
- **Sem capuz (cabelo solto) é INTENCIONAL** nos quadros P7q5, P8q0, P8q2,
  P10q0, P10q4 e nos closes P5q4/P10q1/P10q3: escolha narrativa nos momentos
  de vulnerabilidade/confronto íntimo. NÃO "corrigir" em regenerações futuras.
- **Marcas escuras sob os olhos**: finas/sutis, sempre presentes; em regens
  pedir "thin subtle streaks, width of the eyebrow line" e conferir em crops.
- Referência visual canônica do capítulo: **P9** (capuz rust, marcas finas,
  ombreiras com caveiras, arco).
- Método para regenerar quadros no futuro: recortar região generosa do quadro,
  regenerar com instrução de preservação pixel-faithful ("pure color edit,
  nothing else"), conferir antes|depois (reprovar pose/elementos novos),
  colar por paste restrito ao retângulo do quadro e validar diffs.

## Site publicado

GitHub Pages (via workflow `deploy-pages.yml`): https://cptnathan25.github.io/livro-projeto/
— capa do site; HQ em `/hq/ler.html` (atual: **v28**, `20260911-28`).
