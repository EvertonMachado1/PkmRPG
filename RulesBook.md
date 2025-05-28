# Manual Básico para Editar o Livro de Regras

Este manual explica os padrões para formatar capítulos, títulos, textos, navegação e imagens, mantendo o estilo visual do livro.

---

## Estrutura Geral

Cada capítulo é um arquivo HTML separado, com esta estrutura base:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <title>Título do Capítulo</title>
  <link href="../css/output.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Georgia', serif;
      background-color: #f5f1e1;
      color: #3b2f2f;
    }
    .paper {
      background-color: #fdfaf3;
      border: 2px solid #d6c7a1;
      border-radius: 1rem;
      box-shadow: 0 0 10px rgba(180, 158, 125, 0.4);
      padding: 2rem;
      max-width: 800px;
      margin: auto;
    }
  </style>
</head>
<body class="p-10">
  <div class="max-w-4xl mx-auto py-12 px-4 border-4 border-[#b49e7d] rounded-3xl shadow-xl bg-[#eae3cd]">
    <div class="paper">

      <!-- Título principal do capítulo -->
      <h1 class="text-4xl font-bold mb-6 text-center">Título do Capítulo</h1>

      <!-- Título secundário -->
      <h2 class="text-2xl font-semibold mb-4">Seção Exemplo</h2>

      <!-- Texto do parágrafo -->
      <p class="mb-6 leading-relaxed text-lg">
        Aqui vai o texto do seu capítulo. Use parágrafos claros, bem espaçados para facilitar a leitura.
      </p>

      <!-- Imagem à esquerda com texto -->
      <div class="flex items-center gap-4 mb-6 text-center">
        <img src="/imagens/exemplo.jpg" alt="Imagem a esquerda" class="w-48 rounded border border-[#c8b68f]" />
        <p class="leading-relaxed text-lg">
          Texto que acompanha a imagem, alinhado ao lado dela, explicando o conteúdo relacionado.
        </p>
      </div>

        <!-- Imagem à direita com texto -->
        <div class="flex flex-row-reverse items-center gap-4 mb-6 text-center">
            <img src="/imagens/exemplo.jpg" alt="Imagem a direita" class="w-48 rounded border border-[#c8b68f]" />
            <p class="leading-relaxed text-lg">
                Texto que acompanha a imagem, alinhado ao lado dela, explicando o conteúdo relacionado.
            </p>
        </div>

      <!-- Imagem centralizada -->
      <div class="mb-6 text-center">
        <img src="/imagens/exemplo-centro.jpg" alt="Imagem centralizada" class="inline-block w-64 rounded border border-[#c8b68f]" />
      </div>

      <!-- Lista ordenada -->
      <ol class="list-decimal pl-6 mb-6 text-lg">
        <li>Primeiro passo do processo.</li>
        <li>Segundo passo do processo.</li>
      </ol>

      <!-- Bloco de código / dica -->
      <pre class="bg-[#f1e9d2] p-4 rounded border border-[#c8b68f] mb-6 overflow-x-auto">
        Rolagem de dado: d20 + modificador
      </pre>

      <!-- Navegação -->
      <div class="flex justify-between mt-10 text-sm font-semibold">
        <a href="/livro/cap0.html" class="px-4 py-2 rounded border border-[#c8b68f] bg-[#f1e9d2] hover:bg-[#e6dec4] transition">← Capítulo Anterior</a>
        <a href="/livro/index.html" class="px-4 py-2 rounded border border-[#c8b68f] bg-[#f1e9d2] hover:bg-[#e6dec4] transition">Índice</a>
        <a href="/livro/cap2.html" class="px-4 py-2 rounded border border-[#c8b68f] bg-[#f1e9d2] hover:bg-[#e6dec4] transition">Próximo →</a>
      </div>

    </div>
  </div>
</body>
</html>

````

---

# Adicionando comentários em HTML

Comentários são trechos de texto dentro do código HTML que **não aparecem na página** quando o navegador exibe o site. Eles servem para deixar anotações, explicações ou lembretes para quem estiver editando o código, sem interferir no conteúdo visível para o usuário.

---

## Sintaxe dos comentários em HTML

Para criar um comentário, basta envolver o texto entre as tags especiais `<!--` e `-->`, assim:

```html
<!-- Este é um comentário em HTML -->
````

Tudo que estiver entre `<!--` e `-->` será ignorado pelo navegador e não será renderizado na página.

---

## Para que os comentários são úteis?

* **Explicar partes do código** para facilitar o entendimento de quem for trabalhar depois.
* **Deixar lembretes** sobre o que precisa ser feito ou alterado.
* **Desativar temporariamente** trechos de código sem deletá-los, para testes.
* **Organizar o código** com seções e títulos invisíveis para o usuário.

---

## Exemplo prático

```html
<!-- Este é o título principal do capítulo -->
<h1>Título do Capítulo</h1>

