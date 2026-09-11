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
   {r:[430,1510,825,370], rostos:[[895,1570,95,95]], zonas:[[465,1535,310,270]]}// 5 martelada
  ],
  elementos:[
   {t:"sfx", x:380, y:590, w:200, texto:"CRRRR", rot:-4, tamanho:40},
   {t:"sfx", x:150, y:700, w:170, texto:"VVVUSH", rot:-8, tamanho:36},
   {t:"fala", p:0, de:"nathan", ancora:[805,255], texto:"Filho da—! Parece uma porta de aço!"},
   {t:"sfx", x:25, y:1265, w:180, texto:"PÁ!", rot:-10, tamanho:44},
   {t:"narra", p:4, texto:"Você não tem arma. Não tem armadura. Você tem talvez dez segundos."},
   {t:"fala", p:5, de:"nathan", ancora:[975,1625], texto:"Mais... força...!"},
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
   {r:[545,1400,700,490], rostos:[[745,1412,130,180]], zonas:[[878,1643,110,125]]}                 // 5 close aceno
  ],
  elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[885,150], texto:"Você sabe meu nome."},
   {t:"fala", p:0, de:"nathan", rouca:1, ancora:[250,275], texto:"Sylvanas."},
   {t:"narra", p:3, texto:"A garganta fechou. Não de medo — ou não só. Aquilo era um curto-circuito entre o que é real e o que é história."},
   {t:"fala", p:3, de:"nathan", ancora:[400,1105], texto:"Sei."},
   {t:"fala", p:3, de:"sylvanas", ancora:[900,1110], texto:"Diga como."},
   {t:"fala", p:3, de:"nathan", ancora:[400,1110], texto:"Você não vai acreditar."},
   {t:"fala", p:3, de:"sylvanas", ancora:[900,1115], texto:"Isso é irrelevante. Diga mesmo assim."},
   {t:"fala", p:4, de:"nathan", ancora:[430,1530], texto:"Eu dormi na minha casa. No meu mundo. Acordei aqui. Sem transição, sem portal, sem nada."},
   {t:"fala", p:5, de:"nathan", ancora:[890,1720], texto:"Acordei de pijama numa pedra... e a primeira coisa que apareceu tentou me abrir ao meio."},
   {t:"fala", p:5, de:"nathan", ancora:[890,1725], texto:"Obrigado, aliás. Por isso."},
   {t:"narra", p:3, texto:"Ela não reagiu ao agradecimento. Nem para aceitar, nem para desprezar."}
  ]},
/* ==================== PÁGINA 5 — O jogo (quadros provisórios) ==================== */
{ img:"img/page05.jpg", rascunho:true,
  paineis:[
   {r:[30,30,1215,330]},       // 0 wide dois
   {r:[30,380,590,300]},       // 1 close dela
   {r:[640,380,610,300]},      // 2 close dele
   {r:[30,700,600,380]},       // 3 OTS
   {r:[650,700,600,180]},      // 4 "um jogo"
   {r:[650,900,600,180]},      // 5 rígida
   {r:[30,1100,1215,790]}      // 6 julgamento
  ],
  elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[400,330], texto:"Seu mundo."},
   {t:"fala", p:0, de:"nathan", ancora:[880,330], texto:"Outro mundo. Não Azeroth. Não... nada disso."},
   {t:"fala", p:1, de:"sylvanas", ancora:[330,645], texto:"E nesse outro mundo... as pessoas conhecem o meu nome."},
   {t:"fala", p:2, de:"nathan", ancora:[905,645], texto:"Conhecem. Milhões delas."},
   {t:"narra", p:2, texto:"O silêncio ficou muito mais frio."},
   {t:"fala", p:2, de:"sylvanas", ancora:[965,655], texto:"Explique."},
   {t:"fala", p:3, de:"nathan", ancora:[335,1045], texto:"No meu mundo, Azeroth existe dentro de um jogo. Chama-se World of Warcraft. As pessoas se sentam diante de uma máquina, controlam personagens, viajam por Ventobravo, Orgrimmar, Tirisfal... Eu passei anos fazendo isso."},
   {t:"fala", p:4, de:"sylvanas", ancora:[800,855], texto:"Um jogo."},
   {t:"fala", p:4, de:"nathan", ancora:[1095,860], texto:"Um jogo."},
   {t:"fala", p:5, de:"sylvanas", ancora:[845,1055], texto:"E dentro desse jogo existe alguém chamada Sylvanas Windrunner."},
   {t:"fala", p:5, de:"nathan", ancora:[1150,1060], texto:"Existe a sua história inteira. Desde Quel'Thalas."},
   {t:"fala", p:6, de:"sylvanas", ancora:[350,1795], texto:"Você é uma armadilha, um espião ou um lunático. Nenhuma das três hipóteses recomenda que eu o deixe vivo."},
   {t:"fala", p:6, de:"nathan", ancora:[905,1815], texto:"Se eu fosse uma armadilha... eu teria vindo com sapatos."}
  ]},
