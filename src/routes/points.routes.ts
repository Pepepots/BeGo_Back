import { Router } from "express";
import { pointController} from '../controllers'

const router = Router();

router.get('/points', pointController.getAll)

export default router