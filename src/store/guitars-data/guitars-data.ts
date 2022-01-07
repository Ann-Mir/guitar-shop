import {createReducer} from '@reduxjs/toolkit';
import { TGuitarsData } from '../../types/state';
import { loadGuitars, setGuitarsCount } from '../actions';

const initialState: TGuitarsData = {
  guitars: [],
  isDataLoaded: false,
  guitarsCount: 0,
};


const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      const {guitars} = action.payload;
      state.guitars = guitars;
      state.isDataLoaded = true;
    })
    .addCase(setGuitarsCount, (state, action) => {
      const {guitarsCount} = action.payload;
      state.guitarsCount = guitarsCount;
    });
});

export {guitarsData};
