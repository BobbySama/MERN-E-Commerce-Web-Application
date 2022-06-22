import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { logout } from '../actions/userActions';
import logo from './logo.ico';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.storeUserLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    console.log('am iesit merge butonu de logout');
    dispatch(logout());
  };

  return (
    <header className='sticky'>
      <Navbar variant='dark' expand='lg' collapseOnSelect className='header'>
        <Container>
          <img
            alt='brand logo'
            src={logo}
            width='50'
            height='50'
            className='d-inline-block align-top'
          />
          <LinkContainer to='/'>
            {/* header title */}
            <Navbar.Brand className='header-title'>Snow4All</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* Search Button */}
            <Form className='d-flex ms-auto'>
              <FormControl
                type='search'
                placeholder='Search'
                className='ms-auto'
                aria-label='Search'
              ></FormControl>
              {/* <Button
                variant='outline-success'
                size='lg'
                className='search-button '
              >
                <i class='fa-solid fa-magnifying-glass'></i>
              </Button> */}
            </Form>

            {/* cu ms e margin left */}
            <Nav className='ms-auto'>
              {/* pe=padding-right si ps=padding-left */}
              <LinkContainer to='/cart'>
                <Nav.Link className='pe-4'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                /* if there is an user loged in we display the followinf NavDropdown */
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                /* if there is NO user loged in we display just the sign in button */
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
