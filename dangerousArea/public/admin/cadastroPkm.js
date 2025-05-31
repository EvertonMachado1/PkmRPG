function mostrarFormularioPokemon() {
  const conteudo = `
    <div class="flex gap-6 w-full">
      <!-- Lista de Pokémons -->
      <div class="w-[400px] bg-gray-800 p-4 rounded-xl overflow-y-auto max-h-[80vh]">
        <h2 class="text-xl font-bold mb-4">Pokémons Cadastrados</h2>
        <div id="listaPokemons" class="space-y-2"></div>
      </div>

      <!-- Formulário de cadastro -->
      <div class="w-1/2 bg-gray-800 p-6 rounded-xl shadow relative">
        <h1 class="text-2xl font-bold mb-6 text-center text-white">Cadastrar Novo Pokémon</h1>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <input id="nomePoke" placeholder="Nome" class="p-2 rounded bg-gray-700 text-white" />
          <input type="number" id="numPoke" placeholder="Nº Pokédex" class="p-2 rounded bg-gray-700 text-white" required />
          <select id="tipo1" class="p-2 rounded bg-gray-700 text-white"></select>
          <select id="tipo2" class="p-2 rounded bg-gray-700 text-white"><option value="">Nenhum</option></select>
          <input id="evolucao" placeholder="Evolução" class="p-2 rounded bg-gray-700 text-white" />
          <input type="number" id="vidaPoke" placeholder="Vida" class="p-2 rounded bg-gray-700 text-white" />
          <input type="number" id="atk" placeholder="Ataque" class="p-2 rounded bg-gray-700 text-white" />
          <input type="number" id="def" placeholder="Defesa" class="p-2 rounded bg-gray-700 text-white" />
          <input type="number" id="atk_esp" placeholder="Ataque Especial" class="p-2 rounded bg-gray-700 text-white" />
          <input type="number" id="def_esp" placeholder="Defesa Especial" class="p-2 rounded bg-gray-700 text-white" />
          <input type="number" id="vel" placeholder="Velocidade" class="p-2 rounded bg-gray-700 text-white" />
          <textarea id="descricao" placeholder="Descrição" rows="4" class="p-2 rounded bg-gray-700 text-white col-span-2 resize-none"></textarea>
        </div>

        <button onclick="salvarPokemon()" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full text-white font-semibold">
          Salvar Pokémon
        </button>
        <p id="mensagemPokemon" class="mt-4 text-center text-white"></p>
      </div>
    </div>
  `;

  document.getElementById("conteudoCentral").innerHTML = conteudo;
  carregarTipos("tipo1");
  carregarTipos("tipo2");
  carregarListaPokemons();
}


function carregarTipos(id = null, el = null) {
  const tipos = [
    "Normal", "Fogo", "Água", "Grama", "Elétrico", "Gelo", "Lutador",
    "Venenoso", "Terrestre", "Voador", "Psíquico", "Inseto", "Pedra",
    "Fantasma", "Dragão", "Sombrio", "Aço", "Fada"
  ];
  const select = el || document.getElementById(id);
  tipos.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    select.appendChild(opt);
  });
}

async function salvarPokemon() {
  const nome = document.getElementById("nomePoke").value.trim();
  const numero_pokedex_raw = document.getElementById("numPoke").value.trim();
  const numero_pokedex = parseInt(numero_pokedex_raw);

  const tipo1 = document.getElementById("tipo1").value;
  const tipo2 = document.getElementById("tipo2").value || null;
  const evolucao = document.getElementById("evolucao").value.trim() || "N/A";
  const vida = parseInt(document.getElementById("vidaPoke").value) || 0;
  const ataque = parseInt(document.getElementById("atk").value) || 0;
  const defesa = parseInt(document.getElementById("def").value) || 0;
  const ataque_especial = parseInt(document.getElementById("atk_esp").value) || 0;
  const defesa_especial = parseInt(document.getElementById("def_esp").value) || 0;
  const velocidade = parseInt(document.getElementById("vel").value) || 0;

  const descricao = document.getElementById("descricao").value.trim() || "N/A";

  const mensagem = document.getElementById("mensagemPokemon");

  if (!nome || isNaN(numero_pokedex)) {
    mostrarToast("❌ Nome e Nº Pokédex são obrigatórios e devem ser válidos.");
    return;
  }

  const dados = {
    nome,
    numero_pokedex,
    tipo1,
    tipo2,
    evolucao,
    vida,
    ataque,
    defesa,
    ataque_especial,
    defesa_especial,
    velocidade,
    descricao
  };

  try {
    const res = await fetch("/api/pokemons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    if (res.ok) {
      mostrarToast("✅ Pokémon cadastrado com sucesso!", "sucesso");

      // Aguarda 2 segundos e recarrega a página
      setTimeout(() => {
        fecharFormulario();
      }, 2000);
    } else {
      const erro = await res.json();
      mostrarToast("❌ Erro ao salvar Pokémon.", "erro");
    }
  } catch (err) {
    mostrarToast("❌ Erro ao comunicar com servidor");
  }
}

function fecharFormulario() {
  localStorage.setItem("reabrirFormularioPokemon", "true");
  location.reload();
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("reabrirFormularioPokemon") === "true") {
    localStorage.removeItem("reabrirFormularioPokemon");
    mostrarFormularioPokemon(); // reabre o formulário após o reload
  }
});

async function carregarListaPokemons() {
  try {
    const res = await fetch("/api/pokemons");
    if (res.ok) {
      const pokemons = await res.json();
      const container = document.getElementById("listaPokemons");

      if (!container) return;

      container.innerHTML = pokemons.map(poke => `
        <div class="bg-gray-700 p-3 rounded mb-2">
          <p class="font-bold text-white">${poke.nome}</p>
          <p class="text-sm text-gray-300">${poke.tipo1}${poke.tipo2 ? ' / ' + poke.tipo2 : ''}</p>
          <p class="text-sm text-gray-400">Pokédex Nº: ${poke.numero_pokedex}</p>
        </div>
      `).join("");
    } else {
      mostrarToast("❌ Erro ao carregar lista de Pokémon.");
    }
  } catch (err) {
    mostrarToast("❌ Erro ao comunicar com servidor");
  }
}

