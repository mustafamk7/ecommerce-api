const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

router.post('/', authenticate, cartController.createCart);

router.post('/:cartId/items', authenticate, cartController.addItemToCart);

router.get('/:cartId/items', authenticate, cartController.getCartItems);

router.delete('/items/:cartItemId', authenticate, cartController.removeItemFromCart);

module.exports = router;
