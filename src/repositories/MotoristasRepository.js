export class MotoristasRepository {
    constructor(database) {
        this.database = database;
    }

    salvar(motorista) {
        if (!motorista.id) {
            motorista.id = this.database.motoristaIdCounter++;
            this.database.motoristas.push(motorista);
        }
        return motorista;
    }

    buscarPorCpf(cpf) {
        return this.database.motoristas.find(m => m.cpf === cpf);
    }

    buscarPorId(id) {
        return this.database.motoristas.find(m => m.id === Number(id));
    }
}