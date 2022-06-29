import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ProductsAdminScreen from './Screens/ProductsAdminScreen';
import ProductEditScreen from './Screens/ProductEditScreen';

function App() {
  document.body.style.background = '#3596B5';
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            {/* Admin screen */}
            <Route path='/admin/userlist' element={<UserListScreen />} />

            {/* Edit Admin screen */}
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

            {/* Products Admin screen */}
            <Route
              path='/admin/productlist'
              element={<ProductsAdminScreen />}
            />

            {/* Products Edit Admin screen */}
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />

            {/* LoginScreen */}
            <Route path='/login' element={<LoginScreen />} />

            {/* RegisterScreen */}
            <Route path='/register' element={<RegisterScreen />} />

            {/* ProfileScreen */}
            <Route path='/profile' element={<ProfileScreen />} />

            {/* ShippingScreen */}
            <Route path='/login/shipping' element={<ShippingScreen />} />

            {/* PaymentScreen */}
            <Route path='/payment' element={<PaymentScreen />} />

            {/* PlaceOrderScreen */}
            <Route path='/order' element={<PlaceOrderScreen />} />

            {/* OrderScreen */}
            <Route path='/order/:id' element={<OrderScreen />} />

            {/* HomeScreen */}
            <Route path='/' element={<HomeScreen />} exact />

            {/* ProductScreen */}
            <Route path='/product/:id' element={<ProductScreen />} />

            {/* CartScreen and variation */}
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
