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
   {r:[75,490,630,525], rostos:[[500,540,150,170]]},                 // 1 acordou
   {r:[710,490,490,325], zonas:[[712,640,486,170]]},                 // 2 pés
   {r:[30,835,1215,745], rostos:[[510,1080,135,225]]},               // 3 sentado (grande)
   {r:[75,1600,1130,285], rostos:[[340,1605,370,275]]}               // 4 close rosto
  ],
  elementos:[
   {t:"narra", p:0, texto:"O último de que Nathan se lembrava era o brilho azulado do monitor apagando sozinho, às três e quarenta da manhã."},
   {t:"narra", p:1, texto:"Acordou com o rosto apoiado em pedra. Fria. Áspera. Com cheiro de metal velho e coisa queimada há muito tempo."},
   {t:"narra", p:2, texto:"Moletom cinza. Calça de pijama. Um pé descalço, o outro com meia."},
   {t:"fala", p:3, de:"nathan", ancora:[545,1195], texto:"Certo... Isso é um sonho."},
   {t:"sussurro", p:3, de:"nathan", ancora:[615,1195], texto:"A Gorja... eu estou na Gorja."},
   {t:"sfx", x:1050, y:1820, w:180, texto:"CRRRACK", rot:-12, tamanho:34}
  ]},
/* ==================== PÁGINA 2 — A caçada (arte real) ==================== */
{ img:"img/page02.jpg",
  paineis:[
   {r:[55,30,1170,500], rostos:[[760,170,115,115]], zonas:[[335,35,240,200]]}, // 0 guarda
   {r:[55,545,470,490], rostos:[[235,680,100,100]]},                           // 1 desvio
   {r:[540,545,685,490], rostos:[[590,645,105,105]], zonas:[[890,595,240,170]]},// 2 soco
   {r:[25,1060,390,800], rostos:[[95,1235,95,95]], zonas:[[205,1085,200,210]]},// 3 raspão
   {r:[430,1050,825,445], rostos:[[710,1095,85,85]]},                          // 4 corrida
   {r:[430,1510,825,370], rostos:[[808,1610,130,112]], zonas:[[465,1535,310,270],[955,1690,165,125]]}// 5 martelada
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
   {r:[30,30,600,495], rostos:[[450,235,95,75]], zonas:[[55,40,275,245]]},       // 0 golpe/salto
   {r:[645,30,600,930], zonas:[[820,35,390,310],[690,690,460,250]]},             // 1 erguida p/ matar
   {r:[30,560,600,970], zonas:[[45,800,540,220]]},                               // 2 três flechas
   {r:[30,1560,600,330], rostos:[[390,1610,95,85]], zonas:[[45,1565,270,295]]},  // 3 cai/dissolve
   {r:[645,1560,600,330], rostos:[[775,1585,105,120],[665,1755,150,145]]}        // 4 Sylvanas surge
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
   {r:[30,30,1215,610], rostos:[[195,165,70,90],[795,42,50,75]], zonas:[[600,105,290,78]]},   // 0 encontro
   {r:[30,660,500,270], rostos:[[40,665,450,260]]},                                                // 1 close Nathan
   {r:[545,660,700,270], rostos:[[550,665,690,260]]},                                              // 2 olhos dela
   {r:[30,950,1215,440], rostos:[[372,1052,55,80],[890,1022,45,65]], zonas:[[325,1050,140,255],[900,1125,44,66]]}, // 3 dois no quadro
   {r:[30,1400,500,490], rostos:[[400,1478,50,78]], zonas:[[18,1418,228,448]]},                   // 4 OTS ombro dela
   {r:[545,1400,700,490], rostos:[[595,1478,215,245]], zonas:[[950,1728,145,162]]}                 // 5 close aceno
  ],
  elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[885,150], texto:"Você sabe meu nome."},
   {t:"fala", p:0, de:"nathan", rouca:1, ancora:[250,275], texto:"Sylvanas."},
   {t:"narra", p:3, texto:"A garganta fechou. Não de medo — ou não só. Aquilo era um curto-circuito entre o que é real e o que é história."},
   {t:"fala", p:3, de:"nathan", ancora:[400,1105], texto:"Sei."},
   {t:"fala", p:3, de:"sylvanas", ancora:[900,1110], texto:"Diga como."},
   {t:"fala", p:3, de:"nathan", ancora:[400,1110], texto:"Você não vai acreditar."},
   {t:"fala", p:3, de:"sylvanas", ancora:[900,1115], texto:"Isso é irrelevante. Diga mesmo assim."},
   {t:"fala", p:4, de:"nathan", ancora:[430,1530], xpref:"dir", tamanho:20, texto:"Eu dormi na minha casa. No meu mundo. Acordei aqui. Sem transição, sem portal, sem nada."},
   {t:"fala", p:5, de:"nathan", ancora:[805,1655], texto:"Acordei de pijama numa pedra... e a primeira coisa que apareceu tentou me abrir ao meio."},
   {t:"fala", p:5, de:"nathan", ancora:[700,1700], texto:"Obrigado, aliás. Por isso."},
   {t:"narra", p:3, texto:"Ela não reagiu ao agradecimento. Nem para aceitar, nem para desprezar."}
  ]},
