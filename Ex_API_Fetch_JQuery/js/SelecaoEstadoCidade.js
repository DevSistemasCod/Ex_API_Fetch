export default class SelecaoEstadoCidade {
    #estado; 
    #cidade; 
    #opcaoCarregamento; 
    #opcaoPadraoEstado; 
    #opcaoPadraoCidade; 

    constructor() {
        // Inicialização dos elementos e opções padrão
        this.#estado = $("#estado");
        this.#cidade = $("#cidade");
        this.#opcaoCarregamento = this.criarOpcao("", "Carregando...");
        this.#opcaoPadraoEstado = this.criarOpcao("", "Selecione um estado");
        this.#opcaoPadraoCidade = this.criarOpcao("", "Selecione uma cidade");

        // Carrega os estados e define um ouvinte de evento para mudanças no seletor de estado
        this.carregarEstados();
        this.#estado.on("change", this.carregarCidades.bind(this));
    }

    // Método para criar uma opção para o seletor
    criarOpcao(valor, texto) {
        return $("<option>").val(valor).text(texto);
    }

    // Carrega a lista de estados
    carregarEstados() {
        this.limparSelect(this.#estado);
        this.#estado.append(this.#opcaoCarregamento);

        // Faz uma solicitação GET para obter a lista de estados e define funções para lidar com o sucesso ou falha
        $.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .done(this.onStatesLoaded.bind(this)) // Executado quando a solicitação é bem-sucedida
            .fail(this.onError.bind(this)); // Executado se a solicitação falhar
    }

    // Manipula a resposta da solicitação de estados bem-sucedida
    onStatesLoaded(estados) {
        this.limparSelect(this.#estado); // Limpa o seletor de estado
        this.#estado.append(this.#opcaoPadraoEstado); // Adiciona a opção padrão

        // Itera sobre a lista de estados e cria opções para cada um
        for (let i = 0; i < estados.length; i++) {
            let opcao = this.criarOpcao(estados[i].id, estados[i].nome);
            this.#estado.append(opcao);
        }
    }

    // Carrega a lista de cidades com base no estado selecionado
    carregarCidades() {
        let estadoId = this.#estado.val(); // Obtém o valor do estado selecionado
        this.limparSelect(this.#cidade); // Limpa o seletor de cidade
        this.#cidade.append(this.#opcaoCarregamento); // Adiciona a opção "Carregando..."

        // Faz uma solicitação GET para obter a lista de cidades com base no estado selecionado
        // e define funções para lidar com o sucesso ou falha
        $.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .done(this.onCitiesLoaded.bind(this)) // Executado quando a solicitação é bem-sucedida
            .fail(this.onError.bind(this)); // Executado se a solicitação falhar
    }

    // Manipula a resposta da solicitação de cidades bem-sucedida
    onCitiesLoaded(cidades) {
        this.limparSelect(this.#cidade); // Limpa o seletor de cidade
        this.#cidade.append(this.#opcaoPadraoCidade); // Adiciona a opção padrão

        // Itera sobre a lista de cidades e cria opções para cada uma
        for (let i = 0; i < cidades.length; i++) {
            let opcao = this.criarOpcao(cidades[i].id, cidades[i].nome);
            this.#cidade.append(opcao);
        }
    }

    // Manipula erros na solicitação AJAX
    onError(error) {
        console.error(error);
    }

    // Limpa o conteúdo de um seletor
    limparSelect(select) {
        select.empty();
    }
}
