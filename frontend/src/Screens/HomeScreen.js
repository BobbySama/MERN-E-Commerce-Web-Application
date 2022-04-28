import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading!!!!!!!!!!!!!!!</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((productElem) => (
            <Col key={productElem._id} xs={6} sm={6} md={6} lg={3}>
              <Product productProp={productElem} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
