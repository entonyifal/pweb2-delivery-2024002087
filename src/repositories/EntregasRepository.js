export class EntregasRepository {
    constructor(database) {
        this.database = database;
    }

    salvar(entrega) {
        if (!entrega.id) {
            entrega.id = this.database.idCounter++;
            this.database.entregas.push(entrega);
        }
        return entrega;
    }

    buscarTodas() {
        return this.database.entregas;
    }

    buscarPorId(id) {
        return this.database.entregas.find(e => e.id === Number(id));
    }

    buscarPorDescricaoOrigemDestino(descricao, origem, destino) {
        return this.database.entregas.find(e => 
            e.descricao === descricao && 
            e.origem === origem && 
            e.destino === destino &&
            e.status !== 'ENTREGUE' && 
            e.status !== 'CANCELADA'
        );
    }
}