function mostrarFormularioClass() {
    const conteudo = 
         `<div class="bg-gray-800 p-6 rounded-xl shadow w-full max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-4 text-center">Cadastrar Nova Classe</h2>
            <input type="text" id="nclass" placeholder="Nome da classe" class="w-full border p-2 rounded mb-1 text-white" required></input>
            <div class="italic font-serif text-xs pb-1">
            <!-- info text -->
                <p>Para maior facilidade de compreensão siga o padrão, Nome da habilidade - Nivel de liberação - efeito. LIMITE DE 191 CARACTERES. Exemplo:</p>
                <p class="underline decoration-dotted">Lutador - 0 - Pode treinar o pokemon 1x por dia e o pokemon ganha 1xp - Fisico</p>
            </div>
            <input type="text" id="passv" placeholder="Passiva" class="w-full border p-2 rounded mb-3 text-white" required></input>
            <input type="text" id="hab1" placeholder="Habilidade 1" class="w-full border p-2 rounded mb-3 text-white" required></input>
            <input type="text" id="hab2" placeholder="Habilidade 2" class="w-full border p-2 rounded mb-3 text-white" required></input>
            <input type="text" id="hab3" placeholder="Habilidade 3" class="w-full border p-2 rounded mb-3 text-white" required></input>
            <input type="text" id="hab4" placeholder="Habilidade 4" class="w-full border p-2 rounded mb-3 text-white" required></input>
            <input type="text" id="hab5" placeholder="Habilidade 5" class="w-full border p-2 rounded mb-3 text-white" required></input>
            <button onclick="cadastrar()" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full">
                Cadastrar
            </button>
         </div>`
          document.getElementById("conteudoCentral").innerHTML = conteudo;
}

async function cadastrar() {
  const nome = document.getElementById("nclass").value.trim();
  const passiva = document.getElementById("passv").value.trim();

  const hab1 = document.getElementById("hab1").value.trim();
  const hab2 = document.getElementById("hab2").value.trim();
  const hab3 = document.getElementById("hab3").value.trim();
  const hab4 = document.getElementById("hab4").value.trim() || null;
  const hab5 = document.getElementById("hab5").value.trim() || null;

  // Verificação apenas dos campos obrigatórios
  if (!nome || !passiva || !hab1 || !hab2 || !hab3) {
    mostrarToast("❌ Nome, passiva e habilidades de 1 a 3, são obrigatórios.");
    return;
  }

  const dados = {
    nome,
    passiva,
    hab1,
    hab2,
    hab3,
    hab4,
    hab5
  };

  try {
    const res = await fetch("/api/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    if (res.ok) {
      mostrarToast("✅ Classe cadastrada com sucesso!", "sucesso");
    } else {
      const erro = await res.json();
      mostrarToast("❌ Erro ao cadastrar classe: " + (erro.mensagem || "Erro desconhecido"), "erro");
    }
  } catch (err) {
    mostrarToast("❌ Erro ao comunicar com o servidor");
  }
}
