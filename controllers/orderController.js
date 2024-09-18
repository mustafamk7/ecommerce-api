const { Order, OrderItem, Cart, CartItem, Product } = require('../models');


exports.createOrder = async (req, res) => {
  const customerId = req.user.customerId;

  try {
    // Find the user cart and cart items
    const cart = await Cart.findOne({
      where: { customerId },
      include: [
        {
          model: CartItem,
          as: 'Items',
          include: [{ model: Product, as: 'Product', attributes: ['productName', 'price'] }]
        }
      ]
    });

    if (!cart || cart.Items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }


    const totalAmount = cart.Items.reduce((sum, cartItem) => 
      sum + (cartItem.quantity * cartItem.Product.price),0
    );

    const order = await Order.create({ customerId, totalAmount });

    // Move the cart items into the order items
    const orderItems = cart.Items.map(cartItem => ({
      orderId: order.orderId,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      price: cartItem.Product.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    await CartItem.destroy({ where: { cartId: cart.cartId } });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order and associated items
    const order = await Order.findOne({
      where: { orderId },
      include: [
        {
          model: OrderItem,
          as: 'Items',
          include: [{ model: Product, as: 'Product', attributes: ['productName', 'price'] }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCustomerAllOrders = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'Items',
          include: [{ model: Product, as: 'Product', attributes: ['productName', 'price'] }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


