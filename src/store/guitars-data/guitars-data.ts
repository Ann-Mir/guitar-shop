import {createReducer} from '@reduxjs/toolkit';
import { TGuitarsData } from '../../types/state';
import {loadGuitars} from '../action';

const initialState: TGuitarsData = {
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
