import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log('asta vine din add to cart din actions');

  const { data } = await axios.get(`../api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  console.log(getState().storeCart);

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().storeCart.cartItems)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().storeCart.cartItems)
  );

  console.log('buton apasat din cartActions');
};
