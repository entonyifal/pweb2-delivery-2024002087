import express from 'express';
import entregasRoutes from './src/routes/EntregasRoutes.js';
import motoristasRoutes from './src/routes/motoristasRoutes.js';

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/entregas', entregasRoutes);
app.use('/api/motoristas', motoristasRoutes); 

app.use((req, res) => res.status(404).json({ erro: 'recurso não encontrado' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Delivery Tracker rodando em http://localhost:${PORT}`));