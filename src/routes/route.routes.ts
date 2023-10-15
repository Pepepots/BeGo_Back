import { Router } from "express";
import { routeController } from '../controllers'

const router = Router();

router.post('/routes', routeController.createRoute )
router.get('/routes', routeController.getAll )
router.get('/routes/:id', routeController.getById)

export default router