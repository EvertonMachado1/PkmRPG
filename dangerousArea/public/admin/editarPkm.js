async function editarPokemon(id) {
    try {
        const res = await fetch(`/api/pokemons/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar Pokémon");

        const poke = await res.json();

        mostrarFormularioPokemon();

        setTimeout(() => {
            document.getElementById("nomePoke").value = poke.nome;
            document.getElementById("numPoke").value = poke.numero_pokedex;
            document.getElementById("tipo1").value = poke.tipo1;
            document.getElementById("tipo2").value = poke.tipo2 || "";
            document.getElementById("evolucao").value = poke.evolucao;
            document.getElementById("vidaPoke").value = poke.vida;
            document.getElementById("atk").value = poke.ataque;
            document.getElementById("def").value = poke.defesa;
            document.getElementById("atk_esp").value = poke.ataque_especial;
            document.getElementById("def_esp").value = poke.defesa_especial;
            document.getElementById("vel").value = poke.velocidade;
            document.getElementById("descricao").value = poke.descricao;

            window.pokemonEditando = poke.id;

            const botao = document.querySelector("button[onclick='salvarPokemon()']");
            botao.textContent = "Salvar Edição";
            botao.onclick = savarEdicao;

            if (!document.getElementById("btnCancelarEdicao")) {
                const btnCancelar= document.createElement("button");
                btnCancelar.id = "btnCancelarEdicao";
                btnCancelar.textContent = "Cancelar";
                btnCancelar.className = "bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
                btnCancelar.onclick = fecharFormulario;

                botao.parentNode.appendChild(btnCancelar);
            }
        }, 100);
    } catch (err) {
        mostrarToast("❌ Erro ao carregar Pokémon.");
    }
}

async function salvarEdicao() {
    const id = window.pokemonEditando
    
}