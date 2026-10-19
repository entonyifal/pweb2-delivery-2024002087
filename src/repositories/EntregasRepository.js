/**
 * Lida com os dados das entregas no banco em memória.
 */
export class EntregasRepository {
    /** @param {Object} database - Banco de dados (Singleton) */
    constructor(database) {
        this.database = database;
    }

    /**
     * Adiciona uma nova entrega.
     * @param {Object} dados - { descricao, origem, destino, status, historico }
     * @returns {Object} Entrega salva com ID
     */
    criar(dados) {
        dados.id = this.database.entregas.length + 1;
        this.database.entregas.push(dados);
        return dados;
    }

    /**
     * Busca entrega pelo ID.
     * @param {number|string} id 
     * @returns {Object|undefined}
     */
    buscarPorId(id) {
        return this.database.entregas.find(e => e.id === Number(id));
    }
}