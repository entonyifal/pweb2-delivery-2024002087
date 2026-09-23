import { Router } from 'express';
import { Database } from '../database/Database.js';
import { MotoristasRepository } from '../repositories/MotoristasRepository.js';
import { MotoristasService } from '../services/MotoristasService.js';
import { MotoristasController } from '../controllers/MotoristasController.js';

// ATENÇÃO: Como usamos uma base em memória, precisamos importar a mesma instância 
// para Entregas e Motoristas partilharem os mesmos dados. Por enquanto, criamos uma nova aqui.
const router = Router();
const database = new Database(); 
const repository = new MotoristasRepository(database);
const service = new MotoristasService(repository);
const controller = new MotoristasController(service);

router.post('/', controller.criar);

export default router;