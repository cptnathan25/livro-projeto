/* HQ "O Peso da Gorja" — Capítulo 1
   Diálogos 100% fielmente adaptados do romance.
   Coordenadas em espaço 1280x1920; o leitor escala automaticamente.
   Balões posicionados quadro a quadro sobre a arte final — nenhum balão
   (nem de fala, nem de narração) cobre os personagens.
   Mapeamento de arte: page03.jpg = "As três flechas" · page04.jpg = "Sylvanas". */
const PAGINAS = [
/* ============================ PÁGINA 1 — O despertar ============================ */
{ img:"img/page01.jpg", elementos:[
 {t:"narra", x:520, y:70, w:330, texto:"O último de que Nathan se lembrava era o brilho azulado do monitor apagando sozinho, às três e quarenta da manhã."},
 {t:"narra", x:60, y:310, w:330, tamanho:22, texto:"Acordou com o rosto apoiado em pedra. Fria. Áspera. Com cheiro de metal velho e coisa queimada há muito tempo."},
 {t:"narra", x:760, y:1360, w:380, tamanho:22, texto:"Moletom cinza. Calça de pijama. Um pé descalço, o outro com meia."},
 {t:"fala", x:120, y:1120, w:360, texto:"Certo... Isso é um sonho.", tx:420, ty:1260, de:"nathan"},
 {t:"sussurro", x:830, y:1100, w:360, texto:"A Gorja... eu estou na Gorja.", tx:690, ty:1320, de:"nathan"},
 {t:"sfx", x:1050, y:1820, w:180, texto:"CRRRACK", rot:-12, tamanho:34}
]},
/* ============================ PÁGINA 2 — A caçada ============================ */
{ img:"img/page02.jpg", elementos:[
 {t:"sfx", x:380, y:590, w:200, texto:"CRRRR", rot:-4, tamanho:40},
 {t:"sfx", x:150, y:700, w:170, texto:"VVVUSH", rot:-8, tamanho:36},
 {t:"fala", x:700, y:70, w:380, texto:"Filho da—! Parece uma porta de aço!", tx:800, ty:260, de:"nathan"},
 {t:"sfx", x:25, y:1265, w:180, texto:"PÁ!", rot:-10, tamanho:44},
 {t:"narra", x:820, y:1445, w:290, tamanho:20, texto:"Você não tem arma. Não tem armadura. Você tem talvez dez segundos."},
 {t:"fala", x:990, y:1655, w:250, texto:"Mais... força...!", tx:890, ty:1620, de:"nathan"},
 {t:"sfx", x:550, y:1830, w:300, texto:"CRRRAC", rot:-6, tamanho:42}
]},
/* ============================ PÁGINA 3 — As três flechas (arte: page03.jpg) ============================ */
{ img:"img/page03.jpg", elementos:[
 {t:"narra", x:430, y:45, w:180, tamanho:21, texto:"Inútil. Ele sabia que era inútil."},
 {t:"narra", x:990, y:45, w:220, tamanho:21, texto:"Ele não viu a flecha chegar. Viu o resultado."},
 {t:"sfx", x:85, y:700, w:130, texto:"THWIP", rot:-8, tamanho:34},
 {t:"sfx", x:360, y:700, w:130, texto:"THWIP", rot:-8, tamanho:34},
 {t:"sfx", x:635, y:700, w:130, texto:"THWIP", rot:-8, tamanho:34},
 {t:"narra", x:330, y:1318, w:340, tamanho:18, texto:"O corpo virou a mesma névoa cinza que pairava sobre tudo. Como se nunca tivesse sido outra coisa além de poeira organizada com má intenção."},
 {t:"narra", x:670, y:1330, w:180, tamanho:18, texto:"Passos leves, muito leves — o tipo de passo que só faz barulho quando quer fazer barulho."}
]},
/* ============================ PÁGINA 4 — Sylvanas (arte: page04.jpg) ============================ */
{ img:"img/page04.jpg", elementos:[
 {t:"fala", x:990, y:40, w:240, texto:"Você sabe meu nome.", tx:950, ty:150, de:"sylvanas"},
 {t:"fala", x:400, y:1185, w:170, tamanho:24, texto:"Sylvanas.", tx:280, ty:1270, de:"nathan", rouca:1},
 {t:"fala", x:60, y:1220, w:90, texto:"Sei.", tx:240, ty:1290, de:"nathan"},
 {t:"fala", x:1030, y:1210, w:200, texto:"Diga como.", tx:1000, ty:1280, de:"sylvanas"},
 {t:"narra", x:600, y:1185, w:260, tamanho:15, texto:"A garganta fechou. Não de medo — ou não só. Aquilo era um curto-circuito entre o que é real e o que é história."},
 {t:"fala", x:380, y:1310, w:230, tamanho:25, texto:"Você não vai acreditar.", tx:330, ty:1350, de:"nathan"},
 {t:"fala", x:1040, y:1300, w:210, tamanho:22, texto:"Isso é irrelevante. Diga mesmo assim.", tx:1020, ty:1420, de:"sylvanas"},
 {t:"fala", x:415, y:1430, w:430, tamanho:19, texto:"Eu dormi na minha casa. No meu mundo. Acordei aqui. Sem transição, sem portal, sem nada. Acordei de pijama numa pedra... e a primeira coisa que apareceu tentou me abrir ao meio.", tx:380, ty:1450, de:"nathan"},
 {t:"fala", x:1040, y:1620, w:200, tamanho:22, texto:"Obrigado, aliás. Por isso.", tx:1000, ty:1680, de:"nathan"},
 {t:"narra", x:1035, y:1780, w:205, tamanho:16, texto:"Ela não reagiu ao agradecimento. Nem para aceitar, nem para desprezar."}
]},
/* ============================ PÁGINA 5 — O jogo ============================ */
{ img:"img/page05.jpg", rascunho:true, elementos:[
 {t:"fala", x:80, y:60, w:320, texto:"Seu mundo.", tx:400, ty:420, de:"sylvanas"},
 {t:"fala", x:720, y:60, w:440, texto:"Outro mundo. Não Azeroth. Não... nada disso.", tx:900, ty:420, de:"nathan"},
 {t:"fala", x:70, y:730, w:480, texto:"E nesse outro mundo... as pessoas conhecem o meu nome.", tx:350, ty:905, de:"sylvanas"},
 {t:"fala", x:690, y:530, w:320, texto:"Conhecem. Milhões delas.", tx:900, ty:880, de:"nathan"},
 {t:"narra", x:690, y:680, w:280, tamanho:22, texto:"O silêncio ficou muito mais frio."},
 {t:"fala", x:1000, y:650, w:200, texto:"Explique.", tx:790, ty:870, de:"sylvanas"},
 {t:"fala", x:80, y:980, w:620, texto:"No meu mundo, Azeroth existe dentro de um jogo. Chama-se World of Warcraft. As pessoas se sentam diante de uma máquina, controlam personagens, viajam por Ventobravo, Orgrimmar, Tirisfal... Eu passei anos fazendo isso.", tx:950, ty:1310, de:"nathan"},
 {t:"fala", x:70, y:1420, w:220, texto:"Um jogo.", tx:200, ty:1830, de:"sylvanas"},
 {t:"fala", x:200, y:1560, w:200, texto:"Um jogo.", tx:280, ty:1800, de:"nathan"},
 {t:"fala", x:480, y:1400, w:330, texto:"E dentro desse jogo existe alguém chamada Sylvanas Windrunner.", tx:620, ty:1840, de:"sylvanas"},
 {t:"fala", x:470, y:1580, w:350, texto:"Existe a sua história inteira. Desde Quel'Thalas.", tx:680, ty:1820, de:"nathan"},
 {t:"fala", x:890, y:1400, w:330, tamanho:22, texto:"Você é uma armadilha, um espião ou um lunático. Nenhuma das três hipóteses recomenda que eu o deixe vivo.", tx:1040, ty:1850, de:"sylvanas"},
 {t:"fala", x:880, y:1630, w:350, texto:"Se eu fosse uma armadilha... eu teria vindo com sapatos.", tx:1080, ty:1830, de:"nathan"}
]},
/* ============================ PÁGINA 6 — A tatuagem ============================ */
{ img:"img/page06.jpg", rascunho:true, elementos:[
 {t:"grito", x:80, y:70, w:300, texto:"Levante-se.", tx:400, ty:460, de:"sylvanas"},
 {t:"narra", x:640, y:60, w:560, tamanho:22, texto:"Ela o contornou por completo, avaliando o tecido do moletom, o zíper, a etiqueta na nuca, a meia imunda — e a ausência total de arma."},
 {t:"fala", x:80, y:310, w:340, texto:"Suas roupas são absurdas.", tx:350, ty:470, de:"sylvanas"},
 {t:"fala", x:720, y:320, w:300, texto:"Elas são de dormir.", tx:860, ty:470, de:"nathan"},
 {t:"fala", x:80, y:590, w:300, texto:"Você quer uma prova?", tx:520, ty:840, de:"nathan"},
 {t:"fala", x:820, y:590, w:220, texto:"Quero.", tx:720, ty:840, de:"sylvanas"},
 {t:"narra", x:60, y:930, w:680, tamanho:22, texto:"A terceira hesitação foi diferente. As outras foram cautela. Aquela era vergonha. Ele arregaçou a manga direita."},
 {t:"fala", x:800, y:950, w:360, texto:"Isso está na sua pele.", tx:660, ty:1180, de:"sylvanas"},
 {t:"fala", x:820, y:1160, w:320, texto:"Permanentemente.", tx:700, ty:1300, de:"sylvanas"},
 {t:"fala", x:80, y:1240, w:160, texto:"Está.", tx:420, ty:1330, de:"nathan"},
 {t:"fala", x:80, y:1360, w:320, texto:"Permanentemente.", tx:480, ty:1390, de:"nathan"},
 {t:"narra", x:60, y:1510, w:620, tamanho:22, texto:"A mão dela era fria. Não fria de morto — fria de coisa que parou de precisar ser quente."},
 {t:"fala", x:460, y:1720, w:220, texto:"Por quê?", tx:580, ty:1860, de:"sylvanas"}
]},
/* ============================ PÁGINA 7 — A resposta ============================ */
{ img:"img/page07.jpg", rascunho:true, elementos:[
 {t:"fala", x:70, y:70, w:620, texto:"Porque a sua história me acompanhou num período em que eu não estava bem. Você era a personagem que não pedia desculpa por continuar existindo depois de ter perdido tudo. Isso importava pra mim. Numa época em que eu não sabia como fazer isso.", tx:1030, ty:560, de:"nathan"},
 {t:"fala", x:70, y:660, w:240, texto:"Personagem.", tx:280, ty:980, de:"sylvanas"},
 {t:"fala", x:320, y:790, w:280, texto:"É a palavra errada. Eu sei.", tx:450, ty:1000, de:"nathan"},
 {t:"fala", x:690, y:660, w:420, texto:"É a palavra exata. E é por isso que ela é insuportável.", tx:950, ty:990, de:"sylvanas"},
 {t:"narra", x:70, y:1080, w:600, tamanho:22, texto:"Ela se afastou dois passos e olhou para o horizonte de costelas de ferro. Por um momento, ele viu — realmente viu — o quanto ela estava cansada."},
 {t:"fala", x:660, y:1440, w:520, texto:"Então você sabe. Sobre Quel'Thalas. Sobre Arthas. Sobre o que eu fiz depois. Sobre a Torre de Lordaeron. Sobre tudo.", tx:920, ty:1850, de:"sylvanas"},
 {t:"fala", x:90, y:1560, w:150, texto:"Sei.", tx:300, ty:1840, de:"nathan"}
]},
/* ============================ PÁGINA 8 — História e pessoa ============================ */
{ img:"img/page08.jpg", rascunho:true, elementos:[
 {t:"fala", x:70, y:70, w:520, texto:"E ainda assim escolheu carregar o meu rosto no seu corpo.", tx:480, ty:430, de:"sylvanas"},
 {t:"fala", x:660, y:110, w:140, texto:"Sim.", tx:780, ty:430, de:"nathan"},
 {t:"fala", x:70, y:530, w:360, texto:"Você não faz ideia de quem eu sou.", tx:280, ty:880, de:"sylvanas"},
 {t:"narra", x:70, y:700, w:470, tamanho:22, texto:"Havia nos olhos dela algo que ele só entenderia meses depois: desprezo — não por ele, mas pela possibilidade de ser admirada."},
 {t:"fala", x:690, y:530, w:300, texto:"Não. Não faço mesmo.", tx:940, ty:880, de:"nathan"},
 {t:"narra", x:690, y:680, w:460, tamanho:22, texto:"Ela franziu a testa, minimamente. Não era a resposta esperada."},
 {t:"fala", x:70, y:980, w:660, texto:"Eu conheço a sua história — isso é diferente. Sei datas, nomes, batalhas, coisas que você fez, coisas que fizeram com você. Mas conhecer a história de alguém não significa conhecer a pessoa. Eu nunca ouvi você respirar antes de hoje.", tx:1020, ty:1380, de:"nathan"},
 {t:"narra", x:640, y:1520, w:540, tamanho:22, texto:"O vento da Gorja passou entre eles. Sylvanas não respondeu. Levou muito tempo para não responder."}
]},
/* ============================ PÁGINA 9 — A caminhada ============================ */
{ img:"img/page09.jpg", rascunho:true, elementos:[
 {t:"fala", x:70, y:70, w:340, texto:"Você não pode ficar aqui.", tx:350, ty:300, de:"sylvanas"},
 {t:"fala", x:820, y:70, w:380, texto:"Concordo plenamente. Como eu saio?", tx:950, ty:300, de:"nathan"},
 {t:"fala", x:70, y:390, w:500, texto:"Você não sai. Isto é a Gorja — não há portas. Aquela criatura tinha companhia. Elas sempre têm.", tx:400, ty:620, de:"sylvanas"},
 {t:"fala", x:70, y:700, w:560, texto:"Você luta. Desviou do primeiro golpe, não recuou depois, atacou uma articulação. Foi tudo terrivelmente insuficiente. Mas não foi burro.", tx:450, ty:940, de:"sylvanas"},
 {t:"fala", x:700, y:720, w:480, texto:"Eu treinei caratê desde os oito anos. Serve para brigas de rua... não para aquilo.", tx:900, ty:940, de:"nathan"},
 {t:"fala", x:70, y:1020, w:340, texto:"O corpo já sabe obedecer. Isso poupa meses.", tx:300, ty:1250, de:"sylvanas"},
 {t:"grito", x:480, y:1000, w:330, texto:"Você vem comigo.", tx:600, ty:1250, de:"sylvanas"},
 {t:"fala", x:860, y:1020, w:360, texto:"Assim? Sem mais interrogatório?", tx:1000, ty:1250, de:"nathan"},
 {t:"fala", x:70, y:1340, w:520, texto:"O interrogatório continua. Simplesmente vai continuar enquanto caminhamos.", tx:350, ty:1570, de:"sylvanas"},
 {t:"fala", x:640, y:1340, w:480, texto:"Você anda três passos atrás de mim. À esquerda — não à direita.", tx:850, ty:1570, de:"sylvanas"},
 {t:"fala", x:70, y:1660, w:300, texto:"Por que não à direita?", tx:250, ty:1850, de:"nathan"},
 {t:"fala", x:420, y:1660, w:360, texto:"Porque é o lado do qual eu atiro.", tx:560, ty:1850, de:"sylvanas"},
 {t:"fala", x:820, y:1620, w:400, texto:"Se eu mandar você correr, você corre. E não volta.", tx:1000, ty:1850, de:"sylvanas"},
 {t:"fala", x:880, y:1760, w:300, texto:"Essa eu não prometo.", tx:1020, ty:1875, de:"nathan"}
]},
/* ============================ PÁGINA 10 — Fechamento ============================ */
{ img:"img/page10.jpg", rascunho:true, elementos:[
 {t:"fala", x:70, y:70, w:520, texto:"Você entende que não tem absolutamente nenhuma condição de me ajudar.", tx:450, ty:420, de:"sylvanas"},
 {t:"fala", x:820, y:70, w:340, texto:"Entendo perfeitamente. Hoje.", tx:950, ty:420, de:"nathan"},
 {t:"narra", x:70, y:510, w:540, tamanho:22, texto:"O olhar que ela deu não tinha raiva nem surpresa — só uma atenção súbita e muito precisa. Como quem reajusta a mira ao descobrir que o vento mudou."},
 {t:"fala", x:70, y:860, w:620, texto:"Prometer que eu vou correr e não voltar é uma promessa sobre a pessoa que eu sou. E eu prefiro não mentir sobre isso... no meu primeiro dia.", tx:700, ty:1150, de:"nathan"},
 {t:"fala", x:1050, y:900, w:140, texto:"Hm.", tx:1120, ty:1150, de:"sylvanas"},
 {t:"narra", x:70, y:1260, w:560, tamanho:22, texto:"Muito baixo. Quase inaudível. Ela voltou a andar. Ele a seguiu — três passos atrás, à esquerda."},
 {t:"narra", x:70, y:1600, w:620, tamanho:22, texto:"Durante quatro anos, ele carregara o rosto dela no braço. E naquela noite, a primeira de muitas, percebeu que não sabia absolutamente nada sobre a mulher que tinha salvo sua vida."},
 {t:"narra", x:740, y:1600, w:420, tamanho:22, texto:"Estranhamente, isso não o assustou."},
 {t:"narra", x:740, y:1720, w:380, tamanho:22, texto:"Isso o deixou curioso."},
 {t:"letreiro", x:340, y:1810, w:600, texto:"FIM DO CAPÍTULO UM"}
]}
];
