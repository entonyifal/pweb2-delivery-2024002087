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
}