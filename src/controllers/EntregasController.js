export class EntregasController {
    constructor(service, motoristaService) {
        this.service = service;
        this.motoristaService = motoristaService;
    }

    listar = async (req, res) => {
        try {
            const entregas = await this.service.listarTodas(req.query.status);
            return res.render('entregas/index', { entregas, statusFiltro: req.query.status, title: 'Entregas - Delivery Tracker' });
        } catch (erro) {
            req.flash('erro', "Erro ao carregar entregas.");
            return res.redirect('/');
        }
    }

    nova = (req, res) => {
        return res.render('entregas/nova', { title: 'Nova Entrega - Delivery Tracker' });
    }

    criar = async (req, res) => {
        try {
            await this.service.criar(req.body);
            req.flash('sucesso', 'Entrega criada com sucesso!');
            return res.redirect('/entregas');
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status === 400 || status === 409 ? status : 500).render('entregas/nova', {
                title: 'Nova Entrega - Delivery Tracker',
                mensagens_erro: [erro.erro || "Erro interno"],
                dadosAntigos: req.body
            });
        }
    }

    buscarPorId = async (req, res) => {
        try {
            const entrega = await this.service.buscarPorId(req.params.id);
            const motoristas = await this.motoristaService.listarTodos();
            const motoristasAtivos = motoristas.filter(m => m.status === 'ATIVO');
            return res.render('entregas/detalhe', { entrega, motoristasAtivos, title: `Entrega #${entrega.id} - Delivery Tracker` });
        } catch (erro) {
            return res.status(404).render('404', { title: 'Página não encontrada' });
        }
    }

    avancarStatus = async (req, res) => {
        try {
            await this.service.avancarStatus(req.params.id);
            req.flash('sucesso', 'Status avançado com sucesso!');
        } catch (erro) {
            req.flash('erro', erro.erro || "Erro ao avançar status.");
        }
        return res.redirect(`/entregas/${req.params.id}`);
    }

    cancelar = async (req, res) => {
        try {
            await this.service.cancelar(req.params.id);
            req.flash('sucesso', 'Entrega cancelada com sucesso!');
        } catch (erro) {
            req.flash('erro', erro.erro || "Erro ao cancelar entrega.");
        }
        return res.redirect(`/entregas/${req.params.id}`);
    }

    atribuirMotorista = async (req, res) => {
        try {
            await this.service.atribuirMotorista(req.params.id, req.body.motoristaId);
            req.flash('sucesso', 'Motorista atribuído com sucesso!');
        } catch (erro) {
            req.flash('erro', erro.erro || "Erro ao atribuir motorista.");
        }
        return res.redirect(`/entregas/${req.params.id}`);
    }
}