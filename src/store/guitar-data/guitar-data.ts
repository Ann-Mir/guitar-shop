import {createReducer} from '@reduxjs/toolkit';
import { TGuitarData } from '../../types/state';
import { loadGuitar, setIsGuitarLoaded } from '../actions';


const initialState: TGuitarData = {
  guitar: null,
  isGuitarLoaded: false,
};


const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitar, (state, action) => {
      const { guitar } = action.payload;
      state.guitar = guitar;
      state.isGuitarLoaded = true;
    })
    .addCase(setIsGuitarLoaded, (state, action) => {
      const { isGuitarLoaded } = action.payload;
      state.isGuitarLoaded = isGuitarLoaded;
    });
});

export {guitarData};
