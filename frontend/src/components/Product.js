import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ productProp }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${productProp._id}`}>
        <Card.Img src={productProp.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${productProp._id}`}>
          <Card.Title as='div'>
            <strong>{productProp.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={productProp.rating}
            text={`${productProp.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${productProp.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
