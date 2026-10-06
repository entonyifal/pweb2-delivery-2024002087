export class EntregasService {
    constructor(repository, motoristaRepository) {
        this.repository = repository;
        this.motoristaRepository = motoristaRepository;
    }

    criar(dados) {
        if (dados.origem === dados.destino) {
            throw { status: 400, erro: "Origem e destino não podem ser iguais" };
        }

        const entregasAtivas = this.repository.database.entregas.filter(e => e.status !== 'ENTREGUE' && e.status !== 'CANCELADA');
        const duplicada = entregasAtivas.find(e => e.descricao === dados.descricao);
        
        if (duplicada) {
            throw { status: 409, erro: "Entrega duplicada ativa" };
        }

        const novaEntrega = {
            ...dados,
            status: 'CRIADA',
            historico: [{ status: 'CRIADA', data: new Date().toISOString() }]
        };

        return this.repository.salvar(novaEntrega);
    }

    listarTodas(status) {
        let entregas = this.repository.database.entregas;
        if (status) {
            entregas = entregas.filter(e => e.status === status);
        }
        return entregas;
    }

    buscarPorId(id) {
        const entrega = this.repository.buscarPorId(id);
        if (!entrega) {
            throw { status: 404, erro: "Entrega não encontrada" };
        }
        return entrega;
    }

    avancarStatus(id) {
        const entrega = this.buscarPorId(id);
        
        if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
            throw { status: 422, erro: "Não é possível avançar o status desta entrega" };
        }

        if (entrega.status === 'CRIADA') {
            entrega.status = 'EM_TRANSITO';
        } else if (entrega.status === 'EM_TRANSITO') {
            entrega.status = 'ENTREGUE';
        }

        entrega.historico.push({ status: entrega.status, data: new Date().toISOString() });
        return entrega;
    }

    cancelar(id) {
        const entrega = this.buscarPorId(id);
        
        if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
            throw { status: 422, erro: "Não é possível cancelar uma entrega já finalizada" };
        }

        entrega.status = 'CANCELADA';
        entrega.historico.push({ status: 'CANCELADA', data: new Date().toISOString() });
        return entrega;
    }

    atribuirMotorista(entregaId, motoristaId) {
        const entrega = this.buscarPorId(entregaId);

        if (entrega.status !== 'CRIADA') {
            throw { status: 422, erro: "Só é possível atribuir motorista a entregas com status CRIADA" };
        }

        const motorista = this.motoristaRepository.buscarPorId(motoristaId);
        if (!motorista) {
            throw { status: 404, erro: "Motorista não encontrado" };
        }
        if (motorista.status !== 'ATIVO') {
            throw { status: 400, erro: "O motorista precisa estar ATIVO" };
        }

        entrega.motoristaId = motorista.id;
        return entrega;
    }
}