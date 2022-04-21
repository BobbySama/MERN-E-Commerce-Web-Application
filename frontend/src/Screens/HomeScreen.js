// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  // eslint-disable-next-line
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((productElem) => (
          <Col key={productElem._id} xs={6} sm={6} md={6} lg={3}>
            <Product productProp={productElem} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
