const inputProduto = document.getElementById('produto');
const inputPreco = document.getElementById('preco');
const inputQuantidade = document.getElementById('quantidade');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaProdutos = document.getElementById('lista-produtos');
const displayTotal = document.getElementById('valor-total');
const btnLimpar = document.getElementById('btn-limpar');

let listaDeCompras = [];

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarLista() {
    listaProdutos.innerHTML = '';
    let totalGeral = 0;

    listaDeCompras.forEach((item, index) => {
        const totalItem = item.preco * item.quantidade;
        totalGeral += totalItem;

        const li = document.createElement('li');
        li.classList.add('list-item');

        li.innerHTML = `
            <div class="item-name">
                ${item.nome}
            </div>
            <div class="item-details">
                ${formatarMoeda(item.preco)} x ${item.quantidade} un
            </div>
            <div class="item-total">
                ${formatarMoeda(totalItem)}
            </div>
            <button class="btn-delete" onclick="removerItem(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        listaProdutos.appendChild(li);
    });

    displayTotal.textContent = formatarMoeda(totalGeral);
}

function adicionarProduto() {
    const nome = inputProduto.value.trim();
    const preco = parseFloat(inputPreco.value);
    const quantidade = parseInt(inputQuantidade.value);

    if (nome === '' || isNaN(preco) || isNaN(quantidade) || preco <= 0 || quantidade <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    const novoProduto = {
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    listaDeCompras.push(novoProduto);
    atualizarLista();

    inputProduto.value = '';
    inputPreco.value = '';
    inputQuantidade.value = '1';
    inputProduto.focus();
}

function removerItem(index) {
    listaDeCompras.splice(index, 1);
    atualizarLista();
}

function limparTodaLista() {
    if (confirm('Tem certeza que deseja apagar toda a lista de compras?')) {
        listaDeCompras = [];
        atualizarLista();
    }
}

btnAdicionar.addEventListener('click', adicionarProduto);
btnLimpar.addEventListener('click', limparTodaLista);

inputQuantidade.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarProduto();
    }
});

inputPreco.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarProduto();
    }
});
