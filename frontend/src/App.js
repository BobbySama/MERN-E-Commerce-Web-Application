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

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
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
