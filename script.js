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

    document.getElementById("total").innerText = total + taxa;
}

function enviarPedido() {

    // BLOQUEIO SE LOJA ESTIVER FECHADA
    const estadoManual = localStorage.getItem("loja_status");
    if (estadoManual === "fechada") {
        alert("A loja está fechada no momento. Tente mais tarde.");
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

    let mensagem = "Oi, boa noite! 👋\n\nPedido:\n";
    let temPedido = false;

    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0 && nomesCombos[i]) {
            mensagem += `${quantidades[i]}x ${nomesCombos[i]}\n`;
            temPedido = true;
        }
    }

    if (!temPedido) {
        alert("Adicione pelo menos um item.");
        return;
    }

    mensagem += `\nBairro: ${bairro.options[bairro.selectedIndex].text}`;
    mensagem += `\nRua: ${rua.value}`;
    mensagem += `\nTotal: R$ ${document.getElementById("total").innerText}`;

    window.open(
        `https://wa.me/554888509014?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}

function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");
    const estado = localStorage.getItem("loja_status");

    if (estado === "fechada") {
        status.className = "status fechado";
        status.innerText = "🔴 Fechado agora";
        return;
    }

    if (estado === "aberta") {
        status.className = "status aberto";
        status.innerText = "🟢 Aberto agora";
        return;
    }

    const hora = new Date().getHours();
    if (hora >= 18 && hora < 24) {
        status.className = "status aberto";
        status.innerText = "🟢 Aberto agora • até 00h";
    } else {
        status.className = "status fechado";
        status.innerText = "🔴 Fechado agora • abre às 18h";
    }
}

function toggleLoja() {
    const estado = localStorage.getItem("loja_status");

    if (estado === "aberta") {
        localStorage.setItem("loja_status", "fechada");
        alert("Loja FECHADA manualmente.");
    } else {
        localStorage.setItem("loja_status", "aberta");
        alert("Loja ABERTA manualmente.");
    }

    atualizarStatusLoja();
}

// PC — Atalho secreto
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
        document.getElementById("admin-toggle").style.display = "block";
    }
});

// CELULAR — 5 toques no logo
let toques = 0;
const logoAdmin = document.getElementById("logo-admin");

if (logoAdmin) {
    logoAdmin.addEventListener("click", function () {
        toques++;
        if (toques === 5) {
            document.getElementById("admin-toggle").style.display = "block";
            toques = 0;
        }
    });
}

atualizarStatusLoja();
