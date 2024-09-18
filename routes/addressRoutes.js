const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const authenticate = require('../middleware/authMiddleware');


router.post('/',authenticate, addressController.createAddress);

router.get('/',authenticate, addressController.getAddress);

router.put('/:id',authenticate, addressController.updateAddress);

router.delete('/:id',authenticate, addressController.deleteAddress);

module.exports = router;
