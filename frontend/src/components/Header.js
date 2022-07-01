import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import logo from './logo.ico';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.storeUserLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
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
            <SearchBox></SearchBox>

            {/* cu ms e margin left */}
            <Nav className='ms-auto'>
              {/* pe=padding-right si ps=padding-left */}
              <LinkContainer to='/cart' className='pe-4 header-title'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart '></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                /* if there is an user loged in we display the followinf NavDropdown */
                <NavDropdown
                  title={<span className='header-title'>{userInfo.name}</span>}
                  id='username'
                  className='header-title'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                /* if there is NO user loged in we display just the sign in button */
                <LinkContainer to='/login' className='header-title'>
                  <Nav.Link>
                    <i className='fas fa-user '></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={<span className='header-title'>Admin</span>}
                  id='adminmenu'
                  className='header-title'
                >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
