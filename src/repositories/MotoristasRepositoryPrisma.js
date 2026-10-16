import { prisma } from '../database/prisma.js';

export class MotoristasRepositoryPrisma {
    async criar(dados) {
        return await prisma.motorista.create({
            data: {
                nome: dados.nome,
                cpf: dados.cpf,
                status: dados.status || 'ATIVO'
            }
        });
    }

    async buscarPorId(id) {
        return await prisma.motorista.findUnique({
            where: { id: Number(id) }
        });
    }

    async buscarPorCpf(cpf) {
        return await prisma.motorista.findUnique({
            where: { cpf: cpf }
        });
    }

    async listarTodos() {
        return await prisma.motorista.findMany();
    }
}