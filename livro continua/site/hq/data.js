/* HQ "O Peso da Gorja" — Capítulo 1
   Diálogos 100% fielmente adaptados do romance.
   ------------------------------------------------------------
   AUTO-LAYOUT: cada página declara seus QUADROS (paineis) com
   rostos e zonas de proteção mapeados sobre a arte. Cada balão
   declara o painel (p), o ponto de fala (ancora) e o texto; o
   motor em layout.js posiciona/redimensiona/divide automaticamente:
   margem de 5% do quadro, proteção de rostos 5%, zonas 3%,
   máx. 25 palavras (fala) / 30 (narração), área máx. 25%.
   SFX e letreiro ficam manuais (efeitos pintados na ação).
   Mapeamento de arte: page03.jpg = "As três flechas" ·
   page04.jpg = "Sylvanas". Páginas 5-10: quadros provisórios
   (arte em produção) — reajustar zonas quando a arte chegar. */
const PAGINAS = [
/* ==================== PÁGINA 1 — O despertar (arte real) ==================== */
{ img:"img/page01.jpg",
  paineis:[
   {r:[30,30,1215,450]},                                             // 0 panorâmica
   {r:[75,490,630,525], rostos:[[500,540,150,170]], zonas:[[240,660,320,350],[90,500,150,510]]},                 // 1 acordou
   {r:[710,490,490,325], zonas:[[712,640,486,170]]},                 // 2 pés
   {r:[30,835,1215,745], rostos:[[520,1085,90,95]], zonas:[[505,1180,140,130],[270,1440,710,140]]},               // 3 sentado (grande)
   {r:[75,1600,1130,285], rostos:[[340,1605,370,275]], zonas:[[75,1600,1130,285]]}               // 4 close rosto
  ],
  elementos:[
   {t:"narra", p:0, texto:"O último de que Nathan se lembrava era o brilho azulado do monitor apagando sozinho, às três e quarenta da manhã."},
   {t:"narra", p:0, texto:"Acordou com o rosto apoiado em pedra. Fria. Áspera. Com cheiro de metal velho e coisa queimada há muito tempo."},
   {t:"narra", p:0, texto:"Moletom cinza. Calça de pijama. Um pé descalço, o outro com meia."},
   {t:"fala", p:3, de:"nathan", ancora:[545,1195], texto:"Certo... Isso é um sonho."},
   {t:"sussurro", p:3, de:"nathan", ancora:[615,1195], texto:"A Gorja... eu estou na Gorja."},
   {t:"sfx", x:1050, y:1820, w:180, texto:"CRRRACK", rot:-12, tamanho:34}
  ]},
/* ==================== PÁGINA 2 — A caçada (arte real) ==================== */
{ img:"img/page02.jpg",
  paineis:[
   {r:[55,30,1170,500], rostos:[[150,55,95,98],[760,170,115,115]], zonas:[[110,140,270,365],[660,285,280,215]]}, // 0 guarda
   {r:[55,545,470,490], rostos:[[235,680,100,100]], zonas:[[100,780,335,250]]},                           // 1 desvio
   {r:[540,545,685,490], rostos:[[590,645,105,105]], zonas:[[555,750,230,285],[890,545,335,490]]},// 2 soco
   {r:[25,1060,390,800], rostos:[[95,1235,95,95]], zonas:[[205,1085,200,210],[40,1330,345,420]]},// 3 raspão
   {r:[430,1050,825,445], rostos:[[710,1095,85,85]], zonas:[[670,1180,210,310]]},                          // 4 corrida
   {r:[430,1510,825,370], rostos:[[808,1610,130,112]], zonas:[[440,1515,330,360],[770,1725,270,150]]}// 5 martelada
  ],
  elementos:[
   {t:"sfx", x:380, y:590, w:200, texto:"CRRRR", rot:-4, tamanho:40},
   {t:"sfx", x:150, y:700, w:170, texto:"VVVUSH", rot:-8, tamanho:36},
   {t:"fala", p:0, de:"nathan", ancora:[805,255], texto:"Filho da—! Parece uma porta de aço!"},
   {t:"sfx", x:25, y:1265, w:180, texto:"PÁ!", rot:-10, tamanho:44},
   {t:"narra", p:4, texto:"Você não tem arma. Não tem armadura. Você tem talvez dez segundos."},
   {t:"fala", p:5, de:"nathan", ancora:[945,1630], texto:"Mais... força...!"},
   {t:"sfx", x:550, y:1830, w:300, texto:"CRRRAC", rot:-6, tamanho:42}
  ]},
/* ==================== PÁGINA 3 — As três flechas (arte: page03.jpg) ==================== */
{ img:"img/page03.jpg",
  paineis:[
   {r:[30,30,600,495], rostos:[[450,235,95,75]], zonas:[[30,30,262,300],[290,315,300,185]]},       // 0 golpe/salto
   {r:[645,30,600,930], zonas:[[690,60,555,700],[840,880,310,80]], rostos:[[882,802,74,74]]},             // 1 erguida p/ matar
   {r:[30,560,600,970], zonas:[[45,800,540,220]]},                               // 2 três flechas
   {r:[30,1560,600,330], rostos:[[390,1610,95,85]], zonas:[[45,1565,270,295],[330,1695,262,190]]},  // 3 cai/dissolve
   {r:[645,1560,600,330], rostos:[[790,1588,55,60],[665,1755,150,145]], zonas:[[765,1650,125,62],[895,1700,350,190]]}        // 4 Sylvanas surge
  ],
  elementos:[
   {t:"narra", p:0, texto:"Inútil. Ele sabia que era inútil."},
   {t:"narra", p:2, texto:"Ele não viu a flecha chegar. Viu o resultado."},
   {t:"sfx", x:60, y:745, w:130, texto:"THWIP", rot:-8, tamanho:34},
   {t:"sfx", x:240, y:745, w:130, texto:"THWIP", rot:-8, tamanho:34},
   {t:"sfx", x:430, y:745, w:130, texto:"THWIP", rot:-8, tamanho:34},
   {t:"narra", p:2, texto:"O corpo virou a mesma névoa cinza que pairava sobre tudo. Como se nunca tivesse sido outra coisa além de poeira organizada com má intenção."},
   {t:"narra", p:2, texto:"Passos leves, muito leves — o tipo de passo que só faz barulho quando quer fazer barulho."}
  ]},
/* ==================== PÁGINA 4 — Sylvanas (arte: page04.jpg) ==================== */
{ img:"img/page04.jpg",
  paineis:[
   {r:[30,30,1215,610], rostos:[[195,250,72,100],[628,58,60,72]], zonas:[[160,255,330,380],[520,55,360,560]]},   // 0 encontro
   {r:[30,660,500,270], rostos:[[40,665,450,260]], zonas:[[30,660,500,270]]},                                                // 1 close Nathan
   {r:[545,660,700,270], rostos:[[550,665,690,260]], zonas:[[545,660,700,270]]},                                              // 2 olhos dela
   {r:[30,950,1215,440], rostos:[[352,1032,56,64],[686,1150,50,58]], zonas:[[320,1098,150,270],[628,1148,198,290]]}, // 3 dois no quadro
   {r:[30,1400,500,490], rostos:[[342,1440,54,60]], zonas:[[18,1400,288,490],[300,1502,145,318]]},                   // 4 OTS ombro dela
   {r:[545,1400,700,490], rostos:[[615,1650,120,140]], zonas:[[585,1650,240,240],[985,1400,260,490]]}                 // 5 close aceno
  ],
  elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[655, 95], texto:"Você sabe meu nome."},
   {t:"fala", p:0, de:"nathan", rouca:1, ancora:[230, 290], texto:"Sylvanas."},
   {t:"narra", p:3, texto:"A garganta fechou. Não de medo — ou não só. Aquilo era um curto-circuito entre o que é real e o que é história."},
   {t:"fala", p:3, de:"nathan", ancora:[378, 1085], texto:"Sei."},
   {t:"fala", p:3, de:"sylvanas", ancora:[708, 1170], texto:"Diga como."},
   {t:"fala", p:3, de:"nathan", ancora:[210, 1000], texto:"Você não vai acreditar."},
   {t:"fala", p:0, de:"sylvanas", ancora:[655, 95], texto:"Isso é irrelevante. Diga mesmo assim."},
   {t:"fala", p:0, de:"nathan", ancora:[100, 120], tamanho:20, texto:"Eu dormi na minha casa. No meu mundo. Acordei aqui. Sem transição, sem portal, sem nada."},
   {t:"fala", p:5, de:"nathan", ancora:[675, 1720], texto:"Acordei de pijama numa pedra... e a primeira coisa que apareceu tentou me abrir ao meio."},
   {t:"fala", p:5, de:"nathan", ancora:[675, 1720], texto:"Obrigado, aliás. Por isso."},
   {t:"narra", p:3, texto:"Ela não reagiu ao agradecimento. Nem para aceitar, nem para desprezar."}
  ]},
