import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const productList = useSelector((state) => state.storeProductList);
  const { loading, error, products } = productList;

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((productElem) => (
            <Col key={productElem._id} xs={12} sm={6} md={4} lg={3}>
              <Product productProp={productElem} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
