function mostrarFormularioJogador() {
  const conteudo = `
    <div class="bg-gray-800 p-6 rounded-xl shadow w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Cadastrar Novo Jogador</h2>
      <input type="text" id="nome" placeholder="Nome do jogador" class="w-full border p-2 rounded mb-3 text-white" required>
      <input type="password" id="senha" placeholder="Senha" class="w-full border p-2 rounded mb-4 text-white" required>
      <button onclick="cadastrar()" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full">
        Cadastrar
      </button>
      <p id="mensagem" class="text-center mt-3 text-sm"></p>
    </div>`;
  document.getElementById("conteudoCentral").innerHTML = conteudo;
}

async function cadastrar() {
  const nomeInput = document.getElementById('nome');
  const senhaInput = document.getElementById('senha');
  const mensagem = document.getElementById('mensagem');

  if (!nomeInput || !senhaInput) {
    mostrarToast("❌ Erro interno: campos não encontrados.");
    return;
  }

  const nome = nomeInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!nome || !senha) {
    mostrarToast("❌ Preencha todos os campos.");
    return;
  }

  try {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, senha })  // <== só nome e senha aqui
    });

    if (response.ok) {
      mostrarToast("✅ Usuário cadastrado com sucesso!");
    } else {
      const erro = await response.json();
      mostrarToast("❌ " + (erro.detail || "Erro desconhecido"));
    }
  } catch (error) {
    mostrarToast("❌ Falha ao conectar com o servidor.");
  }
}