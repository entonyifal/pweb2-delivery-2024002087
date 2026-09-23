import { Router } from 'express';
import { Database } from '../database/Database.js';
import { EntregasRepository } from '../repositories/EntregasRepository.js';
import { MotoristasRepository } from '../repositories/MotoristasRepository.js';
import { EntregasService } from '../services/EntregasService.js';
import { EntregasController } from '../controllers/EntregasController.js';

const router = Router();
const database = new Database(); 
const repository = new EntregasRepository(database); 
const motoristasRepository = new MotoristasRepository(database); 
// Injetamos os DOIS repositórios no Service para ele poder consultar motoristas
const service = new EntregasService(repository, motoristasRepository);     
const controller = new EntregasController(service);  

router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.get('/:id/historico', controller.buscarHistorico);
router.patch('/:id/avancar', controller.avancarStatus);
router.patch('/:id/cancelar', controller.cancelar);
router.patch('/:id/atribuir', controller.atribuirMotorista);

export default router;