/* ============================
   CONFIGURAÇÃO INICIAL
============================ */

let lojaAberta = true;

const quantidades = [0,0,0,0,0,0,0,0,0,0];

const precos = [
    139,
    89,
    74,
    49,
    39,
    69,
    37,
    18,
    18,
    14
];

const nomesCombos = [
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
   LOJA ABERTA 24 HORAS
============================ */

function lojaEstaAbertaAgora(){
    return true;
}

/* ============================
   QUANTIDADE
============================ */

function adicionar(i){
    quantidades[i]++;
    document.getElementById("qtd-"+i).innerText = quantidades[i];
    calcularTotal();
}

function remover(i){
    if(quantidades[i] > 0){
        quantidades[i]--;
        document.getElementById("qtd-"+i).innerText = quantidades[i];
        calcularTotal();
    }
}

/* ============================
   TOTAL
============================ */

function calcularTotal(){

    let subtotal = 0;

    quantidades.forEach((qtd,i)=>{
        subtotal += qtd * precos[i];
    });

    const bairro = document.getElementById("bairro");

    const entrega = bairro.value === "" ? 0 : parseFloat(bairro.value);

    document.getElementById("total").innerText = (subtotal + entrega).toFixed(2);
}

/* ============================
   STATUS
============================ */

function atualizarStatusLoja(){

    lojaAberta = true;

    const status = document.getElementById("status-loja");

    status.className = "status aberto";
    status.innerText = "🟢 Aberto agora - pedidos liberados";
}

function toggleLoja(){
    lojaAberta = true;
    atualizarStatusLoja();
}

/* ============================
   PEDIDO
============================ */

function enviarPedido(){

    atualizarStatusLoja();

    const rua = document.getElementById("rua");
    const numero = document.getElementById("numero");
    const bairro = document.getElementById("bairro");
    const pagamento = document.getElementById("pagamento");
    const observacao = document.getElementById("observacao");

    let subtotal = 0;
    let mensagem = "🍔 PEDIDO - LARIKA FLASH\n\n";
    let possuiItens = false;

    quantidades.forEach((qtd,i)=>{

        if(qtd > 0){

            possuiItens = true;

            subtotal += qtd * precos[i];

            mensagem += `${qtd}x ${nomesCombos[i]} - R$ ${(qtd * precos[i]).toFixed(2)}\n`;
        }

    });

    if(!possuiItens){
        alert("Adicione pelo menos um item.");
        return;
    }

    if(subtotal < 59){
        alert("Pedido mínimo de R$ 59,00.");
        return;
    }

    if(rua.value.trim() === ""){
        alert("Digite a rua.");
        return;
    }

    if(numero.value.trim() === ""){
        alert("Digite o número.");
        return;
    }

    if(bairro.value === ""){
        alert("Selecione o bairro.");
        return;
    }

    if(pagamento.value === ""){
        alert("Selecione a forma de pagamento.");
        return;
    }

    mensagem += "\n📍 INFORMAÇÕES\n";
    mensagem += "Rua: " + rua.value + "\n";
    mensagem += "Número: " + numero.value + "\n";
    mensagem += "Bairro: " + bairro.options[bairro.selectedIndex].text + "\n";
    mensagem += "Pagamento: " + pagamento.value + "\n";

    if(observacao.value.trim() !== ""){
        mensagem += "\n📝 OBSERVAÇÃO\n";
        mensagem += observacao.value + "\n";
    }

    mensagem += "\n💰 TOTAL: R$ ";
    mensagem += document.getElementById("total").innerText;

    window.open(
        "https://wa.me/5548988509014?text=" + encodeURIComponent(mensagem),
        "_blank"
    );
}

/* ============================
   INICIALIZAÇÃO
============================ */

atualizarStatusLoja();
calcularTotal();

setInterval(atualizarStatusLoja,60000);
