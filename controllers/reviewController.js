const { Review,Product } = require('../models');

exports.createReview = async (req, res) => {
  const cusId = req.user.customerId;
  const {productId, rating ,description} = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const review = await Review.create({
      productId,
      userId: cusId,
      rating,
      description
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllReview = async (req,res)=>{
  try {
    const reviews = await Review.findAll();
    if (reviews) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: 'reviews not found not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.deleteReview = async (req, res) => {
  const cusId = req.user.customerId;

  try {
    const review = await Review.findByPk(req.params.id);
    if(review.userId !== cusId){
      return res.status(404).json({ message: 'cant delete the review' });
    }
    const deleted = await Review.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'review deleted succesfully' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
