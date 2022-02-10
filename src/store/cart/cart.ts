import { createReducer } from '@reduxjs/toolkit';
import { NOT_FOUND_INDEX } from '../../const';
import { TCart } from '../../types/state';
import {
  addToCart, removeItemFromCart,
  updateCartGuitarQuantity,
} from '../actions';


const initialState: TCart = {
  cartGuitars: [],
  coupon: '',
};


const cart = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const { guitar } = action.payload;
      const currentGuitar = state.cartGuitars.find((item) => item.id === guitar.id);
      if (!currentGuitar) {
        state.cartGuitars = [...state.cartGuitars, {...guitar, quantity: 1}];
      } else {
        currentGuitar.quantity = Number(currentGuitar.quantity) + 1;
      }
    })
    .addCase(updateCartGuitarQuantity, (state, action) => {
      const { guitar, quantity } = action.payload;
      const currentGuitar = state.cartGuitars.find((item) => item.id === guitar.id);
      if (currentGuitar) {
        currentGuitar.quantity = quantity;
      }
    })
    .addCase(removeItemFromCart, (state, action) => {
      const { guitar } = action.payload;
      const index = state.cartGuitars.findIndex((item) => item.id === guitar.id);
      if (index !== NOT_FOUND_INDEX) {
        state.cartGuitars = [
          ...state.cartGuitars.slice(0, index),
          ...state.cartGuitars.slice(index + 1),
        ];
      }
    });
});


export {cart};
