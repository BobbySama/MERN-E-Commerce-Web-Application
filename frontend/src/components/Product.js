import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ productProp }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${productProp._id}`}>
        <Card.Img src={productProp.image} variant='top' />
      </a>

      <Card.Body>
        <a href={`/product/${productProp._id}`}>
          <Card.Title as='div'>
            <strong>{productProp.name}</strong>
          </Card.Title>
        </a>

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
