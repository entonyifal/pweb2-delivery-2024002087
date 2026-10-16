import { Router } from 'express';
import { EntregasRepositoryPrisma } from '../repositories/EntregasRepositoryPrisma.js';
import { MotoristasRepositoryPrisma } from '../repositories/MotoristasRepositoryPrisma.js';
import { EntregasService } from '../services/EntregasService.js';
import { EntregasController } from '../controllers/EntregasController.js';

const router = Router();

const repository = new EntregasRepositoryPrisma(); 
const motoristaRepository = new MotoristasRepositoryPrisma(); 

const service = new EntregasService(repository, motoristaRepository);
const controller = new EntregasController(service);

router.post('/', controller.criar);
router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.get('/:id/historico', controller.buscarHistorico);
router.patch('/:id/avancar', controller.avancarStatus);
router.patch('/:id/cancelar', controller.cancelar);
router.patch('/:id/atribuir', controller.atribuirMotorista); 

export default router;