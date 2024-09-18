const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const customerController = require('../controllers/customerController');

router.post('/register', customerController.createCustomer);
router.post('/login', customerController.login);

// router.get('/:id', customerController.getCustomer);
router.get('/', customerController.getAllCustomer);

router.put('/:id',authenticate, customerController.updateCustomer);

// router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
