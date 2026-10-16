export class MotoristasController {
    constructor(service) {
        this.service = service;
    }

    criar = async (req, res) => {
        try {
            const motoristaCriado = await this.service.criar(req.body);
            return res.status(201).json(motoristaCriado);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    listarEntregas = async (req, res) => {
        try {
            const entregas = await this.service.listarEntregas(req.params.id, req.query.status);
            return res.status(200).json(entregas);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }
}