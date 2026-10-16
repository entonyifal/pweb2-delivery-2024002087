export class EntregasController {
    constructor(service) {
        this.service = service;
    }

    criar = async (req, res) => {
        try {
            const entrega = await this.service.criar(req.body);
            return res.status(201).json(entrega);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    listar = async (req, res) => {
        try {
            const entregas = await this.service.listarTodas(req.query.status);
            return res.status(200).json(entregas);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    buscarPorId = async (req, res) => {
        try {
            const entrega = await this.service.buscarPorId(req.params.id);
            return res.status(200).json(entrega);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    buscarHistorico = async (req, res) => {
        try {
            const entrega = await this.service.buscarPorId(req.params.id);
            return res.status(200).json(entrega.historico);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    avancarStatus = async (req, res) => {
        try {
            const entrega = await this.service.avancarStatus(req.params.id);
            return res.status(200).json(entrega);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    cancelar = async (req, res) => {
        try {
            const entrega = await this.service.cancelar(req.params.id);
            return res.status(200).json(entrega);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }

    atribuirMotorista = async (req, res) => {
        try {
            const entrega = await this.service.atribuirMotorista(req.params.id, req.body.motoristaId);
            return res.status(200).json(entrega);
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status).json({ erro: erro.erro || "Erro interno" });
        }
    }
}