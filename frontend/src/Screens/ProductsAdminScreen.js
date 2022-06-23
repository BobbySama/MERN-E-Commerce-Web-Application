import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  deleteProduct,
  listProducts,
  createProduct,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductsAdminScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const match = useMatch();

  const productList = useSelector((state) => state.storeProductList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.storeProductDelete);
  const { loading: loadingDelete, success: deleteSuccess } = productDelete;

  const productCreate = useSelector((state) => state.storeProductCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.storeUserLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate(`/login`);
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    deleteSuccess,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button
            className='my-3'
            variant='success'
            onClick={createProductHandler}
          >
            <i className='fas fa-plus'></i>Add Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader></Loader>}
      {loadingCreate && <Loader></Loader>}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deleteHandler(product._id);
                    }}
                  >
                    <i className='fas fa-trash text-right'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductsAdminScreen;
