import {createReducer} from '@reduxjs/toolkit';
import { GuitarsData } from '../../types/state';
import {loadGuitars} from '../action';

const initialState: GuitarsData = {
  guitars: [],
  isDataLoaded: false,
};


const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      const {guitars} = action.payload;

      state.guitars = guitars;
      state.isDataLoaded = true;
    });
});

export {guitarsData};
