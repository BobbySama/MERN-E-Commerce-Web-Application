import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //   console.log('din backend primul orderItems inainte de creare:', orderItems);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    console.log(
      'din backend al doielea orderItems dupa creare:',
      createdOrder.orderItems
    );
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
