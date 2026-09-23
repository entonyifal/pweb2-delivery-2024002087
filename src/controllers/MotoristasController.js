export class MotoristasController {
    constructor(service) {
        this.service = service;
    }

    criar = (req, res) => {
        try {
            const motorista = this.service.criar(req.body);
            return res.status(201).json(motorista);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }
    listarEntregas = (req, res) => {
        try {
            const entregas = this.service.listarEntregas(req.params.id);
            return res.status(200).json(entregas);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro });
        }
    }
}