/* ==================== PÁGINA 6 — A tatuagem (quadros provisórios) ==================== */
{ img:"img/page06.jpg", rascunho:true,
  paineis:[
   {r:[30,30,1215,430]},    // 0 levante-se/contorno
   {r:[30,480,600,470]},    // 1 roupas absurdas
   {r:[650,480,600,470]},   // 2 prova
   {r:[30,970,1215,500]},   // 3 tatuagem
   {r:[30,1490,1215,400]}   // 4 mão fria
  ],
  elementos:[
   {t:"grito", p:0, de:"sylvanas", ancora:[300,410], texto:"Levante-se."},
   {t:"narra", p:0, texto:"Ela o contornou por completo, avaliando o tecido do moletom, o zíper, a etiqueta na nuca, a meia imunda — e a ausência total de arma."},
   {t:"fala", p:1, de:"sylvanas", ancora:[250,905], texto:"Suas roupas são absurdas."},
   {t:"fala", p:1, de:"nathan", ancora:[525,910], texto:"Elas são de dormir."},
   {t:"fala", p:2, de:"nathan", ancora:[755,905], texto:"Você quer uma prova?"},
   {t:"fala", p:2, de:"sylvanas", ancora:[1155,910], texto:"Quero."},
   {t:"narra", p:3, texto:"A terceira hesitação foi diferente. As outras foram cautela. Aquela era vergonha. Ele arregaçou a manga direita."},
   {t:"fala", p:3, de:"sylvanas", ancora:[700,1405], texto:"Isso está na sua pele."},
   {t:"fala", p:3, de:"nathan", ancora:[395,1420], texto:"Está."},
   {t:"fala", p:3, de:"sylvanas", ancora:[700,1425], texto:"Permanentemente."},
   {t:"fala", p:3, de:"nathan", ancora:[395,1435], texto:"Permanentemente."},
   {t:"narra", p:4, texto:"A mão dela era fria. Não fria de morto — fria de coisa que parou de precisar ser quente."},
   {t:"fala", p:4, de:"sylvanas", ancora:[905,1845], texto:"Por quê?"}
  ]},
