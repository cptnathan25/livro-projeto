# Prompts prontos para geração (retomar a partir daqui)

Regras comprovadas:
- Referências como `images`: NATHAN rosto = `uploads/ficha_nathan.jpg` + pijama = `site/img/hq1_1.jpg`; SYLVANAS = `uploads/ficha_sylvanas_capuz.jpg` (chegada) e `uploads/ficha_sylvanas.jpg` (capuz caído); GORJA = `site/img/world-of-warcraft-the-maw-shadowlands-zo-1.jpg`.
- Caminhos completos: `/home/user/livro-projeto/livro continua/site/...` e `/home/user/livro-projeto/livro continua/uploads/...`.
- SEMPRE terminar com: "NO words, letters, speech bubbles, captions, sound-effect text, logos, watermarks, blood or gore."
- Criatura = "faceless enchanted stone guardian/golem, helmeted head with narrow mist vents, overlong arms, dark hinge joints, gray mist from seams". Ação = evasão/esquiva/alavanca, nunca golpes em pessoas, máximo 3 quadros de ação por chamada.
- Pós-geração: `python3 build.py && python3 preview.py N` e conferir; ajustar x/y em `data.js`.
- Arquivos: faixas p02_1..6 / p03_1..7 (landscape, 1-2 quadros por chamada); full pages p04..p10_full.jpg (retrato, uma chamada cada). Após gerar `pNN_full.jpg`, rodar build (renomeia/corta para pageNN.jpg via full_page).

---

## PÁGINA 2 — 3 chamadas (duas células cada), gerar como landscape 4:3 e build.py corta

### p02_1 (vira célula wide 1244×560)
"Horizontal single-panel dark-fantasy comic panel, cinematic painterly art, crisp ink linework, cold gray-blue palette of the Maw: floating cracked stone slabs, giant rusted chains, fog. The stone guardian — a towering faceless construct of jagged charcoal-gray rock plates, overlong arms, helmet-like head with narrow mist-vent grooves, thin gray mist from its seams — rises out of a dark fissure between two slabs into the fog. Foreground: the hero (match reference: man ~29, messy black hair, stubble, gray zip hoodie, gray plaid pajama pants, one foot socked one bare) settles into a calm trained martial-arts stance, guards raised, studying the construct. Dramatic scale, deep shadows. NO words/letters/bubbles/captions/logos/watermarks/blood/gore."
refs: nathan_ref.png, world-of-warcraft-the-maw-shadowlands-zo-1.jpg

### p02_2 + p02_3 (pode ser UMA faixa landscape com 2 quadros)
"Horizontal dark-fantasy comic strip with exactly TWO square panels side by side, thick black borders and gutter, same hero and faceless stone guardian as reference, Maw setting, gray fog and speed lines. LEFT PANEL: the hero ducks low and slips aside as the guardian's overlong stone arm sweeps over his head and scrapes the slab behind him in a fan of stone splinters, motion energy. RIGHT PANEL: the hero prods the construct's rocky flank with an open-hand jab then winces and shakes his stinging fingers, exasperated, the golem unmoved. NO words/letters/bubbles/captions/sound text/logos/watermarks/blood/gore."
refs: ficha_nathan.jpg (rosto), hq1_1.jpg (pijama)

### p02_4 + p02_5 (faixa landscape com 2 quadros)
"Horizontal dark-fantasy comic strip with exactly TWO panels: a square panel on the left and a wide panel on the right, thick black borders, same hero and faceless stone guardian, Maw ruins, dust and speed lines. LEFT SQUARE: the hero tumbles away in a cloud of gray dust as the guardian's huge hand sweeps through the empty space where he stood an instant before. RIGHT WIDE: back on his feet at a run, he snatches up a rusted forearm-length iron pipe and sprints toward a narrow gap between two leaning stone slabs, the golem's long arm reaching after him from the frame edge, chains and fog beyond. NO words/letters/bubbles/captions/sound text/logos/watermarks/blood/gore."
refs: ficha_nathan.jpg, hq1_1.jpg
Depois de gerada a faixa: recortar em duas células no build (ajustar p2 para colar a faixa inteira como dois cortes). Alternativa mais simples: gerar 2 imagens separadas (1 quadro cada).

