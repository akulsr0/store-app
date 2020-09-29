import { ADD_PRODUCT, DELETE_PRODUCT } from './types';

export const addProduct = (product) => {
  return { type: ADD_PRODUCT, payload: product };
};

export const deleteProduct = (id) => {
  return { type: ADD_PRODUCT, payload: { id } };
};
