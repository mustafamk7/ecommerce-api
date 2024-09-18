const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authorizeAdmin = require('../middleware/authorizationMiddleware');


router.post('/',authorizeAdmin, imageController.uploadImage);

router.get('/:id',imageController.getImage);

router.put('/:id',authorizeAdmin, imageController.updateImage);

router.delete('/:id',authorizeAdmin, imageController.deleteImage);

module.exports = router;
