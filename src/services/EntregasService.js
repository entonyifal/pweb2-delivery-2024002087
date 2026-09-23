export class EntregasService {
    constructor(repository, motoristasRepository) { 
        this.repository = repository; 
        this.motoristasRepository = motoristasRepository; // Injetado para validar motorista
    }

    criar(dados) {
        const { descricao, origem, destino } = dados;
        if (!descricao || !origem || !destino || origem === destino) throw { status: 400, erro: "Dados inválidos" };
        if (this.repository.buscarPorDescricaoOrigemDestino(descricao, origem, destino)) throw { status: 409, erro: "Duplicata" };
        
        return this.repository.salvar({
            descricao, origem, destino, status: 'CRIADA', motoristaId: null,
            historico: [{ data: new Date().toISOString(), descricao: "Entrega criada" }]
        });
    }

    listarTodas(statusFiltro) {
        let entregas = this.repository.buscarTodas();
        if (statusFiltro) entregas = entregas.filter(e => e.status === statusFiltro);
        return entregas;
    }

    buscarPorId(id) {
        const entrega = this.repository.buscarPorId(id);
        if (!entrega) throw { status: 404, erro: "Entrega não encontrada" };
        return entrega;
    }

    avancarStatus(id) {
        const entrega = this.buscarPorId(id);
        if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') throw { status: 422, erro: "Já finalizada" };
        
        entrega.status = entrega.status === 'CRIADA' ? 'EM_TRANSITO' : 'ENTREGUE';
        entrega.historico.push({ data: new Date().toISOString(), descricao: `Avançado para ${entrega.status}` });
        return this.repository.salvar(entrega);
    }

    cancelar(id) {
        const entrega = this.buscarPorId(id);
        if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') throw { status: 422, erro: "Não pode cancelar" };
        
        entrega.status = 'CANCELADA';
        entrega.historico.push({ data: new Date().toISOString(), descricao: "Cancelada" });
        return this.repository.salvar(entrega);
    }

    // NOVA FUNÇÃO:
    atribuirMotorista(id, motoristaId) {
        const entrega = this.buscarPorId(id);
        if (entrega.status !== 'CRIADA') throw { status: 422, erro: "Entrega não está CRIADA" };

        const motorista = this.motoristasRepository.buscarPorId(motoristaId);
        if (!motorista || motorista.status !== 'ATIVO') throw { status: 422, erro: "Motorista inativo ou não existe" };

        entrega.motoristaId = motoristaId;
        entrega.historico.push({ data: new Date().toISOString(), descricao: `Motorista ${motoristaId} atribuído` });
        return this.repository.salvar(entrega);
    }
}