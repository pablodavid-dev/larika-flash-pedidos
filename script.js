/* ============================
   CONFIGURAÇÃO INICIAL
============================ */

let lojaAberta = false;

var quantidades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var precos = [
    139, // Super Combo Larikão
    89,  // Mega Combo
    75,  // Família
    49,  // Casal
    39,  // Solteiro
    69,  // Combo 2 Xis Salada
    37,  // Fritas Cheddar Bacon
    18,  // Pepsi 2L
    18,  // Coca-Cola 1,5L
    14   // Caixa de Bis
];

var nomesCombos = [
    "Super Combo Larikão",
    "Mega Combo",
    "Combo Família",
    "Combo Casal",
    "Combo Solteiro",
    "Combo 2 Xis Salada Aro 17",
    "600g Fritas com Cheddar e Bacon",
    "Pepsi 2L",
    "Coca-Cola 1,5L",
    "Caixa de Bis"
];


/* ============================
   CONTROLE DE QUANTIDADE
============================ */

function adicionar(index) {
    quantidades[index]++;

    document.getElementById("qtd-" + index).innerText =
        quantidades[index];

    calcularTotal();
}

function remover(index) {
    if (quantidades[index] > 0) {
        quantidades[index]--;

        document.getElementById("qtd-" + index).innerText =
            quantidades[index];

        calcularTotal();
    }
}


/* ============================
   CÁLCULO TOTAL
============================ */

function calcularTotal() {

    let subtotal = 0;

    for (let i = 0; i < quantidades.length; i++) {
        subtotal += quantidades[i] * precos[i];
    }

    let taxaEntrega = 0;

    const bairro = document.getElementById("bairro");

    if (bairro && bairro.value !== "") {
        taxaEntrega = parseFloat(bairro.value);
    }

    const total = subtotal + taxaEntrega;

    document.getElementById("total").innerText =
        total.toFixed(2);
}


/* ============================
   STATUS DA LOJA
============================ */

function atualizarStatusLoja() {

    const status = document.getElementById("status-loja");

    if (lojaAberta) {
        status.className = "status aberto";
        status.innerText =
            "🟢 Aberto agora - pedidos liberados";
    } else {
        status.className = "status fechado";
        status.innerText =
            "🔴 Loja fechada no momento";
    }
}

function toggleLoja() {
    lojaAberta = !lojaAberta;
    atualizarStatusLoja();
}


/* ============================
   ENVIAR PEDIDO
============================ */

function enviarPedido() {

    if (!lojaAberta) {
        alert("A loja está fechada no momento. Voltamos em breve!");
        return;
    }

    const rua = document.getElementById("rua");
    const bairro = document.getElementById("bairro");
    const pagamento = document.getElementById("pagamento");
    const observacao = document.getElementById("observacao");

    let mensagem = "🍔 PEDIDO - LARIKA FLASH\n\n";

    let subtotal = 0;
    let temPedido = false;

    for (let i = 0; i < quantidades.length; i++) {

        if (quantidades[i] > 0) {

            mensagem +=
                quantidades[i] +
                "x " +
                nomesCombos[i] +
                " - R$ " +
                (quantidades[i] * precos[i]).toFixed(2) +
                "\n";

            subtotal +=
                quantidades[i] * precos[i];

            temPedido = true;
        }
    }

    if (!temPedido) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
    }

    if (subtotal < 30) {
        alert("Pedido mínimo de R$ 30,00.");
        return;
    }

    if (rua.value.trim() === "") {
        alert("Digite o endereço.");
        return;
    }

    if (bairro.value === "") {
        alert("Selecione o bairro.");
        return;
    }

    if (pagamento.value === "") {
        alert("Selecione a forma de pagamento.");
        return;
    }

    mensagem += "\n📍 INFORMAÇÕES\n";

    mensagem +=
        "Endereço: " +
        rua.value +
        "\n";

    mensagem +=
        "Bairro: " +
        bairro.options[bairro.selectedIndex].text +
        "\n";

    mensagem +=
        "Pagamento: " +
        pagamento.value +
        "\n";

    if (observacao.value.trim() !== "") {

        mensagem += "\n📝 OBSERVAÇÃO\n";

        mensagem +=
            observacao.value +
            "\n";
    }

    const totalFinal =
        document.getElementById("total").innerText;

    mensagem +=
        "\n💰 TOTAL: R$ " +
        totalFinal;

    /* WHATSAPP OFICIAL */
    window.open(
        "https://wa.me/5548988509014?text=" +
        encodeURIComponent(mensagem),
        "_blank"
    );
}


/* ============================
   INICIALIZAÇÃO
============================ */

atualizarStatusLoja();
calcularTotal();
