function formatarNumero(numero) {
  numero = numero.replace(/\D/g, "");
  if (numero.length === 11) return "55" + numero;
  if (numero.length >= 12 && numero.startsWith("55")) return numero;
  return "55" + numero;
}

function salvarContato(nome, numero, mensagem) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.push({ nome, numero, mensagem });
  localStorage.setItem("contatos", JSON.stringify(contatos));
  listarContatos();
}

function removerContato(index) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.splice(index, 1);
  localStorage.setItem("contatos", JSON.stringify(contatos));
  listarContatos();
}

function listarContatos() {
  const lista = document.getElementById("contatosLista");
  lista.innerHTML = "";

  const senhaDigitada = document.getElementById("senha").value.trim();
  const contatos = JSON.parse(localStorage.getItem("contatos")) || [];

  contatos.forEach((contato, index) => {
    const li = document.createElement("li");
    li.className = senhaDigitada === "@passos123" ? "show" : "";

    li.innerHTML = `
      <div>
        <b>${contato.nome || "Sem nome"}</b> - <b>${contato.numero}</b>
        <div class="mensagem"><strong>Mensagem:</strong> ${contato.mensagem || "Não enviada"}</div>
      </div>
      <button class="remove-btn" onclick="removerContato(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });
}

document.getElementById("whatsappForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const numeroInput = document.getElementById("numero").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!numeroInput) {
    alert("Digite um número válido.");
    return;
  }

  const numeroFormatado = formatarNumero(numeroInput);
  const url = `https://wa.me/${numeroFormatado}?text=${encodeURIComponent(mensagem)}`;

  salvarContato(nome, numeroInput, mensagem);
  window.open(url, "_blank");

  // Limpa os campos após envio
  document.getElementById("nome").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("mensagem").value = "";
});

document.getElementById("senha").addEventListener("input", listarContatos);

listarContatos();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("Erro no SW", err));
}
