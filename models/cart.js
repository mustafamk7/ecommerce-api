module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      cartId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    return Cart;
  };
  