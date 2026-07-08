/* ============================
   CONFIGURAÇÃO INICIAL
============================ */

let lojaAberta = false;

const quantidades = [0,0,0,0,0,0,0,0,0,0];

const precos = [
    139,
    99,
    74,
    59,
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
   HORÁRIO DE FUNCIONAMENTO
   TERÇA A SEXTA
   20:00 ÀS 01:00
============================ */

function lojaEstaAbertaAgora(){

    const agora = new Date(
        new Date().toLocaleString("en-US",{
            timeZone:"America/Sao_Paulo"
        })
    );

    let dia = agora.getDay();
    const hora = agora.getHours();

    // Entre 00:00 e 00:59 ainda conta como o dia anterior
    if(hora < 1){
        dia--;
        if(dia < 0) dia = 6;
    }

    const ehTercaASexta = dia >= 2 && dia <= 5;

    if(!ehTercaASexta) return false;

    return hora >= 20 || hora < 1;
}

/* ============================
   QUANTIDADE
============================ */

function adicionar(i){
    quantidades[i]++;
    document.getElementById("qtd-"+i).innerText=quantidades[i];
    calcularTotal();
}

function remover(i){
    if(quantidades[i]>0){
        quantidades[i]--;
        document.getElementById("qtd-"+i).innerText=quantidades[i];
        calcularTotal();
    }
}

/* ============================
   TOTAL
============================ */

function calcularTotal(){

    let subtotal=0;

    quantidades.forEach((qtd,i)=>{
        subtotal+=qtd*precos[i];
    });

    const bairro=document.getElementById("bairro");

    const entrega=bairro.value===""?0:parseFloat(bairro.value);

    document.getElementById("total").innerText=(subtotal+entrega).toFixed(2);
}

/* ============================
   STATUS
============================ */

function atualizarStatusLoja(){

    lojaAberta=lojaEstaAbertaAgora();

    const status=document.getElementById("status-loja");

    if(lojaAberta){
        status.className="status aberto";
        status.innerText="🟢 Aberto agora - pedidos liberados";
    }else{
        status.className="status fechado";
        status.innerText="🔴 Loja fechada • abre terça a sexta das 20h às 01h";
    }
}

function toggleLoja(){
    lojaAberta=!lojaAberta;
    atualizarStatusLoja();
}

/* ============================
   PEDIDO
============================ */

function enviarPedido(){

    atualizarStatusLoja();

    if(!lojaAberta){
        alert("A loja está fechada. Funcionamos de terça a sexta das 20h às 01h.");
        return;
    }

    const rua=document.getElementById("rua");
    const numero=document.getElementById("numero");
    const bairro=document.getElementById("bairro");
    const observacao=document.getElementById("observacao");

    let subtotal=0;
    let mensagem="🍔 PEDIDO - LARIKA FLASH\n\n";
    let possuiItens=false;

    quantidades.forEach((qtd,i)=>{

        if(qtd>0){

            possuiItens=true;

            subtotal+=qtd*precos[i];

            mensagem+=`${qtd}x ${nomesCombos[i]} - R$ ${(qtd*precos[i]).toFixed(2)}\n`;
        }

    });

    if(!possuiItens){
        alert("Adicione pelo menos um item.");
        return;
    }

    if(subtotal<59){
        alert("Pedido mínimo de R$ 59,00.");
        return;
    }

    if(rua.value.trim()===""){
        alert("Digite a rua.");
        return;
    }

    if(numero.value.trim()===""){
        alert("Digite o número.");
        return;
    }

    if(bairro.value===""){
        alert("Selecione o bairro.");
        return;
    }

    mensagem+="\n📍 INFORMAÇÕES\n";
    mensagem+="Rua: "+rua.value+"\n";
    mensagem+="Número: "+numero.value+"\n";
    mensagem+="Bairro: "+bairro.options[bairro.selectedIndex].text+"\n";
    mensagem+="Pagamento: Pix\n";

    if(observacao.value.trim()!==""){
        mensagem+="\n📝 OBSERVAÇÃO\n";
        mensagem+=observacao.value+"\n";
    }

    mensagem+="\n💰 TOTAL: R$ ";
    mensagem+=document.getElementById("total").innerText;

    window.open(
        "https://wa.me/5548988509014?text="+encodeURIComponent(mensagem),
        "_blank"
    );
}

/* ============================
   INICIALIZAÇÃO
============================ */

atualizarStatusLoja();
calcularTotal();

setInterval(atualizarStatusLoja,60000);
