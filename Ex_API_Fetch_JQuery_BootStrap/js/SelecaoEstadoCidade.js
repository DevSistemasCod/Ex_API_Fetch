export default class SelecaoEstadoCidade {
    #estado;
    #cidade;
    #opcaoCarregamento;
    #opcaoPadraoEstado;
    #opcaoPadraoCidade;

    constructor() {
        this.#estado = $("#estado"); // Seleciona o elemento HTML com o ID "estado"
        this.#cidade = $("#cidade"); // Seleciona o elemento HTML com o ID "cidade"
        this.#opcaoCarregamento = this.criarOpcao("", "Carregando..."); // Cria a opção de carregamento
        this.#opcaoPadraoEstado = this.criarOpcao("", "Selecione um estado"); // Cria a opção padrão para o estado
        this.#opcaoPadraoCidade = this.criarOpcao("", "Selecione uma cidade"); // Cria a opção padrão para a cidade

        this.carregarEstados(); // Inicia o carregamento dos estados
        this.#estado.on("change", this.carregarCidades.bind(this)); // Adiciona um ouvinte de evento para a mudança do estado
    }

    // Método para criar uma opção para um select
    criarOpcao(valor, texto) {
        return $("<option>").val(valor).text(texto);
    }

    // Método para carregar os estados
    carregarEstados() {
        this.limparSelect(this.#estado); // Limpa o select de estados
        this.#estado.append(this.#opcaoCarregamento); // Adiciona a opção "Carregando..."

        $.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .done(this.onStatesLoaded.bind(this)) // Processa a resposta bem-sucedida
            .fail(this.onError.bind(this)); // Manipula erros
    }

    // Método executado quando os estados são carregados
    onStatesLoaded(estados) {
        this.limparSelect(this.#estado); // Limpa o select de estados
        this.#estado.append(this.#opcaoPadraoEstado); // Adiciona a opção padrão

        for (let i = 0; i < estados.length; i++) {
            let opcao = this.criarOpcao(estados[i].id, estados[i].nome);
            this.#estado.append(opcao); // Adiciona os estados ao select
        }
    }

    // Método para carregar as cidades
    carregarCidades() {
        let estadoId = this.#estado.val(); // Obtém o valor do estado selecionado
        this.limparSelect(this.#cidade); // Limpa o select de cidades
        this.#cidade.append(this.#opcaoCarregamento); // Adiciona a opção "Carregando..."

        $.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .done(this.onCitiesLoaded.bind(this)) // Processa a resposta bem-sucedida
            .fail(this.onError.bind(this)); // Manipula erros
    }

    // Método executado quando as cidades são carregadas
    onCitiesLoaded(cidades) {
        this.limparSelect(this.#cidade); // Limpa o select de cidades
        this.#cidade.append(this.#opcaoPadraoCidade); // Adiciona a opção padrão

        for (let i = 0; i < cidades.length; i++) {
            let opcao = this.criarOpcao(cidades[i].id, cidades[i].nome);
            this.#cidade.append(opcao); // Adiciona as cidades ao select
        }
    }

    // Método para manipular erros durante as solicitações AJAX
    onError(error) {
        console.error(error);
    }

    // Método para limpar um seletor removendo todos os elementos filho
    limparSelect(select) {
        select.empty();
    }
}
