import { Router } from "express";
import { pointController} from '../controllers'

const router = Router();

router.get('/points', pointController.getAll)
router.get('/points/id/:id', pointController.getById)
router.get('/points/name/:name', pointController.getByName)

export default router