/* ==================== PÁGINA 5 — O jogo (quadros provisórios) ==================== */
/* ==================== PÁGINA 5 — O jogo (arte real) ==================== */
{ img:"img/page05.jpg",
 paineis:[
   {r:[30,30,1215,585], rostos:[[195,95,75,85],[420,180,65,75]], zonas:[[265,115,370,485],[750,270,330,330]]},
   {r:[30,630,590,310], rostos:[[95,700,190,185]]},
   {r:[650,630,600,310], rostos:[[842,702,138,170]]},
   {r:[30,960,630,410], rostos:[[855,1075,105,105],[30,1265,185,110]], zonas:[[810,1075,160,260]]},
   {r:[670,960,580,200], rostos:[[730,975,420,175]]},
   {r:[670,1180,580,190], rostos:[[795,1195,110,110]], zonas:[[690,1185,90,180]]},
   {r:[30,1390,1215,500], rostos:[[425,1445,70,90],[675,1625,70,80]], zonas:[[390,1530,150,330],[650,1700,130,170]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[230, 185], texto:"Seu mundo."},
   {t:"fala", p:0, de:"nathan", ancora:[450, 225], texto:"Outro mundo. Não Azeroth. Não... nada disso."},
   {t:"fala", p:1, de:"sylvanas", ancora:[190, 880], texto:"E nesse outro mundo... as pessoas conhecem o meu nome."},
   {t:"fala", p:2, de:"nathan", ancora:[900, 880], texto:"Conhecem. Milhões delas."},
   {t:"narra", p:2, texto:"O silêncio ficou muito mais frio."},
   {t:"fala", p:2, de:"sylvanas", ancora:[900, 870], texto:"Explique."},
   {t:"fala", p:3, de:"nathan", ancora:[120, 1300], texto:"No meu mundo, Azeroth existe dentro de um jogo. Chama-se World of Warcraft. As pessoas se sentam diante de uma máquina, controlam personagens, viajam por Ventobravo, Orgrimmar, Tirisfal... Eu passei anos fazendo isso."},
   {t:"fala", p:3, de:"sylvanas", ancora:[908, 1105], texto:"Um jogo."},
   {t:"fala", p:3, de:"nathan", ancora:[125, 1305], texto:"Um jogo."},
   {t:"fala", p:6, de:"sylvanas", ancora:[460, 1470], texto:"E dentro desse jogo existe alguém chamada Sylvanas Windrunner."},
   {t:"fala", p:6, de:"nathan", ancora:[460, 1475], texto:"Existe a sua história inteira. Desde Quel'Thalas."},
   {t:"fala", p:6, de:"sylvanas", ancora:[460, 1535], texto:"Você é uma armadilha, um espião ou um lunático. Nenhuma das três hipóteses recomenda que eu o deixe vivo."},
   {t:"fala", p:6, de:"nathan", ancora:[710, 1700], texto:"Se eu fosse uma armadilha... eu teria vindo com sapatos."}
 ]},
/* ==================== PÁGINA 6 — A tatuagem (quadros provisórios) ==================== */
/* ==================== PÁGINA 6 — A tatuagem (arte real) ==================== */
{ img:"img/page06.jpg",
 paineis:[
   {r:[30,30,1215,510], rostos:[[630,55,85,85],[875,260,75,70]], zonas:[[200,95,180,330],[580,40,230,160],[810,330,270,180]]},
   {r:[30,560,590,370], rostos:[[85,635,60,70],[350,735,50,60]], zonas:[[60,700,140,220],[115,595,205,290],[330,780,195,145]]},
   {r:[650,560,600,370], rostos:[[800,805,50,55],[930,800,55,60]], zonas:[[780,795,110,130],[910,790,120,135]]},
   {r:[30,950,1215,440], rostos:[[100,995,140,190],[500,1085,65,90]], zonas:[[480,1170,150,220],[230,1230,290,160],[225,1215,265,185],[60,1150,230,220]]},
   {r:[30,1410,1215,480], rostos:[[100,1425,165,230],[355,1415,150,210]], zonas:[[265,1675,100,110],[150,1700,150,160],[170,1470,520,320]]}
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
   {r:[30,55,1215,550], rostos:[[245,115,180,220]], zonas:[[430,270,120,120]]},
   {r:[30,620,380,500], rostos:[[85,675,180,280]]},
   {r:[430,620,390,500], rostos:[[535,655,170,250]]},
   {r:[840,620,405,500], rostos:[[845,845,70,80]], zonas:[[840,925,180,190]]},
   {r:[30,1140,590,750], rostos:[[95,1235,90,100],[315,1555,45,55]], zonas:[[60,1330,180,400],[80,1540,440,340]]},
   {r:[650,1140,595,750], rostos:[[690,1690,90,105],[1080,1680,80,100]], zonas:[[665,1780,220,105],[1030,1770,215,115]]}
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
   {r:[650,30,600,580], rostos:[[795,105,220,260]]},
   {r:[30,630,1215,330], rostos:[[500,680,400,180]]},
   {r:[30,980,590,410], rostos:[[175,1015,190,250]]},
   {r:[650,980,600,410], rostos:[[985,1035,125,115]], zonas:[[940,1150,310,240]]},
   {r:[30,1420,1215,470], rostos:[[175,1555,40,45],[435,1545,40,50]]}
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
   {r:[30,30,590,450], rostos:[[130,105,45,55],[220,100,70,80]], zonas:[[190,145,230,310],[410,110,260,350]]},
   {r:[650,30,600,450], rostos:[[785,85,170,185]], zonas:[[655,295,360,180]]},
   {r:[30,500,1215,300], rostos:[[145,555,75,110]], zonas:[[215,600,120,90]]},
   {r:[30,820,1215,310], rostos:[[165,895,45,55],[370,905,40,45]], zonas:[[130,880,190,240],[350,890,110,230]]},
   {r:[30,1150,590,320], rostos:[[540,1230,40,50]], zonas:[[510,1220,110,230]]},
   {r:[650,1150,600,320], rostos:[[700,1180,55,70]], zonas:[[680,1170,180,290]]},
   {r:[30,1490,1215,400], rostos:[[195,1525,55,70],[345,1495,85,95]], zonas:[[150,1680,140,60],[330,1600,160,260]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[255, 175], texto:"Você não pode ficar aqui."},
   {t:"fala", p:1, de:"nathan", ancora:[700, 445], texto:"Concordo plenamente. Como eu saio?"},
   {t:"fala", p:2, de:"sylvanas", ancora:[180, 645], texto:"Você não sai. Isto é a Gorja — não há portas. Aquela criatura tinha companhia. Elas sempre têm."},
   {t:"fala", p:3, de:"sylvanas", ancora:[188, 925], tamanho:20, texto:"Você luta. Desviou do primeiro golpe, não recuou depois, atacou uma articulação. Foi tudo terrivelmente insuficiente. Mas não foi burro."},
   {t:"fala", p:3, de:"nathan", ancora:[388, 925], tamanho:20, texto:"Eu treinei caratê desde os oito anos. Serve para brigas de rua... não para aquilo."},
   {t:"fala", p:4, de:"sylvanas", ancora:[560, 1250], texto:"O corpo já sabe obedecer. Isso poupa meses."},
   {t:"grito", p:5, de:"sylvanas", ancora:[728, 1215], texto:"Você vem comigo."},
   {t:"fala", p:5, de:"nathan", ancora:[1105, 1255], texto:"Assim? Sem mais interrogatório?"},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1550], tamanho:20, texto:"O interrogatório continua. Simplesmente vai continuar enquanto caminhamos."},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1555], tamanho:20, texto:"Você anda três passos atrás de mim. À esquerda — não à direita."},
   {t:"fala", p:6, de:"nathan", ancora:[222, 1580], tamanho:20, texto:"Por que não à direita?"},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1560], tamanho:20, texto:"Porque é o lado do qual eu atiro."},
   {t:"fala", p:6, de:"sylvanas", ancora:[388, 1565], tamanho:20, texto:"Se eu mandar você correr, você corre. E não volta."},
   {t:"fala", p:6, de:"nathan", ancora:[222, 1585], tamanho:20, texto:"Essa eu não prometo."}
 ]},
