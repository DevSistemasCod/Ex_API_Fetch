export default class SelecaoEstadoCidade {
    #estado;
    #cidade;
    #opcaoCarregamento;
    #opcaoPadraoEstado;
    #opcaoPadraoCidade;

    constructor() {
        this.#estado = $("#estado");
        this.#cidade = $("#cidade");
        this.#opcaoCarregamento = this.criarOpcao("", "Carregando...");
        this.#opcaoPadraoEstado = this.criarOpcao("", "Selecione um estado");
        this.#opcaoPadraoCidade = this.criarOpcao("", "Selecione uma cidade");

        this.carregarEstados();
        this.#estado.on("change", this.carregarCidades.bind(this));
    }

    criarOpcao(valor, texto) {
        return $("<option>").val(valor).text(texto);
    }

    carregarEstados() {
        this.limparSelect(this.#estado);
        this.#estado.append(this.#opcaoCarregamento);

        $.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .done(this.onStatesLoaded.bind(this))
            .fail(this.onError.bind(this));
    }

    onStatesLoaded(estados) {
        this.limparSelect(this.#estado);
        this.#estado.append(this.#opcaoPadraoEstado);

        for (let i = 0; i < estados.length; i++) {
            let opcao = this.criarOpcao(estados[i].id, estados[i].nome);
            this.#estado.append(opcao);
        }
    }

    carregarCidades() {
        let estadoId = this.#estado.val();
        this.limparSelect(this.#cidade);
        this.#cidade.append(this.#opcaoCarregamento);

        $.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .done(this.onCitiesLoaded.bind(this))
            .fail(this.onError.bind(this));
    }

    onCitiesLoaded(cidades) {
        this.limparSelect(this.#cidade);
        this.#cidade.append(this.#opcaoPadraoCidade);

        for (let i = 0; i < cidades.length; i++) {
            let opcao = this.criarOpcao(cidades[i].id, cidades[i].nome);
            this.#cidade.append(opcao);
        }
    }

    onError(error) {
        console.error(error);
    }

    limparSelect(select) {
        select.empty();
    }
}
