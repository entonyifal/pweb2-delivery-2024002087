export class MotoristasService {
    constructor(repository) {
        this.repository = repository;
    }

    criar(dados) {
        const { nome, cpf } = dados;

        if (!nome || !cpf) {
            throw { status: 400, erro: "Nome e CPF são obrigatórios" };
        }

        const duplicata = this.repository.buscarPorCpf(cpf);
        if (duplicata) {
            throw { status: 409, erro: "CPF já cadastrado" };
        }

        const novoMotorista = {
            nome,
            cpf,
            status: 'ATIVO'
        };

        return this.repository.salvar(novoMotorista);
    }

    listarEntregas(motoristaId) {
        const motorista = this.repository.buscarPorId(motoristaId);
        if (!motorista) {
            throw { status: 404, erro: "Motorista não encontrado" };
        }

        const entregas = this.repository.database.entregas.filter(e => e.motoristaId === Number(motoristaId));
        return entregas;
    }
}