const { Cart, CartItem, Product } = require("../models");
const cart = require("../models/cart");

exports.createCart = async (req, res) => {
  try {
    const customerId = req.user.customerId;

    let cart = await Cart.findOne({ where: { customerId } });

    if (!cart) {
      cart = await Cart.create({ customerId });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const { cartId } = req.params;

  try {
    const customerId = req.user.customerId;

    // Check that the cart is belonged to login user
    const cart = await Cart.findOne({ where: { cartId, customerId } });
    if (!cart) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // check item already present in cart
    const existingCartItem = await CartItem.findOne({
      where: { cartId, productId },
    });
    if (existingCartItem) {
      // if item is already exists then update the quantity
      await CartItem.update(
        { quantity: existingCartItem.quantity + quantity },
        { where: { cartItemId: existingCartItem.cartItemId } }
      );
      return res.status(200).json({ message: "Cart item updated" });
    }

    const cartItem = await CartItem.create({ cartId, productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  const { cartId } = req.params;

  try {
    const customerId = req.user.customerId;
    // check that requested id belongs to logged user
    const cart = await Cart.findOne({ where: { cartId, customerId } });

    if (!cart) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const cartItems = await CartItem.findAll({
      where: { cartId },
      include: [
        { model: Product, as: "Product", attributes: ["productName", "price"] },
      ],
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const customerId = req.user.customerId;

    const cartItem = await CartItem.findByPk(cartItemId, {
      include: [{ model: Cart, as: "Cart" }],
    });
    // console.log("cartItem",cartItem);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await CartItem.destroy({ where: { cartItemId } });
    res.status(204).json({ message: "item removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
