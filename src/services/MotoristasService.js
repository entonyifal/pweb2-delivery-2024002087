export class MotoristasService {
    constructor(repository, entregasRepository) {
        this.repository = repository;
        this.entregasRepository = entregasRepository;
    }

    async criar(dados) {
        const { nome, cpf } = dados;

        if (!nome || !cpf) {
            throw { status: 400, erro: "Nome e CPF são obrigatórios" };
        }

        const duplicata = await this.repository.buscarPorCpf(cpf);
        if (duplicata) {
            throw { status: 409, erro: "CPF já cadastrado" };
        }

        const novoMotorista = {
            nome,
            cpf,
            status: 'ATIVO'
        };

        return await this.repository.criar(novoMotorista);
    }

    async listarTodos() {
        return await this.repository.listarTodos();
    }

    async listarEntregas(motoristaId, statusFiltro) {
        const motorista = await this.repository.buscarPorId(motoristaId);
        if (!motorista) {
            throw { status: 404, erro: "Motorista não encontrado" };
        }

        const todasEntregas = await this.entregasRepository.listarTodas();
        let entregas = todasEntregas.filter(e => e.motoristaId === Number(motoristaId));
        
        if (statusFiltro) {
            entregas = entregas.filter(e => e.status === statusFiltro);
        }
        
        return entregas;
    }
}