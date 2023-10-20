export default class SelecaoEstadoCidade {
    #estado;
    #cidade;
    #opcaoCarregamento;
    #opcaoPadraoEstado;
    #opcaoPadraoCidade;

    constructor() {
        this.#estado = document.getElementById("estado");
        this.#cidade = document.getElementById("cidade");
        this.#opcaoCarregamento = this.criarOpcao("", "Carregando...");
        this.#opcaoPadraoEstado = this.criarOpcao("", "Selecione um estado");
        this.#opcaoPadraoCidade = this.criarOpcao("", "Selecione uma cidade");

        this.carregarEstados();
        this.#estado.addEventListener("change", this.carregarCidades.bind(this));
    }

    criarOpcao(valor, texto) {
        let option = document.createElement("option");
        option.value = valor;
        option.textContent = texto;
        return option;
    }

    carregarEstados() {
        this.limparSelect(this.#estado);
        this.#estado.appendChild(this.#opcaoCarregamento);

        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(this.processarRespostaJSON.bind(this))
            .catch(this.onError.bind(this));
    }

    processarRespostaJSON(response) {
        response.json()
            .then(this.onStatesLoaded.bind(this))
            .catch(this.onError.bind(this));
    }

    onStatesLoaded(estados) {
        this.#estado.removeChild(this.#opcaoCarregamento);
        this.#estado.appendChild(this.#opcaoPadraoEstado);

        for (let i = 0; i < estados.length; i++) {
            let opcao = this.criarOpcao(estados[i].id, estados[i].nome);
            this.#estado.appendChild(opcao);
        }
    }

    carregarCidades() {
        let estadoId = this.#estado.value;
        this.limparSelect(this.#cidade);
        this.#cidade.appendChild(this.#opcaoCarregamento);

        const onSuccess = function (response) {
            return response.json();
        };

        const onCitiesLoaded = function (cidades) {
            this.#cidade.removeChild(this.#opcaoCarregamento);
            this.#cidade.appendChild(this.#opcaoPadraoCidade);

            for (let i = 0; i < cidades.length; i++) {
                let opcao = this.criarOpcao(cidades[i].id, cidades[i].nome);
                this.#cidade.appendChild(opcao);
            }
        }.bind(this);


        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(onSuccess)
            .then(onCitiesLoaded)
            .catch(this.onError.bind(this));
    }

    onError(error) {
        console.error(error);
    }

    limparSelect(select) {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    }
}