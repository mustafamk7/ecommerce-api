const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authorizeAdmin = require('../middleware/authorizationMiddleware');


router.post('/',authorizeAdmin, productController.createProduct);

router.get('/:id',productController.getProduct);

router.get('/', productController.getAllProduct);

router.put('/:id',authorizeAdmin, productController.updateProduct);

router.delete('/:id',authorizeAdmin, productController.deleteProduct);

module.exports = router;
