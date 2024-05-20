import express from 'express';
import CustomerController from '../controllers/customerController.js';

const router = express.Router();

router.get('/', CustomerController.getAllCustomers);
router.get('/:id', CustomerController.getCustomer);
router.post('/', CustomerController.addCustomer);
router.put('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

export { router };