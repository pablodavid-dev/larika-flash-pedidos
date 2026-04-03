/* ============================
   CONFIGURAÇÃO INICIAL
============================ */

let lojaAberta = false; // 🔴 LOJA FECHADA

var quantidades = [0, 0, 0, 0];

var precos = [
    89, // Mega
    75, // Família
    59, // Casal
    32  // Duplo
];

var nomesCombos = [
    "MEGA COMBO LARIKA",
    "Combo Família",
    "Combo Casal",
    "Duplo Cheddar Bacon"
];


/* ============================
   CONTROLE DE QUANTIDADE
============================ */

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


/* ============================
   CÁLCULO TOTAL
============================ */

function calcularTotal() {
    let subtotal = 0;

    for (let i = 0; i < quantidades.length; i++) {
        subtotal += quantidades[i] * precos[i];
    }

    let bairro = document.getElementById("bairro");
    let taxaEntrega = 0;

    if (bairro && bairro.value) {
        taxaEntrega = parseFloat(bairro.value);
    }

    let total = subtotal + taxaEntrega;

    document.getElementById("total").innerText = total.toFixed(2);
}


/* ============================
   STATUS DA LOJA
============================ */

function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");

    if (lojaAberta) {
        status.className = "status aberto";
        status.innerText = "🟢 Aberto agora - pedidos liberados";
    } else {
        status.className = "status fechado";
        status.innerText = "🔴 Loja fechada no momento";
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
    let temPedido = false;
    let subtotal = 0;

    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0) {
            mensagem += quantidades[i] + "x " + nomesCombos[i] + "\n";
            subtotal += quantidades[i] * precos[i];
            temPedido = true;
        }
    }

    if (!temPedido) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
    }

    if (subtotal < 30) {
        alert("Pedido mínimo de R$ 30,00 em lanches.");
        return;
    }

    mensagem += "\n📍 INFORMAÇÕES\n";

    if (rua.value.trim() === "") {
        alert("Digite o endereço.");
        return;
    }

    mensagem += "Endereço: " + rua.value + "\n";

    if (bairro.value === "") {
        alert("Selecione o bairro.");
        return;
    }

    mensagem += "Bairro: " + bairro.options[bairro.selectedIndex].text + "\n";

    if (pagamento.value === "") {
        alert("Selecione a forma de pagamento.");
        return;
    }

    mensagem += "Pagamento: " + pagamento.value + "\n";

    if (observacao.value.trim()) {
        mensagem += "\n📝 OBSERVAÇÃO\n";
        mensagem += observacao.value + "\n";
    }

    let totalFinal = document.getElementById("total").innerText;
    mensagem += "\n💰 TOTAL: R$ " + totalFinal;

    window.open(
        "https://wa.me/554888509014?text=" + encodeURIComponent(mensagem),
        "_blank"
    );
}


/* ============================
   INICIALIZAÇÃO
============================ */

atualizarStatusLoja();
calcularTotal();
