const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');


router.post('/', authenticate, orderController.createOrder);

router.get('/', authenticate, orderController.getCustomerAllOrders);

router.get('/:orderId', authenticate, orderController.getOrderDetails);

module.exports = router;