/* ==================== PÁGINA 7 — A resposta (quadros provisórios) ==================== */
{ img:"img/page07.jpg", rascunho:true,
  paineis:[
   {r:[30,30,1215,600]},    // 0 vulnerável
   {r:[30,650,390,380]},    // 1 "Personagem."
   {r:[440,650,390,380]},   // 2 palavra errada
   {r:[850,650,400,380]},   // 3 palavra exata
   {r:[30,1050,600,840]},   // 4 cansada
   {r:[650,1050,600,840]}   // 5 então você sabe
  ],
  elementos:[
   {t:"fala", p:0, de:"nathan", ancora:[890,580], texto:"Porque a sua história me acompanhou num período em que eu não estava bem. Você era a personagem que não pedia desculpa por continuar existindo depois de ter perdido tudo. Isso importava pra mim. Numa época em que eu não sabia como fazer isso."},
   {t:"fala", p:1, de:"sylvanas", ancora:[195,995], texto:"Personagem."},
   {t:"fala", p:2, de:"nathan", ancora:[595,1000], texto:"É a palavra errada. Eu sei."},
   {t:"fala", p:3, de:"sylvanas", ancora:[995,995], texto:"É a palavra exata. E é por isso que ela é insuportável."},
   {t:"narra", p:4, texto:"Ela se afastou dois passos e olhou para o horizonte de costelas de ferro. Por um momento, ele viu — realmente viu — o quanto ela estava cansada."},
   {t:"fala", p:5, de:"sylvanas", ancora:[945,1845], texto:"Então você sabe. Sobre Quel'Thalas. Sobre Arthas. Sobre o que eu fiz depois. Sobre a Torre de Lordaeron. Sobre tudo."},
   {t:"fala", p:5, de:"nathan", ancora:[700,1855], texto:"Sei."}
  ]},
/* ==================== PÁGINA 8 — História e pessoa (quadros provisórios) ==================== */
{ img:"img/page08.jpg", rascunho:true,
  paineis:[
   {r:[30,30,600,420]},     // 0 rosto dela
   {r:[650,30,600,420]},    // 1 "Sim."
   {r:[30,470,1215,300]},   // 2 quem eu sou
   {r:[30,790,600,420]},    // 3 não faço mesmo
   {r:[650,790,600,420]},   // 4 nunca ouvi respirar
   {r:[30,1230,1215,660]}   // 5 vento
  ],
  elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[320,405], texto:"E ainda assim escolheu carregar o meu rosto no seu corpo."},
   {t:"fala", p:1, de:"nathan", ancora:[930,410], texto:"Sim."},
   {t:"fala", p:2, de:"sylvanas", ancora:[400,730], texto:"Você não faz ideia de quem eu sou."},
   {t:"narra", p:2, texto:"Havia nos olhos dela algo que ele só entenderia meses depois: desprezo — não por ele, mas pela possibilidade de ser admirada."},
   {t:"fala", p:3, de:"nathan", ancora:[310,1165], texto:"Não. Não faço mesmo."},
   {t:"narra", p:3, texto:"Ela franziu a testa, minimamente. Não era a resposta esperada."},
   {t:"fala", p:4, de:"nathan", ancora:[950,1160], texto:"Eu conheço a sua história — isso é diferente. Sei datas, nomes, batalhas, coisas que você fez, coisas que fizeram com você. Mas conhecer a história de alguém não significa conhecer a pessoa. Eu nunca ouvi você respirar antes de hoje."},
   {t:"narra", p:5, texto:"O vento da Gorja passou entre eles. Sylvanas não respondeu. Levou muito tempo para não responder."}
  ]},
