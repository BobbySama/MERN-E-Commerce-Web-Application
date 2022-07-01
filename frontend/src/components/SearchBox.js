import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandlet = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandlet} className='ms-auto '>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search'
      ></Form.Control>
    </Form>
  );
};

export default SearchBox;
