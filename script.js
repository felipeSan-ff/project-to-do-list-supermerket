// Selecionando os elementos do DOM (Document Object Model)
// Aqui pegamos as referências dos inputs, botões e áreas onde vamos exibir as informações
const inputProduto = document.getElementById('produto');
const inputPreco = document.getElementById('preco');
const inputQuantidade = document.getElementById('quantidade');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaProdutos = document.getElementById('lista-produtos');
const displayTotal = document.getElementById('valor-total');
const btnLimpar = document.getElementById('btn-limpar');

// Array para armazenar os produtos da lista
// Usamos um array para facilitar a manipulação dos dados (adicionar, remover, somar)
let listaDeCompras = [];

// Função para formatar valores monetários em Reais (R$)
// Recebe um número e retorna uma string formatada (ex: 10.5 -> "R$ 10,50")
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para atualizar a exibição da lista na tela
// Essa função limpa a lista atual e recria os elementos HTML com base no array 'listaDeCompras'
function atualizarLista() {
    // 1. Limpa o conteúdo atual da lista visual
    listaProdutos.innerHTML = '';
    
    // 2. Variável para acumular o preço total de todos os itens
    let totalGeral = 0;

    // 3. Percorre cada produto salvo no array
    listaDeCompras.forEach((item, index) => {
        // Calcula o total deste item (Preço * Quantidade)
        const totalItem = item.preco * item.quantidade;
        
        // Adiciona ao total geral
        totalGeral += totalItem;

        // Cria o elemento HTML (li) para o item
        const li = document.createElement('li');
        li.classList.add('list-item');

        // Preenche o HTML do item com as informações
        // Usamos template strings (``) para facilitar a inserção de variáveis
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

        // Adiciona o item criado à lista visível na tela
        listaProdutos.appendChild(li);
    });

    // 4. Atualiza o display do Total Final
    displayTotal.textContent = formatarMoeda(totalGeral);
}

// Função para adicionar um novo produto
function adicionarProduto() {
    // Pegar os valores dos campos
    const nome = inputProduto.value.trim();
    // Converte o preço e quantidade para número. Se não for número válido, vira 0 ou NaN.
    const preco = parseFloat(inputPreco.value); 
    const quantidade = parseInt(inputQuantidade.value);

    // Validação básica: verifica se os campos estão preenchidos corretamente
    if (nome === '' || isNaN(preco) || isNaN(quantidade) || preco <= 0 || quantidade <= 0) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Cria um objeto representando o novo produto
    const novoProduto = {
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    // Adiciona o objeto ao nosso array de controle
    listaDeCompras.push(novoProduto);

    // Atualiza a tela para mostrar o novo item
    atualizarLista();

    // Limpa os campos de input para facilitar a próxima digitação
    inputProduto.value = '';
    inputPreco.value = '';
    inputQuantidade.value = '1';
    
    // Coloca o foco (cursor) de volta no campo de nome
    inputProduto.focus();
}

// Função para remover um item específico da lista
// Recebe o índice (posição) do item no array
function removerItem(index) {
    // Remove 1 item a partir da posição 'index'
    listaDeCompras.splice(index, 1);
    
    // Atualiza a tela para refletir a remoção
    atualizarLista();
}

// Função para limpar toda a lista
function limparTodaLista() {
    if (confirm('Tem certeza que deseja apagar toda a lista de compras?')) {
        listaDeCompras = []; // Zera o array
        atualizarLista();    // Atualiza a tela (vai ficar vazio)
    }
}

// Event Listeners (Escutadores de Eventos)
// Configura o botão "Adicionar" para chamar a função adicionarProduto quando clicado
btnAdicionar.addEventListener('click', adicionarProduto);

// Configura o botão "Limpar Lista"
btnLimpar.addEventListener('click', limparTodaLista);

// Extra: Permitir adicionar pressionando "Enter" no campo de quantidade ou preço
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
