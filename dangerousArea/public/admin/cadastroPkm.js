function mostrarFormularioPokemon() {
  const conteudo = `
    <div class="bg-gray-800 p-6 rounded-xl shadow w-full max-w-3xl mx-auto">
     <button type="button" onclick="fecharFormulario()" class="absolute top-2 right-2 text-white text-xl font-bold hover:text-red-500">
      ×
    </button>


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
      </div>

      <button onclick="salvarPokemon()" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full text-white font-semibold">
        Salvar Pokémon
      </button>
      <p id="mensagemPokemon" class="mt-4 text-center text-white"></p>
    </div>
  `;

  document.getElementById("conteudoCentral").innerHTML = conteudo;

  // Carrega os tipos para os selects
  carregarTipos("tipo1");
  carregarTipos("tipo2");
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
    velocidade
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