<!-- Imagem à esquerda para ilustrar o texto -->
<img src="imagem.jpg" alt="Descrição da imagem" class="float-left mr-4" />

<p>Texto explicando o conteúdo relacionado à imagem.</p>
```

---

Lembre-se: comentários são apenas para o código, eles **não aparecem na página visualizada**, mas quem souber inspecionar o código fonte poderá vê-los.

---

## Padrões de Conteúdo

### Títulos de capítulo (principal)

```html
<h1 class="text-4xl font-bold mb-6 text-center">Título do Capítulo</h1>
```

* Centralizado, fonte grande e negrito.
* Usar somente 1 por capítulo.

---

### Títulos secundários (seções)

```html
<h2 class="text-2xl font-semibold mb-4">Título da Seção</h2>
```

* Tamanho grande, negrito, com espaçamento abaixo.

---

### Títulos terciários (subseções)

```html
<h3 class="text-xl font-semibold mb-3 italic">Título da Subseção</h3>
```

* Menor que `<h2>`, itálico, espaçamento médio.

---

### Texto normal

```html
<p class="mb-6 leading-relaxed text-lg">
  Texto do parágrafo aqui, com espaçamento entre parágrafos e boa leitura.
</p>
```

* Espaçamento de margem inferior e espaçamento confortável entre linhas.

---

### Imagens

* Toda imagem deve ser colocada dentro da pasta **/public/livro/imagens**.
* De preferencia a formatos **IMG** e **JPG** para melhor padronização do código.

```html
  <!-- Imagem à esquerda com texto -->
  <div class="flex items-center gap-4 mb-6 text-center">
    <img src="/imagens/exemplo.jpg" alt="Imagem a esquerda" class="w-48 rounded border border-[#c8b68f]" />
    <p class="leading-relaxed text-lg">
      Texto que acompanha a imagem, alinhado ao lado dela, explicando o conteúdo relacionado.
    </p>
  </div>

  <!-- Imagem à direita com texto -->
  <div class="flex flex-row-reverse items-center gap-4 mb-6 text-center">
      <img src="/imagens/exemplo.jpg" alt="Imagem a direita" class="w-48 rounded border border-[#c8b68f]" />
      <p class="leading-relaxed text-lg">
          Texto que acompanha a imagem, alinhado ao lado dela, explicando o conteúdo relacionado.
      </p>
  </div>

  <!-- Imagem centralizada -->
  <div class="mb-6 text-center">
    <img src="/imagens/exemplo-centro.jpg" alt="Imagem centralizada" class="inline-block w-64 rounded border border-[#c8b68f]" />
  </div>
```

**Regras:**

* Imagens devem estar sempre na lateral (com texto ao lado) ou centralizadas com texto a baixo.
* Não colocar texto sobre imagem.
* Sempre usar borda e cantos arredondados para manter o estilo.

---

### Navegação entre capítulos

```html
<div class="flex justify-between mt-10 text-sm font-semibold">
  <a href="/livro/capN-1.html" class="px-4 py-2 rounded border border-[#c8b68f] bg-[#f1e9d2] hover:bg-[#e6dec4] transition">← Capítulo Anterior</a>
  <a href="/livro/index.html" class="px-4 py-2 rounded border border-[#c8b68f] bg-[#f1e9d2] hover:bg-[#e6dec4] transition">Índice</a>
  <a href="/livro/capN+1.html" class="px-4 py-2 rounded border border-[#c8b68f] bg-[#f1e9d2] hover:bg-[#e6dec4] transition">Próximo →</a>
</div>
```

* Sempre manter o link para o índice no meio.
* Usar `capN-1.html` e `capN+1.html` para navegação sequencial.

---

### Listas

* **Lista não ordenada:**

```html
<ul class="list-disc pl-6 mb-6 text-lg">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

* **Lista ordenada:**

```html
<ol class="list-decimal pl-6 mb-6 text-lg">
  <li>Primeiro passo</li>
  <li>Segundo passo</li>
</ol>
```

---

### Dicas gerais

* Use `<br>` com moderação, prefira parágrafos para separar texto.
* Mantenha as classes de estilo para texto (`text-lg`, `leading-relaxed`) para garantir uniformidade.
* Para trechos de código ou regras especiais, use `<pre>` ou `<code>` dentro de um bloco com fundo neutro, por exemplo:

```html
<pre class="bg-[#f1e9d2] p-4 rounded border border-[#c8b68f] mb-6 overflow-x-auto">
  Rolagem de dado: d20 + modificador
</pre>
```

---
