import {createReducer} from '@reduxjs/toolkit';
import { TFilter } from '../../types/state';
import { setMaxPrice, setMinPrice } from '../actions';

const initialState: TFilter = {
  minPrice: 0,
  maxPrice: 300000,
};

const filter = createReducer(initialState, (builder) => {
  builder
    .addCase(setMinPrice, (state, action) => {
      const {price} = action.payload;
      state.minPrice = price;
    })
    .addCase(setMaxPrice, (state, action) => {
      const {price} = action.payload;
      state.maxPrice = price;
    });
});

export {filter};
