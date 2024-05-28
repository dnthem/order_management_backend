import express from 'express';
import CustomerController from '../controllers/customerController.js';

const router = express.Router();

router.get('/', CustomerController.get_all_customers);
router.get('/:id', CustomerController.get_a_customer);
router.post('/', CustomerController.post_create_customer);
router.patch('/:id', CustomerController.patch_update_customer);
router.delete('/:id', CustomerController.delete_customer);

export { router };