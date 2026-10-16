import { prisma } from '../database/prisma.js';

export class EntregasRepositoryPrisma {
    async criar(dados) {
        return await prisma.entrega.create({
            data: {
                descricao: dados.descricao,
                origem: dados.origem,
                destino: dados.destino,
                status: dados.status || 'CRIADA',
                motoristaId: dados.motoristaId || null,
                historico: {
                    create: dados.historico ? dados.historico.map(h => ({
                        status: h.status,
                        evento: h.evento || null,
                        data: h.data
                    })) : []
                }
            },
            include: { historico: true }
        });
    }

    async buscarPorId(id) {
        return await prisma.entrega.findUnique({
            where: { id: Number(id) },
            include: { historico: true }
        });
    }
    
    async listarTodas() {
        return await prisma.entrega.findMany({
            include: { historico: true }
        });
    }

    async atualizar(id, dados, eventoHistorico = null) {
        const dataUpdate = {
            status: dados.status,
            motoristaId: dados.motoristaId
        };

        if (eventoHistorico) {
            dataUpdate.historico = { create: eventoHistorico };
        }

        return await prisma.entrega.update({
            where: { id: Number(id) },
            data: dataUpdate,
            include: { historico: true }
        });
    }
}