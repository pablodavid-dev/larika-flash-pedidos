 // MEMÓRIA DO SISTEMA
var quantidades = [0, 0, 0, 0, 0];
var precos = [20, 25, 25, 40, 70];

// ADICIONAR
function adicionar(index) {
    quantidades[index] = quantidades[index] + 1;
    document.getElementById("qtd-" + index).innerText = quantidades[index];
    calcularTotal();
}

// REMOVER
function remover(index) {
    if (quantidades[index] > 0) {
        quantidades[index] = quantidades[index] - 1;
        document.getElementById("qtd-" + index).innerText = quantidades[index];
        calcularTotal();
    }
}

// CALCULAR TOTAL
function calcularTotal() {
    var total = 0;

    for (var i = 0; i < quantidades.length; i++) {
        total = total + (quantidades[i] * precos[i]);
    }

    var bairroSelect = document.getElementById("bairro");
    var taxaEntrega = 0;

    if (bairroSelect && bairroSelect.value !== "") {
        taxaEntrega = Number(bairroSelect.value);
    }

    total = total + taxaEntrega;

    document.getElementById("total").innerText = total;
}

function enviarPedido() {
    let mensagem = "Oi, boa noite! 👋\n\n";

    // LISTA DE COMBOS (MESMA ORDEM)
    const nomesCombos = [
        "Duplo Big Flash",
        "Duplo Cheddar Bacon",
        "Duplo Frango Frito",
        "Combo Casal 😍",
        "Combo Família"
    ];

    let temPedido = false;
    mensagem += "Pedido:\n";

    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0) {
            mensagem += `${quantidades[i]}x ${nomesCombos[i]}\n`;
            temPedido = true;
        }
    }

    if (!temPedido) {
        mensagem += "Nenhum item selecionado\n";
    }

    // BAIRRO E TAXA
    const bairroSelect = document.getElementById("bairro");
    if (bairroSelect.value !== "") {
        const bairroNome = bairroSelect.options[bairroSelect.selectedIndex].text;
        mensagem += `\nBairro: ${bairroNome}`;
    }

    // TOTAL
    const total = document.getElementById("total").innerText;
    mensagem += `\n\nTotal: R$ ${total}`;

    // RUA
    const rua = document.getElementById("rua").value;
    if (rua.trim() !== "") {
        mensagem += `\nRua: ${rua}`;
    }

    // NUMERO DO WHATSAPP
    const numero = "554888509014";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}
function animarCombo(index) {
    const combos = document.querySelectorAll('.combo');
    combos[index].classList.add('pulse');
    setTimeout(() => {
        combos[index].classList.remove('pulse');
    }, 250);
}
function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");
    if (!status) return;

    const agora = new Date();
    const hora = agora.getHours();

    // Aberto das 19h até 23h59
    if (hora >= 19 && hora < 24) {
        status.classList.remove("fechado");
        status.classList.add("aberto");
        status.innerText = "🟢 Aberto agora • até 00h";
    } else {
        status.classList.remove("aberto");
        status.classList.add("fechado");
        status.innerText = "🔴 Fechado agora • abre às 19h";
    }
}

// roda ao carregar o site
atualizarStatusLoja();
