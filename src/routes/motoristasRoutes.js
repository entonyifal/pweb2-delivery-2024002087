import { Router } from 'express';
import { MotoristasRepositoryPrisma } from '../repositories/MotoristasRepositoryPrisma.js';
import { EntregasRepositoryPrisma } from '../repositories/EntregasRepositoryPrisma.js';
import { MotoristasService } from '../services/MotoristasService.js';
import { MotoristasController } from '../controllers/MotoristasController.js';

const router = Router();

const repository = new MotoristasRepositoryPrisma();
const entregasRepo = new EntregasRepositoryPrisma();

const service = new MotoristasService(repository, entregasRepo);
const controller = new MotoristasController(service);

router.post('/', controller.criar);
router.get('/:id/entregas', controller.listarEntregas); 

export default router;