/* ==================== PÁGINA 5 — O jogo (quadros provisórios) ==================== */
/* ==================== PÁGINA 5 — O jogo (arte real) ==================== */
{ img:"img/page05.jpg",
 paineis:[
   {r:[30,30,1215,585], rostos:[[195,95,75,85],[420,180,65,75]], zonas:[[140,180,195,425],[390,255,122,350],[880,300,335,300]]},
   {r:[30,630,590,310], rostos:[[458,798,80,84]], zonas:[[420,880,175,60],[400,825,60,80]]},
   {r:[650,630,600,310], rostos:[[788,788,125,162]], zonas:[[680,930,300,10]]},
   {r:[30,960,630,410], rostos:[[498,1042,84,92],[30,1265,185,110]], zonas:[[475,1035,160,235],[30,1210,205,158],[230,1300,400,68]]},
   {r:[670,960,580,200], rostos:[[730,982,270,172]], zonas:[[670,960,580,200]]},
   {r:[670,1180,580,190], rostos:[[795,1195,110,110]], zonas:[[680,1300,345,68]]},
   {r:[30,1390,1215,500], rostos:[[96,1768,28,26],[868,1792,26,24]], zonas:[[78,1795,75,80],[848,1815,62,60]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[230, 185], texto:"Seu mundo."},
   {t:"fala", p:0, de:"nathan", ancora:[450, 225], texto:"Outro mundo. Não Azeroth. Não... nada disso."},
   {t:"fala", p:1, de:"sylvanas", ancora:[498, 828], texto:"E nesse outro mundo... as pessoas conhecem o meu nome."},
   {t:"fala", p:2, de:"nathan", ancora:[852, 830], texto:"Conhecem. Milhões delas."},
   {t:"narra", p:5, texto:"O silêncio ficou muito mais frio."},
   {t:"fala", p:1, de:"sylvanas", ancora:[498, 828], texto:"Explique."},
   {t:"fala", p:3, de:"nathan", ancora:[130, 1260], tamanho:20, texto:"No meu mundo, Azeroth existe dentro de um jogo. Chama-se World of Warcraft."},
   {t:"fala", p:0, de:"nathan", ancora:[230, 290], tamanho:20, texto:"As pessoas se sentam diante de uma máquina, controlam personagens, viajam por Ventobravo, Orgrimmar, Tirisfal... Eu passei anos fazendo isso."},
   {t:"fala", p:3, de:"sylvanas", ancora:[530, 1090], texto:"Um jogo."},
   {t:"fala", p:3, de:"nathan", ancora:[200, 1270], texto:"Um jogo."},
   {t:"fala", p:6, de:"sylvanas", ancora:[460, 1470], texto:"E dentro desse jogo existe alguém chamada Sylvanas Windrunner."},
   {t:"fala", p:6, de:"nathan", ancora:[882, 1818], texto:"Existe a sua história inteira. Desde Quel'Thalas."},
   {t:"fala", p:6, de:"sylvanas", ancora:[460, 1535], texto:"Você é uma armadilha, um espião ou um lunático. Nenhuma das três hipóteses recomenda que eu o deixe vivo."},
   {t:"fala", p:6, de:"nathan", ancora:[710, 1700], texto:"Se eu fosse uma armadilha... eu teria vindo com sapatos."}
 ]},
/* ==================== PÁGINA 6 — A tatuagem (quadros provisórios) ==================== */
/* ==================== PÁGINA 6 — A tatuagem (arte real) ==================== */
{ img:"img/page06.jpg",
 paineis:[
   {r:[30,30,1215,510], rostos:[[630,55,85,85],[875,260,75,70]], zonas:[[200,95,180,330],[580,40,230,160],[810,330,270,180]]},
   {r:[30,560,590,370], rostos:[[90,630,60,72],[345,730,58,66]], zonas:[[60,700,140,220],[115,595,205,290],[330,780,195,145]]},
   {r:[650,560,600,370], rostos:[[795,798,55,60],[925,795,60,62]], zonas:[[780,795,110,130],[910,790,120,135]]},
   {r:[30,950,1215,440], rostos:[[105,990,115,155],[498,1082,70,92]], zonas:[[480,1170,150,220],[230,1230,290,160],[225,1215,265,185],[60,1150,230,220]]},
   {r:[30,1410,1215,480], rostos:[[120,1428,145,190],[340,1420,140,180]], zonas:[[265,1675,100,110],[150,1700,150,160],[170,1470,520,320]]}
 ],
 elementos:[
   {t:"grito", p:0, de:"sylvanas", ancora:[355, 105], texto:"Levante-se."},
   {t:"narra", p:0, texto:"Ela o contornou por completo, avaliando o tecido do moletom, o zíper, a etiqueta na nuca, a meia imunda — e a ausência total de arma."},
   {t:"fala", p:1, de:"sylvanas", ancora:[115, 705], texto:"Suas roupas são absurdas."},
   {t:"fala", p:2, de:"nathan", ancora:[825, 820], texto:"Elas são de dormir."},
   {t:"fala", p:2, de:"nathan", ancora:[825, 825], texto:"Você quer uma prova?"},
   {t:"fala", p:2, de:"sylvanas", ancora:[958, 815], texto:"Quero."},
   {t:"narra", p:3, texto:"A terceira hesitação foi diferente. As outras foram cautela. Aquela era vergonha. Ele arregaçou a manga direita."},
   {t:"fala", p:3, de:"sylvanas", ancora:[560, 1110], texto:"Isso está na sua pele."},
   {t:"fala", p:3, de:"nathan", ancora:[170, 1185], texto:"Está."},
   {t:"fala", p:3, de:"sylvanas", ancora:[170, 1160], texto:"Permanentemente."},
   {t:"fala", p:3, de:"nathan", ancora:[560, 1115], texto:"Permanentemente."},
   {t:"narra", p:4, texto:"A mão dela era fria. Não fria de morto — fria de coisa que parou de precisar ser quente."},
   {t:"fala", p:4, de:"sylvanas", ancora:[455, 1585], texto:"Por quê?"}
 ]},
/* ==================== PÁGINA 7 — A resposta (quadros provisórios) ==================== */
/* ==================== PÁGINA 7 — A resposta (arte real) ==================== */
{ img:"img/page07.jpg",
 paineis:[
   {r:[30,55,1215,550], rostos:[[215,140,190,200]], zonas:[[430,270,120,120]]},
   {r:[30,620,380,500], rostos:[[85,700,195,240]]},
   {r:[430,620,390,500], rostos:[[520,665,180,240]]},
   {r:[840,620,405,500], rostos:[[845,843,72,85]], zonas:[[840,925,180,190]]},
   {r:[30,1140,590,750], rostos:[[75,1228,105,120],[318,1545,58,70]], zonas:[[60,1330,180,400],[80,1540,440,340]]},
   {r:[650,1140,595,750], rostos:[[688,1682,105,115],[1075,1672,90,105]], zonas:[[665,1780,220,105],[1030,1770,215,115]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"nathan", ancora:[335, 335], texto:"Porque a sua história me acompanhou num período em que eu não estava bem. Você era a personagem que não pedia desculpa por continuar existindo depois de ter perdido tudo. Isso importava pra mim. Numa época em que eu não sabia como fazer isso."},
   {t:"fala", p:1, de:"sylvanas", ancora:[175, 905], texto:"Personagem."},
   {t:"fala", p:2, de:"nathan", ancora:[625, 855], texto:"É a palavra errada. Eu sei."},
   {t:"fala", p:3, de:"sylvanas", ancora:[878, 880], texto:"É a palavra exata. E é por isso que ela é insuportável."},
   {t:"narra", p:4, texto:"Ela se afastou dois passos e olhou para o horizonte de costelas de ferro. Por um momento, ele viu — realmente viu — o quanto ela estava cansada."},
   {t:"fala", p:5, de:"sylvanas", ancora:[735, 1725], texto:"Então você sabe. Sobre Quel'Thalas. Sobre Arthas. Sobre o que eu fiz depois. Sobre a Torre de Lordaeron. Sobre tudo."},
   {t:"fala", p:5, de:"nathan", ancora:[1120, 1720], texto:"Sei."}
 ]},
/* ==================== PÁGINA 8 — História e pessoa (quadros provisórios) ==================== */
/* ==================== PÁGINA 8 — História e pessoa (arte real) ==================== */
{ img:"img/page08.jpg",
 paineis:[
   {r:[30,30,590,580], rostos:[[525,70,75,80]], zonas:[[445,55,175,520]]},
   {r:[650,30,600,580], rostos:[[775,98,250,275]]},
   {r:[30,630,1215,330], rostos:[[515,672,370,205]]},
   {r:[30,980,590,410], rostos:[[168,1012,185,230]]},
   {r:[650,980,600,410], rostos:[[978,1030,140,125]], zonas:[[940,1150,310,240]]},
   {r:[30,1420,1215,470], rostos:[[170,1550,55,58],[428,1542,55,62]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[540, 120], texto:"E ainda assim escolheu carregar o meu rosto no seu corpo."},
   {t:"fala", p:1, de:"nathan", ancora:[900, 305], texto:"Sim."},
   {t:"fala", p:2, de:"sylvanas", ancora:[700, 700], texto:"Você não faz ideia de quem eu sou."},
   {t:"narra", p:2, texto:"Havia nos olhos dela algo que ele só entenderia meses depois: desprezo — não por ele, mas pela possibilidade de ser admirada."},
   {t:"fala", p:3, de:"nathan", ancora:[270, 1205], texto:"Não. Não faço mesmo."},
   {t:"narra", p:3, texto:"Ela franziu a testa, minimamente. Não era a resposta esperada."},
   {t:"fala", p:4, de:"nathan", ancora:[1062, 1115], tamanho:20, texto:"Eu conheço a sua história — isso é diferente."},
  {t:"fala", p:4, de:"nathan", ancora:[1062, 1125], tamanho:20, texto:"Sei datas, nomes, batalhas, coisas que você fez, coisas que fizeram com você."},
  {t:"fala", p:5, de:"nathan", ancora:[455, 1545], texto:"Mas conhecer a história de alguém não significa conhecer a pessoa. Eu nunca ouvi você respirar antes de hoje."},
   {t:"narra", p:5, texto:"O vento da Gorja passou entre eles. Sylvanas não respondeu. Levou muito tempo para não responder."}
 ]},
/* ==================== PÁGINA 9 — A caminhada (quadros provisórios) ==================== */
/* ==================== PÁGINA 9 — A caminhada (arte real) ==================== */
{ img:"img/page09.jpg",
 paineis:[
   {r:[30,30,590,450], rostos:[[130,100,52,62],[218,95,80,88]], zonas:[[190,145,230,310],[410,110,260,350]]},
   {r:[650,30,600,450], rostos:[[782,82,178,192]], zonas:[[655,295,360,180]]},
   {r:[30,500,1215,300], rostos:[[142,552,85,115]], zonas:[[215,600,120,90]]},
   {r:[30,820,1215,310], rostos:[[158,888,58,65],[362,900,52,58]], zonas:[[130,880,190,240],[350,890,110,230]]},
   {r:[30,1150,590,320], rostos:[[532,1225,55,60]], zonas:[[510,1220,110,230]]},
   {r:[650,1150,600,320], rostos:[[692,1175,68,80]], zonas:[[680,1170,180,290]]},
   {r:[30,1490,1215,400], rostos:[[368,1696,40,34],[532,1704,40,32]], zonas:[[310,1728,100,150],[495,1738,95,135]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[258, 135], texto:"Você não pode ficar aqui."},
   {t:"fala", p:1, de:"nathan", texto:"Concordo plenamente. Como eu saio?"},
   {t:"fala", p:2, de:"sylvanas", ancora:[180, 645], texto:"Você não sai. Isto é a Gorja — não há portas. Aquela criatura tinha companhia. Elas sempre têm."},
   {t:"fala", p:3, de:"sylvanas", ancora:[188, 925], tamanho:20, texto:"Você luta. Desviou do primeiro golpe, não recuou depois, atacou uma articulação. Foi tudo terrivelmente insuficiente. Mas não foi burro."},
   {t:"fala", p:3, de:"nathan", ancora:[388, 925], tamanho:20, texto:"Eu treinei caratê desde os oito anos. Serve para brigas de rua... não para aquilo."},
   {t:"fala", p:4, de:"sylvanas", ancora:[560, 1250], texto:"O corpo já sabe obedecer. Isso poupa meses."},
   {t:"grito", p:5, de:"sylvanas", ancora:[728, 1215], texto:"Você vem comigo."},
   {t:"fala", p:5, de:"nathan", ancora:[1105, 1255], texto:"Assim? Sem mais interrogatório?"},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1700], tamanho:20, texto:"O interrogatório continua. Simplesmente vai continuar enquanto caminhamos."},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1700], tamanho:20, texto:"Você anda três passos atrás de mim. À esquerda — não à direita."},
   {t:"fala", p:6, de:"nathan", ancora:[548, 1710], tamanho:20, texto:"Por que não à direita?"},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1700], tamanho:20, texto:"Porque é o lado do qual eu atiro."},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1700], tamanho:20, texto:"Se eu mandar você correr, você corre. E não volta."},
   {t:"fala", p:6, de:"nathan", ancora:[548, 1710], tamanho:20, texto:"Essa eu não prometo."}
 ]},
