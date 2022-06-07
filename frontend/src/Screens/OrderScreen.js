import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams } from 'react-router-dom';
import { ListGroup, Image, Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const orderId = useParams().id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.storeOrderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.storeOrderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  let itemsPrice = '';

  if (!loading) {
    itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price, 0);
  }

  useEffect(() => {
    const addPayPallScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPallScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong style={{ fontSize: '15px' }}>Name:&nbsp; </strong>
                {order.user.name}{' '}
              </p>
              <p>
                <strong style={{ fontSize: '15px' }}>Email:&nbsp; </strong>
                {order.user.email}
              </p>
              <p>
                <strong style={{ fontSize: '15px' }}>Address:&nbsp; </strong>
                {order.shippingAddress.address},&nbsp;&nbsp;
                {order.shippingAddress.city},&nbsp;&nbsp;
                {order.shippingAddress.postalCode},&nbsp;&nbsp;
                {order.shippingAddress.country}
              </p>

              {/* check to see if the payment was made */}
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered yet!</Message>
              )}
            </ListGroup.Item>

            {/* PAYMENT METHOD */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong style={{ fontSize: '15px' }}>Method:&nbsp; </strong>
                {order.paymentMethod}
              </p>

              {/* check to see if the payment was made */}
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not paid yet!</Message>
              )}
            </ListGroup.Item>

            {/* ITEMS */}
            <ListGroup.Item>
              <h2>Items:</h2>
              {order.orderItems.length === 0 ? (
                <Message>There is no order!!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
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
                  {order.shippingPrice === 0 ? (
                    <Col>
                      <s style={{ opacity: '0.6' }}>10$</s>
                    </Col>
                  ) : (
                    <Col>${order.shippingPrice}</Col>
                  )}
                </Row>
              </ListGroup.Item>

              {/* TOTAL PRICE */}
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader></Loader>}
                  {!sdkReady ? (
                    <Loader></Loader>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
