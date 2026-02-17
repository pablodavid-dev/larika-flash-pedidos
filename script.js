var lojaAberta = false; // 🔒 LOJA FECHADA

var quantidades = [0, 0, 0, 0, 0, 0];

var precos = [
    39,
    29,
    0,
    49,
    69,
    89
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

    if (!lojaAberta) {
        alert("🚫 Estamos fechados no momento!");
        return;
    }

    quantidades[index]++;
    atualizarQuantidade(index);
}

function remover(index) {

    if (!lojaAberta) {
        alert("🚫 Estamos fechados no momento!");
        return;
    }

    if (quantidades[index] > 0) {
        quantidades[index]--;
        atualizarQuantidade(index);
    }
}

function atualizarQuantidade(index) {
    document.getElementById("qtd-" + index).innerText = quantidades[index];
    calcularTotal();
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

function enviarPedido() {

    if (!lojaAberta) {
        alert("🚫 A loja está fechada no momento.\nVoltamos em breve!");
        return;
    }

    const rua = document.getElementById("rua");
    const bairro = document.getElementById("bairro");
    const pagamento = document.getElementById("pagamento");
    const observacao = document.getElementById("observacao");

    let mensagem = "PEDIDO - LARIKA FLASH\n\n";
    let temPedido = false;

    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0 && nomesCombos[i]) {
            mensagem += quantidades[i] + "x " + nomesCombos[i] + "\n";
            temPedido = true;
        }
    }

    if (!temPedido) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
    }

    mensagem += "\nINFORMAÇÕES\n";

    if (rua && rua.value.trim()) {
        mensagem += "Endereço: " + rua.value + "\n";
    }

    if (bairro && bairro.value) {
        mensagem += "Bairro: " + bairro.options[bairro.selectedIndex].text + "\n";
    }

    if (pagamento && pagamento.value) {
        mensagem += "Pagamento: " + pagamento.value + "\n";
    }

    if (observacao && observacao.value.trim()) {
        mensagem += "\nOBSERVAÇÃO\n";
        mensagem += observacao.value + "\n";
    }

    mensagem += "\nTOTAL: R$ " + document.getElementById("total").innerText;

    window.open(
        "https://wa.me/554888509014?text=" + encodeURIComponent(mensagem),
        "_blank"
    );
}

/* STATUS LOJA - FECHADA */

function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");
    status.className = "status fechado";
    status.innerText = "🔴 Fechado agora - pedidos indisponíveis";
}

atualizarStatusLoja();
