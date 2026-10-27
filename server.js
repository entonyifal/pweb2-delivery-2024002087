import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';

import entregasRoutes from './src/routes/EntregasRoutes.js';
import motoristasRoutes from './src/routes/motoristasRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(expressEjsLayouts);
app.set('layout', 'layouts/base');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(session({
    secret: 'delivery_tracker_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.mensagens_sucesso = req.flash('sucesso');
    res.locals.mensagens_erro = req.flash('erro');
    res.locals.dadosAntigos = req.flash('dadosAntigos')[0] || {};
    next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/', (req, res) => res.redirect('/entregas'));

app.use('/entregas', entregasRoutes);
app.use('/motoristas', motoristasRoutes);

app.use((req, res) => res.status(404).render('404', { title: 'Página não encontrada' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Delivery Tracker SSR rodando em http://localhost:${PORT}`));