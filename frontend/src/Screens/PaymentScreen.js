import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';

// ==================  NU MERGE INCA SELECTUL IN REDUX  ========================

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('PayPall');

  const cart = useSelector((state) => state.storeCart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/order');
  };

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
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
              checked={paymentMethod === 'Cash'}
              onChange={handleChange}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='PayPall'
              id='PayPall'
              name='paymentMethod'
              value='PayPall'
              checked={paymentMethod === 'PayPall'}
              onChange={handleChange}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='success' className='btn-margin-top'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
