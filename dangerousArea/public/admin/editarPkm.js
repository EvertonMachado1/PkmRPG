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
    const id = window.pokemonEditando;
    if (!id) return;
    const nome = document.getElementById("nomePoke").value.trim();
    const numero_pokedex = parseInt(document.getElementById("numPoke").value);
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

    if (!nome || isNaN(numero_pokedex)) {
    mostrarToast("❌ Nome e Nº Pokédex são obrigatórios.");
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
        const res = await fetch(`/api/pokemons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
        });

        if (res.ok) {
        mostrarToast("✅ Pokémon atualizado com sucesso!");
        setTimeout(() => {
            fecharFormulario();
        }, 2000);
        } else {
        mostrarToast("❌ Erro ao atualizar Pokémon.");
        }
    } catch (err) {
        mostrarToast("❌ Erro na comunicação com o servidor.");
    }
}