/* ==================== PÁGINA 10 — Fechamento (quadros provisórios) ==================== */
/* ==================== PÁGINA 10 — Fecho (arte real) ==================== */
{ img:"img/page10.jpg",
 paineis:[
   {r:[40,40,1200,520], rostos:[[182,148,66,74],[788,108,86,74]], zonas:[[70,120,205,400],[770,100,190,420]]},
   {r:[30,580,590,370], rostos:[[30,580,590,370]]},
   {r:[650,580,600,370], rostos:[[790,628,112,108]], zonas:[[690,760,300,110]]},
   {r:[30,970,590,330], rostos:[[30,970,590,330]]},
   {r:[650,970,600,330], rostos:[[798,1000,64,58]], zonas:[[690,1040,270,240]]},
   {r:[30,1320,1215,570], rostos:[[300,1518,68,52],[618,1382,58,58]], zonas:[[240,1565,430,295],[555,1430,265,340],[61,1490,175,400]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[235, 205], tamanho:20, texto:"Você entende que não tem absolutamente nenhuma condição de me ajudar."},
   {t:"fala", p:0, de:"nathan", ancora:[235, 205], texto:"Entendo perfeitamente. Hoje."},
   {t:"narra", p:0, texto:"O olhar que ela deu não tinha raiva nem surpresa — só uma atenção súbita e muito precisa. Como quem reajusta a mira ao descobrir que o vento mudou."},
   {t:"fala", p:0, de:"nathan", ancora:[842, 150], tamanho:20, texto:"Prometer que eu vou correr e não voltar é uma promessa sobre a pessoa que eu sou."},
   {t:"fala", p:0, de:"nathan", ancora:[842, 150], tamanho:20, texto:"E eu prefiro não mentir sobre isso... no meu primeiro dia."},
   {t:"fala", p:4, de:"sylvanas", ancora:[830, 1029], texto:"Hm."},
   {t:"narra", p:4, texto:"Muito baixo. Quase inaudível. Ela voltou a andar. Ele a seguiu — três passos atrás, à esquerda."},
   {t:"narra", p:5, texto:"Estranhamente, isso não o assustou."},
   {t:"narra", p:5, texto:"Isso o deixou curioso."},
   {t:"narra", p:5, texto:"Durante quatro anos, ele carregara o rosto dela no braço. E naquela noite, a primeira de muitas, percebeu que não sabia absolutamente nada sobre a mulher que tinha salvo sua vida."},
   {t:"letreiro", x:655, y:1335, w:580, texto:"FIM DO CAPÍTULO UM"}
 ]},
];
