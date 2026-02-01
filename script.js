// ================================
// MEMÓRIA DO SISTEMA
// ================================

var quantidades = [0, 0, 0, 0, 0, 0];

var precos = [
    39, // 0 - Out Turbo BBQ
    29, // 1 - Duplo Cheddar Bacon
    0,  // 2 - não usado
    49, // 3 - Combo Casal
    70, // 4 - Combo Família
    90  // 5 - Mega Combo Larika
];

var nomesCombos = [
    "Out Turbo BBQ + Fritas + Refri 200ml",
    "Duplo Cheddar Bacon + Fritas + Refri 200ml",
    "",
    "Combo Casal",
    "Combo Família",
    "Mega Combo Larika"
];

// ================================
// ADICIONAR
// ================================

function adicionar(index) {
    quantidades[index]++;
    document.getElementById("qtd-" + index).innerText = quantidades[index];
    calcularTotal();
}

// ================================
// REMOVER
// ================================

function remover(index) {
    if (quantidades[index] > 0) {
        quantidades[index]--;
        document.getElementById("qtd-" + index).innerText = quantidades[index];
        calcularTotal();
    }
}

// ================================
// CALCULAR TOTAL
// ================================

function calcularTotal() {
    var total = 0;

    for (var i = 0; i < quantidades.length; i++) {
        total += quantidades[i] * precos[i];
    }

    var bairroSelect = document.getElementById("bairro");
    var taxaEntrega = bairroSelect && bairroSelect.value ? Number(bairroSelect.value) : 0;

    document.getElementById("total").innerText = total + taxaEntrega;
}

// ================================
// ENVIAR PEDIDO WHATSAPP (COM BLOQUEIO)
// ================================

function enviarPedido() {

    const ruaInput = document.getElementById("rua");
    const bairroSelect = document.getElementById("bairro");

    // valida rua
    if (!ruaInput.value.trim()) {
        alert("Preencha o endereço (nome da rua).");
        ruaInput.focus();
        return;
    }

    // valida bairro
    if (!bairroSelect.value) {
        alert("Escolha o bairro.");
        bairroSelect.focus();
        return;
    }

    // valida pedido
    let temPedido = false;
    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0 && nomesCombos[i]) {
            temPedido = true;
            break;
        }
    }

    if (!temPedido) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
    }

    // monta mensagem
    let mensagem = "Oi, boa noite! 👋\n\nPedido:\n";

    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0 && nomesCombos[i]) {
            mensagem += `${quantidades[i]}x ${nomesCombos[i]}\n`;
        }
    }

    mensagem += `\nBairro: ${bairroSelect.options[bairroSelect.selectedIndex].text}`;
    mensagem += `\nRua: ${ruaInput.value}`;
    mensagem += `\nTotal: R$ ${document.getElementById("total").innerText}`;

    const numero = "554888509014";

    window.open(
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}

// ================================
// STATUS DA LOJA
// ================================

function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");
    if (!status) return;

    const hora = new Date().getHours();

    if (hora >= 19 && hora < 24) {
        status.className = "status aberto";
        status.innerText = "🟢 Aberto agora • até 00h";
    } else {
        status.className = "status fechado";
        status.innerText = "🔴 Fechado agora • abre às 19h";
    }
}

atualizarStatusLoja();
