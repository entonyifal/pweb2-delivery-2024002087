export class Database {
    constructor() {
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