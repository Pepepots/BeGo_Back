import { Router } from "express";
import { orderController } from '../controllers'

const router = Router();

router.post('/order', orderController.createOrder )
router.get('/order', orderController.getAll )
router.get('/order/:id', orderController.getById)
router.put('/order/:id', orderController.updateOrder)
router.delete('/order/:id', orderController.deleteById)
router.patch('/order/complete/:id', orderController.completeOrder)


export default router