/* ==================== PÁGINA 10 — Fechamento (quadros provisórios) ==================== */
/* ==================== PÁGINA 10 — Fecho (arte real) ==================== */
{ img:"img/page10.jpg",
 paineis:[
   {r:[40,40,1200,520], rostos:[[175,85,95,110],[385,75,75,90]]},
   {r:[30,580,590,370], rostos:[[100,600,450,330]]},
   {r:[650,580,600,370], rostos:[[825,615,130,140]], zonas:[[750,750,320,180]]},
   {r:[30,970,590,330], rostos:[[80,980,480,310]]},
   {r:[650,970,600,330], rostos:[[785,995,90,100]], zonas:[[700,1080,250,200],[690,1140,500,150]]},
   {r:[30,1320,1215,570], rostos:[[350,1375,65,80],[155,1555,70,80]], zonas:[[330,1462,220,248],[200,1620,260,170]]}
 ],
 elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[220, 185], texto:"Você entende que não tem absolutamente nenhuma condição de me ajudar."},
   {t:"fala", p:0, de:"nathan", ancora:[420, 165], texto:"Entendo perfeitamente. Hoje."},
   {t:"narra", p:0, texto:"O olhar que ela deu não tinha raiva nem surpresa — só uma atenção súbita e muito precisa. Como quem reajusta a mira ao descobrir que o vento mudou."},
   {t:"fala", p:0, de:"nathan", ancora:[430, 150], texto:"Prometer que eu vou correr e não voltar é uma promessa sobre a pessoa que eu sou. E eu prefiro não mentir sobre isso... no meu primeiro dia."},
   {t:"fala", p:4, de:"sylvanas", ancora:[830, 1060], texto:"Hm."},
   {t:"narra", p:5, texto:"Muito baixo. Quase inaudível. Ela voltou a andar. Ele a seguiu — três passos atrás, à esquerda."},
   {t:"narra", p:5, texto:"Estranhamente, isso não o assustou."},
   {t:"narra", p:5, texto:"Isso o deixou curioso."},
   {t:"narra", p:5, texto:"Durante quatro anos, ele carregara o rosto dela no braço. E naquela noite, a primeira de muitas, percebeu que não sabia absolutamente nada sobre a mulher que tinha salvo sua vida."},
   {t:"letreiro", x:655, y:1335, w:580, texto:"FIM DO CAPÍTULO UM"}
 ]},
];
