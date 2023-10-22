export default class SelecaoEstadoCidade {
    #estado;
    #cidade;
    #opcaoCarregamento;
    #opcaoPadraoEstado;
    #opcaoPadraoCidade;

    constructor() {
        this.#estado = document.getElementById("estado"); // Obtém o elemento seletor de estado
        this.#cidade = document.getElementById("cidade"); // Obtém o elemento seletor de cidade
        this.#opcaoCarregamento = this.criarOpcao("", "Carregando..."); // Cria a opção "Carregando..."
        this.#opcaoPadraoEstado = this.criarOpcao("", "Selecione um estado"); // Cria a opção padrão para estado
        this.#opcaoPadraoCidade = this.criarOpcao("", "Selecione uma cidade"); // Cria a opção padrão para cidade

        this.carregarEstados(); // Carrega os estados ao inicializar a instância
        this.#estado.addEventListener("change", this.carregarCidades.bind(this)); // Adiciona um ouvinte de evento para mudanças no seletor de estado
    }

    // Método para criar uma opção para um seletor
    criarOpcao(valor, texto) {
        let option = document.createElement("option"); // Cria um elemento <option>
        option.value = valor; 
        option.textContent = texto; 
        return option;
    }

    // Método para carregar a lista de estados
    carregarEstados() {
        this.limparSelect(this.#estado); 
        this.#estado.appendChild(this.#opcaoCarregamento); 
        
        // Faz uma solicitação para obter a lista de estados
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados') 
            .then(this.processarRespostaJSON.bind(this)) // Processa a resposta como JSON
            .catch(this.onError.bind(this)); // Manipula erros na solicitação
    }

    // Método para processar a resposta JSON
    processarRespostaJSON(response) {
        response.json() // Converte a resposta para JSON
            .then(this.onStatesLoaded.bind(this)) // Executado quando os estados são carregados com sucesso
            .catch(this.onError.bind(this)); // Manipula erros na conversão JSON
    }

    // Método para manipular os estados carregados com sucesso
    onStatesLoaded(estados) {
        this.#estado.removeChild(this.#opcaoCarregamento); // Remove a opção "Carregando..."
        this.#estado.appendChild(this.#opcaoPadraoEstado); // Adiciona a opção padrão "Selecione um estado"

        for (let i = 0; i < estados.length; i++) {
            let opcao = this.criarOpcao(estados[i].id, estados[i].nome); // Cria uma opção para cada estado
            this.#estado.appendChild(opcao); // Adiciona a opção ao seletor de estado
        }
    }

    // Método para carregar a lista de cidades com base no estado selecionado
    carregarCidades() {
        let estadoId = this.#estado.value; // Obtém o valor do estado selecionado
        this.limparSelect(this.#cidade); // Limpa o seletor de cidade
        this.#cidade.appendChild(this.#opcaoCarregamento); // Adiciona a opção "Carregando..."

        // Define funções para processar a resposta da solicitação AJAX
        const onSuccess = function (response) {
            return response.json(); // Converte a resposta para JSON
        };

        const onCitiesLoaded = function (cidades) {
            this.#cidade.removeChild(this.#opcaoCarregamento); // Remove a opção "Carregando..."
            this.#cidade.appendChild(this.#opcaoPadraoCidade); // Adiciona a opção padrão "Selecione uma cidade"

            for (let i = 0; i < cidades.length; i++) {
                let opcao = this.criarOpcao(cidades[i].id, cidades[i].nome); // Cria uma opção para cada cidade
                this.#cidade.appendChild(opcao); // Adiciona a opção ao seletor de cidade
            }
        }.bind(this);
            // Faz uma solicitação para obter a lista de cidades com base no id do estado 
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(onSuccess) // Processa a resposta como JSON
            .then(onCitiesLoaded) // Executado quando as cidades são carregadas com sucesso
            .catch(this.onError.bind(this)); // Manipula erros na solicitação
    }

    // Método para manipular erros durante as solicitações AJAX
    onError(error) {
        console.error(error);
    }

    // Método para limpar um seletor removendo todos os elementos filho
    limparSelect(select) {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    }
}
