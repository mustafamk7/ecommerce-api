module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product', {
      productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      price: DataTypes.FLOAT,
      productDescription: DataTypes.TEXT,
      discount: DataTypes.FLOAT,
    });
  };
  