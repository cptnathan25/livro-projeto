/* HQ "O Peso da Gorja" — Capítulo 1
   Diálogos 100% fielmente adaptados do romance.
   Coordenadas em espaço 1280x1920; o leitor escala automaticamente. */
const PAGINAS = [
/* ============================ PÁGINA 1 ============================ */
{ img:"img/page01.jpg", elementos:[
 {t:"narra", x:60, y:70, w:470, texto:"O último de que Nathan se lembrava era o brilho azulado do monitor apagando sozinho, às três e quarenta da manhã."},
 {t:"narra", x:120, y:660, w:470, texto:"Acordou com o rosto apoiado em pedra. Fria. Áspera. Com cheiro de metal velho e coisa queimada há muito tempo."},
 {t:"narra", x:905, y:700, w:300, texto:"Moletom cinza. Calça de pijama. Um pé descalço, o outro com meia."},
 {t:"fala", x:70, y:1250, w:380, texto:"Certo... Isso é um sonho.", tx:625, ty:1430, de:"nathan"},
 {t:"fala", x:60, y:1592, w:400, texto:"A Gorja... eu estou na Gorja.", tx:610, ty:1785, de:"nathan"},
 {t:"sfx", x:1080, y:1700, w:180, texto:"CRRRACK", rot:-12, tamanho:34}
]},
/* ============================ PÁGINA 2 ============================ */
{ img:"img/page02.jpg", elementos:[
 {t:"sfx", x:70, y:500, w:220, texto:"CRRRR", rot:-4, tamanho:40},
 {t:"sfx", x:130, y:700, w:210, texto:"VVVUSH", rot:-8, tamanho:36},
 {t:"fala", x:770, y:940, w:420, texto:"Filho da—! Parece uma porta de aço!", tx:720, ty:830, de:"nathan"},
 {t:"sfx", x:60, y:1218, w:180, texto:"PÁ!", rot:-10, tamanho:44},
 {t:"narra", x:480, y:1218, w:560, texto:"Você não tem arma. Não tem armadura. Você tem talvez dez segundos."},
 {t:"fala", x:80, y:1720, w:340, texto:"Mais... força...!", tx:840, ty:1680, de:"nathan"},
 {t:"sfx", x:420, y:1660, w:300, texto:"CRRRAC", rot:-6, tamanho:42}
]},
/* ============================ PÁGINA 3 ============================ */
{ img:"img/page03.jpg", elementos:[
 {t:"narra", x:40, y:40, w:560, texto:"Ele não viu a flecha chegar. Viu o resultado."},
 {t:"narra", x:800, y:60, w:420, texto:"Inútil. Ele sabia que era inútil."},
 {t:"sfx", x:40, y:712, w:200, texto:"THWIP", rot:-8, tamanho:34},
 {t:"sfx", x:285, y:712, w:200, texto:"THWIP", rot:-8, tamanho:34},
 {t:"sfx", x:530, y:712, w:200, texto:"THWIP", rot:-8, tamanho:34},
 {t:"narra", x:60, y:1400, w:520, texto:"O corpo virou a mesma névoa cinza que pairava sobre tudo. Como se nunca tivesse sido outra coisa além de poeira organizada com má intenção."},
 {t:"narra", x:700, y:1360, w:520, texto:"Passos leves, muito leves — o tipo de passo que só faz barulho quando quer fazer barulho."}
]},
/* ============================ PÁGINA 4 ============================ */
{ img:"img/page04.jpg", elementos:[
 {t:"fala", x:60, y:50, w:300, texto:"Sylvanas.", tx:360, ty:390, de:"nathan", rouca:1},
 {t:"fala", x:620, y:50, w:430, texto:"Você sabe meu nome.", tx:830, ty:175, de:"sylvanas"},
 {t:"narra", x:110, y:290, w:415, texto:"A garganta fechou. Não de medo — ou não só. Aquilo era um curto-circuito entre o que é real e o que é história."},
 {t:"fala", x:70, y:850, w:210, texto:"Sei.", tx:290, ty:1030, de:"nathan"},
 {t:"fala", x:720, y:860, w:380, texto:"Diga como.", tx:905, ty:1020, de:"sylvanas"},
 {t:"fala", x:55, y:1150, w:360, texto:"Você não vai acreditar.", tx:470, ty:1265, de:"nathan"},
 {t:"fala", x:700, y:1150, w:490, texto:"Isso é irrelevante. Diga mesmo assim.", tx:920, ty:1265, de:"sylvanas"},
 {t:"fala", x:45, y:1475, w:600, texto:"Eu dormi na minha casa. No meu mundo. Acordei aqui. Sem transição, sem portal, sem nada. Acordei de pijama numa pedra... e a primeira coisa que apareceu tentou me abrir ao meio.", tx:500, ty:1600, de:"nathan"},
 {t:"fala", x:730, y:1500, w:430, texto:"Obrigado, aliás. Por isso.", tx:880, ty:1640, de:"nathan"},
 {t:"narra", x:700, y:1760, w:520, texto:"Ela não reagiu ao agradecimento. Nem para aceitar, nem para desprezar."}
]},
/* ============================ PÁGINA 5 ============================ */
{ img:"img/page05.jpg", rascunho:true, elementos:[
 {t:"fala", x:760, y:60, w:380, texto:"Seu mundo.", tx:560, ty:200, de:"sylvanas"},
 {t:"fala", x:120, y:120, w:520, texto:"Outro mundo. Não Azeroth. Não... nada disso.", tx:620, ty:260, de:"nathan"},
 {t:"fala", x:140, y:460, w:700, texto:"E nesse outro mundo... as pessoas conhecem o meu nome.", tx:520, ty:620, de:"sylvanas"},
 {t:"fala", x:120, y:820, w:430, texto:"Conhecem. Milhões delas.", tx:500, ty:920, de:"nathan"},
 {t:"narra", x:600, y:840, w:430, texto:"O silêncio ficou muito mais frio."},
 {t:"fala", x:640, y:980, w:320, texto:"Explique.", tx:560, ty:900, de:"sylvanas"},
 {t:"fala", x:110, y:1160, w:1080, texto:"No meu mundo, Azeroth existe dentro de um jogo. Chama-se World of Warcraft. As pessoas se sentam diante de uma máquina, controlam personagens, viajam por Ventobravo, Orgrimmar, Tirisfal... Eu passei anos fazendo isso.", tx:900, ty:1300, de:"nathan"},
 {t:"fala", x:120, y:1460, w:300, texto:"Um jogo.", tx:500, ty:1520, de:"sylvanas"},
 {t:"fala", x:470, y:1460, w:240, texto:"Um jogo.", tx:720, ty:1530, de:"nathan"},
 {t:"fala", x:120, y:1580, w:760, texto:"E dentro desse jogo existe alguém chamada Sylvanas Windrunner.", tx:560, ty:1640, de:"sylvanas"},
 {t:"fala", x:120, y:1710, w:620, texto:"Existe a sua história inteira. Desde Quel'Thalas.", tx:760, ty:1770, de:"nathan"},
 {t:"fala", x:90, y:1830, w:640, texto:"Você é uma armadilha, um espião ou um lunático. Nenhuma das três hipóteses recomenda que eu o deixe vivo.", tx:660, ty:1880, de:"sylvanas"},
 {t:"fala", x:760, y:1820, w:430, texto:"Se eu fosse uma armadilha... eu teria vindo com sapatos.", tx:900, ty:1880, de:"nathan"}
]},
/* ============================ PÁGINA 6 — A tatuagem ============================ */
{ img:"img/page06.jpg", rascunho:true, elementos:[
 {t:"grito", x:80, y:50, w:300, texto:"Levante-se.", tx:300, ty:250, de:"sylvanas"},
 {t:"narra", x:760, y:60, w:430, texto:"Ela o contornou por completo, avaliando o tecido do moletom, o zíper, a etiqueta na nuca, a meia imunda — e a ausência total de arma."},
 {t:"fala", x:90, y:520, w:430, texto:"Suas roupas são absurdas.", tx:420, ty:700, de:"sylvanas"},
 {t:"fala", x:700, y:540, w:400, texto:"Elas são de dormir.", tx:760, ty:700, de:"nathan"},
 {t:"fala", x:110, y:820, w:420, texto:"Você quer uma prova?", tx:480, ty:940, de:"nathan"},
 {t:"fala", x:740, y:830, w:240, texto:"Quero.", tx:600, ty:950, de:"sylvanas"},
 {t:"narra", x:80, y:1000, w:1120, texto:"A terceira hesitação foi diferente. As outras foram cautela. Aquela era vergonha. Ele arregaçou a manga direita."},
 {t:"fala", x:700, y:1180, w:470, texto:"Isso está na sua pele.", tx:620, ty:1330, de:"sylvanas"},
 {t:"fala", x:720, y:1340, w:220, texto:"Está.", tx:580, ty:1400, de:"nathan"},
 {t:"fala", x:690, y:1450, w:480, texto:"Permanentemente.", tx:620, ty:1540, de:"sylvanas"},
 {t:"fala", x:720, y:1570, w:300, texto:"Permanentemente.", tx:600, ty:1640, de:"nathan"},
 {t:"narra", x:70, y:1680, w:600, texto:"A mão dela era fria. Não fria de morto — fria de coisa que parou de precisar ser quente."},
 {t:"fala", x:830, y:1745, w:240, texto:"Por quê?", tx:1010, ty:1840, de:"sylvanas"}
]},
/* ============================ PÁGINA 7 — A resposta ============================ */
{ img:"img/page07.jpg", rascunho:true, elementos:[
 {t:"fala", x:70, y:70, w:1140, texto:"Porque a sua história me acompanhou num período em que eu não estava bem. Você era a personagem que não pedia desculpa por continuar existindo depois de ter perdido tudo. Isso importava pra mim. Numa época em que eu não sabia como fazer isso.", tx:1150, ty:560, de:"nathan"},
 {t:"fala", x:100, y:720, w:280, texto:"Personagem.", tx:400, ty:860, de:"sylvanas"},
 {t:"fala", x:420, y:720, w:360, texto:"É a palavra errada. Eu sei.", tx:620, ty:860, de:"nathan"},
 {t:"fala", x:820, y:700, w:380, texto:"É a palavra exata. E é por isso que ela é insuportável.", tx:760, ty:860, de:"sylvanas"},
 {t:"narra", x:90, y:980, w:620, texto:"Ela se afastou dois passos e olhou para o horizonte de costelas de ferro. Por um momento, ele viu — realmente viu — o quanto ela estava cansada."},
 {t:"fala", x:90, y:1300, w:840, texto:"Então você sabe. Sobre Quel'Thalas. Sobre Arthas. Sobre o que eu fiz depois. Sobre a Torre de Lordaeron. Sobre tudo.", tx:950, ty:1280, de:"sylvanas"},
 {t:"fala", x:100, y:1620, w:200, texto:"Sei.", tx:320, ty:1740, de:"nathan"}
]},
/* ============================ PÁGINA 8 — História e pessoa ============================ */
{ img:"img/page08.jpg", rascunho:true, elementos:[
 {t:"fala", x:260, y:90, w:820, texto:"E ainda assim escolheu carregar o meu rosto no seu corpo.", tx:300, ty:260, de:"sylvanas"},
 {t:"fala", x:120, y:330, w:180, texto:"Sim.", tx:280, ty:430, de:"nathan"},
 {t:"fala", x:180, y:600, w:720, texto:"Você não faz ideia de quem eu sou.", tx:760, ty:820, de:"sylvanas"},
 {t:"narra", x:120, y:880, w:520, texto:"Havia nos olhos dela algo que ele só entenderia meses depois: desprezo — não por ele, mas pela possibilidade de ser admirada."},
 {t:"fala", x:120, y:1100, w:380, texto:"Não. Não faço mesmo.", tx:430, ty:1240, de:"nathan"},
 {t:"narra", x:640, y:1120, w:540, texto:"Ela franziu a testa, minimamente. Não era a resposta esperada."},
 {t:"fala", x:70, y:1340, w:1150, texto:"Eu conheço a sua história — isso é diferente. Sei datas, nomes, batalhas, coisas que você fez, coisas que fizeram com você. Mas conhecer a história de alguém não significa conhecer a pessoa. Eu nunca ouvi você respirar antes de hoje.", tx:1150, ty:1500, de:"nathan"},
 {t:"narra", x:140, y:1740, w:900, texto:"O vento da Gorja passou entre eles. Sylvanas não respondeu. Levou muito tempo para não responder."}
]},
/* ============================ PÁGINA 9 — A caminhada ============================ */
{ img:"img/page09.jpg", rascunho:true, elementos:[
 {t:"fala", x:70, y:46, w:360, texto:"Você não pode ficar aqui.", tx:330, ty:240, de:"sylvanas"},
 {t:"fala", x:500, y:46, w:380, texto:"Concordo plenamente. Como eu saio?", tx:760, ty:240, de:"nathan"},
 {t:"fala", x:70, y:200, w:620, texto:"Você não sai. Isto é a Gorja — não há portas. Aquela criatura tinha companhia. Elas sempre têm.", tx:330, ty:340, de:"sylvanas"},
 {t:"fala", x:70, y:420, w:720, texto:"Você luta. Desviou do primeiro golpe, não recuou depois, atacou uma articulação. Foi tudo terrivelmente insuficiente. Mas não foi burro.", tx:1020, ty:640, de:"sylvanas"},
 {t:"fala", x:70, y:730, w:580, texto:"Eu treinei caratê desde os oito anos. Serve para brigas de rua... não para aquilo.", tx:330, ty:900, de:"nathan"},
 {t:"fala", x:720, y:740, w:490, texto:"O corpo já sabe obedecer. Isso poupa meses.", tx:980, ty:900, de:"sylvanas"},
 {t:"grito", x:70, y:1000, w:330, texto:"Você vem comigo.", tx:300, ty:1140, de:"sylvanas"},
 {t:"fala", x:440, y:1010, w:370, texto:"Assim? Sem mais interrogatório?", tx:640, ty:1130, de:"nathan"},
 {t:"fala", x:70, y:1160, w:660, texto:"O interrogatório continua. Simplesmente vai continuar enquanto caminhamos.", tx:420, ty:1250, de:"sylvanas"},
 {t:"fala", x:70, y:1330, w:540, texto:"Você anda três passos atrás de mim. À esquerda — não à direita.", tx:360, ty:1470, de:"sylvanas"},
 {t:"fala", x:660, y:1330, w:300, texto:"Por que não à direita?", tx:820, ty:1470, de:"nathan"},
 {t:"fala", x:620, y:1470, w:580, texto:"Porque é o lado do qual eu atiro.", tx:900, ty:1540, de:"sylvanas"},
 {t:"fala", x:70, y:1580, w:560, texto:"Se eu mandar você correr, você corre. E não volta.", tx:420, ty:1700, de:"sylvanas"},
 {t:"fala", x:680, y:1600, w:360, texto:"Essa eu não prometo.", tx:860, ty:1700, de:"nathan"}
]},
/* ============================ PÁGINA 10 — Fechamento ============================ */
{ img:"img/page10.jpg", rascunho:true, elementos:[
 {t:"fala", x:120, y:90, w:700, texto:"Você entende que não tem absolutamente nenhuma condição de me ajudar.", tx:900, ty:420, de:"sylvanas"},
 {t:"fala", x:120, y:250, w:420, texto:"Entendo perfeitamente. Hoje.", tx:430, ty:420, de:"nathan"},
 {t:"narra", x:760, y:300, w:420, texto:"O olhar que ela deu não tinha raiva nem surpresa — só uma atenção súbita e muito precisa. Como quem reajusta a mira ao descobrir que o vento mudou."},
 {t:"fala", x:90, y:620, w:760, texto:"Prometer que eu vou correr e não voltar é uma promessa sobre a pessoa que eu sou. E eu prefiro não mentir sobre isso... no meu primeiro dia.", tx:520, ty:760, de:"nathan"},
 {t:"fala", x:1000, y:860, w:200, texto:"Hm.", tx:1120, ty:1010, de:"sylvanas"},
 {t:"narra", x:90, y:900, w:560, texto:"Muito baixo. Quase inaudível. Ela voltou a andar. Ele a seguiu — três passos atrás, à esquerda."},
 {t:"narra", x:90, y:1180, w:560, texto:"Durante quatro anos, ele carregara o rosto dela no braço. E naquela noite, a primeira de muitas, percebeu que não sabia absolutamente nada sobre a mulher que tinha salvo sua vida."},
 {t:"narra", x:700, y:1480, w:500, texto:"Estranhamente, isso não o assustou."},
 {t:"narra", x:700, y:1610, w:500, texto:"Isso o deixou curioso."},
 {t:"letreiro", x:320, y:1818, w:640, texto:"FIM DO CAPÍTULO UM"}
]}
];
