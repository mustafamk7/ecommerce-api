const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser')

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const customerRoutes = require('./routes/customerRoutes');
const addressRoutes = require('./routes/addressRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const imageRoutes = require('./routes/imageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');


app.use('/user', customerRoutes);
app.use('/addresses', addressRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/images', imageRoutes);
app.use('/reviews', reviewRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);


const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
