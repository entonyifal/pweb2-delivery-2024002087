export class EntregasService {
    constructor(repository, motoristaRepository) {
        this.repository = repository;
        this.motoristaRepository = motoristaRepository;
    }

    async criar(dados) {
        if (dados.origem === dados.destino) {
            throw { status: 400, erro: "Origem e destino não podem ser iguais" };
        }

        const entregas = await this.repository.listarTodas();
        const duplicada = entregas.find(e => e.descricao === dados.descricao && e.status !== 'ENTREGUE' && e.status !== 'CANCELADA');
        
        if (duplicada) {
            throw { status: 409, erro: "Entrega duplicada ativa" };
        }

        const novaEntrega = {
            ...dados,
            status: 'CRIADA',
            historico: [{ status: 'CRIADA', data: new Date().toISOString() }]
        };

        return await this.repository.criar(novaEntrega);
    }

    async listarTodas(status) {
        let entregas = await this.repository.listarTodas();
        if (status) {
            entregas = entregas.filter(e => e.status === status);
        }
        return entregas;
    }

    async buscarPorId(id) {
        const entrega = await this.repository.buscarPorId(id);
        if (!entrega) {
            throw { status: 404, erro: "Entrega não encontrada" };
        }
        return entrega;
    }

    async avancarStatus(id) {
        const entrega = await this.buscarPorId(id);
        
        if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
            throw { status: 422, erro: "Não é possível avançar o status desta entrega" };
        }

        let novoStatus = entrega.status;
        if (entrega.status === 'CRIADA') novoStatus = 'EM_TRANSITO';
        else if (entrega.status === 'EM_TRANSITO') novoStatus = 'ENTREGUE';

        return await this.repository.atualizar(id, { status: novoStatus }, { status: novoStatus, data: new Date().toISOString() });
    }

    async cancelar(id) {
        const entrega = await this.buscarPorId(id);
        
        if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
            throw { status: 422, erro: "Não é possível cancelar uma entrega já finalizada" };
        }

        return await this.repository.atualizar(id, { status: 'CANCELADA' }, { status: 'CANCELADA', data: new Date().toISOString() });
    }

    async atribuirMotorista(entregaId, motoristaId) {
        const entrega = await this.buscarPorId(entregaId);

        if (entrega.status !== 'CRIADA') {
            throw { status: 422, erro: "Só é possível atribuir motorista a entregas com status CRIADA" };
        }

        const motorista = await this.motoristaRepository.buscarPorId(motoristaId);
        if (!motorista) {
            throw { status: 404, erro: "Motorista não encontrado" };
        }
        if (motorista.status !== 'ATIVO') {
            throw { status: 400, erro: "O motorista precisa estar ATIVO" };
        }

        return await this.repository.atualizar(entregaId, { motoristaId: motorista.id, status: entrega.status }, { status: entrega.status, evento: 'Atribuição de motorista', data: new Date().toISOString() });
    }
}