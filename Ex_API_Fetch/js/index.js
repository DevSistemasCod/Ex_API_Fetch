import InformacoesPessoais from './InformacoesPessoais.js';
import SelecaoEstadoCidade from './SelecaoEstadoCidade.js';


// Função para aplicar a máscara de CPF
function aplicarMascaraCpf() {
    let inputCpf = document.getElementById('cpf');
    let valor = inputCpf.value;

    // Remove caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Aplica a máscara
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    // Define o valor formatado de volta no campo de entrada
    inputCpf.value = valor;
}

// Crie uma instância da classe SelecaoEstadoCidade para gerenciar os selects de estado e cidade
let selecaoEstadoCidade = new SelecaoEstadoCidade();

// Adicione um ouvinte de evento ao campo de entrada de CPF
document.getElementById('cpf').addEventListener('input', aplicarMascaraCpf);

// Função para exibir informações no console
function exibirInformacoes() {
    let nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    let rg = document.getElementById('rg').value;
    let dataNascimento = document.getElementById('dataNascimento').value;
    let estado = document.getElementById('estado').value;
    let cidade = document.getElementById('cidade').value;
    let cep = document.getElementById('cep').value;

    let infoPessoais = new InformacoesPessoais(nome, cpf, rg, dataNascimento, estado, cidade, cep);

    console.log(infoPessoais);
}

// Adicione um ouvinte de evento ao botão "Submeter"
document.getElementById('submeter').addEventListener('click', exibirInformacoes);


