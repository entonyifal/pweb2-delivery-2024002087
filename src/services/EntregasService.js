export class EntregasService {
    constructor(repository) {
        this.repository = repository; 
    }

    criar(dados) {
        const { descricao, origem, destino } = dados;

        if (!descricao || !origem || !destino || origem === destino) {
            throw { status: 400, erro: "Dados inválidos ou origem igual ao destino" };
        }

        const duplicata = this.repository.buscarPorDescricaoOrigemDestino(descricao, origem, destino);
        if (duplicata) {
            throw { status: 409, erro: "Já existe uma entrega ativa com estes dados" };
        }

        const novaEntrega = {
            descricao,
            origem,
            destino,
            status: 'CRIADA',
            motoristaId: null,
            historico: [{
                data: new Date().toISOString(),
                descricao: "Entrega criada"
            }]
        };

        return this.repository.salvar(novaEntrega);
    }

    listarTodas(statusFiltro) {
        let entregas = this.repository.buscarTodas();
        if (statusFiltro) {
            entregas = entregas.filter(e => e.status === statusFiltro);
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
            throw { status: 422, erro: "Não é possível avançar uma entrega já finalizada" };
        }

        if (entrega.status === 'CRIADA') {
            entrega.status = 'EM_TRANSITO';
        } else if (entrega.status === 'EM_TRANSITO') {
            entrega.status = 'ENTREGUE';
        }

        entrega.historico.push({
            data: new Date().toISOString(),
            descricao: `Status avançado para ${entrega.status}`
        });

        return this.repository.salvar(entrega);
    }

    cancelar(id) {
        const entrega = this.buscarPorId(id);

        if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
            throw { status: 422, erro: "Não é possível cancelar esta entrega" };
        }

        entrega.status = 'CANCELADA';
        entrega.historico.push({
            data: new Date().toISOString(),
            descricao: "Entrega cancelada"
        });

        return this.repository.salvar(entrega);
    }
}