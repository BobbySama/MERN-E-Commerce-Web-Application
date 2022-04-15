import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
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
