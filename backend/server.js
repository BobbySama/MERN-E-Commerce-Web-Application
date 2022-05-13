import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';

import productRoutes from './routes/productRoutes.js';
import userRoutes from '/routes/userRoutes.js';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('===================== api is running =====================');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server runnin in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