### p02_6 (célula wide inferior)
"Horizontal single comic panel, dramatic dutch angle inside a narrow crack between two stone slabs in the Maw: the hero (gray hoodie, plaid pajama pants, one sock, one bare foot, iron pipe in hand) wedges the rusted pipe into the faceless stone guardian's arm hinge and throws his whole weight onto the lever like a crowbar, grit and dust bursting, brow furrowed with teeth clenched in effort, the construct rocking backward in the gloom, chains faintly visible. Cinematic painterly art, ink linework, cold gray palette. NO words/letters/bubbles/captions/sound text/logos/watermarks/blood/gore."
refs: ficha_nathan.jpg, hq1_1.jpg

---

## PÁGINA 3 — células (setas; resgate da Sylvanas)

### p03_1 (744×660)
"Single comic panel, cold gray Maw ruins: the faceless stone guardian brings an arm down onto a cracked slab which fractures and gives way; the hero in gray hoodie and plaid pajama pants throws himself out of falling debris in a forward roll, dust erupting, dynamic motion. Painterly cinematic art, inked. NO text/bubbles/blood." refs: ficha_nathan.jpg
### p03_2 (painel VERTICAL 486×1214 — gerar retrato)
"Tall vertical comic panel: the faceless stone guardian looms huge over the fallen hero against the backlit foggy sky of the Maw, one long arm raised high; the hero lies on the cracked slab below, holding a rusted iron pipe across himself, small and overwhelmed but resolute, rim light on his dusty face, chains framing the scene. NO text/bubbles/blood." refs: ficha_nathan.jpg
### p03_3/4/5 — uma faixa landscape com 3 quadros estreitos
"Horizontal comic strip of THREE narrow panels, thick black gutters, the faceless stone guardian in the Maw fog: panel 1 a single dark arrow suddenly embedded in its shoulder hinge; panel 2 a second arrow in the exact same point and the armored arm coming loose at the hinge in a dust cloud; panel 3 a third arrow entering a mist-vent slit of the helmet as the construct reels, gray mist bursting from its seams. The archer never visible. NO text/bubbles/blood." refs: hq1_action6.jpg (apenas atmosfera, opcional)
### p03_6 (615×~)
"Wide cinematic panel: the faceless stone guardian has collapsed a meter away from the hero and is dissolving into drifting gray fog and dust on the cracked slab; the hero sits propped on his elbows, chest heaving, open-mouthed with relief, gray hoodie, plaid pants, one sock. Chains and fog around. NO text/bubbles/blood." refs: hq1_1.jpg
### p03_7 (615×~)
"Over-the-shoulder comic panel from behind the seated hero: high on a slanted stone slab stands a tall hooded elven woman (match reference EXACTLY — ashen lavender skin, high pointed ears through a raised rust-ochre hood worn low, cold glowing red eyes, ornate burgundy-and-gold armor with small skull pauldrons, torn black cape, black-feathered quiver, ornate dark recurve bow held raised but not aimed), two red points of light beneath the hood fixed on him; hanging chains and Maw fog behind her. NO text/bubbles/blood." refs: ficha_sylvanas_capuz.jpg

---

## PÁGINAS FULL (retrato, 1280×1920, molduras pretas, múltiplos quadros, SEM texto)

### p04_full — "Sylvanas" (6 quadros; deixar céu escuro no alto para 3 balões pequenos; e faixas escuras nas laterais)
Layout: 1) figura inteira dela no alto da laje, arco erguido, ele no chão em fg (wide); 2) EXTREME CLOSE rosto dele, poeira, garganta fechando (lado esq); 3) CLOSE olhos vermelhos dela sob o capuz (lado dir, sem texto); 4) médio dois-personagens: ela desce e para a 3 passos, ele sentado (preto nas laterais para balões); 5) OTS por cima do ombro dela: ele se senta direito levando a mão às costelas; 6) close dele apontando para a poeira com meio sorriso cansado.
Incluir a descrição fiel dos dois personagens e da Gorja; ref: ficha_sylvanas_capuz.jpg + hq1_1.jpg + zo-1.

