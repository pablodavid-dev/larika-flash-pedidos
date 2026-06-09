const produtos = [
    { id: 0, nome: "Super Combo Larikão", preco: 149, qtd: 0 },
    { id: 1, nome: "Mega Combo", preco: 89, qtd: 0 },
    { id: 2, nome: "Combo Família", preco: 79, qtd: 0 },
    { id: 3, nome: "Combo Casal", preco: 59, qtd: 0 },
    { id: 4, nome: "Solteiro", preco: 39, qtd: 0 },
    { id: 5, nome: "Combo 2 Xis Salada Aro 17", preco: 69, qtd: 0 },
    { id: 6, nome: "600g Fritas com Cheddar e Bacon", preco: 37, qtd: 0 },
    { id: 7, nome: "Pepsi 2L", preco: 18, qtd: 0 },
    { id: 8, nome: "Coca-Cola 1,5L", preco: 18, qtd: 0 },
    { id: 9, nome: "Caixa de Bis", preco: 12, qtd: 0 }
];

const pedidoMinimo = 39;
let lojaAberta = true;

function formatar(valor) {
    return valor.toFixed(2).replace(".", ",");
}

function adicionar(id) {
    const produto = produtos.find(p => p.id === id);

    if (produto) {
        produto.qtd++;
        calcularTotal();
    }
}

function remover(id) {
    const produto = produtos.find(p => p.id === id);

    if (produto && produto.qtd > 0) {
        produto.qtd--;
        calcularTotal();
    }
}

function calcularTotal() {
    let subtotal = 0;

    produtos.forEach(produto => {
        const qtdElemento = document.getElementById(`qtd-${produto.id}`);

        if (qtdElemento) {
            qtdElemento.innerText = produto.qtd;
        }

        subtotal += produto.preco * produto.qtd;
    });

    const bairro = document.getElementById("bairro");
    const taxaEntrega = bairro && bairro.value ? Number(bairro.value) : 0;
    const total = subtotal + taxaEntrega;

    const totalElemento = document.getElementById("total");

    if (totalElemento) {
        totalElemento.innerText = formatar(total);
    }
}

function enviarPedido() {
    let subtotal = 0;
    let temItem = false;

    let mensagem = "Olá, quero fazer um pedido na Larika Flash:%0A%0A";

    produtos.forEach(produto => {
        if (produto.qtd > 0) {
            temItem = true;
            const valorItem = produto.preco * produto.qtd;
            subtotal += valorItem;
            mensagem += `${produto.qtd}x ${produto.nome} - R$ ${formatar(valorItem)}%0A`;
        }
    });

    if (!temItem) {
        alert("Escolha pelo menos um item antes de finalizar.");
        return;
    }

    if (subtotal < pedidoMinimo) {
        alert(`Pedido mínimo de R$ ${formatar(pedidoMinimo)}.`);
        return;
    }

    const rua = document.getElementById("rua").value.trim();
    const bairroSelect = document.getElementById("bairro");
    const pagamento = document.getElementById("pagamento").value;
    const observacao = document.getElementById("observacao").value.trim();

    if (!rua) {
        alert("Informe o endereço.");
        return;
    }

    if (!bairroSelect.value) {
        alert("Selecione o bairro.");
        return;
    }

    if (!pagamento) {
        alert("Selecione a forma de pagamento.");
        return;
    }

    const bairroTexto = bairroSelect.options[bairroSelect.selectedIndex].text;
    const taxaEntrega = Number(bairroSelect.value);
    const total = subtotal + taxaEntrega;

    mensagem += `%0ASubtotal: R$ ${formatar(subtotal)}`;
    mensagem += `%0AEntrega: R$ ${formatar(taxaEntrega)}`;
    mensagem += `%0ATotal: R$ ${formatar(total)}`;

    mensagem += `%0A%0AEndereço: ${rua}`;
    mensagem += `%0ABairro: ${bairroTexto}`;
    mensagem += `%0AForma de pagamento: ${pagamento}`;

    if (observacao) {
        mensagem += `%0AObservação: ${observacao}`;
    }

    const telefone = "5548999999999";
    const link = `https://wa.me/${telefone}?text=${mensagem}`;

    window.open(link, "_blank");
}

function toggleLoja() {
    lojaAberta = !lojaAberta;

    const status = document.getElementById("status-loja");

    if (lojaAberta) {
        status.innerText = "🟢 Aberto • faça seu pedido";
        status.classList.remove("fechado");
        status.classList.add("aberto");
    } else {
        status.innerText = "🔴 Fechado • abre às 18h";
        status.classList.remove("aberto");
        status.classList.add("fechado");
    }
}

calcularTotal();
