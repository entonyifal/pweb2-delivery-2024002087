/**
 * Lida com os dados dos motoristas no banco em memória.
 */
export class MotoristasRepository {
    /** @param {Object} database - Banco de dados (Singleton) */
    constructor(database) {
        this.database = database;
    }

    /**
     * Adiciona um novo motorista.
     * @param {Object} dados - { nome, cpf, status }
     * @returns {Object} Motorista salvo com ID
     */
    criar(dados) {
        dados.id = this.database.motoristas.length + 1;
        this.database.motoristas.push(dados);
        return dados;
    }

    /**
     * Busca motorista pelo ID.
     * @param {number|string} id 
     * @returns {Object|undefined} 
     */
    buscarPorId(id) {
        return this.database.motoristas.find(m => m.id === Number(id));
    }
    
    /**
     * Busca motorista pelo CPF.
     * @param {string} cpf 
     * @returns {Object|undefined} 
     */
    buscarPorCpf(cpf) {
        return this.database.motoristas.find(m => m.cpf === cpf);
    }
}