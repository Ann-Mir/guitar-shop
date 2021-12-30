import { createReducer } from '@reduxjs/toolkit';
import { TSearchResults } from '../../types/state';
import { loadSearchResults } from '../actions';

const initialState: TSearchResults = {
  guitars: [],
};

const searchResults = createReducer(initialState, (builder) => {
  builder.addCase(loadSearchResults, (state, action) => {
    const { guitars } = action.payload;
    state.guitars = guitars;
  });
});

export { searchResults };