/* ==================== PÁGINA 9 — A caminhada (quadros provisórios) ==================== */
{ img:"img/page09.jpg", rascunho:true,
  paineis:[
   {r:[30,30,600,300]},     // 0 não pode ficar
   {r:[650,30,600,300]},    // 1 como eu saio
   {r:[30,350,1215,330]},   // 2 não há portas
   {r:[30,700,1215,330]},   // 3 você luta
   {r:[30,1050,600,330]},   // 4 caratê
   {r:[650,1050,600,330]},  // 5 vem comigo
   {r:[30,1400,1215,490]}   // 6 regras de caminhada
  ],
  elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[310,300], texto:"Você não pode ficar aqui."},
   {t:"fala", p:1, de:"nathan", ancora:[940,300], texto:"Concordo plenamente. Como eu saio?"},
   {t:"fala", p:2, de:"sylvanas", ancora:[365,655], texto:"Você não sai. Isto é a Gorja — não há portas. Aquela criatura tinha companhia. Elas sempre têm."},
   {t:"fala", p:3, de:"sylvanas", ancora:[370,1005], texto:"Você luta. Desviou do primeiro golpe, não recuou depois, atacou uma articulação. Foi tudo terrivelmente insuficiente. Mas não foi burro."},
   {t:"fala", p:3, de:"nathan", ancora:[945,1010], texto:"Eu treinei caratê desde os oito anos. Serve para brigas de rua... não para aquilo."},
   {t:"fala", p:4, de:"sylvanas", ancora:[305,1350], texto:"O corpo já sabe obedecer. Isso poupa meses."},
   {t:"grito", p:5, de:"sylvanas", ancora:[795,1355], texto:"Você vem comigo."},
   {t:"fala", p:5, de:"nathan", ancora:[1150,1360], texto:"Assim? Sem mais interrogatório?"},
   {t:"fala", p:6, de:"sylvanas", ancora:[360,1800], texto:"O interrogatório continua. Simplesmente vai continuar enquanto caminhamos."},
   {t:"fala", p:6, de:"sylvanas", ancora:[610,1820], texto:"Você anda três passos atrás de mim. À esquerda — não à direita."},
   {t:"fala", p:6, de:"nathan", ancora:[860,1840], texto:"Por que não à direita?"},
   {t:"fala", p:6, de:"sylvanas", ancora:[1010,1850], texto:"Porque é o lado do qual eu atiro."},
   {t:"fala", p:6, de:"sylvanas", ancora:[1150,1830], texto:"Se eu mandar você correr, você corre. E não volta."},
   {t:"fala", p:6, de:"nathan", ancora:[1180,1865], texto:"Essa eu não prometo."}
  ]},
/* ==================== PÁGINA 10 — Fechamento (quadros provisórios) ==================== */
{ img:"img/page10.jpg", rascunho:true,
  paineis:[
   {r:[30,30,1215,430]},    // 0 sem condições
   {r:[30,480,600,380]},    // 1 olhar preciso
   {r:[650,480,600,380]},   // 2 promessa
   {r:[30,880,600,330]},    // 3 "Hm."
   {r:[650,880,600,330]},   // 4 não o assustou
   {r:[30,1230,1215,420]},  // 5 quatro anos
   {r:[30,1670,1215,220]}   // 6 letreiro
  ],
  elementos:[
   {t:"fala", p:0, de:"sylvanas", ancora:[360,415], texto:"Você entende que não tem absolutamente nenhuma condição de me ajudar."},
   {t:"fala", p:0, de:"nathan", ancora:[900,420], texto:"Entendo perfeitamente. Hoje."},
   {t:"narra", p:1, texto:"O olhar que ela deu não tinha raiva nem surpresa — só uma atenção súbita e muito precisa. Como quem reajusta a mira ao descobrir que o vento mudou."},
   {t:"fala", p:2, de:"nathan", ancora:[905,830], texto:"Prometer que eu vou correr e não voltar é uma promessa sobre a pessoa que eu sou. E eu prefiro não mentir sobre isso... no meu primeiro dia."},
   {t:"fala", p:3, de:"sylvanas", ancora:[310,1165], texto:"Hm."},
   {t:"narra", p:3, texto:"Muito baixo. Quase inaudível. Ela voltou a andar. Ele a seguiu — três passos atrás, à esquerda."},
   {t:"narra", p:4, texto:"Estranhamente, isso não o assustou."},
   {t:"narra", p:4, texto:"Isso o deixou curioso."},
   {t:"narra", p:5, texto:"Durante quatro anos, ele carregara o rosto dela no braço. E naquela noite, a primeira de muitas, percebeu que não sabia absolutamente nada sobre a mulher que tinha salvo sua vida."},
   {t:"letreiro", x:337, y:1782, w:600, texto:"FIM DO CAPÍTULO UM"}
  ]}
];
