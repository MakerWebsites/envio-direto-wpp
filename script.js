function formatarNumero(numero) {
  numero = numero.replace(/\D/g, "");

  if (numero.length === 11) return "55" + numero;
  if (numero.length >= 12 && numero.startsWith("55")) return numero;

  return "55" + numero;
}

function salvarContato(nome, numero) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.push({ nome, numero });
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

  const contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.forEach((contato, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${contato.nome || "Sem nome"} - ${contato.numero}
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

  if (nome) {
    salvarContato(nome, numeroInput);
  }

  window.open(url, "_blank");
});

listarContatos();
