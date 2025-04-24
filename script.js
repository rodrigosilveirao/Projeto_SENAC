function mostrarBody1() {
    let painelBtn = document.getElementById('painelBtn');
    let estoqueBtn = document.getElementById('estoqueBtn');
    let body1 = document.getElementById('body1');
    let body2 = document.getElementById('body2');

    body1.style.display = 'block';
    body2.style.display = 'none';
}

function mostrarBody2() {
    let painelBtn = document.getElementById('painelBtn');
    let estoqueBtn = document.getElementById('estoqueBtn');
    let body1 = document.getElementById('body1');
    let body2 = document.getElementById('body2');
    
    body1.style.display = 'none';
    body2.style.display = 'block';
}

function abrirModal() {
    document.getElementById('modal').style.display = 'block';
  }

  function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.querySelectorAll('#modal input').forEach(input => input.value = '');
}



function cadastrar(){
    const produto = {
        nome: document.getElementById('nome').value,
        dataEntrada: document.getElementById('dataEntrada').value,
        dataVencimento: document.getElementById('dataVencimento').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        limiteCritico: parseInt(document.getElementById('limiteCritico').value),
        valorUnitario: parseFloat(document.getElementById('valorUnitario').value),
        valorVenda: parseFloat(document.getElementById('valorVenda').value),
        codigo: document.getElementById('codigo').value
  }



  

    // Recupera uma lista chamadas produtos do localStorage, se essa lista na oexisteir ele cria uma nova
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Adiciona um novo produto
    produtos.push({nome: document.getElementById('nome').value,
        dataEntrada: document.getElementById('dataEntrada').value,
        dataVencimento: document.getElementById('dataVencimento').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        limiteCritico: parseInt(document.getElementById('limiteCritico').value),
        valorUnitario: parseFloat(document.getElementById('valorUnitario').value),
        valorVenda: parseFloat(document.getElementById('valorVenda').value),
        codigo: document.getElementById('codigo').value});

    //Salvar de volta no localStorage   lista para JSON
    localStorage.setItem("produtos", JSON.stringify(produtos));


    exibirProdutos();
    fecharModal();
}

function exibirProdutos (){

    let tabela = document.getElementById("tabela");
    tabela.innerHTML = `
        <tr>
            <th>Produtos</th>
            <th>Quantidade</th>
            <th>Limite Crítico</th>
            <th>Entrada</th>
            <th>Vencimento</th>
            <th>Unitário (R$)</th>
            <th>Venda (R$)</th>
            <th>Código</th>
        </tr>
        `;

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    
    produtos.forEach((produto) =>  {
        let row = tabela.insertRow();
        row.insertCell(0).innerText = produto.nome;        
        row.insertCell(1).innerHTML = `${produto.quantidade}
        <button onclick="alterarQuantidade('${produto.codigo}', ${produto.quantidade})">+</button>`;

        row.insertCell(2).innerText = produto.limiteCritico;
        row.insertCell(3).innerText = produto.dataEntrada;
        row.insertCell(4).innerText = produto.dataVencimento;
        row.insertCell(5).innerText = produto.valorUnitario;
        row.insertCell(6).innerText = produto.valorVenda;
        row.insertCell(7).innerText = produto.codigo;
    });

}



function alterarQuantidade(codigo, quantidadeAtual) {
    document.getElementById('modalEntrada').style.display = 'block';
    document.getElementById('entradaCodigo').value = codigo;

    document.getElementById('quantidadeAtual').textContent = quantidadeAtual;


  }

  function salvarEntrada() {
    let quantidadeAdicionar = parseInt(document.getElementById('quantidadeAdicionar').value);

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


    produtos = produtos.map(produto => {
        if (produto.codigo === document.getElementById('entradaCodigo').value) {
            produto.quantidade += quantidadeAdicionar; 
        }
        return produto;
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));

    exibirProdutos();
    fecharAltera();
}

function salvarEntrada() {
    let quantidadeAdicionar = parseInt(document.getElementById('quantidadeAdicionar').value);

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


    produtos = produtos.map(produto => {
        if (produto.codigo === document.getElementById('entradaCodigo').value) {
            produto.quantidade -= quantidadeAdicionar; 
        }
        return produto;
    });

    localStorage.setItem("produtos", JSON.stringify(produtos));

    exibirProdutos();
    fecharAltera();
}


  
  function fecharAltera() {
    document.getElementById('modalEntrada').style.display = 'none';
    document.querySelectorAll('#modal input').forEach(input => input.value = '');
    document.getElementById('quantidadeAdicionar').value='';
}





window.onload = exibirProdutos;