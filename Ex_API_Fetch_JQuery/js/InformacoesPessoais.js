export default class InformacoesPessoais {
    #nome;
    #cpf;
    #rg;
    #dataNascimento;
    #estado;
    #cidade;
    #cep;

    constructor(nome, cpf, rg, dataNascimento, estado, cidade, cep) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#rg = rg;
        this.#dataNascimento = dataNascimento;
        this.#estado = estado;
        this.#cidade = cidade;
        this.#cep = cep;
    }

    
    get getNome() {
        return this.#nome;
    }

    get getCpf() {
        return this.#cpf;
    }

    get getRg() {
        return this.#rg;
    }

    get getDataNascimento() {
        return this.#dataNascimento;
    }

    get getEstado() {
        return this.#estado;
    }

    get getCidade() {
        return this.#cidade;
    }

    get getCep() {
        return this.#cep;
    }
}
