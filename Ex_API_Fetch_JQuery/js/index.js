import InformacoesPessoais from './InformacoesPessoais.js';
import SelecaoEstadoCidade from './SelecaoEstadoCidade.js';

// Função para aplicar a máscara de CPF
function aplicarMascaraCpf() {
    let inputCpf = $('#cpf');
    let valor = inputCpf.val();

    // Remove caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Aplica a máscara
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    // Define o valor formatado de volta no campo de entrada
    inputCpf.val(valor);
}

// Crie uma instância da classe SelecaoEstadoCidade para gerenciar os selects de estado e cidade
let selecaoEstadoCidade = new SelecaoEstadoCidade();

// Adicione um ouvinte de evento ao campo de entrada de CPF
$('#cpf').on('input', aplicarMascaraCpf);

// Função para exibir informações no console
function exibirInformacoes() {
    let nome = $('#nome').val();
    let cpf = $('#cpf').val();
    let rg = $('#rg').val();
    let dataNascimento = $('#dataNascimento').val();
    let estado = $('#estado').val();
    let cidade = $('#cidade').val();
    let cep = $('#cep').val();

    let infoPessoais = new InformacoesPessoais(nome, cpf, rg, dataNascimento, estado, cidade, cep);

    console.log(infoPessoais);
}

// Adicione um ouvinte de evento ao botão "Submeter"
$('#submeter').on('click', exibirInformacoes);
