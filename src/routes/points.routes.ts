import { Router } from "express";
import { pointController} from '../controllers'

const router = Router();

router.get('/', pointController.getAll)
router.get('/name/ ', pointController.getByName)
router.get('/:id', pointController.getById)

export default router