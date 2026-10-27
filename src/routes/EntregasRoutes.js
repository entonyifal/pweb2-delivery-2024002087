import { Router } from 'express';
import { EntregasRepositoryPrisma } from '../repositories/EntregasRepositoryPrisma.js';
import { MotoristasRepositoryPrisma } from '../repositories/MotoristasRepositoryPrisma.js';
import { EntregasService } from '../services/EntregasService.js';
import { MotoristasService } from '../services/MotoristasService.js';
import { EntregasController } from '../controllers/EntregasController.js';

const router = Router();

const repository = new EntregasRepositoryPrisma(); 
const motoristaRepository = new MotoristasRepositoryPrisma(); 

const service = new EntregasService(repository, motoristaRepository);
const motoristaService = new MotoristasService(motoristaRepository, repository);
const controller = new EntregasController(service, motoristaService);

router.get('/', controller.listar);
router.get('/nova', controller.nova);
router.post('/', controller.criar);
router.get('/:id', controller.buscarPorId);
router.patch('/:id/avancar', controller.avancarStatus);
router.patch('/:id/cancelar', controller.cancelar);
router.patch('/:id/atribuir', controller.atribuirMotorista); 

export default router;