### p05_full — "O jogo" (7 quadros, só diálogo; composição limpa com áreas escuras vazias nas posições: alto, meio e rodapé)
1 wide dois, ela de pé e ele sentado na laje; 2 close perigosa dela; 3 close dele hesitante (orelha dela em inset); 4 OTS dele para ela ouvindo; 5 close dela processando a palavra "jogo"; 6 ela rígida; 7 dois quadros no rodapé: ela julgando / ele encolhido "sapatos" com microexpressão dela. refs: ficha_sylvanas_capuz.jpg (capuz ainda erguido), hq1_1.jpg.

### p06_full — "A tatuagem" (6 quadros)
1 médio: "Levante-se" — ela de pé, ele se levantando devagar com mãos visíveis; 2 ela o contorna avaliando zíper/etiqueta/meia; 3 dois: ele "quer uma prova?", ela "Quero"; 4 PAINEL GRANDE central (2/3 da largura): ele arregaça a manga direita — tatuagem preta-e-cinza do rosto dela encapuzado no antebraço; ela olhando por cima do ombro; 5 close dos dois perfis e do braço; 6 a mão dela subindo, parando (pedido de permissão no olhar), dois dedos frios tocando o antebraço; canto "Por quê?". DEIXAR o braço/tatuagem bem visível e nítido. refs: ficha_sylvanas_capuz.jpg, hq1_9.jpg (referência da tatuagem, opcional), ficha_nathan.jpg.

### p07_full — "A resposta" (5 quadros)
1 GRANDE alto: close vulnerável dele falando (deixar faixa escura no topo para balão longo); 2-3-4 três médios: ela "Personagem." / ele "palavra errada" / ela "é a palavra exata"; 5 painel: ela de costas olhando o horizonte de costelas de ferro, exausta, ele em fg menor; rodapé: pequeno dele "Sei." refs: sylvanas_sem_capuz? usar ficha_sylvanas_capuz (capuz pode começar a cair) — neste ponto da história usar `ficha_sylvanas.jpg` (capuz caído, cabelo loiro visível) para mostrar o rosto; hq1_1.jpg.

### p08_full — "História e pessoa" (6 quadros)
1 ela virando, olhos vermelhos firmes (wide); 2 close dela "carregar meu rosto"; 3 ele "Sim."; 4 GRANDE close dela fria: "Você não faz ideia de quem eu sou"; 5 ele discorda, cabeça erguida: "Não. Não faço mesmo." (careta de dor nas costelas); 6 painel amplo silencioso: os dois separados por vazio e névoa, vento entre eles, quase sem texto (caixa curta no rodapé). refs: ficha_sylvanas.jpg, hq1_1.jpg.

### p09_full — "A caminhada" (7 quadros)
Ambiente: caminham sobre lajes, ele 3 passos atrás à esquerda, mancando leve, ainda com a barra de ferro na mão. 1 wide eles caminham de costas; 2 ela analisa-o por cima do ombro ("você luta"); 3 ele coça a nuca; 4 ela para e diz "você vem comigo" (grito, quadro irregular); 5 ele surpreso; 6 caminhada com ela explicando regras (painel longo); 7 ela vira o rosto mostrando um olho vermelho ("lado do qual eu atiro"). refs: ficha_sylvanas_capuz.jpg, hq1_5.jpg (os dois caminhando, ótima referência), zo-2.

### p10_full — "Fecho" (5 quadros)
1 GRANDE: ela virada por completo, atenção precisa, "nenhuma condição de me ajudar"; 2 ele firme: "Entendo perfeitamente. Hoje."; 3 ele falando sério com a barra na mão (balão longo, deixar espaço); 4 o "Hm.": meio-close do rosto dela com a mínima mudança de expressão; 5 PAINEL FINAL panorâmico-quieto: sob uma laje inclinada que faz teto, ela examina as costelas dele com eficiência impessoal enquanto ele está deitado olhando o não-céu; muito espaço escuro no alto para as caixas de narração e o letreiro dourado no rodapé. refs: ficha_sylvanas.jpg, hq1_11.jpg (referência abrigo/laje), zo-1.
