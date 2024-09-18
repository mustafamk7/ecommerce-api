module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Review', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    });
  };
  