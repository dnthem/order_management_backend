import express from 'express';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrder);
router.post('/', OrderController.addOrder);
router.put('/:id', OrderController.updateOrder);
router.patch('/:id/complete', OrderController.completeOrder);
router.delete('/:id', OrderController.deleteOrder);

export { router };