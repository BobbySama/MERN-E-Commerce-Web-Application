import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ListGroup, Image, Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.storeCart);

  //   Compute prices
  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 20;
  const totalPrice = itemsPrice + shippingPrice;

  const placeOrderHandler = () => {
    console.log('order placed');
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong style={{ fontSize: '20px' }}>Address:&nbsp; </strong>
                {cart.shippingAddress.address},&nbsp;&nbsp;{' '}
                {cart.shippingAddress.city},&nbsp;&nbsp;
                {cart.shippingAddress.postalCode},&nbsp;&nbsp;
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            {/* PAYMENT METHOD */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong style={{ fontSize: '20px' }}>Method:&nbsp; </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            {/* ITEMS */}
            <ListGroup.Item>
              <h2>Items:</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty!!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col auto='true'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty}&nbsp; x &nbsp;${item.price}&nbsp; = &nbsp;$
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* ORDER SUMMARY */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2> Order Summary</h2>
              </ListGroup.Item>

              {/* ITEMS PRICE */}
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* SHIPPING PRICE */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>

                  {/* If the shipping price is 0 display the price but striked */}
                  {shippingPrice === 0 ? (
                    <Col>
                      <s style={{ opacity: '0.6' }}>10$</s>
                    </Col>
                  ) : (
                    <Col>${shippingPrice}</Col>
                  )}
                </Row>
              </ListGroup.Item>

              {/* TOTAL PRICE */}
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className='d-grid '>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
