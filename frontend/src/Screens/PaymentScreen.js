import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';

// ==================  NU MERGE INCA SELECTUL IN REDUX  ========================

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.storeCart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPall');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/order');
    console.log('aici e submitul la payment');
  };

  const changePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    console.log(e.target.value);
    console.log(paymentMethod);
  };

  return (
    <FormContainer>
      <h1>Payment Method</h1>

      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Cash'
              id='Cash'
              name='paymentMethod'
              value='Cash'
              checked
              onChange={changePaymentMethod}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='PayPall'
              id='PayPall'
              name='paymentMethod'
              value='PayPall'
              checked
              onChange={changePaymentMethod}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className='btn-margin-top'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;