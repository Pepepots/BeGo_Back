import { Router } from "express";
import { truckController } from '../controllers'

const router = Router();

router.get('/', truckController.getAll)
router.get('/:id', truckController.getById)

export default router