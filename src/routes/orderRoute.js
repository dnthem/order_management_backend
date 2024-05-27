import express from 'express';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/', OrderController.get_all_orders);
router.get('/:id', OrderController.get_an_order);
router.post('/', OrderController.post_create_order);
router.patch('/:id', OrderController.patch_update_order);
router.post('/:id/complete', OrderController.post_complete_order);
router.delete('/:id', OrderController.delete_order);

export { router };