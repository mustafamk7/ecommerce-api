module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Category', {
      categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryName: DataTypes.STRING,
      description: DataTypes.TEXT,
    });
  };
  