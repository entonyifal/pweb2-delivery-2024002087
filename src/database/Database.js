export class Database {
    constructor() {
        // O padrão Singleton garante que todas as camadas usam a mesma lista
        if (!Database.instance) {
            this.entregas = [];
            this.idCounter = 1;
            this.motoristas = [];
            this.motoristaIdCounter = 1;
            Database.instance = this;
        }
        return Database.instance;
    }
}