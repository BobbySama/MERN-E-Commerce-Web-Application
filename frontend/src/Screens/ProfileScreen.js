import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateUserProfile, getUserDetails } from '../actions/userActions';

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

  //asta MERGE
  const userLogin = useSelector((state) => state.storeUserLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.storeUserProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || Object.keys(user).length === 0) {
        dispatch(getUserDetails('profile'));
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
      console.log('s-a dispaciuit profile screenu');

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

          <Button type='submit' variant='primary' className='btn-margin-top'>
            Update Profile
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
