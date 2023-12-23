let valorTotal;
let carrinhoItens = {}; // Usando um objeto para armazenar os itens do carrinho

limpar();

function adicionar() {
    // Recuperar valores: nome do produto, quantidade e valor
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split('-')[0];
    let valorPorProduto = parseFloat(produto.split('R$')[1].replace(',', '.'));
    let quantidade = parseInt(document.getElementById('quantidade').value);

    // Verificar se o produto selecionado é válido
    if (!produto || produto.trim() === "") {
        alert("Selecione um produto válido.");
        return;
    }

    // Verificar se a quantidade inserida é válida
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Insira uma quantidade válida.");
        return;
    }

    // Verificar se o produto já está no carrinho
    if (carrinhoItens[nomeProduto]) {
        // Atualizar a quantidade se o produto já estiver no carrinho
        carrinhoItens[nomeProduto].quantidade += quantidade;
    } else {
        // Adicionar um novo item ao carrinho se o produto não estiver no carrinho
        carrinhoItens[nomeProduto] = {
            quantidade: quantidade,
            valorPorProduto: valorPorProduto
        };
    }

    // Atualizar o HTML do carrinho
    atualizarCarrinhoHTML();

    // Limpar o campo de quantidade
    document.getElementById('quantidade').value = 0;
}

function atualizarCarrinhoHTML() {
    // Atualizar o carrinho no HTML
    let carrinho = document.getElementById('lista-produtos');
    carrinho.innerHTML = '';

    for (let nomeProduto in carrinhoItens) {
        let item = carrinhoItens[nomeProduto];
        let valorAgregado = item.quantidade * item.valorPorProduto;

        carrinho.innerHTML += `<section class="carrinho__produtos__produto">
        <span class="texto-azul">${item.quantidade}x</span> ${nomeProduto} <span class="texto-azul">R$ ${valorAgregado.toFixed(2)}</span>
        <button class="botao-remover" onclick="removerProduto('${nomeProduto}')">
            <img src="./assets/lixeira.png" alt="Remover">
        </button>
    </section>`;
    }

    // Atualizar o valor total
    valorTotal = calcularValorTotal();
    let campoValorTotal = document.getElementById('valor-total');
    campoValorTotal.textContent = `R$ ${valorTotal.toFixed(2)}`;
}

function calcularValorTotal() {
    // Calcular o valor total com base nos itens no carrinho
    let total = 0;
    for (let nomeProduto in carrinhoItens) {
        let item = carrinhoItens[nomeProduto];
        total += item.quantidade * item.valorPorProduto;
    }
    return total;
}

function limpar() {
    valorTotal = 0;
    carrinhoItens = {};
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0';
}


function removerProduto(nomeProduto) {
    if (carrinhoItens[nomeProduto]) {
        // Reduzir a quantidade do produto no carrinho
        carrinhoItens[nomeProduto].quantidade--;

        // Se a quantidade for zero, remover completamente o produto
        if (carrinhoItens[nomeProduto].quantidade <= 0) {
            delete carrinhoItens[nomeProduto];
        }

        // Atualizar o HTML do carrinho
        atualizarCarrinhoHTML();

        // Atualizar o valor total
        valorTotal = calcularValorTotal();
        let campoValorTotal = document.getElementById('valor-total');
        campoValorTotal.textContent = `R$ ${valorTotal.toFixed(2)}`;
    }
}
