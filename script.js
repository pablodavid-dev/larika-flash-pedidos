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

function enviarPedido() {

    const rua = document.getElementById("rua");
    const bairro = document.getElementById("bairro");
    const pagamento = document.getElementById("pagamento");
    const observacao = document.getElementById("observacao");

    if (!rua.value.trim()) {
        alert("Preencha o endereço.");
        return;
    }

    if (!bairro.value) {
        alert("Escolha o bairro.");
        return;
    }

    if (!pagamento.value) {
        alert("Escolha a forma de pagamento.");
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

    mensagem += "\nINFORMAÇÕES\n";
    mensagem += "Endereço: " + rua.value + "\n";
    mensagem += "Bairro: " + bairro.options[bairro.selectedIndex].text + "\n";
    mensagem += "Pagamento: " + pagamento.value + "\n";

    if (observacao.value.trim() !== "") {
        mensagem += "\nOBSERVAÇÃO\n";
        mensagem += observacao.value + "\n";
    }

    mensagem += "\nTOTAL: R$ " + document.getElementById("total").innerText;

    window.open(
        "https://wa.me/554888509014?text=" + encodeURIComponent(mensagem),
        "_blank"
    );
}

/* ===============================
   STATUS LOJA - FORÇADO ABERTO
=============================== */

function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");
    status.className = "status aberto";
    status.innerText = "🟢 Aberto agora - pedidos liberados";
}

atualizarStatusLoja();

