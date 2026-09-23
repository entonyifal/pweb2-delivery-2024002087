export class MotoristasService {
    constructor(repository, entregasRepository) {
        this.repository = repository;
        this.entregasRepository = entregasRepository;
    }

    criar(dados) {
        const { nome, cpf } = dados;
        if (!nome || !cpf) throw { status: 400, erro: "Nome e CPF obrigatórios" };
        if (this.repository.buscarPorCpf(cpf)) throw { status: 409, erro: "CPF duplicado" };

        return this.repository.salvar({ nome, cpf, status: 'ATIVO' });
    }

    // NOVA FUNÇÃO:
    listarEntregas(motoristaId) {
        const motorista = this.repository.buscarPorId(motoristaId);
        if (!motorista) throw { status: 404, erro: "Motorista não encontrado" };
        return this.entregasRepository.buscarPorMotoristaId(motoristaId);
    }
}