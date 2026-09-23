import { Router } from 'express';
import { Database } from '../database/Database.js';
import { EntregasRepository } from '../repositories/EntregasRepository.js';
import { EntregasService } from '../services/EntregasService.js';
import { EntregasController } from '../controllers/EntregasController.js';

const router = Router();

// --- Composition Root: Injeção de Dependências ---
const database = new Database(); 
const repository = new EntregasRepository(database); 
const service = new EntregasService(repository);     
const controller = new EntregasController(service);  

// --- Mapeamento das Rotas ---
router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.get('/:id/historico', controller.buscarHistorico);

// Usamos PATCH pois estamos a atualizar apenas uma parte (o status) da entrega
router.patch('/:id/avancar', controller.avancarStatus);
router.patch('/:id/cancelar', controller.cancelar);

export default router;