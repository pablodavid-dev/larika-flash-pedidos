var quantidades = [0, 0, 0, 0];

var precos = [
    89, // Mega
    79, // Família
    59, // Casal
    29  // Duplo
];

var nomesCombos = [
    "Mega Combo Larika (4 Duplo Cheddar Bacon + 4 Fritas + Refri 2L Grátis)",
    "Combo Família (3 Duplo Cheddar Bacon + 3 Fritas + 3 Refris 200ml)",
    "Combo Casal (2 Duplo Cheddar Bacon + 2 Fritas + 2 Refris 200ml)",
    "Duplo Cheddar Bacon + Fritas + Refri 200ml"
];

function adicionar(index) {
    quantidades[index]++;
    atualizarQuantidade(index);
}

function remover(index) {
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

    const rua = document.getElementById("rua");
    const bairro = document.getElementById("bairro");
    const pagamento = document.getElementById("pagamento");
    const observacao = document.getElementById("observacao");

    let mensagem = "PEDIDO - LARIKA FLASH\n\n";
    let temPedido = false;

    let subtotal = 0;

    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0) {
            mensagem += quantidades[i] + "x " + nomesCombos[i] + "\n";
            subtotal += quantidades[i] * precos[i];
            temPedido = true;
        }
    }

    // 🔴 BLOQUEIA SE NÃO TIVER ITEM
    if (!temPedido) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
    }

    // 🔴 BLOQUEIA SE NÃO ATINGIR R$30 (SEM TAXA)
    if (subtotal < 30) {
        alert("Pedido mínimo de R$ 30,00 em lanches.");
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

/* STATUS LOJA - ABERTA */

function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");
    status.className = "status aberto";
    status.innerText = "🟢 Aberto agora - pedidos liberados";
}

atualizarStatusLoja();
