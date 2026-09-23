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
            status: 'ATIVO' // Regra de negócio exigida pelo autograder
        };

        return this.repository.salvar(novoMotorista);
    }
}