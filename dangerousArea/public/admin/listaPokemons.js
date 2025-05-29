async function carregarListaPokemons() {
  try {
    const res = await fetch("/api/pokelista");
    const pokemons = await res.json();
    const container = document.getElementById("listaPokemons");

    if (!container) return;

    container.innerHTML = pokemons.map(poke => `
      <div class="bg-gray-700 p-3 rounded text-white flex justify-between items-center">
        <div>
          <p class="font-bold">${poke.nome}</p>
          <p class="text-sm text-gray-300">${poke.tipo1}${poke.tipo2 ? ' / ' + poke.tipo2 : ''}</p>
          <p class="text-sm text-gray-400">#${poke.numero_pokedex}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="editarPokemon(${poke.id})" class="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-sm">Editar</button>
          <button onclick="excluirPokemon(${poke.id})" class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm">Excluir</button>
        </div>
      </div>
    `).join("");
  } catch (err) {
    mostrarToast("❌ Erro ao carregar lista de Pokémon.");
  }
}
