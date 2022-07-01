import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateUserProfile, getUserDetails } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //   messages in case the user does not fill the inputs propperly
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(null);
  const [nameMessage, setNameMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);

  const userDetails = useSelector((state) => state.storeUserDetails);
  const { loading, user } = userDetails;

  const userLogin = useSelector((state) => state.storeUserLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.storeUserProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.storeOrderMyList);
  const { loading: loadingOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || Object.keys(user).length === 0) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      }
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordConfirmMessage('Passwords do not match');
    } else if (name === '' || name === null) {
      setNameMessage('Please enter an username');
    } else if (email === '' || email === null) {
      setEmailMessage('Please enter an email');
    } else {
      //AICI SE SCHIMBA TOATE

      dispatch(updateUserProfile({ id: user._id, name, email, password }));

      // userInfo.name = user.name;
      // localStorage.setItem('userInfo', JSON.stringify(userInfo));

      // window.location.reload(false);
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {/* if the passwords do not match display a warning */}
        {passwordConfirmMessage && (
          <Message variant='danger'>{passwordConfirmMessage}</Message>
        )}

        {/* if the name field is empty display an warning */}
        {nameMessage && <Message variant='danger'>{nameMessage}</Message>}

        {/* if the email field is empty display an warning */}
        {emailMessage && <Message variant='danger'>{emailMessage}</Message>}

        {/* display a success message if the update was done */}
        {success && <Message variant='light'>Profile updated</Message>}

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

          <Button
            type='submit'
            variant='primary'
            className='btn-margin-top'
            style={{ marginBottom: '70px' }}
          >
            Update Profile
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My orders</h2>
        {loadingOrders ? (
          <Loader></Loader>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm'
            style={{ marginTop: '32px' }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className='fa fa-times centered'
                        style={{ color: 'red' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <div className='centered'>
                        order.deliveredAt.substring(0, 10)
                      </div>
                    ) : (
                      <i
                        className='fa fa-times centered'
                        style={{ color: 'red' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <div className='centered'>
                        <Button variant='link'>
                          <i className='fa-solid fa-circle-info'></i>
                        </Button>
                      </div>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
