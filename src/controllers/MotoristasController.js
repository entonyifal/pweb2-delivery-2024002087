export class MotoristasController {
    constructor(service) {
        this.service = service;
    }

    listar = async (req, res) => {
        try {
            const motoristas = await this.service.listarTodos();
            return res.render('motoristas/index', { motoristas, title: 'Motoristas - Delivery Tracker' });
        } catch (erro) {
            req.flash('erro', "Erro ao carregar a lista de motoristas.");
            return res.redirect('/');
        }
    }

    novo = (req, res) => {
        return res.render('motoristas/novo', { title: 'Novo Motorista - Delivery Tracker' });
    }

    criar = async (req, res) => {
        try {
            await this.service.criar(req.body);
            req.flash('sucesso', 'Motorista cadastrado com sucesso!');
            return res.redirect('/motoristas');
        } catch (erro) {
            const status = erro.status || 500;
            return res.status(status === 400 || status === 409 ? status : 500).render('motoristas/novo', {
                title: 'Novo Motorista - Delivery Tracker',
                mensagens_erro: [erro.erro || "Erro interno"],
                dadosAntigos: req.body
            });
        }
    }
}