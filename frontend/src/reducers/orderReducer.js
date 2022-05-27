import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
        state: action.payload,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        sucess: true,
        state: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        sucess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
