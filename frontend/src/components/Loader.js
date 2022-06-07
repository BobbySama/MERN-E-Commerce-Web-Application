import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '200px',
        height: '200px',
        margin: 'auto',
        display: 'block',
        color: 'grey',
      }}
    >
      <span className='sr-only'>LOADING...</span>
    </Spinner>
  );
};

export default Loader;
