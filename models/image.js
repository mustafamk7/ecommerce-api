module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Image', {
      imageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Product', 
        //   key: 'productId',
        // },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };
  
  