export class EntregasController {
    constructor(service) {
        this.service = service; // Recebe o service via injeção
    }

    criar = (req, res) => {
        try {
            const entregaCriada = this.service.criar(req.body);
            return res.status(201).json(entregaCriada);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    listar = (req, res) => {
        try {
            const status = req.query.status;
            const entregas = this.service.listarTodas(status);
            return res.status(200).json(entregas);
        } catch (erro) {
            return res.status(500).json({ erro: "Erro ao buscar entregas" });
        }
    }

    buscarPorId = (req, res) => {
        try {
            const entrega = this.service.buscarPorId(req.params.id);
            return res.status(200).json(entrega);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro });
        }
    }

    avancarStatus = (req, res) => {
        try {
            const entregaAtualizada = this.service.avancarStatus(req.params.id);
            return res.status(200).json(entregaAtualizada);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro });
        }
    }

    cancelar = (req, res) => {
        try {
            const entregaCancelada = this.service.cancelar(req.params.id);
            return res.status(200).json(entregaCancelada);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro });
        }
    }

    buscarHistorico = (req, res) => {
        try {
            const entrega = this.service.buscarPorId(req.params.id);
            return res.status(200).json(entrega.historico);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro });
        }
    }
}