/* STATUS LOJA - FECHADA */

let lojaAberta = false; // 🔴 MUDA PRA TRUE QUANDO QUISER ABRIR

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

function enviarPedido() {

    // 🔴 BLOQUEIA SE LOJA ESTIVER FECHADA
    if (!lojaAberta) {
        alert("A loja está fechada no momento. Voltamos em breve!");
        return;
    }

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

    if (!temPedido) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
    }

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

atualizarStatusLoja();
