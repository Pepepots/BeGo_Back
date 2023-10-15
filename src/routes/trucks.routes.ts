import { Router } from "express";
import { truckController } from '../controllers'

const router = Router();

router.get('/trucks', truckController.getAll)
router.get('/trucks/id/:id', truckController.getById)

export default router