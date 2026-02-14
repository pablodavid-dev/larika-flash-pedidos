var quantidades = [0, 0, 0, 0, 0, 0];

var precos = [
    40, // 0 - Combo Larika
    29, // 1 - Duplo Cheddar Bacon
    0,
    49, // 3 - Combo Casal
    69, // 4 - Combo Família
    89  // 5 - Mega Combo
];

var nomesCombos = [
    "Combo Larika (2 Duplo Cheddar Bacon + 2 Refri 200ml)",
    "Duplo Cheddar Bacon + Fritas + Refri 200ml",
    "",
    "Combo Casal",
    "Combo Família",
    "Mega Combo Larika"
];

function adicionar(index) {
    quantidades[index]++;
    document.getElementById("qtd-" + index).innerText = quantidades[index];
    calcularTotal();
}

function remover(index) {
    if (quantidades[index] > 0) {
        quantidades[index]--;
        document.getElementById("qtd-" + index).innerText = quantidades[index];
        calcularTotal();
    }
}

function calcularTotal() {
    let total = 0;

    for (let i = 0; i < quantidades.length; i++) {
        total += quantidades[i] * precos[i];
    }

    const bairro = document.getElementById("bairro");
    const taxa = bairro && bairro.value ? Number(bairro.value) : 0;

    total += taxa;

    document.getElementById("total").innerText =
        total.toFixed(2).replace(".", ",");
}

function lojaAbertaAgora() {
    const hora = new Date().getHours();
    return (hora >= 18 && hora < 24);
}

function enviarPedido() {

    if (!lojaAbertaAgora()) {
        alert("A loja está fechada no momento. Funcionamos das 18h às 00h.");
        return;
    }

    const rua = document.getElementById("rua");
    const bairro = document.getElementById("bairro");

    if (!rua.value.trim()) {
        alert("Preencha o endereço.");
        return;
    }

    if (!bairro.value) {
        alert("Escolha o bairro.");
        return;
    }

    let mensagem = "PEDIDO - LARIKA FLASH\n\n";
    let temPedido = false;

    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0 && nomesCombos[i]) {
            mensagem += quantidades[i] + "x " + nomesCombos[i] + "\n";
            temPedido = true;
        }
    }

    if (!temPedido) {
        alert("Adicione pelo menos um item.");
        return;
    }

    mensagem += "\nENDERECO\n";
    mensagem += "Rua: " + rua.value + "\n";
    mensagem += "Bairro: " + bairro.options[bairro.selectedIndex].text + "\n\n";
    mensagem += "TOTAL: R$ " + document.getElementById("total").innerText;

    window.open(
        "https://wa.me/554888509014?text=" + encodeURIComponent(mensagem),
        "_blank"
    );
}

function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");

    if (lojaAbertaAgora()) {
        status.className = "status aberto";
        status.innerText = "Aberto agora - ate 00h";
    } else {
        status.className = "status fechado";
        status.innerText = "Fechado agora - abre as 18h";
    }
}

atualizarStatusLoja();
