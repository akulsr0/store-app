import { ADD_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initState = {
  products: [],
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default productReducer;
