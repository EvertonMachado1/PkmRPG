async function carregarJogadoresSemFicha() {
  try {
    const res = await fetch("/api/jogadores_sem_ficha");
    if (!res.ok) throw new Error("Erro ao buscar jogadores");
    const jogadores = await res.json();
    const select = document.getElementById("jogadorSelect");

    jogadores.forEach(j => {
      const opt = document.createElement("option");
      opt.value = j.id;
      opt.textContent = j.nome;
      select.appendChild(opt);
    });
      } catch (err) {
      console.error("Erro ao carregar jogadores:", err);
    }
  }

let habilidades = [];

async function carregarClasses() {
  const res = await fetch("/api/habilidades");
  const habilidades = await res.json();
  const select = document.getElementById("classe");

  habilidades.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id_hab;
    opt.textContent = c.hab_nome;
    select.appendChild(opt);
  });
}

function mostrarFormularioFicha() {
  const conteudo = `
    <div class="bg-gray-800 p-6 rounded-xl shadow w-full max-w-2xl">
      <h1 class="text-2xl font-bold mb-6 text-center">Criar Nova Ficha</h1>

      <div class="mb-4">
        <label class="block mb-1">Nome do Jogador:</label>
        <select id="jogadorSelect" class="w-full p-2 rounded bg-gray-700 text-white"></select>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Classe:</label>
        <select id="classe" class="w-full p-2 rounded bg-gray-700 text-white"></select>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <input type="number" id="idade" placeholder="Idade" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="nvl" placeholder="Nível (default 0)" class="p-2 rounded bg-gray-700 text-white" value="0">
        <input type="number" id="poke" placeholder="PokeReais (default 0)" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="xp" placeholder="XP (default 0)" class="p-2 rounded bg-gray-700 text-white" value="0">
        <input type="number" id="forca" placeholder="Força" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="destreza" placeholder="Destreza" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="vontade" placeholder="Vontade" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="sorte" placeholder="Sorte" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="vida" placeholder="Vida" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="defesa" placeholder="Defesa" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="percepcao" placeholder="Percepção" class="p-2 rounded bg-gray-700 text-white">
        <input type="number" id="corrupcao" placeholder="Corrupção" class="p-2 rounded bg-gray-700 text-white">
      </div>

      <input type="hidden" id="dmg" value="0">

      <button onclick="salvarFicha()" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full">
        Salvar Ficha
      </button>

      <p id="mensagemFicha" class="mt-4 text-center"></p>
    </div>`;

  document.getElementById("conteudoCentral").innerHTML = conteudo;
  carregarClasses();
  carregarJogadoresSemFicha();
}

async function salvarFicha() {
  const jogador_id = document.getElementById("jogadorSelect").value;
  const classe_id = document.getElementById("classe").value;
  const idade = parseInt(document.getElementById("idade").value);
  const nivel = parseInt(document.getElementById("nvl").value) || 0;
  const poke = parseInt(document.getElementById("poke").value) || 0;
  const xp = parseInt(document.getElementById("xp").value) || 0;
  const forca = parseInt(document.getElementById("forca").value);
  const destreza = parseInt(document.getElementById("destreza").value);
  const vontade = parseInt(document.getElementById("vontade").value);
  const sorte = parseInt(document.getElementById("sorte").value);
  const vida = parseInt(document.getElementById("vida").value);
  const defesa = parseInt(document.getElementById("defesa").value);
  const percepcao = parseInt(document.getElementById("percepcao").value);
  const corrupcao = parseInt(document.getElementById("corrupcao").value);
  const dmg = 0; // valor padrão oculto

  const mensagem = document.getElementById("mensagemFicha");

  // Validação básica
  if (!jogador_id || !classe_id || isNaN(idade)) {
    mostrarToast("❌ Preencha todos os campos obrigatórios.");
    return;
  }

  const dados = {
    jogador_id: parseInt(jogador_id),
    classe_id: parseInt(classe_id),
    idade,
    nivel,
    poke,
    xp,
    forca,
    destreza,
    vontade,
    sorte,
    vida,
    defesa,
    percepcao,
    corrupcao,
    dmg
  };

  try {
    const res = await fetch("/api/ficha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    if (res.ok) {
      mostrarToast("✅ Ficha criada com sucesso!");
    } else {
      const erro = await res.json();
      mostrarToast("❌ " + (erro.detail || "Erro ao salvar ficha."));
    }
  } catch (err) {
    mostrarToast("❌ Erro ao se comunicar com o servidor.");
  }
}