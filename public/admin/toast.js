function mostrarToast(mensagem, tipo = "info") {
  const container = document.getElementById("toast-container");
  const cor = tipo === "sucesso" ? "bg-green-600" : tipo === "erro" ? "bg-red-600" : "bg-gray-700";

  const toast = document.createElement("div");
  toast.className = `${cor} relative text-white px-4 py-3 rounded shadow-md animate-fade-in flex items-center justify-between`;

  const texto = document.createElement("span");
  texto.textContent = mensagem;

  const botaoFechar = document.createElement("button");
  botaoFechar.innerHTML = "❌";
  botaoFechar.className = "ml-4 text-white hover:text-gray-300 font-bold";
  botaoFechar.onclick = () => location.reload(); // <-- recarrega a página ao clicar

  toast.appendChild(texto);
  toast.appendChild(botaoFechar);

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("animate-fade-out");
    setTimeout(() => container.removeChild(toast), 500);
  }, 3000);
}