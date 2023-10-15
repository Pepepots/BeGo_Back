import { Router } from "express";
import { pointController} from '../controllers'

const router = Router();

router.get('/points', pointController.getAll)
router.get('/points/name/', pointController.getByName)
router.get('/points/:id', pointController.getById)

export default router