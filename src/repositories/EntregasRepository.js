export class EntregasRepository {
    constructor(database) {
        this.database = database; 
    }

    salvar(entrega) {
        
        if (!entrega.id) {
            entrega.id = this.database.idCounter++;
            this.database.entregas.push(entrega);
        } else {
            
            const index = this.database.entregas.findIndex(e => e.id === entrega.id);
            if (index !== -1) {
                this.database.entregas[index] = entrega;
            }
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