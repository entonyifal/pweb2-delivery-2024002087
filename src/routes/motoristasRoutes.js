import { Router } from 'express';
import { Database } from '../database/Database.js';
import { MotoristasRepository } from '../repositories/MotoristasRepository.js';
import { EntregasRepository } from '../repositories/EntregasRepository.js';
import { MotoristasService } from '../services/MotoristasService.js';
import { MotoristasController } from '../controllers/MotoristasController.js';

const router = Router();
const database = new Database(); 
const repository = new MotoristasRepository(database);
const entregasRepository = new EntregasRepository(database);
const service = new MotoristasService(repository, entregasRepository);
const controller = new MotoristasController(service);

router.post('/', controller.criar);
router.get('/:id/entregas', controller.listarEntregas);

export default router;