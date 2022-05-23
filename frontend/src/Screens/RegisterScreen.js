import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [nameMessage, setNameMessage] = useState(null);
  const [emailMessage, setemailMessage] = useState(null);

  const userRegister = useSelector((state) => state.storeUserRegister);
  // console.log(userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordConfirmMessage('Passwords do not match');
    } else if (name === '' || name === null) {
      setNameMessage('Please enter an username');
    } else if (email === '' || email === null) {
      setNameMessage('Please enter an email');
    } else if (password === '' || name === null) {
      setNameMessage('Please enter a password');
    } else {
      dispatch(register(name, email, password));
      // navigate('/');
    }
  };
  return (
    <FormContainer>
      <h1>Set up your account</h1>

      {/* if the passwords field is empty display an warning */}
      {passwordMessage && <Message variant='danger'>{passwordMessage}</Message>}

      {/* if the passwords do not match display a warning */}
      {passwordConfirmMessage && (
        <Message variant='danger'>{passwordConfirmMessage}</Message>
      )}

      {/* if the name field is empty display an warning */}
      {nameMessage && <Message variant='danger'>{nameMessage}</Message>}

      {/* if the email field is empty display an warning */}
      {emailMessage && <Message variant='danger'>{emailMessage}</Message>}
      {/* loading phase */}
      {loading && <Loader></Loader>}

      <Form onSubmit={submitHandler}>
        {/* name form */}
        <Form.Group controlId='name'>
          <Form.Label>Your wished username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter your username'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* email form */}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* password form */}
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* confirm password form */}
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter the same password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register me now
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already part of the team?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
