const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');


router.post('/',authenticate, reviewController.createReview);

router.get('/', reviewController.getAllReview);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;
