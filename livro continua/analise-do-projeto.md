# 🔍 Análise Completa — "O Peso da Gorja"

## ⭐ O que é EXCEPCIONAL (parabéns!)

### 🎨 Design e Estética
- **Paleta temática brilhante** — extrair cores de capturas oficiais da Gorja e criar 3 arcos emocionais (cinza-frio → violeta → âmbar) é design de altíssimo nível
- **Motor de paleta com interpolação contínua** — usar `requestAnimationFrame` + mistura em espaço quadrático para transições suaves entre livros é engenharia de front-end séria
- **Selo SVG inline** com anéis girando — leve, nítido e temático
- **Tipografia com `clamp()`** — escalonamento fluido perfeito

### ⚡ Performance
- **`contain: strict`** nas camadas atmosféricas — isola repaints
- **`will-change` + `translate3d`** — composição na GPU
- **Sem `background-attachment: fixed`** — evita repaints massivos
- **`prefers-reduced-motion` respeitado** em todos os níveis
- **Adaptação a hardware fraco** (`hardwareConcurrency`, `deviceMemory`)
- **Brasas adaptativas** — quantidade reduzida em mobile/dispositivos fracos
- **IntersectionObserver** para parallax — só anima quando visível

### 🧠 JavaScript
- **Visor com navegação completa** — teclado (←/→/Esc), toque (swipe), mouse
- **Parallax com `requestAnimationFrame`** + throttle correto
- **IIFE pattern** — nada polui o escopo global
- **Smoothstep** para transições de cor progressivas

### ✍️ Conteúdo
- **A escrita é extraordinária** — prosa literária de verdade, diálogos afiados, ritmo cinematográfico
- **Estrutura narrativa** bem planejada em 3 livros com arcos distintos
- **Fichas de personagem** detalhadas e envolventes
- **Mapa interativo** com SVG + pinos clicáveis

---

## 🚨 Problemas que Precisam de Atenção

### 1. CSS e JS Duplicados em TODOS os Arquivos — CRÍTICO
**Impacto: ~1.5 MB de CSS + ~250 KB de JS desnecessários**

Cada um dos 27 arquivos HTML contém **~1.300 linhas de CSS inline** e **~350 linhas de JS inline** — exatamente o mesmo código copiado e colado. Isso significa:

- Cada página carrega ~55 KB de CSS + ~10 KB de JS desnecessários
- 27 arquivos × 55 KB = **~1.5 MB de CSS duplicado** no total
- Qualquer mudança exige editar 27 arquivos

**Solução:** Extrair para arquivos externos:
```html
<link rel="stylesheet" href="css/tema.css">
<script src="js/atmosfera.js" defer></script>
<script src="js/paleta.js" defer></script>
<script src="js/visor.js" defer></script>
```

### 2. Bug: Variável `--ouro` Não Existe — BUG
Na galeria, os links usam `color:var(--ouro)` mas essa variável **nunca foi declarada** no CSS:
```css
/* galeria.html, linhas dos .gcard .cap span a */
style="color:var(--ouro)"  /* ← não existe, renderiza como cor inicial (preto/herdado) */
```
**Solução:** Usar `var(--ceu-cl)` ou `var(--alma)` no lugar.

### 3. Sem Meta Tags de SEO e Compartilhamento
Faltam em todas as páginas:
```html
<meta name="description" content="Uma história original ambientada no universo de World of Warcraft...">
<meta property="og:title" content="O Peso da Gorja">
<meta property="og:description" content="...">
<meta property="og:image" content="img/capa.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://seu-dominio.com/index.html">
```

### 4. Sem Favicon
```html
<link rel="icon" href="img/selo.png" type="image/png">
```

### 5. Imagens Sem `width`/`height` e Sem `loading="lazy"`
**Impacto: Layout Shift (CLS) e carregamento lento**

As imagens da galeria, fichas e ilustrações não têm dimensões declaradas nem lazy loading:
```html
<!-- Antes -->
<img src="img/sylvanas.jpg" alt="Sylvanas Windrunner">

<!-- Depois -->
<img src="img/sylvanas.jpg" alt="Sylvanas Windrunner" 
     width="800" height="600" loading="lazy" decoding="async">
```

### 6. HTML Semântico Incompleto
O conteúdo principal está em `<div>` genéricas. Deveria usar:
```html
<main>
  <article>
    <header class="cabec">...</header>
    <div class="texto">...</div>
  </article>
</main>
```

### 7. Sem Skip-Link (Acessibilidade)
Leitores de tela precisam pular direto para o conteúdo:
```html
<body>
<a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
<header class="topbar">...
<main id="conteudo">...
```

### 8. Contraste de Cor — Alguns Textos Falham
`--tinta-suave` (#a89a8d) sobre o fundo escuro (#0b0706) tem contraste de ~4.2:1 — passa no AA para texto grande mas **falha no AA para texto normal** (precisa 4.5:1).

**Solução:** Clarear um pouco:
```css
--tinta-suave: #b5a89b; /* contraste ~5:1 */
```

### 9. Navegação Mobile — Sem Menu Hamburger
A `.topbar nav` com `flex-wrap:wrap` pode empilhar links e empurrar o conteúdo para baixo em telas pequenas.

**Solução:** Menu hamburger em telas < 640px.

### 10. Sem `<meta name="theme-color">` para Mobile
```html
<meta name="theme-color" content="#0b0706">
```

---

## 💡 Sugestões de Melhoria

### 🔖 PWA / Leitura Offline
Para um site de leitura, um Service Worker seria incrível — o leitor poderia salvar capítulos para ler offline.

### 📖 Progresso de Leitura Salvo
Usar `localStorage` para salvar o último capítulo lido e mostrar "Continue lendo" na capa:
```js
localStorage.setItem('ultimo-cap', 'cap7.html');
```

### 🔤 Controle de Fonte para o Leitor
Botões para aumentar/diminuir tamanho da fonte do texto:
```
A- | A | A+
```

### 🌙 Modo Escuro/Claro
Apesar do tema escuro ser perfeito para a Gorja, um modo claro para leitura prolongada seria considerado.

### 🔗 Deep-linking nos Capítulos
Adicionar IDs nos parágrafos para permitir citar trechos específicos.

---

## 📊 Resumo das Prioridades

| Prioridade | Item | Esforço |
|---|---|---|
| 🔴 Alta | Extrair CSS/JS para arquivos externos | Médio |
| 🔴 Alta | Corrigir `var(--ouro)` na galeria | Baixo |
| 🟡 Média | Adicionar meta tags SEO/OG | Baixo |
| 🟡 Média | `loading="lazy"` + `width`/`height` nas imgs | Baixo |
| 🟡 Média | HTML semântico (`<main>`, `<article>`) | Baixo |
| 🟡 Média | Skip-link + acessibilidade | Baixo |
| 🟢 Baixa | Menu hamburger mobile | Médio |
| 🟢 Baixa | Favicon + theme-color | Baixo |
| 🟢 Baixa | Progresso de leitura (localStorage) | Baixo |
| 🟢 Baixa | PWA / Service Worker | Alto |

---

## 🏆 Veredito

**Nota: 9/10** — Este é um dos projetos de fã mais bem construídos que já vi. A qualidade do código front-end é profissional, o design é imersivo e a escrita é literária. Os problemas são quase todos de **organização** (código duplicado) e **polimento** (SEO, acessibilidade), não de conceito ou execução. O coração do projeto — a história, a atmosfera, a paleta dinâmica — é genuinamente impressionante.
