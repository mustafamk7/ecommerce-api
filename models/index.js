const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mustafa","postgres","root",{
    host : "localhost",
    dialect : "postgres",
    // port : 5432
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Customer = require('./customer')(sequelize, DataTypes);
db.Address = require('./address')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Image = require('./image')(sequelize, DataTypes);
db.Review = require('./review')(sequelize, DataTypes);
db.Cart = require('./cart')(sequelize,DataTypes);
db.CartItem = require('./cartItem')(sequelize,DataTypes);
db.Order = require('./order')(sequelize,DataTypes);
db.OrderItem = require('./orderItem')(sequelize,DataTypes);

db.Customer.hasMany(db.Address, { foreignKey: 'customerId', as: 'addresses' });
db.Address.belongsTo(db.Customer, { foreignKey: 'customerId', as: 'customer' });

db.Category.hasMany(db.Product, { foreignKey: 'categoryId',as: "Products" });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', as : 'Category' });

db.Product.hasMany(db.Image, { foreignKey: 'productId', as: 'Images' });
db.Image.belongsTo(db.Product, { foreignKey: 'productId', as: 'Product' });

db.Customer.hasMany(db.Review, { foreignKey: 'userId', as : "reviews" });
db.Product.hasMany(db.Review, { foreignKey: 'productId', as : "reviews" });
db.Review.belongsTo(db.Customer, { foreignKey: 'userId', as : "customer"});
db.Review.belongsTo(db.Product, { foreignKey: 'productId', as : "product" });

db.Customer.hasOne(db.Cart, { foreignKey: 'customerId', as: 'Cart' });
db.Cart.belongsTo(db.Customer, { foreignKey: 'customerId', as: 'Customer' });

db.Cart.hasMany(db.CartItem, { foreignKey: 'cartId', as: 'Items' });
db.CartItem.belongsTo(db.Cart, { foreignKey: 'cartId', as: 'Cart' });

db.CartItem.belongsTo(db.Product, { foreignKey: 'productId', as: 'Product' });
db.Product.hasMany(db.CartItem, { foreignKey: 'productId', as: 'CartItems' });

db.Customer.hasMany(db.Order, { foreignKey: 'customerId', as: 'Orders' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customerId', as: 'Customer' });

db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId', as: 'Items' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId', as: 'Order' });

db.OrderItem.belongsTo(db.Product, { foreignKey: 'productId', as: 'Product' });
db.Product.hasMany(db.OrderItem, { foreignKey: 'productId', as: 'OrderItems' });


module.exports = db;
